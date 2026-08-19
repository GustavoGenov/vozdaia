
const https = require('https');
https.get('https://rachacuca.com.br/jogos/', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(data.match(/href=[\"\'](\/jogos\/.*?)[\"\']/g)?.slice(0, 20));
  });
});

