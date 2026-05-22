import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { authMode, setAuthMode, setShowAuthModal, login, register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (authMode === 'login') {
      const success = login(formData.email, formData.password);
      if (!success) {
        setError('Invalid email or password');
      }
    } else {
      if (formData.name.trim().length < 2) {
        setError('Name must be at least 2 characters');
        return;
      }
      if (!formData.email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      const success = register(formData.name, formData.email, formData.password);
      if (!success) {
        setError('Email already registered');
      } else {
        setSuccess('Account created successfully!');
      }
    }
  };

  const handleClose = () => {
    setShowAuthModal(false);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setError('');
    setSuccess('');
  };

  const switchMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setError('');
    setSuccess('');
  };

  const fillDemoAccount = (email: string, password: string) => {
    setFormData((prev) => ({ ...prev, email, password }));
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-200">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500 mt-1">
            {authMode === 'login' 
              ? 'Sign in to access your account' 
              : 'Join Luxe Bags today'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4 flex items-center space-x-2">
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-4 flex items-center space-x-2">
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span className="text-sm">{success}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Juan Dela Cruz"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          )}

          {authMode === 'login' && (
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all active:scale-95"
          >
            {authMode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Switch Mode */}
        <p className="text-center text-gray-600">
          {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={switchMode}
            className="text-amber-600 hover:text-amber-700 font-semibold"
          >
            {authMode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>

        {/* Demo Accounts */}
        {authMode === 'login' && (
          <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <p className="text-xs font-semibold text-gray-700 text-center mb-3 uppercase tracking-wide">Demo Accounts (Click to Auto-fill)</p>
            <div className="space-y-3">
              {/* Admin Account */}
              <button
                type="button"
                onClick={() => fillDemoAccount('admin@luxebags.com', 'admin123')}
                className="w-full bg-white p-3 rounded-lg border border-red-200 hover:border-red-400 hover:shadow-md transition-all text-left cursor-pointer"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded-full">Admin</span>
                  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Email:</span> admin@luxebags.com
                </p>
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Password:</span> admin123
                </p>
              </button>
              {/* Customer Account */}
              <button
                type="button"
                onClick={() => fillDemoAccount('juan@example.com', '123456')}
                className="w-full bg-white p-3 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all text-left cursor-pointer"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">Customer</span>
                  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Email:</span> juan@example.com
                </p>
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Password:</span> 123456
                </p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
