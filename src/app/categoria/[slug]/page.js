import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import '../../page.module.css';
import { notFound } from 'next/navigation';
import AdBanner from '@/components/AdBanner';
import PageTracker from '../../components/PageTracker';

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



  return (
    <main className="main-content">
      <PageTracker categoryId={category.id} />
      
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
        {error ? (
          <p>Erro ao carregar notícias: {error.message}</p>
        ) : articles && articles.length > 0 ? (
          articles.map((article) => (
            <article key={article.id} className="article-card">
              {article.image_url ? (
                <img src={article.image_url} alt={article.title} className="article-card-img" />
              ) : (
                <div className="article-card-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gn-text-secondary)' }}>
                  <span className="material-icons-extended" style={{fontSize: '32px'}}>image</span>
                </div>
              )}
              
              <div className="article-card-content">
                {article.categories && (
                  <div className="article-card-category" style={{color: article.categories.color_code || 'var(--gn-blue)'}}>
                    {article.categories.name}
                  </div>
                )}
                
                <h3 className="article-card-title google-sans">
                  <Link href={`/artigo/${article.slug}`}>{article.title}</Link>
                </h3>
                
                <p className="article-card-summary">
                  {article.summary?.length > 120 ? article.summary.substring(0, 120) + '...' : article.summary}
                </p>
                
                <div className="article-card-footer">
                  <span>Voz da I.A</span>
                  <span>{new Date(article.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </article>
          ))
        ) : (
           <div style={{ textAlign: 'center', padding: '60px', color: 'var(--gn-text-secondary)', gridColumn: '1 / -1' }}>
              <span className="material-icons-extended" style={{ fontSize: '48px', color: 'var(--gn-border)', marginBottom: '16px' }}>article</span>
              <h2>Nenhum artigo publicado ainda nesta categoria.</h2>
          </div>
        )}
      </div>

      {/* AdSense Slot */}
      <div style={{ marginTop: '40px' }}>
        <AdBanner dataAdSlot="SEU_SLOT_CATEGORY" />
      </div>
    </main>
  );
}
