require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const newCategories = [
  { name: 'Mundo (Geopolítica)', slug: 'geopolitica', color_code: '#34a853' },
  { name: 'Brasil (Política)', slug: 'politica-eleicoes', color_code: '#0f9d58' },
  { name: 'Economia', slug: 'economia', color_code: '#673ab7' },
  { name: 'Jogos', slug: 'jogos', color_code: '#9c27b0' },
  { name: 'Religião', slug: 'religiao', color_code: '#795548' },
  { name: 'Formiga-MG', slug: 'formiga-mg', color_code: '#ff5722' },
  { name: 'Engenharia e Tech', slug: 'engenharia-e-tech', color_code: '#00bcd4' },
  { name: 'Medicina e Bio Tech', slug: 'medicina-e-bio-tech', color_code: '#ff9800' },
  { name: 'Esportes', slug: 'esportes', color_code: '#d32f2f' },
  { name: 'Militar & Governo', slug: 'militar-e-governo', color_code: '#556b2f' }
];

async function migrate() {
  console.log("Inserindo novas categorias...");
  
  for (const cat of newCategories) {
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

  console.log("Buscando IDs para migração...");
  const { data: oldCat } = await supabase.from('categories').select('id').eq('slug', 'economia-jogos').single();
  const { data: newCat } = await supabase.from('categories').select('id').eq('slug', 'economia').single();

  if (oldCat && newCat) {
    console.log(`Migrando artigos do ID ${oldCat.id} para ${newCat.id}...`);
    const { data, error } = await supabase
      .from('articles')
      .update({ category_id: newCat.id })
      .eq('category_id', oldCat.id);

    if (error) {
      console.error("Erro na migração:", error.message);
    } else {
      console.log("Artigos migrados com sucesso para 'Economia'.");
    }
    
    // Opcional: apagar a categoria velha
    console.log("Apagando a categoria antiga 'economia-jogos'...");
    const { error: delError } = await supabase.from('categories').delete().eq('id', oldCat.id);
    if (delError) {
      console.error("Erro ao apagar categoria antiga:", delError.message);
    } else {
      console.log("Categoria antiga apagada com sucesso!");
    }
  } else {
    console.log("Categoria antiga ou nova não encontrada para migração.");
  }
}

migrate();
