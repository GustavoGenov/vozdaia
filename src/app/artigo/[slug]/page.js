import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import PageTracker from '../../components/PageTracker';


// Gera Metadados Open Graph Dinâmicos para o SEO (WhatsApp, LinkedIn, etc)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const { data: article } = await supabase
    .from('articles')
    .select('title, summary, image_url')
    .eq('slug', slug)
    .single();

  if (!article) return { title: 'Voz da I.A - Notícia não encontrada' };

  return {
    title: `${article.title} | Voz da I.A`,
    description: article.summary,
    openGraph: {
      title: `${article.title} | Voz da I.A`,
      description: article.summary,
      images: article.image_url ? [article.image_url] : [],
      type: 'article',
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  
  // Busca o artigo completo no Supabase
  const { data: article } = await supabase
    .from('articles')
    .select('*, categories(name, color_code)')
    .eq('slug', slug)
    .single();

  if (!article) notFound();

  return (
    <>
      <PageTracker articleId={article.id} categoryId={article.category_id} />
      <main className="main-content article-page-main">
        
        {/* Navegação e Categoria */}
        <div className="article-breadcrumb">
          <Link href="/" className="article-breadcrumb-link">
            <span className="material-icons-extended" style={{fontSize: '16px'}}>arrow_back</span> Início
          </Link>
          <span>/</span>
          {article.categories && (
            <span style={{ fontWeight: '600', color: article.categories.color_code || 'var(--gn-blue)' }}>
              {article.categories.name}
            </span>
          )}
        </div>

        {/* Título e Resumo */}
        <h1 className="google-sans article-page-title">
          {article.title}
        </h1>
        <p className="article-page-summary">
          {article.summary}
        </p>

        {/* Metadados da Matéria */}
        <div className="article-meta-bar">
          <div className="article-meta-avatar">
            <span className="material-icons-extended">person</span>
          </div>
          <div>
            <div className="article-meta-author">Por {article.author}</div>
            <div className="article-meta-date">
              Publicado em {new Date(article.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
          <div className="article-meta-actions">
            <span className="material-icons-extended">share</span>
            <span className="material-icons-extended">bookmark_border</span>
          </div>
        </div>

        {/* Imagem de Capa */}
        {article.image_url && (
          <img 
            src={article.image_url} 
            alt={article.title} 
            className="article-cover-img"
          />
        )}

        {/* Conteúdo Rico (HTML) */}
        <article 
          className="article-body" 
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />

        {/* Anúncio AdSense Fim do Artigo */}
        <div className="article-ad-section">
          <AdBanner dataAdSlot="SEU_SLOT_ARTIGO" />
        </div>

      </main>
    </>
  );
}
