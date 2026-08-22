"use client";
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const INITIAL_TEMPLATE = `
  <h2>Contexto Principal</h2>
  <p>Insira o contexto detalhado aqui. Evite parágrafos muito longos.</p>
  <h3>Análise e Impactos</h3>
  <p>Detalhe os impactos da tecnologia, pesquisa ou fato.</p>
  <blockquote>
    "O futuro da tecnologia depende de boas decisões no presente." - Especialista
  </blockquote>
  <h3>O que esperar</h3>
  <ul>
    <li>Ponto 1</li>
    <li>Ponto 2</li>
  </ul>
`;

const AUTHORS = [
  "Gustavo de Castro Bernardes Rosa",
  "Daiene Maria de Meneses",
  "RuiWenceslau de Oliveira",
  "Jhonatan d' Osogiyan (ou Pai Jhonatan)",
  "Kaelara (Agente de IA Autônomo)",
  "Gabriela Castro Bernardes Rosa"
];

export default function PublishForm({ categories }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [content, setContent] = useState(INITIAL_TEMPLATE);
  const [imageFile, setImageFile] = useState(null);
  
  // Novos campos
  const [authorName, setAuthorName] = useState(AUTHORS[0]);
  const [disclaimerType, setDisclaimerType] = useState('none');
  const [sources, setSources] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageCredits, setImageCredits] = useState('');
  
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

  const generatedSlug = slugify(title);

  // Contador de Palavras (Extraindo HTML)
  const wordCount = useMemo(() => {
    const text = content.replace(/<[^>]*>?/gm, ''); // Strip HTML
    const words = text.trim().split(/\s+/);
    return words[0] === '' ? 0 : words.length;
  }, [content]);

  let wordCountColor = '#1a73e8';
  let wordCountText = 'Tamanho bom';
  if (wordCount < 600) {
    wordCountColor = '#d32f2f';
    wordCountText = 'Alerta: Texto muito curto (Risco de Thin Content)';
  } else if (wordCount >= 800 && wordCount <= 1500) {
    wordCountColor = '#34A853';
    wordCountText = 'Excelente densidade informativa';
  } else if (wordCount > 1500) {
    wordCountColor = '#EA4335';
    wordCountText = 'Texto longo (Bom, mas mantenha a legibilidade)';
  }

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title || !categoryId || !summary || !content || !imageFile || !imageAlt) {
      setMessage('Preencha os campos obrigatórios (incluindo Alt Text da imagem).');
      return;
    }

    if (wordCount < 300) {
      setMessage('O artigo está muito curto para ser indexado pelo AdSense. Tente atingir pelo menos 600 palavras.');
      return;
    }

    setLoading(true);
    setMessage('Fazendo upload da imagem...');

    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, imageFile);

      if (uploadError) {
        throw new Error('Erro ao fazer upload da imagem: ' + uploadError.message);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setMessage('Imagem enviada! Publicando artigo...');

      const slug = slugify(title);
      
      const { error: insertError } = await supabase.from('articles').insert([{
        title,
        slug,
        summary,
        category_id: categoryId,
        content: content,
        image_url: publicUrl,
        published: true,
        author: authorName, // campo original mantido por compatibilidade
        views: 0,
        // Novos Campos AdSense E-E-A-T
        author_name: authorName,
        disclaimer_type: disclaimerType,
        sources: sources,
        meta_title: metaTitle || title,
        meta_description: metaDescription || summary,
        image_alt: imageAlt,
        image_credits: imageCredits
      }]);

      if (insertError) {
        throw new Error('Erro ao publicar notícia: ' + insertError.message);
      }

      setMessage('Notícia publicada com sucesso!');
      
      fetch('/api/ping-google', { method: 'POST' }).catch((e) =>
        console.error('Erro de ping no Google:', e)
      );
      
      // Reset
      setTitle('');
      setSummary('');
      setCategoryId('');
      setContent(INITIAL_TEMPLATE);
      setImageFile(null);
      setImageCredits('');
      setImageAlt('');
      setSources('');
      setMetaTitle('');
      setMetaDescription('');
      
      const fileInput = document.getElementById('image-upload');
      if (fileInput) fileInput.value = '';

      router.refresh();

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '12px', border: '1px solid #dadce0', borderRadius: '4px', fontSize: '14px', marginBottom: '16px' };
  const labelStyle = { fontSize: '14px', color: '#5f6368', fontWeight: '600', marginBottom: '8px', display: 'block' };
  const sectionStyle = { padding: '24px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '24px', border: '1px solid #e0e0e0' };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
      <div id="editor" style={{ flex: '1 1 100%', minWidth: 0, border: '1px solid #dadce0', borderRadius: '12px', padding: '32px', background: '#fff' }}>
        <h2 style={{ fontSize: '22px', color: '#202124', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #1a73e8', paddingBottom: '12px' }}>
          <span className="material-icons-extended" style={{color: '#1a73e8'}}>campaign</span>
          PAINEL DE PUBLICAÇÃO - VOZ DA I.A
        </h2>
        
        <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column' }}>
          
          <div style={sectionStyle}>
            <h3 style={{ fontSize: '16px', color: '#202124', marginBottom: '16px' }}>1. Informações Principais</h3>
            <label style={labelStyle}>Título da Matéria (H1)</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} required />
            
            <label style={labelStyle}>Slug / URL Amigável (Automático)</label>
            <input type="text" value={generatedSlug} disabled style={{ ...inputStyle, background: '#e8eaed', color: '#5f6368' }} />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Categoria Oficial</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} style={inputStyle} required>
                  <option value="">Selecione a Categoria</option>
                  {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Autor Responsável (E-E-A-T)</label>
                <select value={authorName} onChange={(e) => setAuthorName(e.target.value)} style={inputStyle} required>
                  {AUTHORS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={{ fontSize: '16px', color: '#202124', marginBottom: '16px' }}>2. Imagem de Destaque (SEO e Acessibilidade)</h3>
            <input id="image-upload" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} style={inputStyle} required />
            
            <label style={labelStyle}>Texto Alternativo (Alt Text) - Obrigatório para AdSense</label>
            <input type="text" placeholder="Descreva a imagem para deficientes visuais e robôs do Google" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} style={inputStyle} required />
            
            <label style={labelStyle}>Créditos da Imagem</label>
            <input type="text" placeholder="Ex: Foto por Unsplash / Ilustração por IA" value={imageCredits} onChange={(e) => setImageCredits(e.target.value)} style={inputStyle} />
          </div>

          <div style={sectionStyle}>
            <h3 style={{ fontSize: '16px', color: '#202124', marginBottom: '16px' }}>3. Estrutura e Conteúdo</h3>
            <label style={labelStyle}>Resumo / Linha Fina (Aparece nos cards)</label>
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} style={{ ...inputStyle, height: '80px', resize: 'vertical' }} required />
            
            <label style={labelStyle}>Corpo da Matéria (Use H2, H3, e Citações)</label>
            <div style={{ background: '#fff', color: '#000' }}>
              <ReactQuill theme="snow" value={content} onChange={setContent} style={{ height: '400px', marginBottom: '50px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '-32px', marginBottom: '24px', fontWeight: '500', color: wordCountColor }}>
              <span className="material-icons-extended" style={{ fontSize: '18px' }}>analytics</span>
              Contador: {wordCount} palavras - {wordCountText}
            </div>

            <label style={labelStyle}>Transparência Editorial (Disclaimers)</label>
            <select value={disclaimerType} onChange={(e) => setDisclaimerType(e.target.value)} style={inputStyle}>
              <option value="none">Nenhum (Matéria Jornalística Padrão)</option>
              <option value="opiniao">Artigo de Opinião / Cultura (Colunista Convidado)</option>
              <option value="tecnica">Cobertura Técnica / Educativa (Exige fontes)</option>
            </select>

            <label style={labelStyle}>Fontes e Referências (Links e Documentos)</label>
            <textarea placeholder="Liste as URLs ou fontes de pesquisa consultadas (Uma por linha)" value={sources} onChange={(e) => setSources(e.target.value)} style={{ ...inputStyle, height: '100px', resize: 'vertical' }} />
          </div>

          <div style={sectionStyle}>
            <h3 style={{ fontSize: '16px', color: '#202124', marginBottom: '16px' }}>4. Metadados SEO</h3>
            <label style={labelStyle}>Meta Title (Google Search) - {metaTitle.length}/60 chars</label>
            <input type="text" placeholder="Deixe em branco para usar o Título H1" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} style={{ ...inputStyle, borderColor: metaTitle.length > 60 ? '#EA4335' : '#dadce0' }} />
            
            <label style={labelStyle}>Meta Description - {metaDescription.length}/160 chars</label>
            <textarea placeholder="Deixe em branco para usar o Resumo" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} style={{ ...inputStyle, height: '80px', borderColor: metaDescription.length > 160 ? '#EA4335' : '#dadce0' }} />
          </div>

          {message && (
            <div style={{ 
              padding: '16px', borderRadius: '8px', fontSize: '15px', fontWeight: '500', marginBottom: '24px',
              background: message.includes('sucesso') ? '#e6f4ea' : '#fce8e6',
              color: message.includes('sucesso') ? '#137333' : '#c5221f',
            }}>
              {message}
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px' }}>
            <button type="submit" disabled={loading} style={{ flex: 1, background: '#1a73e8', color: '#fff', border: 'none', padding: '16px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: loading ? 'wait' : 'pointer', transition: 'background 0.2s' }}>
              {loading ? 'Processando e Indexando...' : 'Publicar Matéria (AdSense Ready)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
