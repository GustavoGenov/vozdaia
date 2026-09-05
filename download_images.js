const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const https = require('https');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const publicImagesDir = path.join(__dirname, 'public', 'articles');
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error('Failed to download image: ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  const { data: articles, error } = await supabase.from('articles').select('id, image_url');
  if (error) {
    console.error('Error fetching articles:', error);
    return;
  }

  for (const article of articles) {
    if (article.image_url && article.image_url.startsWith('http')) {
      const fileName = `article_${article.id}_${path.basename(new URL(article.image_url).pathname)}`;
      const destPath = path.join(publicImagesDir, fileName);
      const newUrl = `/articles/${fileName}`;

      console.log(`Downloading ${article.image_url} to ${newUrl}...`);
      try {
        await downloadImage(article.image_url, destPath);
        
        // Update database
        const { error: updateError } = await supabase
          .from('articles')
          .update({ image_url: newUrl })
          .eq('id', article.id);
          
        if (updateError) {
          console.error(`Error updating article ${article.id}:`, updateError);
        } else {
          console.log(`Updated article ${article.id} with new URL.`);
        }
      } catch (err) {
        console.error(`Failed to process article ${article.id}:`, err.message);
      }
    }
  }
  console.log('Done!');
}

run();
