import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { products as initialProducts, mockTransactions, categories, formatPrice, transactionStatusColors } from '../data/products';
import { Product, Transaction } from '../types';

type AdminTab = 'dashboard' | 'products' | 'transactions' | 'users';

export default function AdminDashboard() {
  const { user, users, deleteUser } = useAuth();
  const { setCurrentPage } = useCart();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProductList(productList.filter((p) => p.id !== id));
    }
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  };

  const handleUpdateStock = (productId: number, newStock: number) => {
    setProductList(productList.map((p) => {
      if (p.id === productId) {
        return { ...p, stock: newStock, inStock: newStock > 0 };
      }
      return p;
    }));
  };

  const handleUpdateTransactionStatus = (transactionId: string, newStatus: Transaction['status']) => {
    setTransactions(transactions.map((t) => {
      if (t.id === transactionId) {
        return { ...t, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return t;
    }));
  };

  const filteredTransactions = statusFilter === 'all' 
    ? transactions 
    : transactions.filter((t) => t.status === statusFilter);

  const totalRevenue = transactions
    .filter((t) => t.status !== 'cancelled')
    .reduce((sum, t) => sum + t.total, 0);

  const totalOrders = transactions.length;
  const totalProducts = productList.length;
  const totalUsers = users.length;

  const lowStockProducts = productList.filter((p) => p.stock <= 10 && p.stock > 0);
  const outOfStockProducts = productList.filter((p) => p.stock === 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-xs text-gray-500">Luxe Bags Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                View Store
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full px-4 py-3 rounded-xl text-left transition-colors flex items-center space-x-3 ${
                  activeTab === 'dashboard' ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span className="font-medium">Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full px-4 py-3 rounded-xl text-left transition-colors flex items-center space-x-3 ${
                  activeTab === 'products' ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <span className="font-medium">Products</span>
                {lowStockProducts.length > 0 && (
                  <span className="ml-auto bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {lowStockProducts.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`w-full px-4 py-3 rounded-xl text-left transition-colors flex items-center space-x-3 ${
                  activeTab === 'transactions' ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                <span className="font-medium">Transactions</span>
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full px-4 py-3 rounded-xl text-left transition-colors flex items-center space-x-3 ${
                  activeTab === 'users' ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
                <span className="font-medium">Users</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">{formatPrice(totalRevenue)}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <line x1="12" y1="1" x2="12" y2="23" />
                          <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs text-blue-600 mt-2">↑ 8% from last month</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Products</p>
                        <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                      </div>
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                        </svg>
                      </div>
                    </div>
                    {lowStockProducts.length > 0 && (
                      <p className="text-xs text-amber-600 mt-2">⚠️ {lowStockProducts.length} low stock</p>
                    )}
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Users</p>
                        <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs text-purple-600 mt-2">↑ 5 new this week</p>
                  </div>
                </div>

                {/* Alerts Section */}
                {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">⚠️ Inventory Alerts</h3>
                    <div className="space-y-3">
                      {outOfStockProducts.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">Out of Stock</span>
                            <span className="text-sm text-gray-700">{product.name}</span>
                          </div>
                          <span className="text-sm font-medium text-red-600">0 units</span>
                        </div>
                      ))}
                      {lowStockProducts.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Low Stock</span>
                            <span className="text-sm text-gray-700">{product.name}</span>
                          </div>
                          <span className="text-sm font-medium text-amber-600">{product.stock} units left</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {transactions.slice(0, 5).map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                            <td className="px-6 py-4 text-gray-600">{order.customerName}</td>
                            <td className="px-6 py-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{formatPrice(order.total)}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${transactionStatusColors[order.status]?.bg} ${transactionStatusColors[order.status]?.text}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Products Management</h2>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setShowAddProduct(true);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Add Product</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {productList.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-4">
                                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                                <span className="font-medium text-gray-900 max-w-48 truncate">{product.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{product.category}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{formatPrice(product.price)}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <div className={`px-2 py-1 rounded-lg text-sm font-medium ${
                                  product.stock === 0 ? 'bg-red-100 text-red-700' :
                                  product.stock <= 10 ? 'bg-amber-100 text-amber-700' :
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {product.stock} units
                                </div>
                                <div className="flex items-center">
                                  <button
                                    onClick={() => handleUpdateStock(product.id, Math.max(0, product.stock - 1))}
                                    className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-l-lg flex items-center justify-center text-gray-600 transition-colors"
                                  >
                                    -
                                  </button>
                                  <button
                                    onClick={() => handleUpdateStock(product.id, product.stock + 1)}
                                    className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-r-lg flex items-center justify-center text-gray-600 transition-colors"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => {
                                    setEditingProduct(product);
                                    setShowAddProduct(true);
                                  }}
                                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredTransactions.map((transaction) => (
                          <tr key={transaction.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{transaction.id}</td>
                            <td className="px-6 py-4">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{transaction.customerName}</p>
                                <p className="text-xs text-gray-500">{transaction.customerEmail}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {transaction.items.length} item{transaction.items.length > 1 ? 's' : ''}
                            </td>
                            <td className="px-6 py-4 text-gray-600 text-sm">
                              {new Date(transaction.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">{formatPrice(transaction.total)}</td>
                            <td className="px-6 py-4 text-gray-600 text-sm">{transaction.paymentMethod}</td>
                            <td className="px-6 py-4">
                              <select
                                value={transaction.status}
                                onChange={(e) => handleUpdateTransactionStatus(transaction.id, e.target.value as Transaction['status'])}
                                className={`px-3 py-1 text-xs font-medium rounded-full border-0 capitalize ${transactionStatusColors[transaction.status]?.bg} ${transactionStatusColors[transaction.status]?.text}`}
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => setSelectedTransaction(transaction)}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                  <circle cx="12" cy="12" r="3" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {users.map((u) => {
                          const userOrders = transactions.filter((t) => t.customerId === u.id);
                          const userTotalSpent = userOrders.reduce((sum, t) => sum + t.total, 0);
                          return (
                            <tr key={u.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {u.name.charAt(0).toUpperCase()}
                                  </div>
                                  <span className="font-medium text-gray-900">{u.name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-gray-600">{u.email}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  u.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {u.role === 'admin' ? 'Admin' : 'Customer'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div>
                                  <p className="text-sm text-gray-900">{userOrders.length} orders</p>
                                  <p className="text-xs text-gray-500">Total: {formatPrice(userTotalSpent)}</p>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  {u.id !== user?.id && (
                                    <button
                                      onClick={() => handleDeleteUser(u.id)}
                                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                      title="Delete User"
                                    >
                                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedTransaction(null)} />
          <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Transaction Details</h3>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-medium text-gray-900">{selectedTransaction.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">{new Date(selectedTransaction.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium text-gray-900">{selectedTransaction.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${transactionStatusColors[selectedTransaction.status]?.bg} ${transactionStatusColors[selectedTransaction.status]?.text}`}>
                    {selectedTransaction.status}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
                <p className="text-sm text-gray-600">{selectedTransaction.customerName}</p>
                <p className="text-sm text-gray-600">{selectedTransaction.customerEmail}</p>
                <p className="text-sm text-gray-600 mt-2">{selectedTransaction.shippingAddress}</p>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                <div className="space-y-3">
                  {selectedTransaction.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                      </div>
                      <p className="font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">{formatPrice(selectedTransaction.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax (12% VAT)</span>
                  <span className="text-gray-900">{formatPrice(selectedTransaction.tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{formatPrice(selectedTransaction.total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <select
                  value={selectedTransaction.status}
                  onChange={(e) => {
                    handleUpdateTransactionStatus(selectedTransaction.id, e.target.value as Transaction['status']);
                    setSelectedTransaction({ ...selectedTransaction, status: e.target.value as Transaction['status'] });
                  }}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 capitalize"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showAddProduct && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => {
            setShowAddProduct(false);
            setEditingProduct(null);
          }}
          onSave={(product) => {
            if (editingProduct) {
              setProductList(productList.map((p) => (p.id === product.id ? product : p)));
            } else {
              setProductList([...productList, { ...product, id: productList.length + 1 }]);
            }
            setShowAddProduct(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

// Product Form Modal Component
function ProductFormModal({ 
  product, 
  onClose, 
  onSave 
}: { 
  product: Product | null; 
  onClose: () => void; 
  onSave: (product: Product) => void;
}) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    category: product?.category || 'Messenger',
    image: product?.image || '/images/leather-bag.jpg',
    inStock: product?.inStock ?? true,
    stock: product?.stock || 0,
    rating: product?.rating || 4.5,
    reviews: product?.reviews || 0,
    colors: product?.colors?.join(', ') || 'Black, Brown',
    sizes: product?.sizes?.join(', ') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: product?.id || 0,
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      image: formData.image,
      inStock: formData.stock > 0,
      stock: Number(formData.stock),
      rating: formData.rating,
      reviews: formData.reviews,
      colors: formData.colors.split(',').map((c) => c.trim()),
      sizes: formData.sizes ? formData.sizes.split(',').map((s) => s.trim()) : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₱)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {categories.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Colors (comma separated)</label>
            <input
              type="text"
              value={formData.colors}
              onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Black, Brown, Tan"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sizes (comma separated, optional)</label>
            <input
              type="text"
              value={formData.sizes}
              onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Standard, Large"
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
            >
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
