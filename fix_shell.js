const fs = require('fs');
let shell = fs.readFileSync('src/app/components/LayoutShell.js', 'utf8');

const target = `<div>\r\n              <h3 style={{ color: 'var(--gn-text)', marginBottom: '8px', fontSize: '20px', fontWeight: '700' }} className="google-sans">Voz da I.A</h3>`;
const target2 = `<div>\n              <h3 style={{ color: 'var(--gn-text)', marginBottom: '8px', fontSize: '20px', fontWeight: '700' }} className="google-sans">Voz da I.A</h3>`;

const replacement = `<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <img src="/simbolo.png" alt="Voz da I.A Logo" style={{ height: '64px', width: '64px', objectFit: 'cover' }} />
            </div>
            <div>
              <h3 style={{ color: 'var(--gn-text)', marginBottom: '8px', fontSize: '20px', fontWeight: '700' }} className="google-sans">Voz da I.A</h3>`;

shell = shell.replace(target, replacement).replace(target2, replacement);
fs.writeFileSync('src/app/components/LayoutShell.js', shell, 'utf8');

let layout = fs.readFileSync('src/app/layout.js', 'utf8');
if (!layout.includes('export const viewport')) {
    layout = layout.replace('export const metadata = {', "export const viewport = {\n  width: 'device-width',\n  initialScale: 1,\n  maximumScale: 5,\n};\n\nexport const metadata = {");
    fs.writeFileSync('src/app/layout.js', layout, 'utf8');
}
