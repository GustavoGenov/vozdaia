import { supabase } from '@/lib/supabase';

export default async function sitemap() {
  const baseUrl = 'https://vozdaia.vercel.app';

  // Busca todos os artigos
  const { data: articles } = await supabase.from('articles').select('slug, created_at');
  
  // Busca todas as categorias
  const { data: categories } = await supabase.from('categories').select('slug');

  // Mapeia os artigos para o formato do sitemap
  const articleUrls = articles?.map((article) => ({
    url: `${baseUrl}/artigo/${article.slug}`,
    lastModified: article.created_at || new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  })) || [];

  // Mapeia as categorias
  const categoryUrls = categories?.map((cat) => ({
    url: `${baseUrl}/categoria/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  })) || [];

  // Retorna todas as rotas
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    ...categoryUrls,
    ...articleUrls,
  ];
}
