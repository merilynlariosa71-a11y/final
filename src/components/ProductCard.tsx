import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { setSelectedProduct, setCurrentPage, addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock > 0) {
      addToCart(product, product.colors[0], product.sizes?.[0]);
    }
  };

  const isOutOfStock = product.stock === 0;

  const handleViewDetails = () => {
    setSelectedProduct(product);
    setCurrentPage('cart'); // We'll show modal from here
  };

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-amber-200"
      onClick={handleViewDetails}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          disabled={isOutOfStock}
          className={`absolute bottom-4 left-4 right-4 py-3 rounded-xl font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ${
            isOutOfStock
              ? 'bg-gray-400/90 backdrop-blur-sm text-white cursor-not-allowed'
              : 'bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-gray-900 hover:text-white'
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : 'Quick Add to Cart'}
        </button>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-xs font-medium text-gray-600">{product.category}</span>
        </div>

        {/* Sale Badge */}
        {product.reviews > 200 && (
          <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full">
            <span className="text-xs font-bold">Popular</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-200'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Colors */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xs text-gray-400">Colors:</span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map((color) => (
              <span
                key={color}
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{
                  backgroundColor:
                    color.toLowerCase() === 'cognac' ? '#9A4E1C' :
                    color.toLowerCase() === 'oxblood' ? '#4A0000' :
                    color.toLowerCase() === 'sage' ? '#BCB88A' :
                    color.toLowerCase() === 'terracotta' ? '#E2725B' :
                    color.toLowerCase(),
                }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Stock & Price */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
          <div className="flex items-center space-x-2">
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-xs text-amber-600 font-medium">Only {product.stock} left!</span>
            )}
            {product.stock === 0 && (
              <span className="text-xs text-red-500 font-medium">Out of Stock</span>
            )}
            <button
              onClick={handleQuickAdd}
              disabled={isOutOfStock}
              className={`p-2 rounded-full transition-all ${
                isOutOfStock
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-amber-500 hover:text-white text-gray-600'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                {isOutOfStock ? (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </>
                ) : (
                  <>
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
