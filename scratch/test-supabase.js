const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nisbarqzsjqylsvnyxrm.supabase.co';
const supabaseKey = 'sb_publishable_2YAi5QTLgKDTeTOX8P-F_Q_9wfFnKnX';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', 'religiao')
    .single();

  console.log('Categoria Religião atual:', categories);
}

run();
