import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { ImagesResult } from '../../types/seo'

interface ImagesSectionProps {
  data: ImagesResult
}

const ImagesSection = ({ data }: ImagesSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-secondary-900 mb-4 flex items-center">
        Images Analysis
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
            <p className="text-2xl font-bold text-primary-600">{data.totalImages}</p>
            <p className="text-secondary-600">Total Images</p>
          </div>
          <div className="bg-secondary-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary-600">{data.imagesWithAlt}</p>
            <p className="text-secondary-600">With Alt Text</p>
          </div>
          <div className="bg-secondary-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary-600">{data.imagesWithoutAlt}</p>
            <p className="text-secondary-600">Missing Alt Text</p>
          </div>
        </div>
        
        {data.imagesWithoutAlt === 0 ? (
          <div className="flex items-start p-3 rounded-lg bg-green-50">
            <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
            <div>
              <p className="text-green-700">All images have alt text</p>
              <p className="text-sm text-green-600 mt-1">
                Great job! All images on your page have alt text, which is important for accessibility and SEO.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start p-3 rounded-lg bg-yellow-50">
            <FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
            <div>
              <p className="text-yellow-700">{data.imagesWithoutAlt} images missing alt text</p>
              <p className="text-sm text-yellow-600 mt-1">
                Alt text helps search engines understand image content and improves accessibility.
              </p>
            </div>
          </div>
        )}
        
        {data.largeImages && data.largeImages.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Large Images</h3>
            <div className="flex items-start p-3 rounded-lg bg-yellow-50 mb-3">
              <FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-yellow-700">{data.largeImages.length} large images detected</p>
                <p className="text-sm text-yellow-600 mt-1">
                  Large images can slow down page loading. Consider optimizing these images.
                </p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary-200">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Alt Text
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Size
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {data.largeImages.map((image, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-secondary-900 truncate max-w-[200px]">
                        {image.src}
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary-500">
                        {image.alt || <span className="text-red-500">Missing</span>}
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary-500">
                        {image.size || 'Unknown'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {data.imagesWithoutAlt > 0 && data.imagesWithoutAltSamples && (
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Images Missing Alt Text</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary-200">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Image Source
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {data.imagesWithoutAltSamples.map((src, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-secondary-900 truncate max-w-[400px]">
                        {src}
                      </td>
                    </tr>
                  ))}
                  {data.imagesWithoutAlt > data.imagesWithoutAltSamples.length && (
                    <tr>
                      <td className="px-4 py-3 text-sm text-secondary-500">
                        ...and {data.imagesWithoutAlt - data.imagesWithoutAltSamples.length} more
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImagesSection