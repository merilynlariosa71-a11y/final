import { useCart } from '../context/CartContext';

export default function ConfirmationPage() {
  const { setCurrentPage } = useCart();

  // Generate random order number
  const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
  
  // Generate estimated delivery date (7-10 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7 + Math.floor(Math.random() * 4));
  const formattedDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-8">
            Thank you for shopping with Luxe Bags
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-left">
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-mono font-semibold text-gray-900">#{orderNumber}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Estimated Delivery</p>
                <p className="font-semibold text-gray-900">{formattedDate}</p>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="text-left mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Confirmation Email</p>
                  <p className="text-sm text-gray-500">We've sent order details to your email</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order Processing</p>
                  <p className="text-sm text-gray-500">We'll prepare your order within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Shipping Updates</p>
                  <p className="text-sm text-gray-500">Track your package with real-time updates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setCurrentPage('shop')}
              className="flex-1 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
            >
              Continue Shopping
            </button>
            <button className="flex-1 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all">
              Track Order
            </button>
          </div>
        </div>

        {/* Support Info */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm mb-2">Need help with your order?</p>
          <a href="#" className="text-amber-600 hover:text-amber-700 font-medium text-sm">
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  );
}
