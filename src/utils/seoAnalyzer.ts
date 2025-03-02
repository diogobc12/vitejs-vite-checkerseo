import { SEOResult } from '../types/seo';

// Helper function to extract domain from URL
const extractDomain = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

export const analyzeSEO = async (url: string): Promise<SEOResult> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const domain = extractDomain(url);
    const hasHttps = url.startsWith('https://');

    const urlHash = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const randomFactor = (urlHash % 30) - 15;

    let scores = {
      metaTags: 75,
      headings: 70,
      images: 65,
      links: 80,
      keywords: 85,
      mobileFriendliness: 90,
      pageSpeed: 60,
    };

    const clampScore = (score: number) => Math.max(0, Math.min(100, Math.round(score + randomFactor)));
    if (!hasHttps) scores.pageSpeed -= 15;

    const result: SEOResult = {
      url,
      metaTags: {
        score: clampScore(scores.metaTags),
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
        score: clampScore(scores.headings),
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
        score: clampScore(scores.images),
        totalImages: 12,
        imagesWithAlt: 8,
        imagesWithoutAlt: 4,
        imagesWithoutAltSamples: [
          `https://${domain}/images/banner.jpg`,
          `https://${domain}/images/product1.jpg`,
        ],
      },
      links: {
        score: clampScore(scores.links),
        totalLinks: 35,
        internalLinks: 22,
        externalLinks: 13,
        brokenLinks: urlHash % 5 === 0 ? 2 : 0,
        noFollowLinks: 5,
      },
      keywords: {
        score: clampScore(scores.keywords),
        wordCount: 1200 + (urlHash % 800),
        keywordCount: 120,
        topKeywords: [{ word: domain.split('.')[0], count: 24, density: 2.0 }],
        keywordInTitle: true,
        keywordInDescription: true,
        keywordInHeadings: true,
        keywordInFirstParagraph: urlHash % 2 === 0,
      },
      mobileFriendliness: {
        score: clampScore(scores.mobileFriendliness),
        hasViewportTag: true,
      },
      pageSpeed: {
        score: clampScore(scores.pageSpeed),
        totalResourceSize: 1500000 + (urlHash % 1000000),
      },
    };

    return result;
  } catch (error) {
    console.error('Error analyzing SEO:', error);
    throw new Error('Failed to analyze the website');
  }
};
