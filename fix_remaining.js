require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const https = require('https');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function fixRemainingImages() {
  const { data: articles, error } = await supabase.from('articles').select('id, image_url');
  const publicDir = path.join(__dirname, 'public', 'articles');

  for (const article of articles) {
    if (article.image_url && article.image_url.includes('supabase.co/storage')) {
      const supabaseFileName = article.image_url.split('/').pop();
      const localFileName = `article_${article.id}_${supabaseFileName}`;
      const localPath = path.join(publicDir, localFileName);
      
      console.log(`Baixando nova imagem: ${article.image_url}`);
      try {
        await download(article.image_url, localPath);
        const newUrl = `/articles/${localFileName}`;
        await supabase.from('articles').update({ image_url: newUrl }).eq('id', article.id);
        console.log(`> Atualizado: ${newUrl}`);
      } catch (err) {
        console.error(`> Erro ao baixar ${article.image_url}`, err);
      }
    }
  }
}

fixRemainingImages();
