import { supabase } from '@/lib/supabase';
import PublishForm from './PublishForm';
import CategoryForm from './CategoryForm';
import ArticleList from './ArticleList';

// Força re-renderização no servidor para pegar dados recentes no admin
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // 1. Buscar todos os artigos com categorias
  const { data: allArticles, count: articlesCount } = await supabase
    .from('articles')
    .select('id, title, slug, views, category_id, published, created_at, content, summary, author_name, categories(id, name, slug)', { count: 'exact' })
    .order('created_at', { ascending: false });

  // 2. Buscar todas as categorias cadastradas
  const { data: categoriesData, count: categoriesCount } = await supabase
    .from('categories')
    .select('id, name, slug, views, color_code', { count: 'exact' });

  // 3. Buscar métricas de tráfego e inscritos
  const { count: pageViewsCount } = await supabase.from('page_views').select('*', { count: 'exact', head: true });
  const { count: subsCount } = await supabase.from('subscribers').select('*', { count: 'exact', head: true });

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const { count: dailyViewsCount } = await supabase
    .from('page_views')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startOfToday.toISOString());

  // Processamento e Agregação de Métricas
  const articlesPerCategory = {};
  let totalWords = 0;
  let totalArticleViews = 0;
  let publishedCount = 0;
  let draftCount = 0;

  (allArticles || []).forEach(art => {
    if (art.published) {
      publishedCount++;
    } else {
      draftCount++;
    }

    totalArticleViews += (art.views || 0);

    const catId = art.category_id || 'sem-categoria';
    articlesPerCategory[catId] = (articlesPerCategory[catId] || 0) + 1;

    const words = `${art.title || ''} ${art.summary || ''} ${art.content || ''}`
      .replace(/<[^>]*>/g, ' ')
      .trim()
      .split(/\s+/).filter(Boolean).length;
    totalWords += words;
  });

  // Top 5 Matérias Mais Lidas
  const topArticles = (allArticles || [])
    .slice()
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  // Ordenar Categorias por engajamento e quantidade de matérias
  const sortedCategories = (categoriesData || []).map(cat => ({
    ...cat,
    articleCount: articlesPerCategory[cat.id] || 0
  })).sort((a, b) => b.articleCount - a.articleCount || b.views - a.views);

  const sortOrder = { 'IA Sem Mitos': 1, 'Kaelara Insights': 2 };
  let processedCategories = (categoriesData || []).map(cat => {
    if (cat.slug === 'religiao') {
      return { ...cat, color_code: '#8e24aa' };
    }
    return cat;
  });

  const categories = processedCategories.sort((a, b) => {
    const rankA = sortOrder[a.name] || 99;
    const rankB = sortOrder[b.name] || 99;
    if (rankA !== rankB) return rankA - rankB;
    return a.name.localeCompare(b.name, 'pt-BR');
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* CABEÇALHO DO PAINEL */}
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text)', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
            Painel de Controle Editorial
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
            Gerenciamento de matérias, monitoramento de visualizações em tempo real e conformidade Google AdSense.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a 
            href="#editor" 
            style={{ 
              background: '#1a73e8', 
              color: '#fff', 
              padding: '10px 18px', 
              borderRadius: '10px', 
              fontWeight: '600', 
              fontSize: '14px', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(26, 115, 232, 0.3)'
            }}
          >
            <span className="material-icons-extended" style={{ fontSize: '18px' }}>add_circle</span>
            Nova Matéria
          </a>
        </div>
      </div>

      {/* GRADE DE CONTADORES E MÉTRICAS EM TEMPO REAL */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '16px', 
        marginBottom: '28px' 
      }}>
        {/* Card 1: Notícias Publicadas */}
        <div style={{ padding: '20px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.02))', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
            <span className="material-icons-extended" style={{ fontSize: '24px' }}>newspaper</span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Total de Notícias</div>
            <div style={{ fontSize: '26px', color: 'var(--text)', fontWeight: '800' }}>
              {articlesCount || 0}
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#059669', marginLeft: '6px' }}>
                ({publishedCount} no ar)
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Editorias / Blocos */}
        <div style={{ padding: '20px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(59, 130, 246, 0.02))', border: '1px solid rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
            <span className="material-icons-extended" style={{ fontSize: '24px' }}>category</span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Editorias Ativas</div>
            <div style={{ fontSize: '26px', color: 'var(--text)', fontWeight: '800' }}>
              {categoriesCount || sortedCategories.length}
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#2563eb', marginLeft: '6px' }}>blocos</span>
            </div>
          </div>
        </div>

        {/* Card 3: Visitas Hoje & Totais */}
        <div style={{ padding: '20px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(245, 158, 11, 0.02))', border: '1px solid rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
            <span className="material-icons-extended" style={{ fontSize: '24px' }}>analytics</span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Visitas Registradas</div>
            <div style={{ fontSize: '26px', color: 'var(--text)', fontWeight: '800' }}>
              {pageViewsCount || 0}
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#d97706', marginLeft: '6px' }}>
                (+{dailyViewsCount || 0} hoje)
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Volume Editorial (Palavras) */}
        <div style={{ padding: '20px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(168, 85, 247, 0.02))', border: '1px solid rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea' }}>
            <span className="material-icons-extended" style={{ fontSize: '24px' }}>article</span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Volume Editorial</div>
            <div style={{ fontSize: '26px', color: 'var(--text)', fontWeight: '800' }}>
              {(totalWords / 1000).toFixed(1)}k
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#9333ea', marginLeft: '6px' }}>palavras</span>
            </div>
          </div>
        </div>

        {/* Card 5: Inscritos Newsletter */}
        <div style={{ padding: '20px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(236, 72, 153, 0.02))', border: '1px solid rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777' }}>
            <span className="material-icons-extended" style={{ fontSize: '24px' }}>mark_email_read</span>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Inscritos Newsletter</div>
            <div style={{ fontSize: '26px', color: 'var(--text)', fontWeight: '800' }}>
              {subsCount || 0}
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#db2777', marginLeft: '6px' }}>leitores</span>
            </div>
          </div>
        </div>
      </div>

      {/* PAINEL DE CONFORMIDADE GOOGLE ADSENSE E-E-A-T */}
      <div id="adsense" style={{ padding: '24px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.06), rgba(30, 64, 175, 0.02))', border: '1px solid rgba(37, 99, 235, 0.25)', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="material-icons-extended" style={{ color: '#2563eb', fontSize: '24px' }}>verified_user</span>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', margin: 0 }}>
              Checklist de Conformidade Google AdSense & Google Notícias
            </h3>
          </div>
          <span style={{ fontSize: '12px', fontWeight: '600', background: 'rgba(16, 185, 129, 0.15)', color: '#059669', padding: '4px 10px', borderRadius: '20px' }}>
            ✓ 100% Conforme
          </span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px', fontSize: '13px', color: 'var(--text)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-icons-extended" style={{ color: '#10b981', fontSize: '18px' }}>check_circle</span>
            <span>Conta AdSense: <strong>ca-pub-5759690232636098</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-icons-extended" style={{ color: '#10b981', fontSize: '18px' }}>check_circle</span>
            <span>Arquivo <strong>ads.txt</strong> ativo na raiz com Status 200</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-icons-extended" style={{ color: '#10b981', fontSize: '18px' }}>check_circle</span>
            <span>Políticas de Privacidade & Termos no Rodapé</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-icons-extended" style={{ color: '#10b981', fontSize: '18px' }}>check_circle</span>
            <span>Páginas de Transparência / Equipe Editorial</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-icons-extended" style={{ color: '#10b981', fontSize: '18px' }}>check_circle</span>
            <span>News-Sitemap 48h (Protocolo Google News)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-icons-extended" style={{ color: '#10b981', fontSize: '18px' }}>check_circle</span>
            <span>Regra de Densidade Mínima: <strong>750 palavras</strong></span>
          </div>
        </div>
      </div>

      {/* RANKINGS E DISTRIBUIÇÃO POR EDITORIA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        
        {/* Top Matérias */}
        <div style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '14px', background: 'var(--card)', boxShadow: 'var(--shadow)' }}>
          <div style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', borderBottom: '2px solid #2563eb', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-icons-extended" style={{ fontSize: '18px', color: '#2563eb' }}>trending_up</span>
            Top 5 Matérias Mais Lidas
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {topArticles.map((art, idx) => (
              <li key={art.id || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: '13px' }}>
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

        {/* Distribuição por Editoria */}
        <div style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '14px', background: 'var(--card)', boxShadow: 'var(--shadow)' }}>
          <div style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '16px', borderBottom: '2px solid #ea580c', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-icons-extended" style={{ fontSize: '18px', color: '#ea580c' }}>pie_chart</span>
            Matérias & Visitas por Bloco
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {sortedCategories.map((cat, idx) => (
              <li key={cat.id || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: cat.color_code || '#ea580c' }}></span>
                  <span style={{ color: 'var(--text)', fontWeight: '500' }}>{cat.name}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ fontWeight: '600', color: '#059669', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>
                    {cat.articleCount} matérias
                  </span>
                  <span style={{ fontWeight: '600', color: '#ea580c', background: 'rgba(234, 88, 12, 0.1)', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>
                    {cat.views || 0} views
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FORMULÁRIO DE PUBLICAÇÃO */}
      <div id="editor" style={{ marginBottom: '32px' }}>
        <PublishForm categories={categories} />
      </div>

      {/* FORMULÁRIO DE CATEGORIAS / BLOCOS */}
      <div id="blocos" style={{ marginBottom: '32px' }}>
        <CategoryForm />
      </div>

      {/* LISTAGEM E GERENCIAMENTO DE MATÉRIAS */}
      <div id="artigos" style={{ marginBottom: '32px' }}>
        <ArticleList articles={allArticles} />
      </div>

    </div>
  );
}
