import re

with open('src/app/sitemap.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Change baseUrl
content = content.replace("const baseUrl = 'https://vozdaia.vercel.app';", "const baseUrl = 'https://vozdaia.com';")

# Add category fetching
new_fetching = '''
  // Buscar artigos dinâmicos
  try {
    const { data: articles, error: artError } = await supabase
      .from('articles')
      .select('slug, created_at')
      .eq('published', true);

    if (!artError && articles) {
      const articleRoutes = articles.map((article) => ({
        url: ${baseUrl}/artigo/,
        lastModified: new Date(article.created_at),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
      routes.push(...articleRoutes);
    }
  } catch (err) {
    console.error('Erro ao gerar rotas de artigos no sitemap:', err);
  }

  // Buscar categorias dinâmicas
  try {
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('slug');

    if (!catError && categories) {
      const categoryRoutes = categories.map((cat) => ({
        url: ${baseUrl}/categoria/,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      }));
      routes.push(...categoryRoutes);
    }
    
    // Adicionar rotas estáticas extras (clima e equipe)
    routes.push({
      url: ${baseUrl}/clima,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });
    routes.push({
      url: ${baseUrl}/equipe,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  } catch (err) {
    console.error('Erro ao gerar rotas de categorias no sitemap:', err);
  }
'''

# Use regex to replace the old article fetching block with the new combined one
content = re.sub(r'// Buscar artigos dinâmicos.*?} catch \(err\) \{.*?\}', new_fetching, content, flags=re.DOTALL)

with open('src/app/sitemap.js', 'w', encoding='utf-8') as f:
    f.write(content)
