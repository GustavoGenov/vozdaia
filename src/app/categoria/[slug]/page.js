import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import '../../page.module.css';
import { notFound } from 'next/navigation';

export const revalidate = 60;

// Metadados dinâmicos para a página da categoria
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const { data: category } = await supabase
    .from('categories')
    .select('name')
    .eq('slug', slug)
    .single();

  if (!category) return { title: 'Categoria não encontrada | Voz da I.A' };

  return {
    title: `${category.name} | Voz da I.A`,
    description: `Últimas notícias sobre ${category.name} no portal Voz da I.A.`
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  // Busca a categoria
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!category) notFound();

  // Busca os artigos desta categoria específica
  const { data: articles, error } = await supabase
    .from('articles')
    .select(`*, categories(name, color_code)`)
    .eq('published', true)
    .eq('category_id', category.id)
    .order('created_at', { ascending: false });

  const heroArticle = articles && articles.length > 0 ? articles[0] : null;
  const sideArticles = articles && articles.length > 1 ? articles.slice(1) : [];

  return (
    <main className="main-content">
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <h1 className="page-title google-sans" style={{ marginBottom: 0 }}>
          {category.name}
        </h1>
        <span style={{ 
          background: category.color_code || 'var(--gn-blue)', 
          width: '12px', height: '12px', borderRadius: '50%', display: 'inline-block' 
        }}></span>
      </div>

      <div className="news-grid">
        
        {/* COLUNA ESQUERDA (Hero) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {error ? (
            <p>Erro ao carregar notícias: {error.message}</p>
          ) : heroArticle ? (
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
                    <span className="category-tag" style={{background: 'var(--gn-search-bg)', color: heroArticle.categories.color_code || 'var(--gn-blue)'}}>
                      {heroArticle.categories.name}
                    </span>
                  )}
                  <span>Voz da I.A</span>
                </div>
                <h2 className="hero-title google-sans" style={{ fontSize: '28px' }}>
                  <Link href={`/artigo/${heroArticle.slug}`}>{heroArticle.title}</Link>
                </h2>
                <p style={{ color: 'var(--gn-text-secondary)', marginBottom: '8px', fontSize: '15px' }}>
                  {heroArticle.summary}
                </p>
                <div className="hero-time">
                  {new Date(heroArticle.created_at).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </article>
          ) : (
             <div style={{ textAlign: 'center', padding: '60px', color: 'var(--gn-text-secondary)' }}>
                <span className="material-icons-extended" style={{ fontSize: '48px', color: 'var(--gn-border)', marginBottom: '16px' }}>article</span>
                <h2>Nenhum artigo publicado nesta categoria ainda.</h2>
            </div>
          )}
        </div>

        {/* COLUNA DIREITA (Secundárias + Banners do Ecossistema) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Outras Notícias */}
          {sideArticles.length > 0 && (
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
          )}

          {/* Banners do Ecossistema */}
          <div style={{ borderTop: sideArticles.length > 0 ? '1px solid var(--gn-border)' : 'none', paddingTop: sideArticles.length > 0 ? '24px' : '0' }}>
            <h3 className="google-sans" style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--gn-text-secondary)' }}>
              Acesso Rápido aos Nossos Projetos
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Banner IA */}
              <a href="https://kaelara-online.vercel.app/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '8px', padding: '12px', transition: 'box-shadow 0.2s' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'linear-gradient(135deg, #7C4DFF, #d12a7a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <span className="material-icons-extended">smart_toy</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--gn-text)' }}>Kaelara Online</div>
                  <div style={{ fontSize: '12px', color: 'var(--gn-text-secondary)' }}>Fale com nossa Inteligência Artificial</div>
                </div>
              </a>

              {/* Banner Economia */}
              <a href="https://sevenprofissional-e020.onrender.com/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '8px', padding: '12px', transition: 'box-shadow 0.2s' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#00C853', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <span className="material-icons-extended">storefront</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--gn-text)' }}>Seven Profissional</div>
                  <div style={{ fontSize: '12px', color: 'var(--gn-text-secondary)' }}>Nossa loja e plataforma de economia</div>
                </div>
              </a>

              {/* Banner Jurídico */}
              <a href="https://buscador-processos.vercel.app/?mode=jurisprudencia" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '8px', padding: '12px', transition: 'box-shadow 0.2s' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#FF6D00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <span className="material-icons-extended">gavel</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--gn-text)' }}>Buscador Jurídico</div>
                  <div style={{ fontSize: '12px', color: 'var(--gn-text-secondary)' }}>Consultas de processos e jurisprudência</div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
