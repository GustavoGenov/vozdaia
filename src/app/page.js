import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import './page.module.css';

export const revalidate = 60;

export default async function Home() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select(`*, categories(name, color_code)`)
    .eq('published', true)
    .order('created_at', { ascending: false });

  // Separate the first article as Hero, and the rest as side articles (up to 5 for the layout)
  const heroArticle = articles && articles.length > 0 ? articles[0] : null;
  const sideArticles = articles && articles.length > 1 ? articles.slice(1, 6) : [];

  return (
    <main className="main-content">
      
      <h1 className="page-title google-sans">Manchetes</h1>

      {error ? (
        <p>Erro ao carregar notícias: {error.message}</p>
      ) : heroArticle ? (
        <div className="news-grid">
          
          {/* HERO ARTICLE (Left Column) */}
          <article className="hero-article">
            {heroArticle.image_url ? (
              <img src={heroArticle.image_url} alt={heroArticle.title} className="hero-img" />
            ) : (
              <div className="hero-img" style={{ background: 'var(--gn-search-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gn-text-secondary)' }}>
                <span className="material-icons-extended" style={{fontSize: '48px'}}>image</span>
              </div>
            )}
            
            <div style={{ marginTop: '8px' }}>
              <div className="hero-source">
                {heroArticle.categories && (
                  <span className="category-tag">{heroArticle.categories.name}</span>
                )}
                <span>Voz da I.A</span>
              </div>
              <h2 className="hero-title google-sans">
                <Link href={`/artigo/${heroArticle.slug}`}>{heroArticle.title}</Link>
              </h2>
              <p style={{ color: 'var(--gn-text-secondary)', marginBottom: '8px', fontSize: '14px' }}>
                {heroArticle.summary}
              </p>
              <div className="hero-time">
                {new Date(heroArticle.created_at).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </article>

          {/* SIDE ARTICLES (Right Column) */}
          <div className="side-articles">
            {sideArticles.map((article) => (
              <article key={article.id} className="side-article">
                <div className="side-content">
                  <div className="hero-source">
                    {article.categories && (
                      <span style={{color: 'var(--gn-text-secondary)'}}>{article.categories.name}</span>
                    )}
                  </div>
                  <h3 className="side-title google-sans">
                    <Link href={`/artigo/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <div className="hero-time">
                    {new Date(article.created_at).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                {article.image_url && (
                  <img src={article.image_url} alt={article.title} className="side-img" />
                )}
              </article>
            ))}
          </div>

        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--gn-text-secondary)' }}>
          <span className="material-icons-extended" style={{ fontSize: '48px', color: 'var(--gn-border)', marginBottom: '16px' }}>article</span>
          <h2>Nenhum artigo publicado ainda.</h2>
          <p>Kaelara está escrevendo as primeiras pautas no banco de dados.</p>
        </div>
      )}

    </main>
  );
}
