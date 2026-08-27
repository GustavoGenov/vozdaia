'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function LayoutShell({ categories, children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      {/* HEADER PRINCIPAL MODERNO */}
      <header className="header">
        <div className="header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="menu-btn" 
              onClick={toggleDrawer} 
              aria-label="Menu principal"
              style={{ color: 'white', padding: '6px' }}
            >
              <span className="material-icons-extended" style={{ fontSize: '26px' }}>menu</span>
            </button>

            <Link href="/" className="logo" onClick={closeDrawer}>
              <div className="logo-icon">V</div>
              <span>Voz da I.A</span>
            </Link>
          </div>

          <nav className="nav">
            <Link href="/categoria/ia-e-agentes">Inteligência Artificial</Link>
            <Link href="/categoria/ciencia-e-espaco">Ciência & Espaço</Link>
            <Link href="/categoria/tech-e-gaming">Tech & Gaming</Link>
            <Link href="/categoria/cultura-filosofia-bem-estar">Cultura</Link>
            <Link href="/#formiga-em-foco">Formiga</Link>
            <Link href="/clima">Clima</Link>
            <Link href="/horoscopo">Horóscopo</Link>
          </nav>

          <div className="header-actions">
            <Link href="#newsletter" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
              Assinar Newsletter
            </Link>
            
            <div id="google_translate_element" className="google-translate-wrapper"></div>
            <ThemeToggle />
            
            <Link href="/admin" className="profile-avatar" title="Painel Administrativo" style={{ textDecoration: 'none' }}>
              G
            </Link>
          </div>
        </div>
      </header>

      {/* OVERLAY E MOBILE DRAWER */}
      <div 
        className={`drawer-overlay ${drawerOpen ? 'open' : ''}`} 
        onClick={closeDrawer}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 999,
          display: drawerOpen ? 'block' : 'none'
        }}
      ></div>

      <aside 
        className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: drawerOpen ? 0 : '-320px',
          width: '300px',
          height: '100%',
          background: 'var(--card)',
          zIndex: 1000,
          transition: 'left 0.3s ease',
          boxShadow: '2px 0 12px rgba(0,0,0,0.2)',
          padding: '24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" className="logo" onClick={closeDrawer} style={{ color: 'var(--text)' }}>
            <div className="logo-icon">V</div>
            <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>Voz da I.A</span>
          </Link>
          <button onClick={closeDrawer} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>
            <span className="material-icons-extended">close</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>
            Navegação
          </span>
          <Link href="/" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            🏠 Início / Manchetes
          </Link>
          <Link href="/categoria/ia-e-agentes" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            🤖 Inteligência Artificial & Agentes
          </Link>
          <Link href="/categoria/ciencia-e-espaco" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            🚀 Ciência & Fronteira Espacial
          </Link>
          <Link href="/categoria/tech-e-gaming" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            🎮 Tech & Gaming
          </Link>
          <Link href="/categoria/cultura-filosofia-bem-estar" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            🎨 Cultura, Filosofia & Bem-Estar
          </Link>
          <Link href="/categoria/engenharia-e-hardware" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            ⚙️ Engenharia & Hardware
          </Link>
          <Link href="/clima" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            🌦️ Clima Tempo BR
          </Link>
          <Link href="/horoscopo" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            🔮 Horóscopo & Tarô
          </Link>
        </div>

        <hr style={{ borderColor: 'var(--border)', margin: '8px 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>
            Institucional
          </span>
          <Link href="/sobre" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '6px 0', fontSize: '14px' }}>
            Sobre o Voz da I.A
          </Link>
          <Link href="/equipe" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '6px 0', fontSize: '14px' }}>
            Nossa Equipe & Colunistas
          </Link>
          <Link href="/politica-de-privacidade" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '6px 0', fontSize: '14px' }}>
            Política de Privacidade
          </Link>
          <Link href="/termos" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '6px 0', fontSize: '14px' }}>
            Termos de Uso
          </Link>
        </div>
      </aside>

      {/* APP WRAPPER */}
      <div className="app-wrapper">
        <div className="main-area-wrapper">
          {children}

          {/* FOOTER MULTI-COLUNAS (COMPLIANCE GOOGLE ADSENSE) */}
          <footer className="footer">
            <div className="footer-inner">
              {/* Coluna 1: Sobre o Jornal */}
              <div>
                <div className="logo" style={{ marginBottom: '1rem' }}>
                  <div className="logo-icon">V</div>
                  <span>Voz da I.A</span>
                </div>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#94a3b8' }}>
                  Jornal digital independente de Formiga (MG) e do Brasil. 
                  Compromisso absoluto com o combate rigoroso às fake news por meio de tecnologia, checagem científica e valorização do jornalismo autêntico.
                </p>
              </div>

              {/* Coluna 2: Categorias */}
              <div>
                <h4>Categorias</h4>
                <ul>
                  <li><Link href="/categoria/ia-e-agentes">Inteligência Artificial</Link></li>
                  <li><Link href="/categoria/ciencia-e-espaco">Ciência & Espaço</Link></li>
                  <li><Link href="/categoria/tech-e-gaming">Tech & Gaming</Link></li>
                  <li><Link href="/categoria/cultura-filosofia-bem-estar">Cultura & Filosofia</Link></li>
                  <li><Link href="/categoria/engenharia-e-hardware">Engenharia & Hardware</Link></li>
                </ul>
              </div>

              {/* Coluna 3: Formiga & Destaques */}
              <div>
                <h4>Formiga em Foco</h4>
                <ul>
                  <li><Link href="/#formiga-em-foco">Notícias Locais</Link></li>
                  <li><Link href="/#formiga-em-foco">Cultura & Sociedade</Link></li>
                  <li><Link href="/clima">Previsão do Tempo</Link></li>
                  <li><Link href="/horoscopo">Horóscopo & Tarô</Link></li>
                  <li><Link href="/#ecossistema">Projetos Parceiros</Link></li>
                </ul>
              </div>

              {/* Coluna 4: Institucional (Obrigatório AdSense) */}
              <div>
                <h4>Institucional</h4>
                <ul>
                  <li><Link href="/sobre">Quem Somos</Link></li>
                  <li><Link href="/equipe">Nossa Equipe & Colunistas</Link></li>
                  <li><Link href="/#newsletter">Assinar Newsletter</Link></li>
                  <li><Link href="/politica-de-privacidade">Política de Privacidade</Link></li>
                  <li><Link href="/termos">Termos de Uso</Link></li>
                  <li style={{ marginTop: '8px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                    ✉️ <a href="mailto:gustavocastroinfo@gmail.com" style={{ color: 'var(--accent)' }}>gustavocastroinfo@gmail.com</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="copyright">
              © {new Date().getFullYear()} Voz da I.A — Formiga, Minas Gerais. Todos os direitos reservados.
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
