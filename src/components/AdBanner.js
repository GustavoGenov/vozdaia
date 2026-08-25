'use client';
import { useEffect, useState, useRef } from 'react';

// Anti-Click Bombing Configuration
const MAX_CLICKS = 3; 
const TIME_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

export default function AdBanner({ dataAdSlot, dataAdFormat = 'auto', dataFullWidthResponsive = 'true' }) {
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
        // Filter out clicks older than 24h
        const recentClicks = history.filter(time => now - time < TIME_WINDOW_MS);
        
        // Update storage if we cleaned up old clicks
        if (recentClicks.length !== history.length) {
          localStorage.setItem('adsense_clicks', JSON.stringify(recentClicks));
        }

        // If user clicked 3 or more times recently, hide ads
        if (recentClicks.length >= MAX_CLICKS) {
          console.warn('AdSense Anti-Click Fraud: Ads hidden for this user to protect account.');
          return false;
        }
        return true;
      } catch (e) {
        return true; // fail gracefully
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

    // 3. Listen for window blur (which happens when clicking an iframe ad)
    const handleWindowBlur = () => {
      if (isHovering.current) {
        // Register a click!
        try {
          const historyStr = localStorage.getItem('adsense_clicks');
          const history = historyStr ? JSON.parse(historyStr) : [];
          history.push(Date.now());
          localStorage.setItem('adsense_clicks', JSON.stringify(history));
          
          if (history.length >= MAX_CLICKS) {
            setShouldShowAd(false);
          }
        } catch (e) {
          // ignore storage errors
        }
      }
    };

    window.addEventListener('blur', handleWindowBlur);
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  if (!shouldShowAd) {
    return <div style={{ margin: '24px 0', textAlign: 'center', padding: '20px', color: 'transparent' }} aria-hidden="true">-</div>;
  }

  return (
    <div 
      style={{ margin: '24px 0', textAlign: 'center', overflow: 'hidden' }}
      onMouseEnter={() => { isHovering.current = true; }}
      onMouseLeave={() => { isHovering.current = false; }}
    >
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
