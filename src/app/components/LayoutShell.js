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
            <img src="/simbolo.png" alt="Logo" className="brand-logo-img" style={{ height: '36px', width: '36px', objectFit: 'cover' }} />
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
            gap: '20px',
            color: 'var(--gn-text-secondary)',
            fontSize: '15px',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'center' }}>
              <img src="/simbolo.png" alt="Voz da I.A Logo" style={{ height: '42px', width: '42px', objectFit: 'cover' }} />
              <h3 style={{ color: 'var(--gn-text)', fontSize: '22px', fontWeight: '700', margin: 0 }} className="google-sans">Voz da I.A</h3>
            </div>
            
            <p style={{ maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
              O portal focado em combater fake news com informação de alta tecnologia e precisão jornalística.
            </p>
            
            {/* Links Institucionais Centralizados */}
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', borderTop: '1px solid var(--gn-border)', paddingTop: '20px', width: '100%', maxWidth: '800px' }}>
              <Link href="/sobre" style={{ fontWeight: '500' }} onClick={closeDrawer}>Sobre Nós</Link>
              <Link href="/equipe" style={{ fontWeight: '500' }} onClick={closeDrawer}>Nossa Equipe</Link>
              <Link href="/politica-de-privacidade" style={{ fontWeight: '500' }} onClick={closeDrawer}>Política de Privacidade</Link>
              <Link href="/termos" style={{ fontWeight: '500' }} onClick={closeDrawer}>Termos de Uso</Link>
            </div>

            <div style={{ fontSize: '13px', marginTop: '4px' }}>
              &copy; {new Date().getFullYear()} Voz da I.A. Todos os direitos reservados.
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
