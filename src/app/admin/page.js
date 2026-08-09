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

  const { data: categories } = await supabase.from('categories').select('*');
  const { data: recentArticles } = await supabase.from('articles').select('*, categories(name)').order('created_at', { ascending: false });

  return (
    <div>
      <h1 style={{ fontSize: '28px', color: '#202124', marginBottom: '8px' }}>Dashboard do Jornal</h1>
      <p style={{ color: '#5f6368', marginBottom: '32px' }}>Bem-vindo à central de comando da Voz da I.A.</p>

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

      <PublishForm categories={categories} />
      <CategoryForm />
      <ArticleList articles={recentArticles} />

    </div>
  );
}
