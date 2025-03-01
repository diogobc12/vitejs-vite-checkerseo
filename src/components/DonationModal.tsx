import { useState } from 'react'
import { FaTimes, FaHeart } from 'react-icons/fa'
import { loadStripe } from '@stripe/stripe-js'

interface DonationModalProps {
  onClose: () => void
}

const DonationModal = ({ onClose }: DonationModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [amount, setAmount] = useState(5)
  
  const handleDonate = async () => {
    try {
      setIsProcessing(true)
      
      // In a real implementation, you would:
      // 1. Call your backend to create a Stripe Checkout Session
      // 2. Redirect to the Stripe Checkout page
      
      // This is a placeholder for demonstration
      const stripe = await loadStripe('pk_test_51QxpwXPxT4MxIRKevBunTHa29hKYOknc51R3zn4Uyl0kKsP4ymX83X4dBrwpgOjAe3DRKngtzlPhOZyKt8OzuPaA006OJ5SHGs')
      
      if (stripe) {
        // In a real implementation, this would come from your backend
        // const { sessionId } = await response.json()
        // await stripe.redirectToCheckout({ sessionId })
        
        // For demo purposes, we'll just simulate a delay
        setTimeout(() => {
          alert(`This would redirect to Stripe to process a $${amount} donation`)
          setIsProcessing(false)
        }, 1000)
      }
    } catch (error) {
      console.error('Error processing donation:', error)
      setIsProcessing(false)
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary-500 hover:text-secondary-700"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="text-primary-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900">So did it help? 😉</h3>
            <p className="text-secondary-600 mt-2">
              If you want to support the website and got some extra bucks, we would love to have your help!
              (You can still use the tool if you can't do it 😉)
            </p>
          </div>
          
          <div className="mb-6">
            <label className="block text-secondary-700 mb-2">Choose an amount:</label>
            <div className="grid grid-cols-3 gap-3">
              {[5, 10, 20].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value)}
                  className={`py-2 px-4 rounded-md ${
                    amount === value
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                  }`}
                >
                  ${value}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-secondary-600 hover:text-secondary-800"
            >
              Maybe later
            </button>
            <button
              onClick={handleDonate}
              disabled={isProcessing}
              className="btn-primary"
            >
              {isProcessing ? 'Processing...' : `Donate $${amount}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationModal