import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { MobileFriendlinessResult } from '../../types/seo'

interface MobileFriendlinessSectionProps {
  data: MobileFriendlinessResult
}

const MobileFriendlinessSection = ({ data }: MobileFriendlinessSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-secondary-900 mb-4 flex items-center">
        Mobile Friendliness
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
          <h3 className="text-lg font-semibold text-secondary-800 mb-2">Viewport Meta Tag</h3>
          {data.hasViewportTag ? (
            <div className="flex items-start p-3 rounded-lg bg-green-50">
              <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-green-700">Viewport meta tag is present</p>
                <p className="text-sm text-green-600 mt-1">
                  The viewport meta tag helps optimize your website for mobile devices.
                </p>
                {data.viewportContent && (
                  <p className="text-sm text-green-700 mt-1 bg-green-100 p-2 rounded">
                    {data.viewportContent}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-start p-3 rounded-lg bg-red-50">
              <FaExclamationTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-red-700">Viewport meta tag is missing</p>
                <p className="text-sm text-red-600 mt-1">
                  Without a viewport meta tag, your site may not display properly on mobile devices.
                </p>
                <p className="text-sm text-red-700 mt-2">
                  Recommended fix: Add the following meta tag to your page's head section:
                </p>
                <p className="text-sm text-red-700 mt-1 bg-red-100 p-2 rounded font-mono">
                  &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
                </p>
              </div>
            </div>
          )}
        </div>
        
        {data.mobileIssues && data.mobileIssues.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Mobile Issues</h3>
            <div className="flex items-start p-3 rounded-lg bg-yellow-50">
              <FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-yellow-700">{data.mobileIssues.length} mobile usability issues detected</p>
                <ul className="text-sm text-yellow-600 mt-1 list-disc list-inside">
                  {data.mobileIssues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start p-3 rounded-lg bg-green-50">
            <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
            <div>
              <p className="text-green-700">No mobile usability issues detected</p>
              <p className="text-sm text-green-600 mt-1">
                Your page appears to be mobile-friendly.
              </p>
            </div>
          </div>
        )}
        
        {data.touchTargetIssues && (
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Touch Target Size</h3>
            {data.touchTargetIssues > 0 ? (
              <div className="flex items-start p-3 rounded-lg bg-yellow-50">
                <FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-yellow-700">{data.touchTargetIssues} touch target size issues</p>
                  <p className="text-sm text-yellow-600 mt-1">
                    Some clickable elements may be too small or too close together for mobile users.
                    Touch targets should be at least 48x48 pixels and have adequate spacing.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start p-3 rounded-lg bg-green-50">
                <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <p className="text-green-700">
                  Touch targets appear to be properly sized
                </p>
              </div>
            )}
          </div>
        )}
        
        {data.fontSizeIssues !== undefined && (
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Font Size</h3>
            {data.fontSizeIssues > 0 ? (
              <div className="flex items-start p-3 rounded-lg bg-yellow-50">
                <FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-yellow-700">{data.fontSizeIssues} font size issues</p>
                  <p className="text-sm text-yellow-600 mt-1">
                    Some text on your page may be too small to read on mobile devices.
                    The recommended minimum font size for mobile is 16px.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start p-3 rounded-lg bg-green-50">
                <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <p className="text-green-700">
                  Font sizes appear to be appropriate for mobile viewing
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MobileFriendlinessSection