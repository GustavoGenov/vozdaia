require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function fixImageUrls() {
  const { data: articles, error } = await supabase.from('articles').select('id, image_url');
  
  if (error) {
    console.error('Erro ao buscar artigos', error);
    return;
  }

  const publicDir = path.join(__dirname, 'public', 'articles');
  const files = fs.existsSync(publicDir) ? fs.readdirSync(publicDir) : [];

  for (const article of articles) {
    if (article.image_url && article.image_url.includes('supabase.co/storage')) {
      // Extract the filename from the end of the Supabase URL
      const supabaseFileName = article.image_url.split('/').pop();
      
      // Find the corresponding local file
      const localFile = files.find(f => f.includes(supabaseFileName) && f.includes(article.id));
      
      if (localFile) {
        const newUrl = `/articles/${localFile}`;
        console.log(`Atualizando ${article.id} -> ${newUrl}`);
        
        await supabase.from('articles').update({ image_url: newUrl }).eq('id', article.id);
      } else {
        console.log(`[AVISO] Arquivo local não encontrado para ${article.id} (${supabaseFileName})`);
      }
    }
  }
  
  console.log('Finalizado!');
}

fixImageUrls();
