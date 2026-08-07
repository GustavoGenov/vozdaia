const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const categories = [
  { name: 'Mundo (Geopolítica)', slug: 'geopolitica', color_code: '#34a853' },
  { name: 'Brasil (Política)', slug: 'politica-eleicoes', color_code: '#0f9d58' },
  { name: 'Negócios & Economia', slug: 'economia-jogos', color_code: '#673ab7' },
  { name: 'Engenharia e Tech', slug: 'engenharia-e-tech', color_code: '#00bcd4' },
  { name: 'Medicina e Bio Tech', slug: 'medicina-e-bio-tech', color_code: '#ff9800' },
  { name: 'Esportes', slug: 'esportes', color_code: '#d32f2f' },
  { name: 'Militar & Governo', slug: 'militar-e-governo', color_code: '#556b2f' }
];

async function seedCategories() {
  for (const cat of categories) {
    // Verifica se já existe para não duplicar
    const { data: existing } = await supabase.from('categories').select('id').eq('slug', cat.slug).single();
    if (!existing) {
      const { error } = await supabase.from('categories').insert([cat]);
      if (error) {
        console.error(`Erro ao inserir ${cat.name}:`, error.message);
      } else {
        console.log(`Categoria ${cat.name} inserida!`);
      }
    } else {
      console.log(`Categoria ${cat.name} já existe.`);
    }
  }
}

seedCategories();
