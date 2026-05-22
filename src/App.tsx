import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ShopPage from './components/ShopPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ConfirmationPage from './components/ConfirmationPage';
import AccountPage from './components/AccountPage';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';
import CollectionsPage from './components/CollectionsPage';
import AboutPage from './components/AboutPage';

function AppContent() {
  const { currentPage } = useCart();
  const { showAuthModal } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'confirmation':
        return <ConfirmationPage />;
      case 'account':
        return <AccountPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'collections':
        return <CollectionsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <ShopPage />;
    }
  };

  const isAdminPage = currentPage === 'admin';

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPage && <Header />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {!isAdminPage && currentPage !== 'confirmation' && <Footer />}
      {showAuthModal && <AuthModal />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
