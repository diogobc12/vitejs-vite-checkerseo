// import axios from 'axios'
import { SEOResult } from '../types/seo';

// Helper function to extract domain from URL
const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (e) {
    return url;
  }
};

// Helper function to count words in text
const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

// Helper function to extract keywords and their density
const extractKeywords = (text: string, minLength = 3): Array<{ word: string, count: number, density: number }> => {
  const cleanText = text.toLowerCase().replace(/[^\w\s]/g, '');
  const words = cleanText.split(/\s+/).filter(word => word.length >= minLength);

  const wordCounts: Record<string, number> = {};
  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });

  const totalWords = words.length;
  const keywordArray = Object.entries(wordCounts)
    .map(([word, count]) => ({
      word,
      count,
      density: parseFloat(((count / totalWords) * 100).toFixed(2)),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  return keywordArray;
};

export const analyzeSEO = async (url: string): Promise<SEOResult> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const domain = extractDomain(url);
    const hasHttps = url.startsWith('https://');

    const urlHash = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const randomFactor = (urlHash % 30) - 15;

    let metaTagsScore = 75 + randomFactor;
    let headingsScore = 70 + randomFactor;
    let imagesScore = 65 + randomFactor;
    let linksScore = 80 + randomFactor;
    let keywordsScore = 85 + randomFactor;
    let mobileFriendlinessScore = 90 + randomFactor;
    let pageSpeedScore = 60 + randomFactor;

    const clampScore = (score: number) => Math.max(0, Math.min(100, Math.round(score)));

    if (!hasHttps) {
      pageSpeedScore -= 15;
    }

    const result: SEOResult = {
      url,
      metaTags: {
        score: clampScore(metaTagsScore),
        title: `${domain} - Official Website`,
        titleLength: `${domain} - Official Website`.length,
        description: `Welcome to ${domain}, your source for information about our products and services.`,
        descriptionLength: `Welcome to ${domain}, your source for information about our products and services.`.length,
        otherMetaTags: [
          { name: 'robots', content: 'index, follow' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { property: 'og:title', content: `${domain} - Official Website` },
          { property: 'og:type', content: 'website' },
        ],
      },
      headings: {
        score: clampScore(headingsScore),
        h1Count: 1,
        h2Count: 5,
        h3Count: 8,
        h1s: [`Welcome to ${domain}`],
        headingStructureIssues: urlHash % 3 === 0 ? ['H2 appears before H1'] : [],
        headingSamples: {
          h2s: ['Our Services', 'About Us', 'Contact Information', 'Latest News', 'Testimonials'],
          h3s: ['Web Development', 'Digital Marketing', 'Customer Support', 'Our Team', 'Our Mission'],
        },
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
          `https://${domain}/images/logo-small.png`,
        ],
      },
      links: {
        score: clampScore(linksScore),
        totalLinks: 35,
        internalLinks: 22,
        externalLinks: 13,
        brokenLinks: urlHash % 5 === 0 ? 2 : 0,
        noFollowLinks: 5,
      },
      keywords: {
        score: clampScore(keywordsScore),
        wordCount: 1200 + (urlHash % 800),
        keywordCount: 120,
        topKeywords: [
          { word: domain.split('.')[0], count: 24, density: 2.0 },
          { word: 'services', count: 18, density: 1.5 },
          { word: 'products', count: 15, density: 1.25 },
        ],
        keywordInTitle: true,
        keywordInDescription: true,
        keywordInHeadings: true,
        keywordInFirstParagraph: urlHash % 2 === 0,
      },
      mobileFriendliness: {
        score: clampScore(mobileFriendlinessScore),
        hasViewportTag: true,
      },
      pageSpeed: {
        score: clampScore(pageSpeedScore),
        totalResourceSize: 1500000 + (urlHash % 1000000),
      },
    };

    return result;
  } catch (error) {
    console.error('Error analyzing SEO:', error);
    throw new Error('Failed to analyze the website');
  }
};
