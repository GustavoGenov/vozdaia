'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import Sidebar from './Sidebar';
import SubscribeForm from './SubscribeForm';

export default function LayoutShell({ categories, children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      {/* TOP HEADER */}
      <header className="top-header">
        <div className="header-left">
          <button className="menu-btn" onClick={toggleDrawer} aria-label="Menu principal">
            <span className="material-icons-extended">menu</span>
          </button>
          <Link href="/" className="brand-link brand-text google-sans" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px', textDecoration: 'none' }} onClick={closeDrawer}>
            <img src="/simbolo.png" alt="Logo" style={{ height: '32px', width: '32px', borderRadius: '6px', objectFit: 'cover' }} />
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span className="brand-v">V</span>
              <span className="brand-o">o</span>
              <span className="brand-z">z</span>
              <span style={{ color: '#34A853', marginLeft: '6px' }}>d</span>
              <span style={{ color: '#EA4335' }}>a</span>
              <span style={{ color: '#4285F4', marginLeft: '6px' }}>I</span>
              <span style={{ color: '#FBBC05' }}>.</span>
              <span style={{ color: '#EA4335' }}>A</span>
            </span>
          </Link>
        </div>
        
        <div className="header-center" style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '900px' }}>
          <div className="search-bar" style={{ flex: 1 }}>
            <span className="material-icons-extended search-icon">search</span>
            <input type="text" placeholder="Pesquisar por assuntos, locais e fontes" />
          </div>
          <Link href="/categoria/cultura-filosofia-bem-estar" style={{ fontSize: '14px', fontWeight: '500', color: '#1a73e8', textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="material-icons-extended" style={{ fontSize: '18px', color: '#9c27b0' }}>auto_awesome</span>
            Leia nosso conteúdo de Cultura e Bem-Estar
          </Link>
        </div>
        
        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div id="google_translate_element" className="google-translate-wrapper"></div>
          <ThemeToggle />
          <button className="menu-btn" aria-label="Aplicativos do ecossistema">
            <span className="material-icons-extended">apps</span>
          </button>
          <Link href="/admin" className="profile-avatar" style={{textDecoration: 'none'}}>G</Link>
        </div>
      </header>

      {/* OVERLAY E MOBILE DRAWER */}
      <div className={`drawer-overlay ${drawerOpen ? 'open' : ''}`} onClick={closeDrawer}></div>
      <aside className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}>
        <div style={{ padding: '24px 0' }} onClick={closeDrawer}>
          <Sidebar categories={categories} />
        </div>
      </aside>

      <div className="app-wrapper">
        {/* DESKTOP SIDEBAR */}
        <aside className="sidebar">
          <Sidebar categories={categories} />
        </aside>

        {/* MAIN AREA */}
        <div className="main-area-wrapper">
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
            
            {/* Links Institucionais Centralizados */}
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', borderTop: '1px solid var(--gn-border)', paddingTop: '24px', width: '100%', maxWidth: '800px' }}>
              <Link href="/sobre" style={{ fontWeight: '500' }} onClick={closeDrawer}>Sobre Nós</Link>
              <Link href="/equipe" style={{ fontWeight: '500' }} onClick={closeDrawer}>Nossa Equipe</Link>
              <Link href="/politica-de-privacidade" style={{ fontWeight: '500' }} onClick={closeDrawer}>Política de Privacidade</Link>
              <Link href="/termos" style={{ fontWeight: '500' }} onClick={closeDrawer}>Termos de Uso</Link>
            </div>

            <div style={{ fontSize: '12px', marginTop: '8px' }}>
              &copy; {new Date().getFullYear()} Voz da I.A. Todos os direitos reservados.
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
