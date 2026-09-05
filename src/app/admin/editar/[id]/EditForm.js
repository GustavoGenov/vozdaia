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
  const [imageAlt, setImageAlt] = useState(article.image_alt || '');
  const [metaTitle, setMetaTitle] = useState(article.meta_title || '');
  const [metaDescription, setMetaDescription] = useState(article.meta_description || '');
  const [sources, setSources] = useState(article.sources || '');
  const [disclaimerType, setDisclaimerType] = useState(article.disclaimer_type || 'none');
  const [published, setPublished] = useState(article.published ?? true);

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
        image_alt: imageAlt,
        meta_title: metaTitle,
        meta_description: metaDescription,
        sources: sources,
        disclaimer_type: disclaimerType,
        published: published,
        updated_at: new Date().toISOString()
      }).eq('id', article.id);

      if (updateError) {
        throw new Error('Erro ao atualizar notícia: ' + updateError.message);
      }

      setMessage('Notícia atualizada com sucesso!');
      
      fetch('/api/ping-google', { method: 'POST' }).catch((e) =>
        console.error('Erro de ping no Google Notícias:', e)
      );
      
      router.refresh();

      setTimeout(() => {
        router.push('/admin');
      }, 1200);

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '12px 14px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '15px', background: 'var(--card)', color: 'var(--text)', marginBottom: '16px' };
  const labelStyle = { fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px', display: 'block' };
  const sectionStyle = { padding: '24px', background: 'var(--bg)', borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--border)' };

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', background: 'var(--card)', boxShadow: 'var(--shadow)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '2px solid #1a73e8', paddingBottom: '12px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-icons-extended" style={{ color: '#1a73e8' }}>edit_note</span>
          Editar Notícia: {article.title}
        </h1>
        <Link href="/admin" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 600 }}>
          <span className="material-icons-extended" style={{ fontSize: '18px' }}>arrow_back</span> Voltar
        </Link>
      </div>

      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column' }}>
        
        {/* Informações Principais */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '16px', fontWeight: '700' }}>1. Informações da Notícia</h3>
          
          <label style={labelStyle}>Título da Matéria *</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle} 
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Bloco / Editoria *</label>
              <select 
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                style={inputStyle}
                required
              >
                <option value="">Selecione um Bloco</option>
                {categories?.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Autor Responsável (E-E-A-T) *</label>
              <select 
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                style={inputStyle}
                required
              >
                {AUTHORS.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
            <input 
              type="checkbox" 
              id="publish-toggle" 
              checked={published} 
              onChange={(e) => setPublished(e.target.checked)} 
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="publish-toggle" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)', cursor: 'pointer' }}>
              Publicada e Visível no Site (Desmarque para salvar como rascunho)
            </label>
          </div>
        </div>

        {/* Imagem de Capa */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '16px', fontWeight: '700' }}>2. Imagem de Destaque</h3>
          
          <label style={labelStyle}>Substituir Imagem de Capa (Opcional)</label>
          <input 
            id="image-upload"
            type="file" 
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={{ ...inputStyle, marginBottom: '8px' }} 
          />
          
          <label style={labelStyle}>Texto Alternativo da Imagem (Alt Text)</label>
          <input 
            type="text" 
            placeholder="Descrição para acessibilidade e Google" 
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            style={inputStyle} 
          />

          <label style={labelStyle}>Crédito da Imagem</label>
          <input 
            type="text" 
            placeholder="Crédito da imagem (Ex: Foto por Unsplash)" 
            value={imageCredit}
            onChange={(e) => setImageCredit(e.target.value)}
            style={inputStyle} 
          />

          {article.image_url && !imageFile && (
            <div style={{ marginTop: '12px', padding: '12px', background: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Capa Atual:</span>
              <img src={article.image_url} alt="Capa atual" style={{ height: '120px', borderRadius: '6px', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        {/* Conteúdo da Notícia */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '16px', fontWeight: '700' }}>3. Resumo & Corpo do Artigo</h3>
          
          <label style={labelStyle}>Resumo / Linha Fina *</label>
          <textarea 
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
            required
          />

          <label style={labelStyle}>Corpo da Matéria *</label>
          <div style={{ background: '#fff', color: '#000', borderRadius: '8px', overflow: 'hidden' }}>
            <ReactQuill 
              theme="snow"
              placeholder="Edite a matéria..." 
              value={content}
              onChange={setContent}
              style={{ height: '360px', marginBottom: '50px' }}
            />
          </div>

          <label style={labelStyle}>Fontes e Referências Consultadas</label>
          <textarea 
            placeholder="Links e documentos de referência..." 
            value={sources} 
            onChange={(e) => setSources(e.target.value)} 
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} 
          />
        </div>

        {/* Feedback */}
        {message && (
          <div style={{ 
            padding: '16px', 
            borderRadius: '8px', 
            fontSize: '15px',
            fontWeight: '600',
            marginBottom: '24px',
            background: message.includes('sucesso') ? '#e6f4ea' : '#fce8e6',
            color: message.includes('sucesso') ? '#137333' : '#c5221f',
          }}>
            {message}
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{ background: '#1a73e8', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '8px', fontWeight: '700', fontSize: '15px', cursor: loading ? 'wait' : 'pointer', flex: 2, minWidth: '200px', boxShadow: '0 4px 12px rgba(26, 115, 232, 0.3)' }}
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          
          <Link 
            href="/admin"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card)', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '14px 24px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', textDecoration: 'none', flex: 1, minWidth: '140px' }}
          >
            Cancelar
          </Link>
        </div>

      </form>
    </div>
  );
}
