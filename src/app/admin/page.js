import { supabase } from '@/lib/supabase';
import PublishForm from './PublishForm';
import CategoryForm from './CategoryForm';
import ArticleList from './ArticleList';

// Força re-renderização no servidor para pegar dados recentes no admin
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Busca contagens (stats)
  const { count: articlesCount } = await supabase.from('articles').select('*', { count: 'exact', head: true });
  const { count: commentsCount } = await supabase.from('comments').select('*', { count: 'exact', head: true });
  
  // Novas contagens
  const { count: viewsCount } = await supabase.from('page_views').select('*', { count: 'exact', head: true });
  const { count: subsCount } = await supabase.from('subscribers').select('*', { count: 'exact', head: true });

  // Top 5
  const { data: topArticles } = await supabase.from('articles').select('title, views').order('views', { ascending: false }).limit(5);
  const { data: topCategories } = await supabase.from('categories').select('name, views').order('views', { ascending: false }).limit(5);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const { count: dailyViewsCount } = await supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', startOfToday.toISOString());

  const { data: categoriesData } = await supabase.from('categories').select('*');
  const sortOrder = { 'IA Sem Mitos': 1, 'Kaelara Insights': 2 };

  let processedCategories = (categoriesData || []).map(cat => {
    if (cat.slug === 'religiao') {
      return { ...cat, color_code: '#8e24aa' };
    }
    return cat;
  });

  if (!processedCategories.some(cat => cat.slug === 'horoscopo')) {
    processedCategories.push({
      id: 'horoscopo-virtual-id',
      name: 'Horóscopo & Tarô',
      slug: 'horoscopo',
      color_code: '#e040fb',
      views: 0
    });
  }

  const categories = processedCategories.sort((a, b) => {
    const rankA = sortOrder[a.name] || 99;
    const rankB = sortOrder[b.name] || 99;
    if (rankA !== rankB) return rankA - rankB;
    return a.name.localeCompare(b.name, 'pt-BR');
  });
  const { data: recentArticles } = await supabase.from('articles').select('*, categories(name)').order('created_at', { ascending: false });

  return (
    <div className="main-content">
      <h1 style={{ fontSize: '28px', color: 'var(--gn-text)', marginBottom: '8px' }}>Dashboard do Jornal</h1>
      <p style={{ color: 'var(--gn-text-secondary)', marginBottom: '32px' }}>Métricas detalhadas e controle de publicações.</p>

      {/* Stats Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div style={{ padding: '16px', border: '1px solid #dadce0', borderRadius: '8px', background: '#e8eaed', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: '#5f6368', fontWeight: '600', textTransform: 'uppercase' }}>Visitas Hoje</div>
          <div style={{ fontSize: '28px', color: '#1a73e8', fontWeight: '700' }}>{dailyViewsCount || 0}</div>
        </div>
        <div style={{ padding: '16px', border: '1px solid #dadce0', borderRadius: '8px', background: '#f8f9fa', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: '#5f6368', fontWeight: '600', textTransform: 'uppercase' }}>Visitas Totais</div>
          <div style={{ fontSize: '28px', color: '#F4B400', fontWeight: '700' }}>{viewsCount || 0}</div>
        </div>
        <div style={{ padding: '16px', border: '1px solid #dadce0', borderRadius: '8px', background: '#f8f9fa', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: '#5f6368', fontWeight: '600', textTransform: 'uppercase' }}>Inscritos</div>
          <div style={{ fontSize: '28px', color: '#8e24aa', fontWeight: '700' }}>{subsCount || 0}</div>
        </div>
        <div style={{ padding: '16px', border: '1px solid #dadce0', borderRadius: '8px', background: '#f8f9fa', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: '#5f6368', fontWeight: '600', textTransform: 'uppercase' }}>Notícias</div>
          <div style={{ fontSize: '28px', color: '#34A853', fontWeight: '700' }}>{articlesCount || 0}</div>
        </div>
      </div>

      {/* Rankings Compactos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ padding: '16px', border: '1px solid #dadce0', borderRadius: '8px', background: '#fff' }}>
          <div style={{ fontSize: '14px', color: '#202124', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '2px solid #1a73e8', paddingBottom: '8px' }}>Top Manchetes Mais Lidas</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {topArticles?.map((art, idx) => (
              <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f3f4', fontSize: '13px' }}>
                <span style={{ color: '#3c4043', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '220px' }}>{idx + 1}. {art.title}</span>
                <span style={{ fontWeight: '600', color: '#1a73e8' }}>{art.views}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ padding: '16px', border: '1px solid #dadce0', borderRadius: '8px', background: '#fff' }}>
          <div style={{ fontSize: '14px', color: '#202124', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '2px solid #EA4335', paddingBottom: '8px' }}>Visitas por Bloco (Categoria)</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {topCategories?.map((cat, idx) => (
              <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f3f4', fontSize: '13px' }}>
                <span style={{ color: '#3c4043' }}>{idx + 1}. {cat.name}</span>
                <span style={{ fontWeight: '600', color: '#EA4335' }}>{cat.views}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <PublishForm categories={categories} />
      <CategoryForm />
      <ArticleList articles={recentArticles} />

    </div>
  );
}
