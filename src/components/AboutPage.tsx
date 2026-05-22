import { useCart } from '../context/CartContext';

const teamMembers = [
  {
    name: 'Maria Clara Santos',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    bio: 'With over 15 years in luxury fashion, Maria founded Luxe Bags with a vision to bring premium craftsmanship to Filipino artisans.',
  },
  {
    name: 'Jose Rizal Martinez',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Jose leads our design team, blending traditional Filipino craftsmanship with contemporary global trends.',
  },
  {
    name: 'Ana Bonifacio',
    role: 'Operations Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Ana ensures every bag meets our quality standards and reaches customers in perfect condition.',
  },
];

const values = [
  {
    icon: '🎨',
    title: 'Artisan Craftsmanship',
    description: 'Every bag is handcrafted by skilled Filipino artisans with decades of experience in leather working.',
  },
  {
    icon: '🌿',
    title: 'Sustainability',
    description: 'We use eco-friendly materials and sustainable practices to protect our environment for future generations.',
  },
  {
    icon: '💎',
    title: 'Quality First',
    description: 'We never compromise on quality. Every product undergoes rigorous testing before reaching our customers.',
  },
  {
    icon: '❤️',
    title: 'Customer Love',
    description: 'Our customers are at the heart of everything we do. Their satisfaction is our greatest achievement.',
  },
];

const milestones = [
  { year: '2015', event: 'Luxe Bags Founded', description: 'Started in a small workshop in Manila' },
  { year: '2017', event: 'First Store Opening', description: 'Opened our flagship store in Bonifacio Global City' },
  { year: '2019', event: 'International Expansion', description: 'Began shipping to Southeast Asian markets' },
  { year: '2021', event: 'Sustainability Initiative', description: 'Launched our eco-conscious collection' },
  { year: '2023', event: 'Award Recognition', description: 'Won "Best Filipino Leather Brand" award' },
  { year: '2024', event: '50,000 Customers', description: 'Reached milestone of 50,000 happy customers' },
];

export default function AboutPage() {
  const { setCurrentPage } = useCart();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/leather-bag.jpg')] bg-cover bg-center" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <span className="inline-block bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Crafting <span className="text-amber-400">Timeless</span> Elegance
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              At Luxe Bags, we believe that every person deserves to own a beautifully crafted bag that tells their story. 
              Founded in Manila in 2015, we've grown from a small workshop to a trusted name in premium leather goods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setCurrentPage('collections')}
                className="px-8 py-4 bg-amber-500 text-gray-900 rounded-full font-semibold hover:bg-amber-400 transition-all"
              >
                View Collections
              </button>
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">9+</div>
              <div className="text-gray-500">Years of Excellence</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">50K+</div>
              <div className="text-gray-500">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">100+</div>
              <div className="text-gray-500">Artisan Partners</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">10K+</div>
              <div className="text-gray-500">Bags Crafted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              From a Small Workshop to Your Doorstep
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Luxe Bags was born from a simple belief: that luxury should be accessible, and craftsmanship should be celebrated. 
                Our founder, Maria Clara Santos, grew up watching her grandmother craft leather goods in their family workshop in Marikina City.
              </p>
              <p>
                Inspired by this rich heritage of leather craftsmanship, Maria set out to create a brand that would showcase Filipino 
                artistry to the world while maintaining the highest standards of quality and sustainability.
              </p>
              <p>
                Today, we work with over 100 skilled artisans across the Philippines, each bringing their unique expertise to create 
                bags that are not just accessories, but works of art. Every stitch, every cut, and every finish is a testament to 
                their dedication and skill.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/leather-bag.jpg"
              alt="Craftsmanship"
              className="rounded-2xl shadow-lg"
            />
            <img
              src="/images/tote-bag.jpg"
              alt="Our Workshop"
              className="rounded-2xl shadow-lg mt-8"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              These core principles guide everything we do at Luxe Bags
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Key milestones that have shaped who we are today
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-amber-200 hidden md:block" />
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm inline-block">
                    <span className="text-amber-500 font-bold text-lg">{milestone.year}</span>
                    <h3 className="font-semibold text-gray-900 mt-1">{milestone.event}</h3>
                    <p className="text-gray-500 text-sm mt-1">{milestone.description}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow hidden md:block absolute left-1/2 transform -translate-x-1/2" style={{ top: `${(index * 100) / milestones.length}%` }} />
                <div className="w-full md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The passionate people behind Luxe Bags
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-amber-600 font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-gray-500 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Experience Luxe Bags?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Join thousands of satisfied customers and discover your perfect bag today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-8 py-4 bg-white text-amber-600 rounded-full font-semibold hover:bg-gray-100 transition-all"
              >
                Shop Now
              </button>
              <button
                onClick={() => setCurrentPage('collections')}
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all"
              >
                View Collections
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
