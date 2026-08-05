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
            <div className="profile-avatar">G</div>
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
          </aside>

          {/* MAIN CONTENT */}
          {children}
        </div>
      </body>
    </html>
  );
}
