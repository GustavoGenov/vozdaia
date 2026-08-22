import re

with open('src/app/layout.js', 'r', encoding='utf-8') as f:
    content = f.read()

if 'export const viewport' not in content:
    content = content.replace('export const metadata = {', "export const viewport = {\n  width: 'device-width',\n  initialScale: 1,\n  maximumScale: 5,\n};\n\nexport const metadata = {")

with open('src/app/layout.js', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/app/components/LayoutShell.js', 'r', encoding='utf-8') as f:
    shell = f.read()

logo_html = '''
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <img src="/simbolo.png" alt="Voz da I.A Logo" style={{ height: '64px', width: '64px', objectFit: 'cover' }} />
            </div>
            <div>
              <h3 style={{ color: 'var(--gn-text)', marginBottom: '8px', fontSize: '20px', fontWeight: '700' }} className="google-sans">Voz da I.A</h3>
'''

shell = shell.replace('<div>\\n              <h3 style={{ color: \\'var(--gn-text)\\', marginBottom: \\'8px\\', fontSize: \\'20px\\', fontWeight: \\'700\\' }} className="google-sans">Voz da I.A</h3>', logo_html.strip())

with open('src/app/components/LayoutShell.js', 'w', encoding='utf-8') as f:
    f.write(shell)
