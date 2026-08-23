import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import PageTracker from './components/PageTracker';

export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select(`*, categories(name, color_code)`)
    .eq('published', true)
    .order('created_at', { ascending: false });



  return (
    <main className="main-content">
      <PageTracker />
      
      <h1 className="page-title google-sans">Manchetes</h1>

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
                  <div className="article-card-category" style={{color: article.categories.slug === 'religiao' ? '#8e24aa' : (article.categories.color_code || 'var(--gn-blue)')}}>
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
              <h2>Nenhum artigo publicado ainda.</h2>
          </div>
        )}
      </div>

      {/* AdSense Slot */}
      <div style={{ marginTop: '40px' }}>
        <AdBanner dataAdSlot="SEU_SLOT_HOME" />
      </div>

      {/* Banners do Ecossistema */}
      <div style={{ borderTop: '1px solid var(--gn-border)', paddingTop: '24px', marginTop: '40px' }}>
        <h3 className="google-sans" style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--gn-text-secondary)' }}>
          Acesso Rápido aos Nossos Projetos
        </h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {/* Banner IA */}
          <a href="https://kaelara-online.vercel.app/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '8px', padding: '12px', transition: 'box-shadow 0.2s', flex: '1 1 300px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'linear-gradient(135deg, #7C4DFF, #d12a7a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <span className="material-icons-extended">smart_toy</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--gn-text)' }}>Kaelara Online</div>
              <div style={{ fontSize: '12px', color: 'var(--gn-text-secondary)' }}>Fale com nossa Inteligência Artificial</div>
            </div>
          </a>

          {/* Banner Economia */}
          <a href="https://sevenprofissional-e020.onrender.com/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '8px', padding: '12px', transition: 'box-shadow 0.2s', flex: '1 1 300px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#00C853', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <span className="material-icons-extended">storefront</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--gn-text)' }}>Seven Profissional</div>
              <div style={{ fontSize: '12px', color: 'var(--gn-text-secondary)' }}>Nossa loja e plataforma de economia</div>
            </div>
          </a>

          {/* Banner Jurídico */}
          <a href="https://buscador-processos.vercel.app/?mode=jurisprudencia" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '8px', padding: '12px', transition: 'box-shadow 0.2s', flex: '1 1 300px' }}>
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
    </main>
  );
}
