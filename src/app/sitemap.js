import { supabase } from '@/lib/supabase';

export const revalidate = 3600; // Atualiza o sitemap a cada 1 hora

export default async function sitemap() {
  const baseUrl = 'https://vozdaia.vercel.app';
  
  // Rotas estáticas principais
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/termos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Buscar artigos dinâmicos
  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('slug, created_at')
      .eq('published', true);

    if (!error && articles) {
      const articleRoutes = articles.map((article) => ({
        url: `${baseUrl}/artigo/${article.slug}`,
        lastModified: new Date(article.created_at),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
      
      routes.push(...articleRoutes);
    }
  } catch (err) {
    console.error('Erro ao gerar rotas de artigos no sitemap:', err);
  }

  return routes;
}
