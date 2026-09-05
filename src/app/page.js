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
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

function estimateReadingTime(content, summary) {
  const text = (content || summary || '').replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 180) || 3;
  return `${minutes} min de leitura`;
}

export default async function Home() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select(`id, title, slug, created_at, image_url, summary, content, author_name, categories(name, slug, color_code)`)
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
  
  const formigaCards = [
    ...formigaMatches.filter(a => !usedHeroIds.has(a.id)),
    ...availableForFormiga.filter(a => !formigaMatches.some(f => f.id === a.id))
  ].slice(0, 3);

  const usedIds = new Set([
    featuredArticle?.id,
    ...sideArticles.map(s => s.id),
    ...formigaCards.map(f => f.id)
  ]);

  const latestArticles = articles.filter(a => !usedIds.has(a.id)).slice(0, 9);

  return (
    <main className="container" style={{ paddingTop: '16px' }}>
      <PageTracker />

      {/* PLANTÃO AO VIVO / TICKER DE NOTÍCIAS */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        background: 'var(--gn-surface)',
        border: '1px solid var(--gn-border)',
        borderRadius: '12px',
        marginBottom: '24px',
        fontSize: '14px',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626', animation: 'pulse 1.5s infinite' }}></span>
          Plantão Voz da I.A
        </div>
        <div style={{ width: '1px', height: '16px', background: 'var(--gn-border)' }}></div>
        <div style={{ color: 'var(--gn-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
          <Link href={`/artigo/${featuredArticle.slug}`} style={{ color: 'var(--gn-text)', fontWeight: 500 }}>
            {featuredArticle.title}
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--gn-text-secondary)', fontSize: '12px', whiteSpace: 'nowrap' }}>
          <span className="material-icons-extended" style={{ fontSize: '14px', color: '#16a34a' }}>verified</span>
          100% Verificado
        </div>
      </div>

      {/* HERO SECTION PRINCIPAL */}
      <section className="hero-grid">
        {/* CARD PRINCIPAL (MANCHETE DESTAQUE) */}
        <Link href={`/artigo/${featuredArticle.slug}`} className="hero-main">
          <div className="hero-main-img-wrap">
            {featuredArticle.image_url ? (
              <img 
                src={featuredArticle.image_url} 
                alt={featuredArticle.title} 
                className="hero-main-img" 
                loading="eager"
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gn-search-bg)' }}>
                <span className="material-icons-extended" style={{ fontSize: '48px', color: 'var(--gn-text-secondary)' }}>image</span>
              </div>
            )}
            <div className="hero-img-overlay"></div>
          </div>

          <div className="hero-main-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span className={`category ${getCategoryClass(featuredArticle.categories?.slug)}`}>
                {featuredArticle.categories?.name || 'Manchete Principal'}
              </span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span className="material-icons-extended" style={{ fontSize: '13px' }}>schedule</span>
                {estimateReadingTime(featuredArticle.content, featuredArticle.summary)}
              </span>
            </div>
            
            <h2>{featuredArticle.title}</h2>
            <p>{featuredArticle.summary}</p>
            
            <div className="meta">
              <span style={{ fontWeight: '600' }}>
                Por {featuredArticle.author_name || 'Redação Voz da I.A'}
              </span>
              <span>•</span>
              <span>{formatDate(featuredArticle.created_at)}</span>
            </div>
          </div>
        </Link>

        {/* 2 CARDS SECUNDÁRIOS */}
        <div className="hero-side">
          {sideArticles.map((article) => (
            <Link key={article.id} href={`/artigo/${article.slug}`} className="hero-side-card">
              <div className="hero-side-img-wrap">
                {article.image_url ? (
                  <img src={article.image_url} alt={article.title} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gn-search-bg)' }}>
                    <span className="material-icons-extended" style={{ fontSize: '32px', color: 'var(--gn-text-secondary)' }}>image</span>
                  </div>
                )}
              </div>

              <div className="hero-side-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <span className={`category ${getCategoryClass(article.categories?.slug)}`}>
                    {article.categories?.name || 'Tech'}
                  </span>
                </div>
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
      <div className="section-title" id="formiga-em-foco" style={{ marginTop: '4.5rem' }}>
        <h2><span></span> Formiga em Foco & Sociedade</h2>
        <Link href="/categoria/cultura-filosofia-bem-estar" className="see-all">
          Ver todas →
        </Link>
      </div>

      <section className="formiga-grid">
        {formigaCards.map((article) => (
          <Link key={article.id} href={`/artigo/${article.slug}`} className="card">
            <div className="card-img-wrap">
              {article.image_url ? (
                <img src={article.image_url} alt={article.title} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gn-search-bg)' }}>
                  <span className="material-icons-extended" style={{ fontSize: '32px', color: 'var(--gn-text-secondary)' }}>image</span>
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
          Coluna Editorial & Tecnologia
        </h2>
        <Link href="/equipe" className="see-all">
          Conheça o autor →
        </Link>
      </div>

      <section style={{ 
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(245, 158, 11, 0.02))', 
        border: '1px solid rgba(245, 158, 11, 0.2)',
        borderRadius: '16px',
        padding: '28px',
        marginBottom: '40px',
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #f59e0b', flexShrink: 0 }}>
          <img src="/simbolo.png" alt="Gustavo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'inline-block', background: '#fef3c7', color: '#b45309', fontSize: '12px', fontWeight: '700', padding: '4px 10px', borderRadius: '12px', marginBottom: '12px', textTransform: 'uppercase' }}>
            Visão & Editorial
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--gn-text)', marginBottom: '10px', lineHeight: 1.3 }}>
            Bem-vindo à Voz da I.A: Como a tecnologia molda a nossa realidade e combate a desinformação.
          </h3>
          <p style={{ color: 'var(--gn-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '0' }}>
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
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gn-search-bg)' }}>
                  <span className="material-icons-extended" style={{ fontSize: '32px', color: 'var(--gn-text-secondary)' }}>image</span>
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
        <h3 className="google-sans" style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--gn-text-secondary)', fontWeight: 600 }}>
          Acesso Rápido aos Nossos Projetos
        </h3>
        <div className="ecosystem-grid">
          <a href="https://kaelara-online.vercel.app/" target="_blank" rel="noopener noreferrer" className="ecosystem-card">
            <div style={{ width: '48px', height: '48px', minWidth: '48px', borderRadius: '10px', background: 'linear-gradient(135deg, #7C4DFF, #d12a7a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <span className="material-icons-extended">smart_toy</span>
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--gn-text)' }}>Kaelara Online</div>
              <div style={{ fontSize: '13px', color: 'var(--gn-text-secondary)' }}>Fale com nossa Inteligência Artificial</div>
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
