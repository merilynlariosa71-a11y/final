import { useCart } from '../context/CartContext';

const collections = [
  {
    id: 1,
    name: 'Heritage Collection',
    description: 'Timeless designs inspired by classic leather craftsmanship. Each piece in this collection tells a story of tradition and elegance.',
    image: '/images/leather-bag.jpg',
    products: 12,
    priceRange: '₱12,999 - ₱24,999',
    tag: 'Best Seller',
  },
  {
    id: 2,
    name: 'Urban Explorer',
    description: 'Designed for the modern adventurer. Functional, durable, and stylish bags for city life and beyond.',
    image: '/images/backpack.jpg',
    products: 8,
    priceRange: '₱6,999 - ₱14,999',
    tag: 'New',
  },
  {
    id: 3,
    name: 'Everyday Essentials',
    description: 'Practical and chic bags for daily use. From totes to crossbodies, find your perfect everyday companion.',
    image: '/images/tote-bag.jpg',
    products: 15,
    priceRange: '₱3,999 - ₱9,999',
    tag: 'Popular',
  },
  {
    id: 4,
    name: 'Evening Elegance',
    description: 'Sophisticated clutches and evening bags for special occasions. Make a statement wherever you go.',
    image: '/images/clutch.jpg',
    products: 6,
    priceRange: '₱5,999 - ₱12,999',
    tag: 'Exclusive',
  },
  {
    id: 5,
    name: 'Travel Collection',
    description: 'Spacious and stylish travel bags. From weekend duffles to carry-ons, travel in luxury.',
    image: '/images/duffle.jpg',
    products: 10,
    priceRange: '₱14,999 - ₱29,999',
    tag: 'Trending',
  },
  {
    id: 6,
    name: 'Eco-Conscious',
    description: 'Sustainable fashion for the environmentally aware. Beautiful bags made from recycled and vegan materials.',
    image: '/images/backpack.jpg',
    products: 5,
    priceRange: '₱4,999 - ₱8,999',
    tag: 'Eco-Friendly',
  },
];

const features = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: 'Handcrafted with Love',
    description: 'Each bag is carefully crafted by skilled artisans who take pride in their work.',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Premium Materials',
    description: 'We use only the finest leathers and sustainable materials in our products.',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
      </svg>
    ),
    title: 'Satisfaction Guaranteed',
    description: '30-day money-back guarantee and lifetime warranty on all products.',
  },
];

export default function CollectionsPage() {
  const { setCurrentPage } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/crossbody.jpg')] bg-cover bg-center" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <span className="inline-block bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            ✨ Curated for You
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Our <span className="text-amber-400">Collections</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our carefully curated collections, each designed to meet different styles and needs. 
            From timeless classics to modern essentials.
          </p>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Browse by Collection</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Find the perfect bag that matches your style and lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-amber-200"
              onClick={() => setCurrentPage('shop')}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Tag */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
                  {collection.tag}
                </span>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{collection.name}</h3>
                  <p className="text-sm text-gray-200 mb-3 line-clamp-2">{collection.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-semibold">{collection.products} Products</span>
                    <span className="text-white/80 text-sm">{collection.priceRange}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">Shop this collection</span>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal Banner */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-8 md:mb-0 md:mr-8">
              <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Limited Time Offer
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Holiday Sale - Up to 30% Off
              </h2>
              <p className="text-white/80 mb-6 max-w-lg">
                Discover our exclusive holiday collection and save on premium leather goods. 
                Perfect gifts for your loved ones.
              </p>
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-8 py-4 bg-white text-amber-600 rounded-full font-semibold hover:bg-gray-100 transition-all"
              >
                Shop the Sale
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/crossbody.jpg"
                alt="Collection"
                className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-2xl shadow-lg"
              />
              <img
                src="/images/clutch.jpg"
                alt="Collection"
                className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-2xl shadow-lg -mt-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-900 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Get Early Access to New Collections
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Subscribe to be the first to know about new arrivals, exclusive collections, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="px-8 py-4 bg-amber-500 text-gray-900 rounded-full font-semibold hover:bg-amber-400 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
