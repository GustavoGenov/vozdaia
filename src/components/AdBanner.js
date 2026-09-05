'use client';
import { useEffect, useState, useRef } from 'react';

// Anti-Click Bombing Configuration
const MAX_CLICKS = 3; 
const TIME_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

export default function AdBanner({ dataAdSlot, dataAdFormat = 'auto', dataFullWidthResponsive = 'true', minHeight = '280px' }) {
  const [shouldShowAd, setShouldShowAd] = useState(true);
  const isHovering = useRef(false);

  useEffect(() => {
    // 1. Check click history on mount
    const checkClickHistory = () => {
      try {
        const historyStr = localStorage.getItem('adsense_clicks');
        if (!historyStr) return true;
        
        const history = JSON.parse(historyStr);
        const now = Date.now();
        const recentClicks = history.filter(time => now - time < TIME_WINDOW_MS);
        
        if (recentClicks.length !== history.length) {
          localStorage.setItem('adsense_clicks', JSON.stringify(recentClicks));
        }

        if (recentClicks.length >= MAX_CLICKS) {
          console.warn('AdSense Anti-Click Fraud: Ads hidden for this user to protect account.');
          return false;
        }
        return true;
      } catch (e) {
        return true;
      }
    };

    if (!checkClickHistory()) {
      setShouldShowAd(false);
      return;
    }

    // 2. Initialize AdSense if allowed
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense Error:', err);
    }

    // 3. Listen for window blur (clicking iframe ad)
    const handleWindowBlur = () => {
      if (isHovering.current) {
        try {
          const historyStr = localStorage.getItem('adsense_clicks');
          const history = historyStr ? JSON.parse(historyStr) : [];
          history.push(Date.now());
          localStorage.setItem('adsense_clicks', JSON.stringify(history));
          
          if (history.length >= MAX_CLICKS) {
            setShouldShowAd(false);
          }
        } catch (e) {
          // ignore
        }
      }
    };

    window.addEventListener('blur', handleWindowBlur);
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  if (!shouldShowAd) {
    return null;
  }

  return (
    <div 
      className="ad-banner-container"
      style={{ 
        margin: '28px 0', 
        textAlign: 'center', 
        overflow: 'hidden',
        minHeight: minHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--gn-surface, rgba(0, 0, 0, 0.02))',
        borderRadius: '10px'
      }}
      onMouseEnter={() => { isHovering.current = true; }}
      onMouseLeave={() => { isHovering.current = false; }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '300px', minHeight: minHeight, width: '100%' }}
        data-ad-client="ca-pub-5759690232636098"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive}
      />
    </div>
  );
}
