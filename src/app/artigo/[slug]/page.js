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
      <main className="main-content article-page-main" style={{ maxWidth: '680px', margin: '0 auto' }}>
        
        {/* Navegação e Categoria */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--gn-text-secondary)' }}>
          <Link href="/" style={{ color: 'var(--gn-blue)', display: 'flex', alignItems: 'center' }}>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', borderTop: '1px solid var(--gn-border)', borderBottom: '1px solid var(--gn-border)', marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gn-search-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gn-text-secondary)' }}>
            <span className="material-icons-extended">person</span>
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--gn-text)' }}>Por {article.author}</div>
            <div style={{ fontSize: '13px', color: 'var(--gn-text-secondary)' }}>
              Publicado em {new Date(article.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
            {/* Ícones de compartilhamento (Falsos visuais) */}
            <span className="material-icons-extended" style={{color: 'var(--gn-text-secondary)', cursor: 'pointer'}}>share</span>
            <span className="material-icons-extended" style={{color: 'var(--gn-text-secondary)', cursor: 'pointer'}}>bookmark_border</span>
          </div>
        </div>

        {/* Imagem de Capa */}
        {article.image_url && (
          <img 
            src={article.image_url} 
            alt={article.title} 
            style={{ width: '100%', borderRadius: '12px', marginBottom: '40px' }} 
          />
        )}

      {/* Conteúdo Rico (HTML) */}
      <article 
        className="article-body" 
        style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--gn-text)' }}
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />

      {/* Anúncio AdSense Fim do Artigo */}
      <div style={{ marginTop: '48px', borderTop: '1px solid var(--gn-border)', paddingTop: '24px' }}>
        <AdBanner dataAdSlot="SEU_SLOT_ARTIGO" />
      </div>

    </main>
    </>
  );
}
