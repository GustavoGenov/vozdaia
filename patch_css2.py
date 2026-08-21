import re

with open('src/app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make search-bar a pill shape
css = css.replace('border-radius: 8px;\n  padding: 8px 16px;', 'border-radius: 24px;\n  padding: 8px 20px;\n  transition: box-shadow 0.2s, background 0.2s;\n')
if '.search-bar:focus-within' not in css:
    css = css.replace('.search-icon {', '.search-bar:focus-within {\n  background: var(--gn-surface);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n}\n.search-icon {')

# Sidebar float effect
css = css.replace('.sidebar {\n  width: var(--sidebar-width);\n  position: fixed;\n  top: var(--header-height);\n  bottom: 0;\n  left: 0;\n  background: var(--gn-bg);\n  color: var(--gn-text-secondary);\n}', '''.sidebar {
  width: var(--sidebar-width);
  position: fixed;
  top: calc(var(--header-height) + 16px);
  bottom: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 16px;
  color: var(--gn-text-secondary);
  overflow-y: auto;
  box-shadow: 0 4px 24px rgba(0,0,0,0.03);
}

[data-theme='dark'] .sidebar {
  background: rgba(32, 33, 36, 0.6);
  border-color: rgba(255, 255, 255, 0.05);
}''')

# Article cards border-radius
css = css.replace('border-radius: 12px;\n  padding: 16px;', 'border-radius: 20px;\n  padding: 16px;')
css = css.replace('border-radius: 8px;\n  object-fit: cover;', 'border-radius: 12px;\n  object-fit: cover;')
# Enhance levitation hover
css = css.replace('transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}', 'transform: translateY(-4px);\n  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);\n}')

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)

