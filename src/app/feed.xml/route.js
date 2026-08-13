import { supabase } from '@/lib/supabase';

export const revalidate = 600; // Cache de 10 minutos

export async function GET() {
  const baseUrl = 'https://vozdaia.vercel.app';

  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('title, slug, summary, created_at, author')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) throw error;

    const lastBuildDate = new Date().toUTCString();

    const itemsXml = (articles || [])
      .map((article) => {
        const url = `${baseUrl}/artigo/${article.slug}`;
        const pubDate = new Date(article.created_at).toUTCString();
        // Escape special XML characters
        const escapeXml = (str) =>
          str
            ? str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;')
            : '';

        return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(article.author || 'Voz da I.A')}</author>
      <description>${escapeXml(article.summary)}</description>
    </item>`;
      })
      .join('');

    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Voz da I.A</title>
    <link>${baseUrl}</link>
    <description>O jornal focado em combater fake news com informação de alta tecnologia.</description>
    <language>pt-BR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

    return new Response(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 's-maxage=600, stale-while-revalidate',
      },
    });
  } catch (err) {
    console.error('Erro ao gerar feed RSS:', err);
    return new Response('<error>Erro ao gerar feed</error>', {
      status: 500,
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}
