export const metadata = {
  title: 'Painel Admin - Voz da I.A',
  robots: 'noindex, nofollow'
};

export default function AdminLayout({ children }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f1f3f4',
      padding: '24px',
      fontFamily: "'Roboto', sans-serif"
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        display: 'flex',
        minHeight: '85vh'
      }}>
        {/* Admin Sidebar */}
        <div style={{ width: '250px', background: '#202124', color: '#fff', padding: '24px' }}>
          <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-icons-extended" style={{ color: '#FBBC05' }}>admin_panel_settings</span>
            Painel Kaelara
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a href="/admin" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.9 }}>
              <span className="material-icons-extended">dashboard</span> Dashboard
            </a>
            <a href="#editor" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.6 }}>
              <span className="material-icons-extended">edit_document</span> Nova Notícia
            </a>
            <a href="#blocos" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.6 }}>
              <span className="material-icons-extended">category</span> Blocos (Categorias)
            </a>
            <a href="#adsense" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.6 }}>
              <span className="material-icons-extended">monetization_on</span> Google AdSense
            </a>
            <a href="/" style={{ color: '#aecbfa', display: 'flex', alignItems: 'center', gap: '12px', marginTop: '32px' }}>
              <span className="material-icons-extended">open_in_new</span> Ver Site
            </a>
          </nav>
        </div>

        {/* Admin Content */}
        <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
