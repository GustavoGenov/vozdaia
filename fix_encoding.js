
const fs = require('fs');
let content = fs.readFileSync('src/app/admin/PublishForm.js', 'utf8');
// Fix broken characters
content = content.replace(/Ttulo/g, 'Título')
                 .replace(/MatǸria/g, 'Matéria')
                 .replace(/Informaes/g, 'Informações')
                 .replace(/Amigǭvel/g, 'Amigável')
                 .replace(/Automǭtico/g, 'Automático')
                 .replace(/Responsǭvel/g, 'Responsável')
                 .replace(/Obrigatrio/g, 'Obrigatório')
                 .replace(/robs/g, 'robôs')
                 .replace(/CrǸditos/g, 'Créditos')
                 .replace(/Ilustraǜo/g, 'Ilustração')
                 .replace(/Conteǧdo/g, 'Conteúdo')
                 .replace(/Citaes/g, 'Citações')
                 .replace(/TransparǦncia/g, 'Transparência')
                 .replace(/Jornalstica/g, 'Jornalística')
                 .replace(/Padrǜo/g, 'Padrão')
                 .replace(/Opiniǜo/g, 'Opinião')
                 .replace(/TǸcnica/g, 'Técnica')
                 .replace(/ReferǦncias/g, 'Referências')
                 .replace(/PUBLICAǟO/g, 'PUBLICAÇÃO')
                 .replace(/notcia/g, 'notícia');
fs.writeFileSync('src/app/admin/PublishForm.js', content, 'utf8');

