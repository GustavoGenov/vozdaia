const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envLocal = fs.readFileSync('D:\\Backup_Projetos\\Jornal\\.env.local', 'utf8');
const supabaseUrl = envLocal.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const supabaseKey = envLocal.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteAll() {
  const { data, error } = await supabase.from('articles').select('id');
  if (error) {
    console.error('Error fetching articles:', error);
    return;
  }
  
  if (data.length === 0) {
    console.log('No articles found.');
    return;
  }
  
  console.log('Found ' + data.length + ' articles. Deleting...');
  
  for (const article of data) {
    const { error: deleteError } = await supabase.from('articles').delete().eq('id', article.id);
    if (deleteError) {
      console.error('Error deleting article:', article.id, deleteError);
    }
  }
  
  console.log('Finished deleting all articles.');
}

deleteAll();
