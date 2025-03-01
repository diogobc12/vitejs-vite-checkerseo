import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { HeadingsResult } from '../../types/seo'

interface HeadingsSectionProps {
  data: HeadingsResult
}

const HeadingsSection = ({ data }: HeadingsSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-secondary-900 mb-4 flex items-center">
        Headings Analysis
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
          <h3 className="text-lg font-semibold text-secondary-800 mb-2">H1 Heading</h3>
          {data.h1Count === 0 ? (
            <div className="flex items-start p-3 rounded-lg bg-red-50">
              <FaExclamationTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-red-700">Missing H1 heading</p>
                <p className="text-sm text-red-600 mt-1">
                  Every page should have exactly one H1 heading that describes the main topic.
                </p>
              </div>
            </div>
          ) : data.h1Count > 1 ? (
            <div className="flex items-start p-3 rounded-lg bg-yellow-50">
              <FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-yellow-700">Multiple H1 headings detected ({data.h1Count})</p>
                <p className="text-sm text-yellow-600 mt-1">
                  For optimal SEO, use only one H1 heading per page.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start p-3 rounded-lg bg-green-50">
              <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-green-700">H1 heading is properly used</p>
                <p className="text-sm text-green-600 mt-1">
                  Your page has exactly one H1 heading, which is optimal for SEO.
                </p>
              </div>
            </div>
          )}
          
          {data.h1s && data.h1s.length > 0 && (
            <div className="mt-3">
              <h4 className="text-md font-medium text-secondary-700 mb-2">H1 Content:</h4>
              <ul className="space-y-2">
                {data.h1s.map((h1, index) => (
                  <li key={index} className="p-3 bg-secondary-50 rounded-lg">
                    {h1}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-secondary-800 mb-2">Heading Structure</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-secondary-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-primary-600">{data.h1Count}</p>
              <p className="text-secondary-600">H1 Tags</p>
            </div>
            <div className="bg-secondary-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-primary-600">{data.h2Count}</p>
              <p className="text-secondary-600">H2 Tags</p>
            </div>
            <div className="bg-secondary-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-primary-600">{data.h3Count}</p>
              <p className="text-secondary-600">H3 Tags</p>
            </div>
          </div>
          
          {data.headingStructureIssues && data.headingStructureIssues.length > 0 ? (
            <div className="flex items-start p-3 rounded-lg bg-yellow-50">
              <FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-yellow-700">Heading structure issues detected</p>
                <ul className="text-sm text-yellow-600 mt-1 list-disc list-inside">
                  {data.headingStructureIssues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-start p-3 rounded-lg bg-green-50">
              <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
              <p className="text-green-700">
                Heading structure follows best practices
              </p>
            </div>
          )}
        </div>
        
        {data.headingSamples && (
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Heading Samples</h3>
            <div className="space-y-4">
              {data.headingSamples.h2s && data.headingSamples.h2s.length > 0 && (
                <div>
                  <h4 className="text-md font-medium text-secondary-700 mb-2">H2 Headings:</h4>
                  <ul className="space-y-2">
                    {data.headingSamples.h2s.slice(0, 5).map((h2, index) => (
                      <li key={index} className="p-3 bg-secondary-50 rounded-lg">
                        {h2}
                      </li>
                    ))}
                    {data.headingSamples.h2s.length > 5 && (
                      <li className="text-secondary-600 text-sm">
                        ...and {data.headingSamples.h2s.length - 5} more
                      </li>
                    )}
                  </ul>
                </div>
              )}
              
              {data.headingSamples.h3s && data.headingSamples.h3s.length > 0 && (
                <div>
                  <h4 className="text-md font-medium text-secondary-700 mb-2">H3 Headings:</h4>
                  <ul className="space-y-2">
                    {data.headingSamples.h3s.slice(0, 5).map((h3, index) => (
                      <li key={index} className="p-3 bg-secondary-50 rounded-lg">
                        {h3}
                      </li>
                    ))}
                    {data.headingSamples.h3s.length > 5 && (
                      <li className="text-secondary-600 text-sm">
                        ...and {data.headingSamples.h3s.length - 5} more
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeadingsSection