import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import '../../page.module.css';
import { notFound } from 'next/navigation';
import AdBanner from '@/components/AdBanner';
import PageTracker from '../../components/PageTracker';
import HoroscopoWidget from '../../components/HoroscopoWidget';
import GamesBlock from '../../components/GamesBlock';

export const revalidate = 60;

// Metadados dinâmicos para a página da categoria
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  let categoryName = '';
  if (slug === 'horoscopo') {
    categoryName = 'Horóscopo & Tarô';
  } else {
    const { data: category } = await supabase
      .from('categories')
      .select('name')
      .eq('slug', slug)
      .single();
    if (!category) return { title: 'Categoria não encontrada | Voz da I.A' };
    categoryName = category.name;
  }

  return {
    title: `${categoryName} | Voz da I.A`,
    description: `Últimas notícias sobre ${categoryName} no portal Voz da I.A.`
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  // Busca a categoria
  let category = null;
  if (slug === 'horoscopo') {
    category = {
      id: 'horoscopo-virtual-id',
      name: 'Horóscopo & Tarô',
      slug: 'horoscopo',
      color_code: '#e040fb',
      views: 0
    };
  } else {
    const { data: catData } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();
    category = catData;
  }

  if (!category) notFound();

  if (category.slug === 'religiao') {
    category.color_code = '#8e24aa';
  }

  // Busca os artigos desta categoria específica
  const { data: articles, error } = await supabase
    .from('articles')
    .select(`*, categories(name, color_code)`)
    .eq('published', true)
    .eq('category_id', category.id)
    .order('created_at', { ascending: false });



  return (
    <main className="container">
      <PageTracker categoryId={category.id} />
      
      <div className="section-title" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        <h2>
          <span style={{ background: category.color_code || 'var(--accent)' }}></span>
          {category.name}
        </h2>
      </div>

      {category.slug === 'horoscopo-e-taro' && (
        <div style={{ marginBottom: '40px' }}>
          <HoroscopoWidget />
        </div>
      )}

      {category.slug === 'tech-e-gaming' && (
        <div style={{ marginBottom: '40px' }}>
          <GamesBlock />
        </div>
      )}

      <div className="articles-grid">
        {error ? (
          <p>Erro ao carregar notícias: {error.message}</p>
        ) : articles && articles.length > 0 ? (
          articles.map((article) => (
            <Link key={article.id} href={`/artigo/${article.slug}`} className="card">
              <div className="card-img-wrap">
                {article.image_url ? (
                  <img src={article.image_url} alt={article.title} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--border)' }}>
                    <span className="material-icons-extended" style={{ fontSize: '32px', color: 'var(--text-muted)' }}>image</span>
                  </div>
                )}
              </div>

              <div className="card-body">
                <span className="category" style={{ color: category.color_code || 'var(--accent)' }}>
                  {category.name}
                </span>
                <h3>{article.title}</h3>
                <p>
                  {article.summary?.length > 120 ? article.summary.substring(0, 120) + '...' : article.summary}
                </p>
                <div className="meta">
                  <span>{article.author_name || 'Voz da I.A'}</span>
                  <span>•</span>
                  <span>{new Date(article.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
           <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
              <span className="material-icons-extended" style={{ fontSize: '48px', color: 'var(--border)', marginBottom: '16px' }}>article</span>
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
