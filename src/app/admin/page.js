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
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header do Painel */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text)', marginBottom: '4px', letterSpacing: '-0.3px' }}>
            Dashboard Editorial & Métricas
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
            Controle operacional, publicação de notícias (limite de 750 palavras) e monitoramento de audiência.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="#editor" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            <span>✍️</span> Escrever Nova Notícia
          </a>
        </div>
      </div>

      {/* Grid de Estatísticas Principais */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '28px' }}>
        {/* Card 1: Visitas Hoje */}
        <div style={{ padding: '20px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(59, 130, 246, 0.02))', border: '1px solid rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
            <span className="material-icons-extended" style={{ fontSize: '24px' }}>visibility</span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Visitas Hoje</div>
            <div style={{ fontSize: '26px', color: 'var(--text)', fontWeight: '800' }}>{dailyViewsCount || 0}</div>
          </div>
        </div>

        {/* Card 2: Visitas Totais */}
        <div style={{ padding: '20px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(245, 158, 11, 0.02))', border: '1px solid rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
            <span className="material-icons-extended" style={{ fontSize: '24px' }}>analytics</span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Leituras Totais</div>
            <div style={{ fontSize: '26px', color: 'var(--text)', fontWeight: '800' }}>{viewsCount || 0}</div>
          </div>
        </div>

        {/* Card 3: Inscritos na Newsletter */}
        <div style={{ padding: '20px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(168, 85, 247, 0.02))', border: '1px solid rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea' }}>
            <span className="material-icons-extended" style={{ fontSize: '24px' }}>mail_outline</span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Inscritos Newsletter</div>
            <div style={{ fontSize: '26px', color: 'var(--text)', fontWeight: '800' }}>{subsCount || 0}</div>
          </div>
        </div>

        {/* Card 4: Notícias Publicadas */}
        <div style={{ padding: '20px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.02))', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
            <span className="material-icons-extended" style={{ fontSize: '24px' }}>newspaper</span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Notícias Publicadas</div>
            <div style={{ fontSize: '26px', color: 'var(--text)', fontWeight: '800' }}>{articlesCount || 0}</div>
          </div>
        </div>
      </div>

      {/* PAINEL DE CONFORMIDADE GOOGLE ADSENSE */}
      <div id="adsense" style={{ padding: '24px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.06), rgba(30, 64, 175, 0.02))', border: '1px solid rgba(37, 99, 235, 0.25)', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <span className="material-icons-extended" style={{ color: '#2563eb', fontSize: '24px' }}>verified</span>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', margin: 0 }}>
            Status de Conformidade com o Google AdSense
          </h3>
          <span style={{ fontSize: '11px', background: '#10b981', color: '#fff', padding: '3px 8px', borderRadius: '12px', fontWeight: '700' }}>
            APROVADO / CONFORME
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', fontSize: '13px', color: 'var(--text)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#10b981' }}>✓</span> Conta AdSense: <strong>ca-pub-5759690232636098</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#10b981' }}>✓</span> Política de Privacidade & Termos Ativos
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#10b981' }}>✓</span> Quem Somos, Autoria e Contato no Rodapé
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#10b981' }}>✓</span> Sitemap Dinâmico ISO 8601 & robots.txt
          </div>
        </div>
      </div>

      {/* Rankings Compactos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        <div style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '14px', background: 'var(--card)', boxShadow: 'var(--shadow)' }}>
          <div style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', borderBottom: '2px solid #2563eb', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-icons-extended" style={{ fontSize: '18px', color: '#2563eb' }}>trending_up</span>
            Top Matérias Mais Lidas
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {topArticles?.map((art, idx) => (
              <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: '13px' }}>
                <span style={{ color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '240px', fontWeight: '500' }}>
                  {idx + 1}. {art.title}
                </span>
                <span style={{ fontWeight: '700', color: '#2563eb', background: 'rgba(37, 99, 235, 0.1)', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>
                  {art.views || 0} views
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '14px', background: 'var(--card)', boxShadow: 'var(--shadow)' }}>
          <div style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', borderBottom: '2px solid #ea580c', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-icons-extended" style={{ fontSize: '18px', color: '#ea580c' }}>pie_chart</span>
            Visitas por Editoria (Bloco)
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {topCategories?.map((cat, idx) => (
              <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: '13px' }}>
                <span style={{ color: 'var(--text)', fontWeight: '500' }}>{cat.name}</span>
                <span style={{ fontWeight: '700', color: '#ea580c', background: 'rgba(234, 88, 12, 0.1)', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>
                  {cat.views || 0} views
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div id="editor" style={{ marginBottom: '32px' }}>
        <PublishForm categories={categories} />
      </div>

      <div id="blocos" style={{ marginBottom: '32px' }}>
        <CategoryForm />
      </div>

      <div id="artigos" style={{ marginBottom: '32px' }}>
        <ArticleList articles={recentArticles} />
      </div>

    </div>
  );
}
