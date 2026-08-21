import re

with open('src/app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make the logo pulse instead of just Z
css = css.replace('.brand-z { \n  color: #FBBC05; \n  animation: pulse-glow 3s infinite ease-in-out;\n}', '.brand-z { color: #FBBC05; }')
css += '''\n\n.brand-logo-img {
  animation: pulse-glow 3s infinite ease-in-out;
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(251, 188, 5, 0.2);
}'''

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)
