import re

with open('src/app/components/SubscribeForm.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('Bom dia! Assine a Voz da I.A', 'Assine a Voz da I.A')

with open('src/app/components/SubscribeForm.js', 'w', encoding='utf-8') as f:
    f.write(content)
