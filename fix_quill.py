import re
with open('src/app/admin/PublishForm.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("import('react-quill')", "import('react-quill-new')")
content = content.replace("import 'react-quill/", "import 'react-quill-new/")

with open('src/app/admin/PublishForm.js', 'w', encoding='utf-8') as f:
    f.write(content)
