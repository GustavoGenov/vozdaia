'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const INITIAL_TEMPLATE = `<h2>[Subtítulo H2]: Análise & O Impacto Real</h2>
<p><strong>[Aqui entra o diferencial]:</strong> Em vez de só relatar, analisamos o que isso muda para o leitor, para o mercado de tecnologia ou para o cenário do Brasil.</p>
<hr/>
<p><strong>Fontes e Referências:</strong> <a href="#">[Link da fonte original / Documento oficial]</a></p>`;

export default function PublishForm({ categories }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [content, setContent] = useState(INITIAL_TEMPLATE);
  const [imageFile, setImageFile] = useState(null);
  const [imageCredit, setImageCredit] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

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
    if (!title || !categoryId || !summary || !content || !imageFile) {
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
        summary,
        category_id: categoryId,
        content: content,
        image_url: publicUrl,
        image_credit: imageCredit,
        published: true,
        author: 'Gustavo Castro e RuiWenceslau',
        views: 0
      }]);

      if (insertError) {
        throw new Error('Erro ao publicar notícia: ' + insertError.message);
      }

      setMessage('Notícia publicada com sucesso!');
      
      // Avisa o Google Notícias em segundo plano para indexação instantânea
      fetch('/api/ping-google', { method: 'POST' }).catch((e) =>
        console.error('Erro de ping no Google Notícias:', e)
      );
      
      // Limpar formulário
      setTitle('');
      setSummary('');
      setCategoryId('');
      setContent(INITIAL_TEMPLATE);
      setImageFile(null);
      setImageCredit('');
      // Reset file input
      const fileInput = document.getElementById('image-upload');
      if (fileInput) fileInput.value = '';

      router.refresh();

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
      {/* Simulador de Editor de Notícias */}
      <div id="editor" style={{ flex: '1 1 100%', minWidth: 0, border: '1px solid #dadce0', borderRadius: '8px', padding: '24px' }}>
        <h2 style={{ fontSize: '18px', color: '#202124', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-icons-extended" style={{color: '#1a73e8'}}>edit_document</span> Escrever Notícia
        </h2>
        <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="text" 
            placeholder="Título da Manchete Forte e Otimizado (H1)" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '16px' }} 
            required
          />
          <input 
            type="text" 
            placeholder="Resumo da notícia / Linha Fina" 
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '14px' }} 
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
            <input 
              type="text" 
              placeholder="Crédito da imagem (Ex: Foto por João / Gerado por Midjourney)" 
              value={imageCredit}
              onChange={(e) => setImageCredit(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '14px', marginTop: '4px' }} 
            />
          </div>

          <div style={{ background: '#fff', color: '#000' }}>
            <ReactQuill 
              theme="snow"
              placeholder="Escreva a notícia..." 
              value={content}
              onChange={setContent}
              style={{ height: '300px', marginBottom: '40px' }}
            />
          </div>

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

