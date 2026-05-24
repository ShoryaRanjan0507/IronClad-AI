import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'officer';
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, role: 'admin' | 'officer') => Promise<boolean>;
  logout: () => void;
  updateUser: (username: string, email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ironclad_user');
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string, role: 'admin' | 'officer'): Promise<boolean> => {
    // Simulated login
    const username = email.split('@')[0];
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      username: username.charAt(0).toUpperCase() + username.slice(1),
      email: email,
      role: role,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${username}&radius=50`,
      createdAt: new Date().toLocaleDateString(),
    };
    setUser(newUser);
    localStorage.setItem('ironclad_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ironclad_user');
  };

  const updateUser = (username: string, email: string) => {
    if (user) {
      const updated = { ...user, username, email };
      setUser(updated);
      localStorage.setItem('ironclad_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
