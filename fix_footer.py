import re

with open('src/app/components/LayoutShell.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_footer = '''          <footer style={{
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
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <img src="/simbolo.png" alt="Voz da I.A Logo" style={{ height: '64px', width: '64px', objectFit: 'cover' }} />
            </div>
            <div>
              <h3 style={{ color: 'var(--gn-text)', marginBottom: '8px', fontSize: '20px', fontWeight: '700' }} className="google-sans">Voz da I.A</h3>
              <p style={{ maxWidth: '600px', margin: '0 auto' }}>O portal focado em combater fake news com informação de alta tecnologia e precisão jornalística.</p>
            </div>'''

new_footer = '''          <footer style={{
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <img src="/simbolo.png" alt="Voz da I.A Logo" style={{ height: '48px', width: '48px', objectFit: 'cover' }} />
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ color: 'var(--gn-text)', marginBottom: '4px', fontSize: '20px', fontWeight: '700' }} className="google-sans">Voz da I.A</h3>
                <p style={{ maxWidth: '600px', margin: '0', fontSize: '14px' }}>O portal focado em combater fake news com informação de alta tecnologia e precisão jornalística.</p>
              </div>
            </div>'''

content = content.replace(old_footer, new_footer)
# Fallback in case line endings differ
old_footer_cr = old_footer.replace('\n', '\r\n')
content = content.replace(old_footer_cr, new_footer)

with open('src/app/components/LayoutShell.js', 'w', encoding='utf-8') as f:
    f.write(content)
