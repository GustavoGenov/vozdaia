import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Voz da I.A - Notícias do Google e Tecnologia',
  description: 'O seu portal de notícias sobre Inteligência Artificial, Ciência e Saúde.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Extended" rel="stylesheet" />
      </head>
      <body>
        {/* TOP HEADER */}
        <header className="top-header">
          <div className="header-left">
            <button className="menu-btn">
              <span className="material-icons-extended">menu</span>
            </button>
            <Link href="/" className="brand-link brand-text google-sans">
              <span className="brand-v">V</span>
              <span className="brand-o">o</span>
              <span className="brand-z">z</span>
              <span className="brand-ia" style={{marginLeft: '4px'}}>da I.A</span>
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
              <span className="material-icons-extended">language</span>
              <span>Principais notícias</span>
            </Link>
            <Link href="/" className="nav-item">
              <span className="material-icons-extended">star_border</span>
              <span>Para você</span>
            </Link>
            
            <div className="sidebar-divider"></div>
            
            <Link href="/" className="nav-item">
              <span className="material-icons-extended">public</span>
              <span>Mundo</span>
            </Link>
            <Link href="/" className="nav-item">
              <span className="material-icons-extended">flag</span>
              <span>Brasil</span>
            </Link>
            <Link href="/" className="nav-item">
              <span className="material-icons-extended">business</span>
              <span>Negócios</span>
            </Link>
            
            <div className="sidebar-divider"></div>
            
            <Link href="/" className="nav-item">
              <span className="material-icons-extended">memory</span>
              <span>Tecnologia</span>
            </Link>
            <Link href="/" className="nav-item">
              <span className="material-icons-extended">smart_toy</span>
              <span>IA Sem Mitos</span>
            </Link>
            <Link href="/" className="nav-item">
              <span className="material-icons-extended">biotech</span>
              <span>Ciência e Saúde</span>
            </Link>
            <Link href="/" className="nav-item">
              <span className="material-icons-extended">gavel</span>
              <span>Jurídico</span>
            </Link>
            <Link href="/" className="nav-item">
              <span className="material-icons-extended">military_tech</span>
              <span>Militar & Governo</span>
            </Link>
          </aside>

          {/* MAIN CONTENT */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
            
            {/* INSTITUTIONAL FOOTER */}
            <footer style={{
              marginTop: 'auto',
              padding: '32px 40px',
              borderTop: '1px solid var(--gn-border)',
              background: 'var(--gn-surface)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              color: 'var(--gn-text-secondary)',
              fontSize: '13px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                <div>
                  <h3 style={{ color: 'var(--gn-text)', marginBottom: '8px', fontSize: '16px' }} className="google-sans">Voz da I.A</h3>
                  <p>O jornal focado em combater fake news com informação de alta tecnologia.</p>
                </div>
                
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <strong style={{ color: 'var(--gn-text)' }}>Contato Direto</strong>
                    <a href="mailto:nicholaigenov@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span className="material-icons-extended" style={{fontSize: '16px'}}>email</span> nicholaigenov@gmail.com
                    </a>
                    <a href="https://wa.me/5537999184509" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span className="material-icons-extended" style={{fontSize: '16px'}}>phone</span> (37) 99918-4509
                    </a>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <strong style={{ color: 'var(--gn-text)' }}>Redes Profissionais</strong>
                    <a href="https://www.linkedin.com/in/gustavo-castro-bernardes-rosa-24a827bb" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span className="material-icons-extended" style={{fontSize: '16px'}}>link</span> LinkedIn (Gustavo Castro)
                    </a>
                    <Link href="/sobre">Sobre Nós</Link>
                    <Link href="/politica-de-privacidade">Política de Privacidade</Link>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--gn-border)', paddingTop: '16px', marginTop: '16px', textAlign: 'center' }}>
                &copy; {new Date().getFullYear()} Voz da I.A. Todos os direitos reservados.
              </div>
            </footer>
          </div>

        </div>
      </body>
    </html>
  );
}
