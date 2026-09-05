import ProtectedRoute from './ProtectedRoute';
import Link from 'next/link';

export const metadata = {
  title: 'Painel Administrativo | Voz da I.A',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute>
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        padding: '24px 16px',
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif"
      }}>
        <div style={{
          maxWidth: '1360px',
          margin: '0 auto',
          background: 'var(--card)',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          minHeight: '88vh'
        }}>
          {/* Admin Sidebar */}
          <aside style={{ 
            width: '280px', 
            minWidth: '280px',
            background: 'linear-gradient(180deg, #1e3a8a 0%, #172554 100%)', 
            color: '#fff', 
            padding: '28px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div>
              {/* Logo / Brand */}
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
                <img 
                  src="/simbolo.png" 
                  alt="Símbolo Voz da I.A" 
                  style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid rgba(255,255,255,0.3)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} 
                />
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#fff', letterSpacing: '-0.3px', lineHeight: 1.2 }}>
                    Voz da I.A
                  </div>
                  <div style={{ fontSize: '11px', color: '#93c5fd', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>
                    Painel Editorial
                  </div>
                </div>
              </Link>
              
              {/* Navigation Menu */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="/admin" style={{ 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.12)',
                  fontWeight: '600',
                  fontSize: '14px',
                  textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                }}>
                  <span className="material-icons-extended" style={{ fontSize: '20px', color: '#60a5fa' }}>dashboard</span> 
                  Visão Geral & Stats
                </a>
                
                <a href="#editor" style={{ 
                  color: '#cbd5e1', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'background 0.2s'
                }}>
                  <span className="material-icons-extended" style={{ fontSize: '20px', color: '#34d399' }}>post_add</span> 
                  Nova Notícia (750 Palavras)
                </a>
                
                <a href="#artigos" style={{ 
                  color: '#cbd5e1', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'background 0.2s'
                }}>
                  <span className="material-icons-extended" style={{ fontSize: '20px', color: '#fbbf24' }}>article</span> 
                  Gerenciar Matérias
                </a>

                <a href="#blocos" style={{ 
                  color: '#cbd5e1', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'background 0.2s'
                }}>
                  <span className="material-icons-extended" style={{ fontSize: '20px', color: '#a78bfa' }}>category</span> 
                  Categorias / Blocos
                </a>

                <a href="#adsense" style={{ 
                  color: '#cbd5e1', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'background 0.2s'
                }}>
                  <span className="material-icons-extended" style={{ fontSize: '20px', color: '#38bdf8' }}>verified</span> 
                  Conformidade AdSense
                </a>
              </nav>
            </div>

            {/* Bottom Links */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/" target="_blank" style={{ 
                color: '#93c5fd', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)'
              }}>
                <span className="material-icons-extended" style={{ fontSize: '18px' }}>open_in_new</span> 
                Visualizar Site Ao Vivo
              </Link>
            </div>
          </aside>

          {/* Admin Content */}
          <main style={{ flex: 1, padding: '36px', overflowY: 'auto', background: 'var(--card)' }}>
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
