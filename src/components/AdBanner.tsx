import { useEffect, useRef } from 'react'

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar'
}

const AdBanner = ({ position }: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // This would be replaced with actual Google AdSense code
    // For now, we're just simulating an ad
    if (adRef.current) {
      const adElement = adRef.current
      
      // In a real implementation, Google AdSense would handle this
      // This is just for demonstration purposes
      if (window.adsbygoogle) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (e) {
          console.error('AdSense error:', e)
        }
      }
    }
  }, [])
  
  const getAdSize = () => {
    switch (position) {
      case 'top':
      case 'bottom':
        return { width: '100%', height: '90px' }
      case 'sidebar':
        return { width: '100%', height: '250px' }
      default:
        return { width: '100%', height: '90px' }
    }
  }
  
  const { width, height } = getAdSize()
  
  return (
    <div 
      ref={adRef}
      className="bg-secondary-100 rounded-lg overflow-hidden mb-6 flex items-center justify-center"
      style={{ width, height }}
    >
      {/* This would be replaced with actual Google AdSense code */}
      <div className="text-secondary-500 text-sm">
        Advertisement
      </div>
      
      {/* Actual AdSense code would look something like this: */}
      {/* 
      <ins 
        className="adsbygoogle"
        style={{ display: 'block', width, height }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      */}
    </div>
  )
}

export default AdBanner