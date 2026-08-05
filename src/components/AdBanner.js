'use client';
import { useEffect } from 'react';

export default function AdBanner({ dataAdSlot, dataAdFormat = 'auto', dataFullWidthResponsive = 'true' }) {
  useEffect(() => {
    try {
      // O AdSense injeta os banners preenchendo a array window.adsbygoogle
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense Error:', err);
    }
  }, []);

  return (
    <div style={{ margin: '24px 0', textAlign: 'center', overflow: 'hidden' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5759690232636098"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive}
      />
    </div>
  );
}
