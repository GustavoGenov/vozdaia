import './globals.css';
import Link from 'next/link';
import Script from 'next/script';
import { supabase } from '@/lib/supabase';
import SubscribeForm from './components/SubscribeForm';

export const metadata = {
  title: 'Voz da I.A - Combate às Fake News com Tecnologia',
  description: 'O jornal focado em combater fake news com informação de alta tecnologia.',
  other: {
    'google-adsense-account': 'ca-pub-5759690232636098'
  }
};

export const revalidate = 60;

export default async function RootLayout({ children }) {
  const { data: categories } = await supabase.from('categories').select('*');

  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Extended" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Script Global do Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5759690232636098"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Subscribe with Google (SWG Basic) */}
        <Script
          async
          src="https://news.google.com/swg/js/v1/swg-basic.js"
          strategy="afterInteractive"
        />
        <Script id="swg-basic-init" strategy="afterInteractive">
          {`
            (self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
              basicSubscriptions.init({
                type: "NewsArticle",
                isPartOfType: ["Product"],
                isPartOfProductId: "CAowtp7hCw:openaccess",
                clientOptions: { theme: "light", lang: "pt-BR" },
              });
            });
          `}
        </Script>
      </head>
      <body>
        {/* TOP HEADER */}
        <header className="top-header">
          <div className="header-left">
            <button className="menu-btn">
              <span className="material-icons-extended">menu</span>
            </button>
            <Link href="/" className="brand-link brand-text google-sans" style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '-0.5px' }}>
              <span className="brand-v">V</span>
              <span className="brand-o">o</span>
              <span className="brand-z">z</span>
              <span className="brand-ia" style={{marginLeft: '6px', fontWeight: '500', color: 'var(--gn-text)'}}>da I.A</span>
            </Link>
          </div>
          
          <div className="header-center">
            <div className="search-bar">
              <span className="material-icons-extended search-icon">search</span>
              <input type="text" placeholder="Pesquisar por assuntos, locais e fontes" />
            </div>
          </div>
          
          <div className="header-right">
            <button className="menu-btn">
              <span className="material-icons-extended">apps</span>
            </button>
            <Link href="/admin" className="profile-avatar" style={{textDecoration: 'none'}}>G</Link>
          </div>
        </header>

        <div className="app-wrapper">
          {/* SIDEBAR */}
          <aside className="sidebar">
            <Link href="/" className="nav-item active">
              <span className="material-icons-extended" style={{color: '#1a73e8'}}>language</span>
              <span>Principais notícias</span>
            </Link>
            <Link href="/" className="nav-item">
              <span className="material-icons-extended" style={{color: '#fbbc04'}}>star_border</span>
              <span>Para você</span>
            </Link>
            
            <div className="sidebar-divider"></div>
            <div className="sidebar-divider"></div>
            
            {categories?.map((cat) => (
              <Link key={cat.id} href={`/categoria/${cat.slug}`} className="nav-item">
                <span style={{
                  background: cat.color_code || '#1a73e8',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px'
                }}></span>
                <span>{cat.name}</span>
              </Link>
            ))}

          </aside>

          {/* MAIN CONTENT */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
            
            <SubscribeForm />

            {/* INSTITUTIONAL FOOTER */}
            <footer style={{
              marginTop: 'auto',
              padding: '40px 24px',
              borderTop: '1px solid var(--gn-border)',
              background: 'var(--gn-surface)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              color: 'var(--gn-text-secondary)',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              <div>
                <h3 style={{ color: 'var(--gn-text)', marginBottom: '8px', fontSize: '20px', fontWeight: '700' }} className="google-sans">Voz da I.A</h3>
                <p style={{ maxWidth: '600px', margin: '0 auto' }}>O portal focado em combater fake news com informação de alta tecnologia e precisão jornalística.</p>
              </div>
              
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="mailto:nicholaigenov@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                  <span className="material-icons-extended" style={{fontSize: '18px'}}>email</span> nicholaigenov@gmail.com
                </a>
                <a href="https://wa.me/5537999184509" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                  <span className="material-icons-extended" style={{fontSize: '18px'}}>phone</span> (37) 99918-4509
                </a>
                <a href="https://www.linkedin.com/in/gustavo-castro-bernardes-rosa-24a827bb" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                  <span className="material-icons-extended" style={{fontSize: '18px', color: '#0a66c2'}}>link</span> LinkedIn (Gustavo Castro)
                </a>
              </div>

              {/* Links Institucionais Centralizados */}
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', borderTop: '1px solid var(--gn-border)', paddingTop: '24px', width: '100%', maxWidth: '800px' }}>
                <Link href="/sobre" style={{ fontWeight: '500' }}>Sobre Nós</Link>
                <Link href="/politica-de-privacidade" style={{ fontWeight: '500' }}>Política de Privacidade</Link>
                <Link href="/termos" style={{ fontWeight: '500' }}>Termos de Uso</Link>
              </div>

              <div style={{ fontSize: '12px', marginTop: '8px' }}>
                &copy; {new Date().getFullYear()} Voz da I.A. Todos os direitos reservados.
              </div>
            </footer>
          </div>

        </div>
      </body>
    </html>
  );
}
