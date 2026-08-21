import re

with open('src/app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('margin-left: var(--sidebar-width);', 'margin-left: calc(var(--sidebar-width) + 16px);')

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)
