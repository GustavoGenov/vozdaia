import re

with open('src/app/components/LayoutShell.js', 'r', encoding='utf-8') as f:
    content = f.read()

double_img = '''<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <img src="/simbolo.png" alt="Voz da I.A Logo" style={{ height: '64px', width: '64px', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <img src="/simbolo.png" alt="Voz da I.A Logo" style={{ height: '64px', width: '64px', objectFit: 'cover' }} />
              </div>'''
single_img = '''<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <img src="/simbolo.png" alt="Voz da I.A Logo" style={{ height: '64px', width: '64px', objectFit: 'cover' }} />
              </div>'''

content = content.replace(double_img, single_img)
content = content.replace(double_img.replace('\n', '\r\n'), single_img)

with open('src/app/components/LayoutShell.js', 'w', encoding='utf-8') as f:
    f.write(content)
