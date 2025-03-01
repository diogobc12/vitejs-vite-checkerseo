import { FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-secondary-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Checker<span className="text-primary-400">SEO</span></h3>
            <p className="text-secondary-300 mt-2">Free and fast SEO analysis tool</p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://www.linkedin.com/in/diogo-campos101/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-primary-400 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a 
              href="mailto:diogo@bcampos12@gmail.com" 
              className="text-white hover:text-primary-400 transition-colors"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-secondary-700 text-center text-secondary-400">
          <p>&copy; {new Date().getFullYear()} CheckerSEO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer