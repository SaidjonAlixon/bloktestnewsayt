import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  refreshUser: () => void;
}

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Local storage keys
const USERS_KEY = 'testblok_users';
const CURRENT_USER_KEY = 'testblok_current_user';
const PASSWORDS_KEY = 'testblok_passwords';

// Helper functions for localStorage
const getStoredUsers = (): User[] => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getStoredPasswords = (): Record<string, string> => {
  try {
    const passwords = localStorage.getItem(PASSWORDS_KEY);
    return passwords ? JSON.parse(passwords) : {};
  } catch {
    return {};
  }
};

const savePasswords = (passwords: Record<string, string>) => {
  localStorage.setItem(PASSWORDS_KEY, JSON.stringify(passwords));
};

const getCurrentUser = (): User | null => {
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const saveCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

// Initialize with default admin user
const initializeDefaultUsers = () => {
  const existingUsers = getStoredUsers();
  const existingPasswords = getStoredPasswords();
  
  // Always ensure admin password is set
  const updatedPasswords = { 
    ...existingPasswords, 
    'admin@testblok.uz': '123456',
    'student@testblok.uz': '123456'
  };
  savePasswords(updatedPasswords);
  
  // Check if admin already exists
  const adminExists = existingUsers.some(user => user.email === 'admin@testblok.uz');
  
  if (!adminExists) {
    const defaultAdmin: User = {
      id: 'admin-1',
      fullName: 'Admin Adminovich',
      email: 'admin@testblok.uz',
      phone: '+998901234567',
      role: 'admin',
      isBlocked: false,
      freeTestUsed: false,
      testAttempts: 0,
      maxTestAttempts: -1, // Unlimited for admin
      allowedDirections: [],
      createdAt: new Date().toISOString(),
    };
    
    const updatedUsers = [defaultAdmin, ...existingUsers];
    saveUsers(updatedUsers);
  }

  // Add demo student if not exists
  const studentExists = existingUsers.some(user => user.email === 'student@testblok.uz');
  if (!studentExists) {
    const demoStudent: User = {
      id: 'student-1',
      fullName: 'Demo Student',
      email: 'student@testblok.uz',
      phone: '+998901234568',
      role: 'student',
      isBlocked: false,
      freeTestUsed: false,
      testAttempts: 0,
      maxTestAttempts: 1, // Only free test
      allowedDirections: [],
      createdAt: new Date().toISOString(),
    };
    
    const allUsers = getStoredUsers();
    const updatedUsers = [...allUsers, demoStudent];
    saveUsers(updatedUsers);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize default users
    initializeDefaultUsers();
    
    // Check if user is logged in
    const savedUser = getCurrentUser();
    if (savedUser) {
      // Verify user still exists in users list and get latest data
      const users = getStoredUsers();
      const userExists = users.find(u => u.id === savedUser.id);
      if (userExists) {
        setUser(userExists);
        saveCurrentUser(userExists); // Update with latest data
      } else {
        // User was deleted, clear current user
        saveCurrentUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const refreshUser = () => {
    if (user) {
      const users = getStoredUsers();
      const updatedUser = users.find(u => u.id === user.id);
      if (updatedUser) {
        setUser(updatedUser);
        saveCurrentUser(updatedUser);
      }
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getStoredUsers();
      const passwords = getStoredPasswords();
      const foundUser = users.find(u => u.email === email);
      
      console.log('Login attempt:', { email, password, foundUser, storedPassword: passwords[email] });
      
      if (foundUser && passwords[email] === password) {
        if (foundUser.isBlocked) {
          return false; // User is blocked
        }
        
        setUser(foundUser);
        saveCurrentUser(foundUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getStoredUsers();
      const passwords = getStoredPasswords();
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === data.email);
      if (existingUser) {
        return false; // User already exists
      }
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        role: 'student',
        isBlocked: false,
        freeTestUsed: false,
        testAttempts: 0,
        maxTestAttempts: 1, // Only free test initially
        allowedDirections: [],
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...users, newUser];
      const updatedPasswords = { ...passwords, [data.email]: data.password };
      
      saveUsers(updatedUsers);
      savePasswords(updatedPasswords);
      
      setUser(newUser);
      saveCurrentUser(newUser);
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    saveCurrentUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};