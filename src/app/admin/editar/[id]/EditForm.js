'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const AUTHORS = [
  "Gustavo de Castro Bernardes Rosa",
  "RuiWenceslau de Oliveira",
  "Beatriz Freire",
  "Daiene Maria de Meneses",
  "Jhonatan d' Osogiyan (ou Pai Jhonatan)",
  "Kaelara (Agente de IA Autônomo)",
  "Gabriela Castro Bernardes Rosa"
];

export default function EditForm({ article, categories }) {
  const [title, setTitle] = useState(article.title || '');
  const [summary, setSummary] = useState(article.summary || '');
  const [categoryId, setCategoryId] = useState(article.category_id || '');
  const [authorName, setAuthorName] = useState(article.author_name || AUTHORS[0]);
  const [content, setContent] = useState(article.content || '');
  const [imageFile, setImageFile] = useState(null);
  const [imageCredit, setImageCredit] = useState(article.image_credit || '');
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !categoryId || !summary || !content) {
      setMessage('Preencha os campos obrigatórios (título, categoria, resumo e conteúdo).');
      return;
    }

    setLoading(true);
    setMessage('Salvando alterações...');

    try {
      let publicUrl = article.image_url;

      // Se uma nova imagem foi selecionada, faz o upload e substitui
      if (imageFile) {
        setMessage('Fazendo upload da nova imagem...');
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, imageFile);

        if (uploadError) {
          throw new Error('Erro ao fazer upload da nova imagem: ' + uploadError.message);
        }

        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        publicUrl = data.publicUrl;
        setMessage('Imagem atualizada! Salvando artigo...');
      }

      // Atualizar no banco
      const slug = slugify(title);
      
      const { error: updateError } = await supabase.from('articles').update({
        title,
        slug,
        summary,
        category_id: categoryId,
        author_name: authorName,
        content: content,
        image_url: publicUrl,
        image_credit: imageCredit,
      }).eq('id', article.id);

      if (updateError) {
        throw new Error('Erro ao atualizar notícia: ' + updateError.message);
      }

      setMessage('Notícia atualizada com sucesso!');
      
      // Avisa o Google Notícias em segundo plano para indexação instantânea
      fetch('/api/ping-google', { method: 'POST' }).catch((e) =>
        console.error('Erro de ping no Google Notícias:', e)
      );
      
      router.refresh();

      // Redirecionar de volta pro admin após um tempinho
      setTimeout(() => {
        router.push('/admin');
      }, 1500);

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #dadce0', borderRadius: '8px', padding: '24px', background: '#fff' }}>
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Título */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#202124' }}>Título da Notícia *</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '16px' }} 
            required
          />
        </div>

        {/* Categoria e Autor */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#202124' }}>Bloco (Filtro) *</label>
            <select 
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '16px', background: '#fff' }}
              required
            >
              <option value="">Selecione um Bloco</option>
              {categories?.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#202124' }}>Autor Responsável *</label>
            <select 
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '16px', background: '#fff' }}
              required
            >
              {AUTHORS.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resumo */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#202124' }}>Resumo (Texto que aparece no Card) *</label>
          <textarea 
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '16px', minHeight: '80px', resize: 'vertical' }}
            required
          />
        </div>

        {/* Nova Imagem de Capa (Opcional) */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#202124' }}>Nova Imagem de Capa (Opcional)</label>
          <div style={{ fontSize: '13px', color: '#5f6368', marginBottom: '8px' }}>Se você não selecionar uma foto nova, a foto original será mantida.</div>
          <input 
            id="image-upload"
            type="file" 
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', background: '#f8f9fa' }} 
          />
          <input 
            type="text" 
            placeholder="Crédito da imagem (Opcional)" 
            value={imageCredit}
            onChange={(e) => setImageCredit(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '14px', marginTop: '12px' }} 
          />
          {article.image_url && !imageFile && (
            <div style={{ marginTop: '12px' }}>
              <span style={{ fontSize: '13px', color: '#5f6368', display: 'block', marginBottom: '4px' }}>Imagem Atual:</span>
              <img src={article.image_url} alt="Capa atual" style={{ height: '100px', borderRadius: '4px', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#202124' }}>Conteúdo da Notícia *</label>
          <div style={{ background: '#fff', color: '#000' }}>
            <ReactQuill 
              theme="snow"
              placeholder="Edite a notícia (você pode usar formatação)..." 
              value={content}
              onChange={setContent}
              style={{ height: '300px', marginBottom: '40px' }}
            />
          </div>
        </div>

        {/* Mensagem de Feedback */}
        {message && (
          <div style={{ 
            padding: '12px', 
            borderRadius: '4px', 
            background: message.includes('sucesso') ? '#e6f4ea' : (message.includes('Erro') || message.includes('Preencha') ? '#fce8e6' : '#e8f0fe'),
            color: message.includes('sucesso') ? '#137333' : (message.includes('Erro') || message.includes('Preencha') ? '#c5221f' : '#1a73e8'),
          }}>
            {message}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{ background: '#1a73e8', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: '500', fontSize: '16px', cursor: loading ? 'wait' : 'pointer', flex: 1 }}
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          
          <Link 
            href="/admin"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f3f4', color: '#3c4043', border: '1px solid #dadce0', padding: '12px 24px', borderRadius: '4px', fontWeight: '500', fontSize: '16px', textDecoration: 'none' }}
          >
            Cancelar
          </Link>
        </div>

      </form>
    </div>
  );
}
