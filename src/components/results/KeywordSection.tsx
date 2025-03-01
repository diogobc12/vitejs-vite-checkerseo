import { KeywordsResult } from '../../types/seo'

interface KeywordSectionProps {
  data: KeywordsResult
}

const KeywordSection = ({ data }: KeywordSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-secondary-900 mb-4 flex items-center">
        Keyword Analysis
        <span className={`ml-2 text-sm font-normal px-2 py-1 rounded ${
          data.score >= 80 ? 'bg-green-100 text-green-800' : 
          data.score >= 50 ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          Score: {data.score}/100
        </span>
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-secondary-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary-600">{data.wordCount}</p>
            <p className="text-secondary-600">Total Words</p>
          </div>
          <div className="bg-secondary-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary-600">{data.keywordCount || 0}</p>
            <p className="text-secondary-600">Unique Keywords</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-secondary-800 mb-2">Content Length</h3>
          <div className="p-4 bg-secondary-50 rounded-lg">
            {data.wordCount < 300 ? (
              <p className="text-yellow-700">
                Your content is quite short ({data.wordCount} words). Search engines typically prefer content with at least 300 words.
              </p>
            ) : data.wordCount < 600 ? (
              <p className="text-secondary-700">
                Your content length is acceptable ({data.wordCount} words), but adding more comprehensive content could improve rankings.
              </p>
            ) : (
              <p className="text-green-700">
                Great content length ({data.wordCount} words). Comprehensive content tends to rank better in search results.
              </p>
            )}
          </div>
        </div>
        
        {data.topKeywords && data.topKeywords.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Top Keywords</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary-200">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Keyword
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Count
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Density
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {data.topKeywords.map((keyword, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-secondary-900">
                        {keyword.word}
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary-500">
                        {keyword.count}
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary-500">
                        {keyword.density}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-secondary-600 mt-2">
              Keyword density should typically be between 1-3% for primary keywords. Too high density may be seen as keyword stuffing.
            </p>
          </div>
        )}
        
        {data.keywordInTitle !== undefined && (
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">Keyword Placement</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className={`inline-block w-5 h-5 rounded-full mr-2 ${data.keywordInTitle ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>Primary keyword in title: {data.keywordInTitle ? 'Yes' : 'No'}</span>
              </li>
              <li className="flex items-center">
                <span className={`inline-block w-5 h-5 rounded-full mr-2 ${data.keywordInDescription ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>Primary keyword in meta description: {data.keywordInDescription ? 'Yes' : 'No'}</span>
              </li>
              <li className="flex items-center">
                <span className={`inline-block w-5 h-5 rounded-full mr-2 ${data.keywordInHeadings ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>Primary keyword in headings: {data.keywordInHeadings ? 'Yes' : 'No'}</span>
              </li>
              <li className="flex items-center">
                <span className={`inline-block w-5 h-5 rounded-full mr-2 ${data.keywordInFirstParagraph ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>Primary keyword in first paragraph: {data.keywordInFirstParagraph ? 'Yes' : 'No'}</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default KeywordSection