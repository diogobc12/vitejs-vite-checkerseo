import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { LinksResult } from '../../types/seo'

interface LinksSectionProps {
  data: LinksResult
}

const LinksSection = ({ data }: LinksSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-secondary-900 mb-4 flex items-center">
        Links Analysis
        <span className={`ml-2 text-sm font-normal px-2 py-1 rounded ${
          data.score >= 80 ? 'bg-green-100 text-green-800' : 
          data.score >= 50 ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          Score: {data.score}/100
        </span>
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-secondary-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary-600">{data.totalLinks}</p>
            <p className="text-secondary-600">Total Links</p>
          </div>
          <div className="bg-secondary-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary-600">{data.internalLinks}</p>
            <p className="text-secondary-600">Internal Links</p>
          </div>
          <div className="bg-secondary-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary-600">{data.externalLinks}</p>
            <p className="text-secondary-600">External Links</p>
          </div>
          <div className="bg-secondary-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary-600">{data.brokenLinks || 0}</p>
            <p className="text-secondary-600">Broken Links</p>
          </div>
        </div>
        
        {data.brokenLinks && data.brokenLinks > 0 ? (
          <div className="flex items-start p-3 rounded-lg bg-red-50">
            <FaExclamationTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
            <div>
              <p className="text-red-700">{data.brokenLinks} broken links detected</p>
              <p className="text-sm text-red-600 mt-1">
                Broken links provide a poor user experience and can negatively impact SEO.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start p-3 rounded-lg bg-green-50">
            <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-green-700">
              No broken links detected
            </p>
          </div>
        )}
        
        {data.noFollowLinks && data.noFollowLinks > 0 && (
          <div className="flex items-start p-3 rounded-lg bg-secondary-50">
            <div>
              <p className="text-secondary-700">{data.noFollowLinks} links with nofollow attribute</p>
              <p className="text-sm text-secondary-600 mt-1">
                Nofollow links tell search engines not to follow or pass authority through these links.
              </p>
            </div>
          </div>
        )}
        
        {data.brokenLinksList && data.brokenLinksList.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Broken Links</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary-200">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Text
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {data.brokenLinksList.map((link, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-secondary-900 truncate max-w-[300px]">
                        {link.url}
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary-500">
                        {link.text || '<No text>'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-semibold text-secondary-800 mb-2">Link Distribution</h3>
          <div className="h-64 bg-secondary-50 rounded-lg p-4 flex items-center justify-center">
            <p className="text-secondary-600">Link distribution chart would be displayed here</p>
          </div>
          <p className="text-sm text-secondary-600 mt-2">
            A good internal linking structure helps search engines understand your site architecture and distributes page authority.
          </p>
        </div>
        
        {data.externalDomains && data.externalDomains.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Top External Domains</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary-200">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Domain
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Links
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {data.externalDomains.map((domain, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-secondary-900">
                        {domain.domain}
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary-500">
                        {domain.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LinksSection