with open('src/app/api/ping-google/route.js', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('https://vozdaia.vercel.app', 'https://vozdaia.com')
with open('src/app/api/ping-google/route.js', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/app/feed.xml/route.js', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('https://vozdaia.vercel.app', 'https://vozdaia.com')
with open('src/app/feed.xml/route.js', 'w', encoding='utf-8') as f:
    f.write(content)
