'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function PublishForm({ categories }) {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const slugify = (text) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title || !categoryId || !content || !imageFile) {
      setMessage('Preencha todos os campos e anexe uma imagem de capa.');
      return;
    }

    setLoading(true);
    setMessage('Fazendo upload da imagem...');

    try {
      // 1. Upload the image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('images')
        .upload(filePath, imageFile);

      if (uploadError) {
        throw new Error('Erro ao fazer upload da imagem: ' + uploadError.message);
      }

      // 2. Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setMessage('Imagem enviada! Publicando artigo...');

      // 3. Insert into articles table
      const slug = slugify(title);
      
      const { error: insertError } = await supabase.from('articles').insert([{
        title,
        slug,
        category_id: categoryId,
        content: content.replace(/\n/g, '<br>'), // Simple line break to HTML conversion
        image_url: publicUrl,
        published: true,
        author: 'Administrador', // Ou pegar do usuário logado se quiser
        views: 0
      }]);

      if (insertError) {
        throw new Error('Erro ao publicar notícia: ' + insertError.message);
      }

      setMessage('Notícia publicada com sucesso!');
      
      // Limpar formulário
      setTitle('');
      setCategoryId('');
      setContent('');
      setImageFile(null);
      // Reset file input
      const fileInput = document.getElementById('image-upload');
      if (fileInput) fileInput.value = '';

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
      {/* Simulador de Editor de Notícias */}
      <div id="editor" style={{ flex: '1 1 400px', border: '1px solid #dadce0', borderRadius: '8px', padding: '24px' }}>
        <h2 style={{ fontSize: '18px', color: '#202124', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-icons-extended" style={{color: '#1a73e8'}}>edit_document</span> Escrever Notícia
        </h2>
        <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="text" 
            placeholder="Título da Manchete" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '16px' }} 
            required
          />
          <select 
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '14px' }}
            required
          >
            <option value="">Selecione o Bloco (Categoria)</option>
            {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', color: '#5f6368', fontWeight: '500' }}>Foto de Capa</label>
            <input 
              id="image-upload"
              type="file" 
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              style={{ width: '100%', padding: '10px', border: '1px dashed #dadce0', borderRadius: '4px', fontSize: '14px', background: '#f8f9fa' }} 
              required
            />
          </div>

          <textarea 
            placeholder="Escreva a notícia (você pode usar parágrafos)..." 
            rows={8} 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '14px', resize: 'vertical' }}
            required
          ></textarea>

          {message && (
            <div style={{ 
              padding: '12px', 
              borderRadius: '4px', 
              fontSize: '14px',
              background: message.includes('sucesso') ? '#e6f4ea' : (message.includes('Erro') || message.includes('Preencha') ? '#fce8e6' : '#e8f0fe'),
              color: message.includes('sucesso') ? '#137333' : (message.includes('Erro') || message.includes('Preencha') ? '#c5221f' : '#1a73e8'),
            }}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={{ background: '#1a73e8', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: '500', cursor: loading ? 'wait' : 'pointer' }}
          >
            {loading ? 'Processando...' : 'Publicar Artigo'}
          </button>
        </form>
      </div>

      <div style={{ flex: '1 1 300px' }}>
        {/* AdSense Config */}
        <div id="adsense" style={{ border: '1px solid #dadce0', borderRadius: '8px', padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', color: '#202124', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-icons-extended" style={{color: '#EA4335'}}>monetization_on</span> Monetização (AdSense)
          </h2>
          <p style={{ fontSize: '13px', color: '#5f6368', marginBottom: '16px' }}>Cole aqui o seu Client ID do Google AdSense para ativar os anúncios nos artigos.</p>
          <input type="text" placeholder="ex: ca-pub-1234567890" style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '14px', marginBottom: '16px' }} />
          <button style={{ background: '#34A853', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: '500', cursor: 'pointer' }}>Salvar Configuração</button>
        </div>
      </div>
    </div>
  );
}
