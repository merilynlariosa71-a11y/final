export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  stock: number;
  colors: string[];
  sizes?: string[];
}

export interface Transaction {
  id: string;
  customerId: number;
  customerName: string;
  customerEmail: string;
  items: { productId: number; name: string; quantity: number; price: number; }[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
}

export type Page = 'shop' | 'cart' | 'checkout' | 'confirmation' | 'account' | 'admin' | 'collections' | 'about';
