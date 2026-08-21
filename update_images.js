const fs = require('fs');
let content = fs.readFileSync('D:\\Backup_Projetos\\Jornal\\src\\app\\equipe\\page.js', 'utf8');

content = content.replace(
  /name: 'RuiWenceslau de Oliveira',\s*initials: 'RO',\s*image: '[^']*',\s*\/\*.*?\*\//g,
  "name: 'RuiWenceslau de Oliveira',\n    initials: 'RO',\n    image: '/equipe/rui.jpg',"
);

content = content.replace(
  /name: 'Gustavo de Castro',\s*initials: 'GC',\s*image: '[^']*',\s*\/\*.*?\*\//g,
  "name: 'Gustavo de Castro',\n    initials: 'GC',\n    image: '/equipe/gustavo.jpg',"
);

content = content.replace(
  /name: 'Daiene Maria de Meneses',\s*initials: 'DM',\s*image: '[^']*',\s*\/\*.*?\*\//g,
  "name: 'Daiene Maria de Meneses',\n    initials: 'DM',\n    image: '/equipe/daiene.jpg',"
);

content = content.replace(
  /name: 'Kaelara Castro Bernardes Rosa',\s*initials: 'KC',\s*image: '[^']*',\s*\/\*.*?\*\//g,
  "name: 'Kaelara Castro Bernardes Rosa',\n    initials: 'KC',\n    image: '/equipe/kaelara.png',"
);

content = content.replace(
  /initials: 'SJ',\s*image: '[^']*',\s*\/\*.*?\*\//g,
  "initials: 'SJ',\n    image: '/equipe/jhonatan.jpg',"
);

fs.writeFileSync('D:\\Backup_Projetos\\Jornal\\src\\app\\equipe\\page.js', content, 'utf8');
