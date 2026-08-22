with open('src/app/components/LayoutShell.js', 'r', encoding='utf-8') as f:
    content = f.read()

import re
# Remove the horoscope link from header-center
# The link is: <Link href="/categoria/horoscopo-e-taro" style={{ fontSize: '14px', ... Leia seu horóscopo e tarô do dia </Link>
# We can use regex to find and remove it, or string replacement.
content = re.sub(r'<Link href=\"/categoria/horoscopo-e-taro\"[^>]*>.*?Leia seu hor.*?<\/Link>', '', content, flags=re.DOTALL)

with open('src/app/components/LayoutShell.js', 'w', encoding='utf-8') as f:
    f.write(content)
