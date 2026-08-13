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

  // Tops
  const { data: topArticles } = await supabase.from('articles').select('title, views').order('views', { ascending: false }).limit(1);
  const topArticle = topArticles?.[0];

  const { data: topCategories } = await supabase.from('categories').select('name, views').order('views', { ascending: false }).limit(1);
  const topCategory = topCategories?.[0];

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
      <p style={{ color: 'var(--gn-text-secondary)', marginBottom: '32px' }}>Bem-vindo à central de comando da Voz da I.A.</p>

      {/* Stats Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ padding: '24px', border: '1px solid #dadce0', borderRadius: '8px', background: '#f8f9fa' }}>
          <div style={{ fontSize: '14px', color: '#5f6368', fontWeight: '500', textTransform: 'uppercase' }}>Total de Visitas</div>
          <div style={{ fontSize: '32px', color: '#F4B400', fontWeight: '700' }}>{viewsCount || 0}</div>
        </div>
        <div style={{ padding: '24px', border: '1px solid #dadce0', borderRadius: '8px', background: '#f8f9fa' }}>
          <div style={{ fontSize: '14px', color: '#5f6368', fontWeight: '500', textTransform: 'uppercase' }}>Inscritos (Newsletter)</div>
          <div style={{ fontSize: '32px', color: '#8e24aa', fontWeight: '700' }}>{subsCount || 0}</div>
        </div>
        <div style={{ padding: '24px', border: '1px solid #dadce0', borderRadius: '8px', background: '#f8f9fa' }}>
          <div style={{ fontSize: '14px', color: '#5f6368', fontWeight: '500', textTransform: 'uppercase' }}>Notícias Publicadas</div>
          <div style={{ fontSize: '32px', color: '#1a73e8', fontWeight: '700' }}>{articlesCount || 0}</div>
        </div>
        <div style={{ padding: '24px', border: '1px solid #dadce0', borderRadius: '8px', background: '#f8f9fa' }}>
          <div style={{ fontSize: '14px', color: '#5f6368', fontWeight: '500', textTransform: 'uppercase' }}>Comentários Recebidos</div>
          <div style={{ fontSize: '32px', color: '#34A853', fontWeight: '700' }}>{commentsCount || 0}</div>
        </div>
      </div>

      {/* Highlights Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ padding: '24px', border: '1px solid #dadce0', borderRadius: '8px', background: '#fff', borderLeft: '4px solid #1a73e8' }}>
          <div style={{ fontSize: '14px', color: '#5f6368', fontWeight: '500', textTransform: 'uppercase', marginBottom: '8px' }}>Matéria Mais Visitada</div>
          <div style={{ fontSize: '20px', color: '#202124', fontWeight: '700', marginBottom: '4px' }}>{topArticle?.title || 'Nenhuma matéria'}</div>
          <div style={{ fontSize: '14px', color: '#5f6368' }}>{topArticle?.views || 0} visitas registradas</div>
        </div>
        <div style={{ padding: '24px', border: '1px solid #dadce0', borderRadius: '8px', background: '#fff', borderLeft: '4px solid #EA4335' }}>
          <div style={{ fontSize: '14px', color: '#5f6368', fontWeight: '500', textTransform: 'uppercase', marginBottom: '8px' }}>Bloco Mais Visitado</div>
          <div style={{ fontSize: '20px', color: '#202124', fontWeight: '700', marginBottom: '4px' }}>{topCategory?.name || 'Nenhum bloco'}</div>
          <div style={{ fontSize: '14px', color: '#5f6368' }}>{topCategory?.views || 0} visitas registradas</div>
        </div>
      </div>

      <PublishForm categories={categories} />
      <CategoryForm />
      <ArticleList articles={recentArticles} />

    </div>
  );
}
