import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar';
}

const AdBanner = ({ position }: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.adsbygoogle && adRef.current) {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, []);

  const getAdSize = () => {
    switch (position) {
      case 'top':
      case 'bottom':
        return { width: '100%', height: '90px' };
      case 'sidebar':
        return { width: '100%', height: '250px' };
      default:
        return { width: '100%', height: '90px' };
    }
  };

  const { width, height } = getAdSize();

  return (
    <div
      ref={adRef}
      className="bg-secondary-100 rounded-lg overflow-hidden mb-6 flex items-center justify-center"
      style={{ width, height }}
    >
      <div className="text-secondary-500 text-sm">Advertisement</div>

      {/* Actual Google AdSense code */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width, height }}
        data-ad-client="ca-pub-2912552666946026"
        data-ad-slot="YOUR_AD_SLOT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdBanner;
