import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product, Page } from '../types';

interface CartContextType {
  items: CartItem[];
  currentPage: Page;
  selectedProduct: Product | null;
  addToCart: (product: Product, color: string, size?: string) => void;
  removeFromCart: (productId: number, color: string, size?: string) => void;
  updateQuantity: (productId: number, color: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  setCurrentPage: (page: Page) => void;
  setSelectedProduct: (product: Product | null) => void;
  completeOrder: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product, color: string, size?: string) => {
    setItems((prev) => {
      const existingItem = prev.find(
        (item) => item.product.id === product.id && item.selectedColor === color && item.selectedSize === size
      );
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedColor === color && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedColor: color, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: number, color: string, size?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedColor === color && item.selectedSize === size)
      )
    );
  };

  const updateQuantity = (productId: number, color: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const getTotal = () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const getItemCount = () => items.reduce((sum, item) => sum + item.quantity, 0);

  const completeOrder = () => {
    setItems([]);
    setCurrentPage('confirmation');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        currentPage,
        selectedProduct,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
        setCurrentPage,
        setSelectedProduct,
        completeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
