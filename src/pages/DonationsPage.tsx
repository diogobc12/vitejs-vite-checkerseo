import { useState } from 'react'
import { FaHeart, FaCoffee, FaLaptopCode } from 'react-icons/fa'
import { loadStripe } from '@stripe/stripe-js'
import AdBanner from '../components/AdBanner'

const DonationsPage = () => {
  const [amount, setAmount] = useState(5)
  const [isProcessing, setIsProcessing] = useState(false)
  const [customAmount, setCustomAmount] = useState('')
  
  const handleDonate = async () => {
    try {
      setIsProcessing(true)
      
      // Use custom amount if entered, otherwise use selected amount
      const donationAmount = customAmount ? parseFloat(customAmount) : amount
      
      if (isNaN(donationAmount) || donationAmount <= 0) {
        alert('Please enter a valid donation amount')
        setIsProcessing(false)
        return
      }
      
      const stripe = await loadStripe('pk_test_51QxpwXPxT4MxIRKevBunTHa29hKYOknc51R3zn4Uyl0kKsP4ymX83X4dBrwpgOjAe3DRKngtzlPhOZyKt8OzuPaA006OJ5SHGs')
      
      if (stripe) {
        // For demo purposes, we'll just simulate a delay
        setTimeout(() => {
          alert(`This would redirect to Stripe to process a $${donationAmount.toFixed(2)} donation`)
          setIsProcessing(false)
        }, 1000)
      }
    } catch (error) {
      console.error('Error processing donation:', error)
      setIsProcessing(false)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Support CheckerSEO
          </h1>
          <p className="text-xl text-secondary-600 mb-8">
            Your donations help us keep this tool free for everyone
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCoffee className="text-primary-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-2">Buy us a coffee</h3>
            <p className="text-secondary-600 mb-4">
              A small donation to keep us caffeinated and motivated.
            </p>
            <button 
              onClick={() => {
                setAmount(5)
                setCustomAmount('')
              }}
              className={`w-full py-2 px-4 rounded-md ${
                amount === 5 && !customAmount
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              $5
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="text-primary-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-2">Show some love</h3>
            <p className="text-secondary-600 mb-4">
              Help us cover hosting costs and improve the tool.
            </p>
            <button 
              onClick={() => {
                setAmount(10)
                setCustomAmount('')
              }}
              className={`w-full py-2 px-4 rounded-md ${
                amount === 10 && !customAmount
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              $10
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLaptopCode className="text-primary-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-2">Support development</h3>
            <p className="text-secondary-600 mb-4">
              Help us add new features and improve existing ones.
            </p>
            <button 
              onClick={() => {
                setAmount(20)
                setCustomAmount('')
              }}
              className={`w-full py-2 px-4 rounded-md ${
                amount === 20 && !customAmount
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              $20
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
            Make a Donation
          </h2>
          
          <div className="mb-6">
            <label className="block text-secondary-700 mb-2">Choose an amount:</label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[5, 10, 20].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setAmount(value)
                    setCustomAmount('')
                  }}
                  className={`py-3 px-4 rounded-md ${
                    amount === value && !customAmount
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                  }`}
                >
                  ${value}
                </button>
              ))}
            </div>
            
            <div className="mb-4">
              <label className="block text-secondary-700 mb-2">Or enter a custom amount:</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-secondary-500">$</span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setAmount(0) // Reset preset amount when custom is entered
                  }}
                  placeholder="Enter amount"
                  className="input-field pl-8 text-white"
                />
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={handleDonate}
              disabled={isProcessing}
              className="btn-primary px-8 py-3 text-lg"
            >
              {isProcessing ? 'Processing...' : 'Donate Now'}
            </button>
            <p className="text-sm text-secondary-500 mt-4">
              Payments are securely processed through Stripe. You'll receive a receipt via email.
            </p>
          </div>
        </div>
        
        <AdBanner position="bottom" />
        
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">
            Thank You for Your Support!
          </h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Your donations help us maintain and improve CheckerSEO. We're committed to keeping this tool free and accessible to everyone while continuing to add new features and improvements.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DonationsPage