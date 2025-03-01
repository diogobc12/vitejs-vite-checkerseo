import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaExclamationTriangle, FaCheckCircle, FaSpinner, FaTimes } from 'react-icons/fa'
import MetaTagsSection from '../components/results/MetaTagsSection'
import HeadingsSection from '../components/results/HeadingsSection'
import ImagesSection from '../components/results/ImagesSection'
import LinksSection from '../components/results/LinksSection'
import KeywordSection from '../components/results/KeywordSection'
import MobileFriendlinessSection from '../components/results/MobileFriendlinessSection'
import PageSpeedSection from '../components/results/PageSpeedSection'
import DonationModal from '../components/DonationModal'
import AdBanner from '../components/AdBanner'
import { analyzeSEO } from '../utils/seoAnalyzer'
import { SEOResult } from '../types/seo'

const ResultsPage = () => {
  const [seoData, setSeoData] = useState<SEOResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [overallScore, setOverallScore] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const url = localStorage.getItem('seoUrl')
    
    if (!url) {
      navigate('/')
      return
    }
    
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const result = await analyzeSEO(url)
        setSeoData(result)
        
        // Calculate overall score
        const scores = [
          result.metaTags.score,
          result.headings.score,
          result.images.score,
          result.links.score,
          result.keywords.score,
          result.mobileFriendliness.score,
          result.pageSpeed.score
        ]
        
        const avgScore = Math.round(
          scores.reduce((sum, score) => sum + score, 0) / scores.length
        )
        
        setOverallScore(avgScore)
        setIsLoading(false)
        
        // Show donation modal after 5 seconds
        setTimeout(() => {
          setShowDonationModal(true)
        }, 5000)
      } catch (err) {
        setError('Failed to analyze the website. Please try again.')
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [navigate])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 50) return 'text-yellow-500'
    return 'text-red-500'
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <FaSpinner className="text-primary-600 text-5xl animate-spin mb-4" />
        <h2 className="text-2xl font-bold text-secondary-900 mb-2">Analyzing Website SEO</h2>
        <p className="text-secondary-600">This may take a few moments...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <FaExclamationTriangle className="text-red-500 text-5xl mb-4" />
        <h2 className="text-2xl font-bold text-secondary-900 mb-2">Analysis Error</h2>
        <p className="text-secondary-600 mb-6">{error}</p>
        <button 
          onClick={() => navigate('/')} 
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!seoData) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-secondary-900 mb-2">
                  SEO Analysis Results
                </h1>
                <p className="text-secondary-600">
                  {seoData.url}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}
                </div>
                <div className="ml-2 text-secondary-600">/100</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-secondary-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700">Meta Tags</span>
                  <span className={`font-bold ${getScoreColor(seoData.metaTags.score)}`}>
                    {seoData.metaTags.score}/100
                  </span>
                </div>
              </div>
              
              <div className="bg-secondary-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700">Headings</span>
                  <span className={`font-bold ${getScoreColor(seoData.headings.score)}`}>
                    {seoData.headings.score}/100
                  </span>
                </div>
              </div>
              
              <div className="bg-secondary-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700">Images</span>
                  <span className={`font-bold ${getScoreColor(seoData.images.score)}`}>
                    {seoData.images.score}/100
                  </span>
                </div>
              </div>
              
              <div className="bg-secondary-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700">Links</span>
                  <span className={`font-bold ${getScoreColor(seoData.links.score)}`}>
                    {seoData.links.score}/100
                  </span>
                </div>
              </div>
              
              <div className="bg-secondary-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700">Keywords</span>
                  <span className={`font-bold ${getScoreColor(seoData.keywords.score)}`}>
                    {seoData.keywords.score}/100
                  </span>
                </div>
              </div>
              
              <div className="bg-secondary-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700">Mobile</span>
                  <span className={`font-bold ${getScoreColor(seoData.mobileFriendliness.score)}`}>
                    {seoData.mobileFriendliness.score}/100
                  </span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/')} 
              className="btn-secondary mb-6"
            >
              Analyze Another URL
            </button>
          </div>
          
          <AdBanner position="top" />
          
          <MetaTagsSection data={seoData.metaTags} />
          <HeadingsSection data={seoData.headings} />
          <ImagesSection data={seoData.images} />
          <LinksSection data={seoData.links} />
          <KeywordSection data={seoData.keywords} />
          <MobileFriendlinessSection data={seoData.mobileFriendliness} />
          <PageSpeedSection data={seoData.pageSpeed} />
          
          <AdBanner position="bottom" />
        </div>
        
        <div className="lg:w-1/4">
          <div className="sticky top-4">
            <AdBanner position="sidebar" />
            
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">
                Quick Summary
              </h3>
              <ul className="space-y-3">
                {seoData.metaTags.title ? (
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Title tag is present</span>
                  </li>
                ) : (
                  <li className="flex items-start">
                    <FaTimes className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Missing title tag</span>
                  </li>
                )}
                
                {seoData.metaTags.description ? (
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Meta description is present</span>
                  </li>
                ) : (
                  <li className="flex items-start">
                    <FaTimes className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Missing meta description</span>
                  </li>
                )}
                
                {seoData.headings.h1Count === 1 ? (
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>H1 tag is properly used</span>
                  </li>
                ) : (
                  <li className="flex items-start">
                    <FaTimes className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span>{seoData.headings.h1Count === 0 ? "Missing H1 tag" : "Multiple H1 tags"}</span>
                  </li>
                )}
                
                {seoData.images.imagesWithoutAlt === 0 ? (
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>All images have alt text</span>
                  </li>
                ) : (
                  <li className="flex items-start">
                    <FaTimes className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span>{seoData.images.imagesWithoutAlt} images missing alt text</span>
                  </li>
                )}
                
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Word count: {seoData.keywords.wordCount}</span>
                </li>
                
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>{seoData.links.internalLinks} internal links</span>
                </li>
                
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>{seoData.links.externalLinks} external links</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {showDonationModal && (
        <DonationModal onClose={() => setShowDonationModal(false)} />
      )}
    </div>
  )
}

export default ResultsPage