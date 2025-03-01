import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaCheckCircle, FaLink, FaImage, FaHeading, FaTag } from 'react-icons/fa'
import AdBanner from '../components/AdBanner'

const HomePage = () => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic URL validation
    if (!url) {
      setError('Please enter a URL')
      return
    }
    
    // Add https:// if not present
    let formattedUrl = url
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = `https://${url}`
    }
    
    try {
      setIsLoading(true)
      setError('')
      
      // Store the URL in localStorage to use it on the results page
      localStorage.setItem('seoUrl', formattedUrl)
      
      // Navigate to results page
      navigate('/results')
    } catch (err) {
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Top Ad Banner */}
        <AdBanner position="top" />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Free SEO Analysis Tool
          </h1>
          <p className="text-xl text-secondary-600 mb-8">
            Check your website's SEO performance in seconds
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter website URL (e.g., example.com)"
                  className="input-field pl-10 text-white"
                />
                <FaSearch className="absolute left-3 top-3 text-secondary-400" />
              </div>
              <button 
                type="submit" 
                className="btn-primary flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? 'Analyzing...' : 'Check SEO'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <FaTag className="text-primary-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Meta Tags Check</h3>
                <p className="text-secondary-600">
                  Analyze title tags and meta descriptions for SEO best practices
                </p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <FaHeading className="text-primary-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Heading Structure</h3>
                <p className="text-secondary-600">
                  Check H1, H2, H3 tags for proper hierarchy and optimization
                </p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <FaImage className="text-primary-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Image Optimization</h3>
                <p className="text-secondary-600">
                  Find images missing alt text and optimization opportunities
                </p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <FaLink className="text-primary-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Link Analysis</h3>
                <p className="text-secondary-600">
                  Analyze internal and external links, detect broken links
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle Ad Banner */}
        <AdBanner position="bottom" />
        
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">
            Why Use CheckerSEO?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <FaCheckCircle className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">100% Free</h3>
              <p className="text-secondary-600 text-center">
                No hidden fees or premium features. All tools are completely free.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <FaCheckCircle className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Fast Analysis</h3>
              <p className="text-secondary-600 text-center">
                Get comprehensive SEO insights in seconds, not minutes.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <FaCheckCircle className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Actionable Insights</h3>
              <p className="text-secondary-600 text-center">
                Get clear recommendations to improve your website's SEO.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage