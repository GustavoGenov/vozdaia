
const fs = require('fs');
const code = Buffer.from(process.argv[2], 'base64').toString('utf8');
fs.writeFileSync('src/app/artigo/[slug]/page.js', code, 'utf8');

