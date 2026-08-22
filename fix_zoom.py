import re

with open('src/app/globals.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Add a rule for html base font size if not present
if 'html {' not in content:
    content = 'html {\n  font-size: 110%; /* Increase base zoom slightly */\n}\n\n' + content

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(content)
