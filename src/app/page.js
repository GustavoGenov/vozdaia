import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import PageTracker from './components/PageTracker';
import SubscribeForm from './components/SubscribeForm';

export const revalidate = 3600;

function getCategoryClass(slug) {
  if (!slug) return 'cat-tech';
  if (slug.includes('ia') || slug.includes('agente')) return 'cat-ia';
  if (slug.includes('ciencia') || slug.includes('espaco')) return 'cat-ciencia';
  if (slug.includes('cultura') || slug.includes('filosofia')) return 'cat-cultura';
  if (slug.includes('formiga') || slug.includes('local')) return 'cat-formiga';
  if (slug.includes('hardware') || slug.includes('engenharia')) return 'cat-hardware';
  return 'cat-tech';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

export default async function Home() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select(`*, categories(name, slug, color_code)`)
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error || !articles || articles.length === 0) {
    return (
      <main className="container">
        <PageTracker />
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
          <span className="material-icons-extended" style={{ fontSize: '48px', color: 'var(--border)', marginBottom: '16px' }}>article</span>
          <h2>Nenhum artigo publicado ainda.</h2>
        </div>
      </main>
    );
  }

  // Artigo Principal e Secundários do Hero
  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  // Seção Formiga em Foco
  const formigaMatches = articles.filter(a => 
    a.title?.toLowerCase().includes('formiga') || 
    a.summary?.toLowerCase().includes('formiga') ||
    a.categories?.slug?.includes('formiga') ||
    a.author_name?.includes('Rui')
  );

  const usedHeroIds = new Set([featuredArticle?.id, ...sideArticles.map(s => s.id)]);
  const availableForFormiga = articles.filter(a => !usedHeroIds.has(a.id));
  
  // Combina artigos de Formiga com outros disponíveis para sempre garantir 3 cards
  const formigaCards = [
    ...formigaMatches.filter(a => !usedHeroIds.has(a.id)),
    ...availableForFormiga.filter(a => !formigaMatches.some(m => m.id === a.id))
  ].slice(0, 3);

  // Demais artigos para a seção de Últimas Publicações
  const usedIds = new Set([...usedHeroIds, ...formigaCards.map(f => f.id)]);
  let latestArticles = articles.filter(a => !usedIds.has(a.id));
  if (latestArticles.length === 0) {
    latestArticles = articles.slice(3, 9);
  }

  return (
    <main className="container">
      <PageTracker />

      {/* HERO - DESTAQUE PRINCIPAL (1 Principal + 2 Laterais) */}
      <section className="hero">
        {/* Artigo Principal */}
        {featuredArticle && (
          <article className="hero-main">
            <Link href={`/artigo/${featuredArticle.slug}`} className="hero-main-img-wrap">
              {featuredArticle.image_url ? (
                <img src={featuredArticle.image_url} alt={featuredArticle.title} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--border)' }}>
                  <span className="material-icons-extended" style={{ fontSize: '48px', color: 'var(--text-muted)' }}>image</span>
                </div>
              )}
            </Link>

            <div className="hero-main-content">
              <span className={`category ${getCategoryClass(featuredArticle.categories?.slug)}`}>
                {featuredArticle.categories?.name || 'Destaque'}
              </span>
              
              <h1>
                <Link href={`/artigo/${featuredArticle.slug}`}>
                  {featuredArticle.title}
                </Link>
              </h1>
              
              <p>
                {featuredArticle.summary?.length > 160 
                  ? featuredArticle.summary.substring(0, 160) + '...' 
                  : featuredArticle.summary}
              </p>

              <div className="meta">
                <span style={{ fontWeight: '600', color: 'var(--text)' }}>
                  Por {featuredArticle.author_name || 'Equipe Editorial'}
                </span>
                <span>•</span>
                <span>{formatDate(featuredArticle.created_at)}</span>
              </div>
            </div>
          </article>
        )}

        {/* Laterais */}
        <div className="hero-side">
          {sideArticles.map((article) => (
            <Link key={article.id} href={`/artigo/${article.slug}`} className="hero-side-card">
              <div className="hero-side-img-wrap">
                {article.image_url ? (
                  <img src={article.image_url} alt={article.title} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--border)' }}>
                    <span className="material-icons-extended" style={{ fontSize: '32px', color: 'var(--text-muted)' }}>image</span>
                  </div>
                )}
              </div>

              <div className="hero-side-content">
                <span className={`category ${getCategoryClass(article.categories?.slug)}`}>
                  {article.categories?.name || 'Tech'}
                </span>
                <h3>{article.title}</h3>
                <div className="meta">
                  <span style={{ fontWeight: '500' }}>
                    Por {article.author_name || 'Equipe Editorial'}
                  </span>
                  <span>•</span>
                  <span>{formatDate(article.created_at)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEÇÃO FORMIGA EM FOCO */}
      <div className="section-title" id="formiga-em-foco" style={{ marginTop: '5.5rem' }}>
        <h2><span></span> Formiga em Foco & Sociedade</h2>
        <Link href="/categoria/cultura-filosofia-bem-estar" className="see-all">
          Ver todos →
        </Link>
      </div>

      <section className="formiga-grid">
        {formigaCards.map((article) => (
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
              <span className={`category ${getCategoryClass(article.categories?.slug)}`}>
                {article.categories?.name || 'Formiga'}
              </span>
              <h3>{article.title}</h3>
              <p>
                {article.summary?.length > 110 
                  ? article.summary.substring(0, 110) + '...' 
                  : article.summary}
              </p>
              <div className="meta">
                <span style={{ fontWeight: '500' }}>{article.author_name ? `Por ${article.author_name}` : 'Equipe Editorial'}</span>
                <span>•</span>
                <span>{formatDate(article.created_at)}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* ADSENSE SLOT 1 (ENTRE SEÇÕES - AD COMPLIANCE) */}
      <div style={{ margin: '40px 0' }}>
        <AdBanner dataAdSlot="SEU_SLOT_HOME_1" />
      </div>

      {/* COLUNA DO GUSTAVO / OPINIÃO E TECNOLOGIA */}
      <div className="section-title" id="coluna-do-gustavo" style={{ marginTop: '3.5rem' }}>
        <h2>
          <span style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)' }}></span> 
          Coluna do Gustavo
        </h2>
        <Link href="/equipe" className="see-all">
          Conheça o autor →
        </Link>
      </div>

      <section style={{ 
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(245, 158, 11, 0.02))', 
        border: '1px solid rgba(245, 158, 11, 0.15)',
        borderRadius: '16px',
        padding: '28px',
        marginBottom: '40px',
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #f59e0b', flexShrink: 0 }}>
          <img src="/simbolo.png" alt="Gustavo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'inline-block', background: '#fef3c7', color: '#b45309', fontSize: '12px', fontWeight: '700', padding: '4px 10px', borderRadius: '12px', marginBottom: '12px', textTransform: 'uppercase' }}>
            Visão & Editorial
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text)', marginBottom: '10px', lineHeight: 1.3 }}>
            Bem-vindo à Voz da I.A: Como a tecnologia molda a nossa realidade e combate a desinformação.
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '0' }}>
            Uma análise franca sobre o ecossistema tecnológico global, os desafios da inteligência artificial e o impacto direto na nossa sociedade. Acompanhe os artigos técnicos, ensaios e reflexões do fundador do portal.
          </p>
        </div>
      </section>

      {/* SEÇÃO DEMAIS PUBLICAÇÕES */}
      <div className="section-title">
        <h2><span style={{ background: '#3b82f6' }}></span> Últimas Publicações</h2>
        <Link href="/categoria/ia-e-agentes" className="see-all">
          Ver todas →
        </Link>
      </div>

      <section className="articles-grid">
        {latestArticles.map((article) => (
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
              <span className={`category ${getCategoryClass(article.categories?.slug)}`}>
                {article.categories?.name || 'Notícias'}
              </span>
              <h3>{article.title}</h3>
              <p>
                {article.summary?.length > 110 
                  ? article.summary.substring(0, 110) + '...' 
                  : article.summary}
              </p>
              <div className="meta">
                <span style={{ fontWeight: '500' }}>{article.author_name ? `Por ${article.author_name}` : 'Equipe Editorial'}</span>
                <span>•</span>
                <span>{formatDate(article.created_at)}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* NEWSLETTER */}
      <SubscribeForm />

      {/* ECOSSISTEMA & PROJETOS PARCEIROS */}
      <div style={{ marginTop: '50px' }} id="ecossistema">
        <h3 className="google-sans" style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--text-muted)', fontWeight: 600 }}>
          Acesso Rápido aos Nossos Projetos
        </h3>
        <div className="ecosystem-grid">
          {/* Banner IA */}
          <a href="https://kaelara-online.vercel.app/" target="_blank" rel="noopener noreferrer" className="ecosystem-card">
            <div style={{ width: '48px', height: '48px', minWidth: '48px', borderRadius: '10px', background: 'linear-gradient(135deg, #7C4DFF, #d12a7a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <span className="material-icons-extended">smart_toy</span>
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text)' }}>Kaelara Online</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Fale com nossa Inteligência Artificial</div>
            </div>
          </a>
        </div>
      </div>

      {/* ADSENSE SLOT 2 (FINAL DA PÁGINA) */}
      <div style={{ marginTop: '40px' }}>
        <AdBanner dataAdSlot="SEU_SLOT_HOME_2" />
      </div>
    </main>
  );
}
