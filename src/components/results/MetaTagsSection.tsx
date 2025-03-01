import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { MetaTagsResult } from '../../types/seo'

interface MetaTagsSectionProps {
  data: MetaTagsResult
}

const MetaTagsSection = ({ data }: MetaTagsSectionProps) => {
  const getTitleLengthStatus = () => {
    const length = data.titleLength || 0
    if (length < 30) return { status: 'warning', message: 'Title is too short (less than 30 characters)' }
    if (length > 60) return { status: 'warning', message: 'Title is too long (more than 60 characters)' }
    return { status: 'success', message: 'Title length is optimal (30-60 characters)' }
  }
  
  const getDescriptionLengthStatus = () => {
    const length = data.descriptionLength || 0
    if (length < 120) return { status: 'warning', message: 'Description is too short (less than 120 characters)' }
    if (length > 160) return { status: 'warning', message: 'Description is too long (more than 160 characters)' }
    return { status: 'success', message: 'Description length is optimal (120-160 characters)' }
  }
  
  const titleStatus = getTitleLengthStatus()
  const descriptionStatus = getDescriptionLengthStatus()

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-secondary-900 mb-4 flex items-center">
        Meta Tags Analysis
        <span className={`ml-2 text-sm font-normal px-2 py-1 rounded ${
          data.score >= 80 ? 'bg-green-100 text-green-800' : 
          data.score >= 50 ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          Score: {data.score}/100
        </span>
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-secondary-800 mb-2">Title Tag</h3>
          {data.title ? (
            <>
              <div className="p-4 bg-secondary-50 rounded-lg mb-3">
                <p className="font-medium text-secondary-900">{data.title}</p>
                <p className="text-sm text-secondary-600 mt-1">
                  Length: {data.titleLength} characters
                </p>
              </div>
              
              <div className={`flex items-start p-3 rounded-lg ${
                titleStatus.status === 'success' ? 'bg-green-50' : 'bg-yellow-50'
              }`}>
                {titleStatus.status === 'success' ? (
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                ) : (
                  <FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                )}
                <span className={titleStatus.status === 'success' ? 'text-green-700' : 'text-yellow-700'}>
                  {titleStatus.message}
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-start p-3 rounded-lg bg-red-50">
              <FaExclamationTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-red-700">Missing title tag</p>
                <p className="text-sm text-red-600 mt-1">
                  The title tag is crucial for SEO. It should be descriptive and contain your main keywords.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-secondary-800 mb-2">Meta Description</h3>
          {data.description ? (
            <>
              <div className="p-4 bg-secondary-50 rounded-lg mb-3">
                <p className="text-secondary-900">{data.description}</p>
                <p className="text-sm text-secondary-600 mt-1">
                  Length: {data.descriptionLength} characters
                </p>
              </div>
              
              <div className={`flex items-start p-3 rounded-lg ${
                descriptionStatus.status === 'success' ? 'bg-green-50' : 'bg-yellow-50'
              }`}>
                {descriptionStatus.status === 'success' ? (
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                ) : (
                  <FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                )}
                <span className={descriptionStatus.status === 'success' ? 'text-green-700' : 'text-yellow-700'}>
                  {descriptionStatus.message}
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-start p-3 rounded-lg bg-red-50">
              <FaExclamationTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-red-700">Missing meta description</p>
                <p className="text-sm text-red-600 mt-1">
                  Meta descriptions help search engines understand your page content and appear in search results.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-secondary-800 mb-2">Other Meta Tags</h3>
          {data.otherMetaTags && data.otherMetaTags.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary-200">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Name/Property
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Content
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {data.otherMetaTags.map((meta, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-secondary-900">
                        {meta.name || meta.property || meta.httpEquiv}
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary-500">
                        {meta.content}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-secondary-600">No additional meta tags found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MetaTagsSection