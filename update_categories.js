require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const newCategories = [
  { name: 'Inteligência Artificial & Agentes', slug: 'inteligencia-artificial-e-agentes', color_code: '#9c27b0' },
  { name: 'Engenharia & hardware', slug: 'engenharia-e-hardware', color_code: '#00bcd4' },
  { name: 'Ciência & Fronteira Espacial', slug: 'ciencia-e-fronteira-espacial', color_code: '#e91e63' },
  { name: 'Tech & Gaming', slug: 'tech-e-gaming', color_code: '#1a73e8' },
  { name: 'Religião', slug: 'religiao', color_code: '#795548' },
  { name: 'Clima tempo', slug: 'clima-tempo', color_code: '#0f9d58' },
  { name: 'Passatempos', slug: 'passatempos', color_code: '#ffeb3b' },
  { name: 'Horóscopo & Tarô', slug: 'horoscopo-e-taro', color_code: '#ff9800' }
];

async function updateCategories() {
  console.log('Fetching existing categories...');
  const { data: existing, error: fetchErr } = await supabase.from('categories').select('id');
  
  if (fetchErr) {
    console.error('Error fetching categories', fetchErr);
    return;
  }

  // Se houver RLS impedindo a exclusão anônima, os IDs que inserirmos já ficam
  // No entanto, as categorias antigas também ficarão. Vamos tentar deletá-las
  if (existing.length > 0) {
    for (const cat of existing) {
      const { error: delErr } = await supabase.from('categories').delete().eq('id', cat.id);
      if (delErr) {
        console.log('Warning: could not delete category', cat.id, delErr.message);
      }
    }
  }

  console.log('Inserting new categories...');
  for (const cat of newCategories) {
    const { data, error } = await supabase.from('categories').select('id').eq('slug', cat.slug).single();
    if (!data) {
      const { error: insErr } = await supabase.from('categories').insert([cat]);
      if (insErr) {
        console.error('Error inserting', cat.name, insErr.message);
      } else {
        console.log('Inserted', cat.name);
      }
    } else {
      // Update name or color if needed
      await supabase.from('categories').update(cat).eq('slug', cat.slug);
      console.log('Updated existing', cat.name);
    }
  }
  console.log('Done updating categories.');
}

updateCategories();
