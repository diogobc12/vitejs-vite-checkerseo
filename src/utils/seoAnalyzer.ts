import axios from 'axios'
import { SEOResult } from '../types/seo'

// Helper function to extract domain from URL
const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch (e) {
    return url
  }
}

// Helper function to count words in text
const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

// Helper function to extract keywords and their density
const extractKeywords = (text: string, minLength = 3): Array<{ word: string, count: number, density: number }> => {
  // Remove common words and punctuation
  const cleanText = text.toLowerCase().replace(/[^\w\s]/g, '')
  const words = cleanText.split(/\s+/).filter(word => word.length >= minLength)
  
  // Count word occurrences
  const wordCounts: Record<string, number> = {}
  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1
  })
  
  // Convert to array and sort by count
  const totalWords = words.length
  const keywordArray = Object.entries(wordCounts)
    .map(([word, count]) => ({
      word,
      count,
      density: parseFloat(((count / totalWords) * 100).toFixed(2))
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20) // Return top 20 keywords
  
  return keywordArray
}

export const analyzeSEO = async (url: string): Promise<SEOResult> => {
  try {
    // In a real implementation, this would make a request to the target website
    // For demo purposes, we'll simulate the analysis with mock data
    
    // Simulate a network request delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate mock data based on the URL
    const domain = extractDomain(url)
    const hasHttps = url.startsWith('https://')
    
    // Create a somewhat randomized but consistent result based on the URL
    const urlHash = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const randomFactor = (urlHash % 30) - 15 // Range from -15 to 15
    
    // Base scores that will be adjusted
    let metaTagsScore = 75 + randomFactor
    let headingsScore = 70 + randomFactor
    let imagesScore = 65 + randomFactor
    let linksScore = 80 + randomFactor
    let keywordsScore = 85 + randomFactor
    let mobileFriendlinessScore = 90 + randomFactor
    let pageSpeedScore = 60 + randomFactor
    
    // Ensure scores are within 0-100 range
    const clampScore = (score: number) => Math.max(0, Math.min(100, Math.round(score)))
    
    // Adjust scores based on URL characteristics
    if (!hasHttps) {
      pageSpeedScore -= 15
    }
    
    // Generate mock SEO data
    const result: SEOResult = {
      url,
      metaTags: {
        score: clampScore(metaTagsScore),
        title: `${domain} - Official Website`,
        titleLength: `${domain} - Official Website`.length,
        description: `Welcome to ${domain}, your source for information about our products and services. Learn more about what we offer.`,
        descriptionLength: `Welcome to ${domain}, your source for information about our products and services. Learn more about what we offer.`.length,
        otherMetaTags: [
          { name: 'robots', content: 'index, follow' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { property: 'og:title', content: `${domain} - Official Website` },
          { property: 'og:type', content: 'website' }
        ]
      },
      headings: {
        score: clampScore(headingsScore),
        h1Count: 1,
        h2Count: 5,
        h3Count: 8,
        h1s: [`Welcome to ${domain}`],
        headingStructureIssues: urlHash % 3 === 0 ? ['H2 appears before H1'] : [],
        headingSamples: {
          h2s: [
            'Our Services',
            'About Us',
            'Contact Information',
            'Latest News',
            'Testimonials'
          ],
          h3s: [
            'Web Development',
            'Digital Marketing',
            'Customer Support',
            'Our Team',
            'Our Mission'
          ]
        }
      },
      images: {
        score: clampScore(imagesScore),
        totalImages: 12,
        imagesWithAlt: 8,
        imagesWithoutAlt: 4,
        imagesWithoutAltSamples: [
          `https://${domain}/images/banner.jpg`,
          `https://${domain}/images/product1.jpg`,
          `https://${domain}/images/team.jpg`,
          `https://${domain}/images/logo-small.png`
        ],
        largeImages: [
          {
            src: `https://${domain}/images/hero-banner.jpg`,
            alt: 'Hero Banner',
            size: '1.2MB'
          },
          {
            src: `https://${domain}/images/team-photo.jpg`,
            alt: 'Our Team',
            size: '850KB'
          }
        ]
      },
      links: {
        score: clampScore(linksScore),
        totalLinks: 35,
        internalLinks: 22,
        externalLinks: 13,
        brokenLinks: urlHash % 5 === 0 ? 2 : 0,
        noFollowLinks: 5,
        brokenLinksList: urlHash % 5 === 0 ? [
          { url: `https://${domain}/old-page.html`, text: 'Old Page' },
          { url: `https://external-site.com/resource`, text: 'External Resource' }
        ] : [],
        externalDomains: [
          { domain: 'facebook.com', count: 1 },
          { domain: 'twitter.com', count: 1 },
          { domain: 'linkedin.com', count: 1 },
          { domain: 'youtube.com', count: 1 },
          { domain: 'google.com', count: 2 }
        ]
      },
      keywords: {
        score: clampScore(keywordsScore),
        wordCount: 1200 + (urlHash % 800),
        keywordCount: 120,
        topKeywords: [
          { word: domain.split('.')[0], count: 24, density: 2.0 },
          { word: 'services', count: 18, density: 1.5 },
          { word: 'products', count: 15, density: 1.25 },
          { word: 'information', count: 12, density: 1.0 },
          { word: 'contact', count: 10, density: 0.83 },
          { word: 'about', count: 9, density: 0.75 },
          { word: 'support', count: 8, density: 0.67 },
          { word: 'quality', count: 7, density: 0.58 },
          { word: 'professional', count: 6, density: 0.5 },
          { word: 'experience', count: 5, density: 0.42 }
        ],
        keywordInTitle: true,
        keywordInDescription: true,
        keywordInHeadings: true,
        keywordInFirstParagraph: urlHash % 2 === 0
      },
      mobileFriendliness: {
        score: clampScore(mobileFriendlinessScore),
        hasViewportTag: true,
        viewportContent: 'width=device-width, initial-scale=1',
        mobileIssues: urlHash % 4 === 0 ? [
          'Content wider than screen',
          'Clickable elements too close together'
        ] : [],
        touchTargetIssues: urlHash % 4 === 0 ? 3 : 0,
        fontSizeIssues: urlHash % 6 === 0 ? 2 : 0
      },
      pageSpeed: {
        score: clampScore(pageSpeedScore),
        totalResourceSize: 1500000 + (urlHash % 1000000),
        totalRequests: 45 + (urlHash % 30),
        loadTime: 2.5 + (urlHash % 10) / 10,
        largeResources: [
          {
            url: `https://${domain}/js/main.js`,
            type: 'JavaScript',
            size: 420000
          },
          {
            url: `https://${domain}/css/styles.css`,
            type: 'CSS',
            size: 150000
          },
          {
            url: `https://${domain}/images/hero.jpg`,
            type: 'Image',
            size: 850000
          }
        ],
        recommendations: [
          'Enable text compression',
          'Defer offscreen images',
          'Minify JavaScript',
          'Eliminate render-blocking resources',
          'Serve images in next-gen formats'
        ],
        cacheIssues: urlHash % 3 === 0 ? 8 : 0
      }
    }
    
    return result
  } catch (error) {
    console.error('Error analyzing SEO:', error)
    throw new Error('Failed to analyze the website')
  }
}