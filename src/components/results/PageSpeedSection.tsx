import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { PageSpeedResult } from '../../types/seo'

interface PageSpeedSectionProps {
  data: PageSpeedResult
}

const PageSpeedSection = ({ data }: PageSpeedSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-secondary-900 mb-4 flex items-center">
        Page Speed Analysis
        <span className={`ml-2 text-sm font-normal px-2 py-1 rounded ${
          data.score >= 80 ? 'bg-green-100 text-green-800' : 
          data.score >= 50 ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          Score: {data.score}/100
        </span>
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-secondary-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary-600">{data.totalResourceSize ? `${Math.round(data.totalResourceSize / 1024)} KB` : 'N/A'}</p>
            <p className="text-secondary-600">Total Page Size</p>
          </div>
          <div className="bg-secondary-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary-600">{data.totalRequests || 'N/A'}</p>
            <p className="text-secondary-600">Total Requests</p>
          </div>
          <div className="bg-secondary-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary-600">{data.loadTime ? `${data.loadTime.toFixed(2)}s` : 'N/A'}</p>
            <p className="text-secondary-600">Estimated Load Time</p>
          </div>
        </div>
        
        {data.loadTime && data.loadTime > 3 ? (
          <div className="flex items-start p-3 rounded-lg bg-yellow-50">
            <FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
            <div>
              <p className="text-yellow-700">Page load time is slow ({data.loadTime.toFixed(2)} seconds)</p>
              <p className="text-sm text-yellow-600 mt-1">
                Pages that load in under 3 seconds have lower bounce rates and higher conversion rates.
              </p>
            </div>
          </div>
        ) : data.loadTime ? (
          <div className="flex items-start p-3 rounded-lg bg-green-50">
            <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
            <div>
              <p className="text-green-700">Page load time is good ({data.loadTime.toFixed(2)} seconds)</p>
              <p className="text-sm text-green-600 mt-1">
                Fast-loading pages provide better user experience and can rank higher in search results.
              </p>
            </div>
          </div>
        ) : null}
        
        {data.largeResources && data.largeResources.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Large Resources</h3>
            <div className="flex items-start p-3 rounded-lg bg-yellow-50 mb-3">
              <FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-yellow-700">{data.largeResources.length} large resources detected</p>
                <p className="text-sm text-yellow-600 mt-1">
                  Large resources can significantly slow down page loading. Consider optimizing these resources.
                </p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary-200">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Resource
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Size
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {data.largeResources.map((resource, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-secondary-900 truncate max-w-[300px]">
                        {resource.url}
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary-500">
                        {resource.type}
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary-500">
                        {Math.round(resource.size / 1024)} KB
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {data.recommendations && data.recommendations.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Speed Improvement Recommendations</h3>
            <ul className="space-y-2">
              {data.recommendations.map((recommendation, index) => (
                <li key={index} className="p-3 bg-secondary-50 rounded-lg">
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {data.cacheIssues !== undefined && (
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Caching</h3>
            {data.cacheIssues > 0 ? (
              <div className="flex items-start p-3 rounded-lg bg-yellow-50">
                <FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-yellow-700">{data.cacheIssues} resources missing cache headers</p>
                  <p className="text-sm text-yellow-600 mt-1">
                    Proper caching can significantly improve page load times for returning visitors.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start p-3 rounded-lg bg-green-50">
                <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <p className="text-green-700">
                  All resources have proper cache headers
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PageSpeedSection