import './globals.css';
import Script from 'next/script';
import { supabase } from '@/lib/supabase';
import { Providers } from './providers';
import LayoutShell from './components/LayoutShell';

export const metadata = {
  title: 'Voz da I.A - Combate às Fake News com Tecnologia',
  description: 'O jornal focado em combater fake news com informação de alta tecnologia.',
  verification: {
    google: '1YkiwnFQje5MEJRsiTxJdMh7F1KobrpEPMdLtg92qQo',
  },
  other: {
    'google-adsense-account': 'ca-pub-5759690232636098'
  }
};

export const revalidate = 60;

export default async function RootLayout({ children }) {
  const { data: categoriesData } = await supabase.from('categories').select('*');
  
  const sortOrder = {
    'IA Sem Mitos': 1,
    'Kaelara Insights': 2
  };

  let processedCategories = (categoriesData || []).map(cat => {
    if (cat.slug === 'religiao') {
      return { ...cat, color_code: '#8e24aa' };
    }
    return cat;
  });

  if (!processedCategories.some(cat => cat.slug === 'horoscopo')) {
    processedCategories.push({
      id: 'horoscopo-virtual-id',
      name: 'Horóscopo & Tarô',
      slug: 'horoscopo',
      color_code: '#e040fb',
      views: 0
    });
  }
  
  const categories = processedCategories.sort((a, b) => {
    const rankA = sortOrder[a.name] || 99;
    const rankB = sortOrder[b.name] || 99;
    if (rankA !== rankB) return rankA - rankB;
    return a.name.localeCompare(b.name, 'pt-BR');
  });

  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Extended" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Script Global do Google AdSense (Tag HTML clássica para verificação automática de Bots) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5759690232636098"
          crossOrigin="anonymous"
        ></script>

        {/* Subscribe with Google (SWG Basic) */}
        <Script
          async
          src="https://news.google.com/swg/js/v1/swg-basic.js"
          strategy="afterInteractive"
        />
        <Script id="swg-basic-init" strategy="afterInteractive">
          {`
            (self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
              basicSubscriptions.init({
                type: "NewsArticle",
                isPartOfType: ["Product"],
                isPartOfProductId: "CAowtp7hCw:openaccess",
                clientOptions: { theme: "light", lang: "pt-BR" },
              });
            });
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <LayoutShell categories={categories}>
            {children}
          </LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
