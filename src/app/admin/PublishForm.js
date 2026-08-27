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
  "RuiWenceslau de Oliveira",
  "Beatriz Freire",
  "Daiene Maria de Meneses",
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

  // Contador de Palavras (DOMParser para robustez contra HTML lixo de editores)
  const wordCount = useMemo(() => {
    let parsedContent = content || '';
    if (typeof window !== 'undefined') {
      const parser = new window.DOMParser();
      const doc = parser.parseFromString(parsedContent, 'text/html');
      parsedContent = doc.body.textContent || '';
    } else {
      parsedContent = parsedContent.replace(/<[^>]*>/g, ' ');
    }
    
    const combinedText = `${title || ''} ${summary || ''} ${parsedContent} ${sources || ''}`
      .replace(/&nbsp;/gi, ' ')
      .replace(/\u00A0/g, ' ');
      
    const words = combinedText.trim().split(/[\s\n\r\t]+/).filter(w => w.length > 0);
    return words.length;
  }, [title, summary, content, sources]);

  let wordCountColor = '#d32f2f';
  let wordCountText = 'Alerta: Texto com ' + wordCount + ' palavras (Mínimo de 750 palavras exigido pelo AdSense)';
  if (wordCount >= 750 && wordCount <= 1600) {
    wordCountColor = '#34A853';
    wordCountText = 'Excelente densidade informativa (' + wordCount + ' palavras - Aprovado AdSense)';
  } else if (wordCount > 1600) {
    wordCountColor = '#1a73e8';
    wordCountText = 'Matéria aprofundada e completa (' + wordCount + ' palavras)';
  }

  // Cor do SEO Description
  let metaDescColor = '#dadce0';
  if (metaDescription.length > 0 && metaDescription.length < 120) {
    metaDescColor = '#F4B400'; // Amarelo (Curto)
  } else if (metaDescription.length >= 120 && metaDescription.length <= 160) {
    metaDescColor = '#34A853'; // Verde (Ideal)
  } else if (metaDescription.length > 160) {
    metaDescColor = '#EA4335'; // Vermelho (Longo)
  }

  const handlePublish = async (e, isDraft = false) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!title || !categoryId || !summary || !content || (!imageFile && !isDraft) || !imageAlt) {
      setMessage('Preencha os campos obrigatórios (incluindo Alt Text da imagem).');
      return;
    }

    if (!isDraft && wordCount < 750) {
      setMessage('A matéria possui ' + wordCount + ' palavras. É necessário atingir o mínimo de 750 palavras (contando Título, Linha Fina, Texto e Fontes) para publicação oficial AdSense.');
      return;
    }

    setLoading(true);
    let publicUrl = null;

    try {
      if (imageFile) {
        setMessage('Fazendo upload da imagem...');
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, imageFile);

        if (uploadError) {
          throw new Error('Erro ao fazer upload da imagem: ' + uploadError.message);
        }

        const { data } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);
        publicUrl = data.publicUrl;
      }

      setMessage(isDraft ? 'Salvando rascunho...' : 'Publicando artigo...');

      const slug = slugify(title);
      
      const { error: insertError } = await supabase.from('articles').insert([{
        title,
        slug,
        summary,
        category_id: categoryId,
        content: content,
        image_url: publicUrl,
        published: !isDraft,
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
        throw new Error('Erro ao salvar: ' + insertError.message);
      }

      setMessage(isDraft ? 'Rascunho salvo com sucesso!' : 'Notícia publicada com sucesso!');
      
      if (!isDraft) {
        fetch('/api/ping-google', { method: 'POST' }).catch((e) =>
          console.error('Erro de ping no Google:', e)
        );
      }
      
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
  const reqStar = <span style={{ color: '#d32f2f' }}>*</span>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
      <div id="editor" style={{ flex: '1 1 100%', minWidth: 0, border: '1px solid #dadce0', borderRadius: '12px', padding: '32px', background: '#fff' }}>
        <h2 style={{ fontSize: '22px', color: '#202124', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #1a73e8', paddingBottom: '12px' }}>
          <span className="material-icons-extended" style={{color: '#1a73e8'}}>campaign</span>
          PAINEL DE PUBLICAÇÃO - VOZ DA I.A
        </h2>
        
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          
          <div style={sectionStyle}>
            <h3 style={{ fontSize: '16px', color: '#202124', marginBottom: '16px' }}>1. Informações Principais</h3>
            <label style={labelStyle}>Título da Matéria (H1) {reqStar}</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} required />
            
            <label style={labelStyle}>Slug / URL Amigável (Automático)</label>
            <input type="text" value={generatedSlug} disabled style={{ ...inputStyle, background: '#e8eaed', color: '#5f6368' }} />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Categoria Oficial {reqStar}</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} style={inputStyle} required>
                  <option value="">Selecione a Categoria</option>
                  {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Autor Responsável (E-E-A-T) {reqStar}</label>
                <select value={authorName} onChange={(e) => setAuthorName(e.target.value)} style={inputStyle} required>
                  {AUTHORS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={{ fontSize: '16px', color: '#202124', marginBottom: '16px' }}>2. Imagem de Destaque (SEO e Acessibilidade)</h3>
            <label style={labelStyle}>Upload de Imagem {reqStar}</label>
            <input id="image-upload" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} style={{...inputStyle, marginBottom: '4px'}} required />
            <p style={{ fontSize: '13px', color: '#5f6368', marginTop: '0', marginBottom: '16px' }}>Dimensões recomendadas: 1200x630px (proporção 16:9). Formatos: WebP, JPG ou PNG. Tamanho máximo: 2 MB.</p>
            
            <label style={labelStyle}>Texto Alternativo (Alt Text) {reqStar}</label>
            <input type="text" placeholder="Descreva a imagem para deficientes visuais e robôs do Google" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} style={inputStyle} required />
            
            <label style={labelStyle}>Créditos da Imagem</label>
            <input type="text" placeholder="Ex: Foto por Unsplash / Ilustração por IA" value={imageCredits} onChange={(e) => setImageCredits(e.target.value)} style={inputStyle} />
          </div>

          <div style={sectionStyle}>
            <h3 style={{ fontSize: '16px', color: '#202124', marginBottom: '16px' }}>3. Estrutura e Conteúdo</h3>
            <label style={labelStyle}>Resumo / Linha Fina (Aparece nos cards) {reqStar}</label>
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} style={{ ...inputStyle, height: '80px', resize: 'vertical' }} required />
            
            <label style={labelStyle}>Corpo da Matéria (Use H2, H3, e Citações) {reqStar}</label>
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
            <input type="text" placeholder="Deixe em branco para usar o Título H1" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} style={{ ...inputStyle, borderColor: metaTitle.length > 60 ? '#EA4335' : '#dadce0', borderWidth: metaTitle.length > 60 ? '2px' : '1px' }} />
            
            <label style={labelStyle}>
              Meta Description - <span style={{ color: metaDescColor }}>{metaDescription.length} chars (Ideal: 120-160)</span>
            </label>
            <textarea placeholder="Deixe em branco para usar o Resumo" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} style={{ ...inputStyle, height: '80px', borderColor: metaDescColor, borderWidth: metaDescColor !== '#dadce0' ? '2px' : '1px' }} />
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
            <button type="button" onClick={(e) => handlePublish(e, true)} disabled={loading} style={{ flex: 1, background: '#f1f3f4', color: '#5f6368', border: '1px solid #dadce0', padding: '16px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: loading ? 'wait' : 'pointer', transition: 'background 0.2s' }}>
              Salvar Rascunho
            </button>
            <button type="button" onClick={(e) => handlePublish(e, false)} disabled={loading} style={{ flex: 2, background: '#1a73e8', color: '#fff', border: 'none', padding: '16px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: loading ? 'wait' : 'pointer', transition: 'background 0.2s' }}>
              {loading ? 'Processando...' : 'Publicar Matéria (AdSense Ready)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
