import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import PageTracker from '../../components/PageTracker';

const AUTHORS_META = {
  "Gustavo de Castro Bernardes Rosa": { initials: "GC", role: "Tecnólogo em Redes / Eng. de I.A", img: "/equipe/gustavo.jpg", bio: "Especialista em Inteligência Artificial e Redes de Computação." },
  "Daiene Maria de Meneses": { initials: "DM", role: "Pedagoga e Professora", img: "/equipe/daiene.jpg", bio: "Especialista em educação e desenvolvimento infantil." },
  "RuiWenceslau de Oliveira": { initials: "RO", role: "Criador de Conteúdo e Youtuber", img: "/equipe/rui.jpg", bio: "Especialista em criação de conteúdo para mídias sociais." },
  "Jhonatan d' Osogiyan (ou Pai Jhonatan)": { initials: "SJ", role: "Colunista de Cultura e Etnobotânica", img: "/equipe/jhonatan.jpg", bio: "Pesquisador de Tradições Populares, Psicologia e Herbalista." },
  "Kaelara (Agente de IA Autônomo)": { initials: "KC", role: "Sistema de Análise e Monitoramento", img: "/equipe/kaelara.png", bio: "IA desenvolvida sob arquitetura LLM (Gemma/Google API)." },
  "Gabriela Castro Bernardes Rosa": { initials: "GB", role: "Youtuber e Gamer", img: null, bio: "Produtora de conteúdo digital e games." }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const { data: article } = await supabase
    .from('articles')
    .select('title, summary, image_url, meta_title, meta_description, author_name, image_alt')
    .eq('slug', slug)
    .single();

  if (!article) return { title: 'Voz da I.A - Notícia não encontrada' };

  const metaTitle = article.meta_title || article.title;
  const metaDesc = article.meta_description || article.summary;

  return {
    title: `${metaTitle} | Voz da I.A`,
    description: metaDesc,
    openGraph: {
      title: `${metaTitle} | Voz da I.A`,
      description: metaDesc,
      images: article.image_url ? [{ url: article.image_url, alt: article.image_alt || article.title }] : [],
      type: 'article',
      authors: [article.author_name || 'Voz da I.A']
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  
  const { data: article } = await supabase
    .from('articles')
    .select('*, categories(name, color_code)')
    .eq('slug', slug)
    .single();

  if (!article) notFound();

  const cleanContent = article.content ? article.content.replace(/&nbsp;|\u00a0/g, ' ') : '';
  const cleanTitle = article.title ? article.title.replace(/&nbsp;|\u00a0/g, ' ') : '';
  const cleanSummary = article.summary ? article.summary.replace(/&nbsp;|\u00a0/g, ' ') : '';
  
  const authorData = AUTHORS_META[article.author_name] || AUTHORS_META["Gustavo de Castro Bernardes Rosa"];
  const pubDate = new Date(article.created_at);
  const modDate = article.updated_at ? new Date(article.updated_at) : pubDate;

  // Schema.org JSON-LD para SEO (NewsArticle)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.meta_title || cleanTitle,
    "image": [
      article.image_url
    ],
    "datePublished": pubDate.toISOString(),
    "dateModified": modDate.toISOString(),
    "author": [{
        "@type": article.author_name?.includes("Kaelara") ? "SoftwareApplication" : "Person",
        "name": article.author_name || 'Voz da I.A',
        "url": "https://vozdaia.com/equipe"
      }]
  };

  return (
    <>
      <PageTracker articleId={article.id} categoryId={article.category_id} />
      
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="main-content article-page-main" style={{ maxWidth: '720px', margin: '0 auto', width: '100%', overflowX: 'hidden', padding: '24px 16px' }}>
        
        {/* Navegação e Categoria */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--gn-text-secondary)' }}>
          <Link href="/" style={{ color: 'var(--gn-blue)', display: 'flex', alignItems: 'center' }}>
            <span className="material-icons-extended" style={{fontSize: '16px'}}>arrow_back</span> Início
          </Link>
          <span>/</span>
          {article.categories && (
            <span style={{ fontWeight: '600', color: article.categories.slug === 'religiao' ? '#8e24aa' : (article.categories.color_code || 'var(--gn-blue)') }}>
              {article.categories.name}
            </span>
          )}
        </div>

        {/* Título e Resumo */}
        <h1 className="google-sans article-page-title" style={{ textAlign: 'left', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {cleanTitle}
        </h1>
        <p className="article-page-summary" style={{ textAlign: 'left', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {cleanSummary}
        </p>

        {/* Metadados da Matéria (Autor e Data) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', padding: '20px 0', borderTop: '1px solid var(--gn-border)', borderBottom: '1px solid var(--gn-border)', marginBottom: '32px', width: '100%' }}>
          {authorData.img ? (
            <img src={authorData.img} alt={article.author_name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gn-search-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gn-text-secondary)' }}>
              {authorData.initials}
            </div>
          )}
          
          <div style={{ flex: '1 1 auto' }}>
            <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--gn-text)' }}>
              Por {article.author_name || article.author}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--gn-text-secondary)', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span>{authorData.role}</span>
              <span>•</span>
              <span>
                Publicado em {pubDate.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* Imagem de Capa e Créditos */}
        {article.image_url && (
          <figure style={{ margin: '0 0 40px 0' }}>
            <img 
              src={article.image_url} 
              alt={article.image_alt || cleanTitle} 
              style={{ width: '100%', height: 'auto', maxHeight: '450px', objectFit: 'cover', borderRadius: '12px', display: 'block' }} 
            />
            {article.image_credits && (
              <figcaption style={{ fontSize: '13px', color: 'var(--gn-text-secondary)', textAlign: 'right', marginTop: '8px', fontStyle: 'italic' }}>
                Crédito: {article.image_credits}
              </figcaption>
            )}
          </figure>
        )}

        {/* Conteúdo Rico (HTML) */}
        <article 
          className="article-body" 
          style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--gn-text)', wordWrap: 'break-word', overflowWrap: 'anywhere' }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            .article-body h2 { font-size: 24px; font-weight: 700; margin-top: 32px; margin-bottom: 16px; color: var(--gn-text); font-family: 'Google Sans', sans-serif; }
            .article-body h3 { font-size: 20px; font-weight: 600; margin-top: 24px; margin-bottom: 12px; color: var(--gn-text); font-family: 'Google Sans', sans-serif; }
            .article-body p { margin-bottom: 20px; }
            .article-body strong { font-weight: 600; }
            .article-body a { color: var(--gn-blue); text-decoration: none; }
            .article-body a:hover { text-decoration: underline; }
            .article-body blockquote { border-left: 4px solid var(--gn-blue); padding-left: 16px; font-style: italic; color: var(--gn-text-secondary); margin: 24px 0; background: var(--gn-surface); padding: 16px; border-radius: 0 8px 8px 0; }
            .article-body hr { border: 0; border-top: 1px solid var(--gn-border); margin: 32px 0; }
            .article-body ul, .article-body ol { margin-bottom: 20px; padding-left: 24px; }
            .article-body li { margin-bottom: 8px; }
          `}} />
          <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
        </article>

        {/* Disclaimers Transparentes */}
        {article.disclaimer_type === 'opiniao' && (
          <div style={{ marginTop: '40px', padding: '16px', backgroundColor: '#fdf3f4', borderLeft: '4px solid #d81b60', borderRadius: '4px', fontSize: '14px', color: '#c2185b' }}>
            <strong>Nota Editorial:</strong> Este artigo reflete a visão cultural e opinativa do autor, tendo caráter exclusivamente informativo e filosófico. Não se trata de prestação de serviços comerciais.
          </div>
        )}
        {article.disclaimer_type === 'tecnica' && (
          <div style={{ marginTop: '40px', padding: '16px', backgroundColor: '#e8f0fe', borderLeft: '4px solid #1a73e8', borderRadius: '4px', fontSize: '14px', color: '#174ea6' }}>
            <strong>Cobertura Técnica:</strong> Este conteúdo foi redigido com base em fontes técnicas e educacionais verificadas.
          </div>
        )}

        {/* Fontes e Referências */}
        {article.sources && (
          <div style={{ marginTop: '40px', padding: '24px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--gn-text)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-icons-extended" style={{ fontSize: '18px' }}>menu_book</span>
              Fontes e Referências
            </h3>
            <div style={{ fontSize: '14px', color: 'var(--gn-text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {article.sources}
            </div>
          </div>
        )}

        {/* Mini-Bio do Autor */}
        <div style={{ marginTop: '40px', padding: '24px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          {authorData.img ? (
            <img src={authorData.img} alt={article.author_name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--gn-search-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gn-text-secondary)', fontSize: '20px', fontWeight: '500' }}>
              {authorData.initials}
            </div>
          )}
          <div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--gn-text)', marginBottom: '4px' }}>{article.author_name || article.author}</div>
            <div style={{ fontSize: '14px', color: 'var(--gn-text-secondary)' }}>{authorData.bio}</div>
          </div>
        </div>

        {/* Anúncio AdSense Fim do Artigo */}
        <div style={{ marginTop: '48px', borderTop: '1px solid var(--gn-border)', paddingTop: '24px' }}>
          <AdBanner dataAdSlot="SEU_SLOT_ARTIGO" />
        </div>

      </main>
    </>
  );
}
