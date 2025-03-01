import { Link } from 'react-router-dom'
import { FaSearch, FaHeart } from 'react-icons/fa'

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FaSearch className="text-primary-600 text-2xl" />
          <span className="text-xl font-bold text-secondary-900">Checker<span className="text-primary-600">SEO</span></span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-secondary-700 hover:text-primary-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/donate" className="text-secondary-700 hover:text-primary-600 transition-colors flex items-center">
                <FaHeart className="mr-1 text-primary-600" />
                Donate
              </Link>
            </li>
            <li>
              <a 
                href="mailto:diogo@bcampos12@gmail.com" 
                className="text-secondary-700 hover:text-primary-600 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header