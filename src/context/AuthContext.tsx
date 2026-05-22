import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  showAuthModal: boolean;
  authMode: 'login' | 'register';
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  setShowAuthModal: (show: boolean) => void;
  setAuthMode: (mode: 'login' | 'register') => void;
  updateUser: (userId: number, updates: Partial<User>) => void;
  deleteUser: (userId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const defaultUsers: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@luxebags.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Juan Dela Cruz', email: 'juan@example.com', password: '123456', role: 'customer' },
  { id: 3, name: 'Maria Santos', email: 'maria@example.com', password: '123456', role: 'customer' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('luxe_users');
    return saved ? JSON.parse(saved) : defaultUsers;
  });
  
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('luxe_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    localStorage.setItem('luxe_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('luxe_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('luxe_current_user');
    }
  }, [user]);

  const login = (email: string, password: string): boolean => {
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      setShowAuthModal(false);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (existingUser) {
      return false;
    }
    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      password,
      role: 'customer',
    };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    setShowAuthModal(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  const updateUser = (userId: number, updates: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updates } : u))
    );
  };

  const deleteUser = (userId: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isAuthenticated: !!user,
        isAdmin,
        showAuthModal,
        authMode,
        login,
        register,
        logout,
        setShowAuthModal,
        setAuthMode,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
