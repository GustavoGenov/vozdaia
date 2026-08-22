import re

with open('src/app/globals.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the broken top block
content = content.replace('html {\n  font-size: 110%; /* Increase base zoom slightly */\n}\n\n', '')

# Insert it AFTER the last @import
import_idx = content.rfind('@import')
if import_idx != -1:
    end_of_import_line = content.find('\n', import_idx)
    if end_of_import_line != -1:
        content = content[:end_of_import_line+1] + '\nhtml {\n  font-size: 110%; /* Increase base zoom slightly */\n}\n' + content[end_of_import_line+1:]
else:
    content = 'html {\n  font-size: 110%; /* Increase base zoom slightly */\n}\n\n' + content

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(content)
