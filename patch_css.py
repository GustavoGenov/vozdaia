import re

with open('src/app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Add glassmorphism to top-header
css = re.sub(r'\.top-header \{[^\}]+\}', '''.top-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1000;
  transition: background-color 0.3s ease;
}''', css)

# Update dark mode top-header
if '[data-theme=\'dark\'] .top-header' not in css:
    css = css.replace('.dark, [data-theme=\'dark\'] {', '''.dark, [data-theme='dark'] {''')
    css += '''\n\n[data-theme='dark'] .top-header {\n  background: rgba(32, 33, 36, 0.75);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n}'''

# Add pulse animation to logo
if 'pulse-glow' not in css:
    css = css.replace('.brand-z { color: #FBBC05; }', '''
@keyframes pulse-glow {
  0% { filter: drop-shadow(0 0 2px rgba(251, 188, 5, 0.4)); }
  50% { filter: drop-shadow(0 0 8px rgba(251, 188, 5, 0.8)); }
  100% { filter: drop-shadow(0 0 2px rgba(251, 188, 5, 0.4)); }
}
.brand-z { 
  color: #FBBC05; 
  animation: pulse-glow 3s infinite ease-in-out;
}''')

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)

