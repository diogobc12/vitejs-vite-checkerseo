export interface MetaTagsResult {
  score: number
  title: string | null
  titleLength: number | null
  description: string | null
  descriptionLength: number | null
  otherMetaTags?: Array<{
    name?: string
    property?: string
    httpEquiv?: string
    content: string
  }>
}

export interface HeadingsResult {
  score: number
  h1Count: number
  h2Count: number
  h3Count: number
  h1s?: string[]
  headingStructureIssues?: string[]
  headingSamples?: {
    h2s?: string[]
    h3s?: string[]
  }
}

export interface ImagesResult {
  score: number
  totalImages: number
  imagesWithAlt: number
  imagesWithoutAlt: number
  imagesWithoutAltSamples?: string[]
  largeImages?: Array<{
    src: string
    alt?: string
    size?: string
  }>
}

export interface LinksResult {
  score: number
  totalLinks: number
  internalLinks: number
  externalLinks: number
  brokenLinks?: number
  noFollowLinks?: number
  brokenLinksList?: Array<{
    url: string
    text?: string
  }>
  externalDomains?: Array<{
    domain: string
    count: number
  }>
}

export interface KeywordsResult {
  score: number
  wordCount: number
  keywordCount?: number
  topKeywords?: Array<{
    word: string
    count: number
    density: number
  }>
  keywordInTitle?: boolean
  keywordInDescription?: boolean
  keywordInHeadings?: boolean
  keywordInFirstParagraph?: boolean
}

export interface MobileFriendlinessResult {
  score: number
  hasViewportTag: boolean
  viewportContent?: string
  mobileIssues?: string[]
  touchTargetIssues?: number
  fontSizeIssues?: number
}

export interface PageSpeedResult {
  score: number
  totalResourceSize?: number
  totalRequests?: number
  loadTime?: number
  largeResources?: Array<{
    url: string
    type: string
    size: number
  }>
  recommendations?: string[]
  cacheIssues?: number
}

export interface SEOResult {
  url: string
  metaTags: MetaTagsResult
  headings: HeadingsResult
  images: ImagesResult
  links: LinksResult
  keywords: KeywordsResult
  mobileFriendliness: MobileFriendlinessResult
  pageSpeed: PageSpeedResult
}