import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, UserProfile } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, we'll use localStorage
      // In production, this would authenticate with Supabase
      if (email === 'admin@smartutility.com' && password === 'admin123') {
        const adminUser = {
          id: 'admin',
          name: 'Admin User',
          email: 'admin@smartutility.com',
          mobile: '',
          dob: '',
          area: '',
          water_meter_no: '',
          electricity_meter_no: '',
          created_at: new Date().toISOString()
        };
        setUser(adminUser);
        localStorage.setItem('userData', JSON.stringify(adminUser));
        localStorage.setItem('isAdmin', 'true');
        return true;
      }

      // Check if user exists in localStorage (demo)
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('userData', JSON.stringify(userWithoutPassword));
        localStorage.setItem('isAdmin', 'false');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      const newUser: UserProfile = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
        dob: userData.dob,
        area: userData.area,
        water_meter_no: userData.waterMeterNo,
        electricity_meter_no: userData.electricityMeterNo,
        created_at: new Date().toISOString()
      };

      // Store in localStorage (demo)
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      users.push({ ...newUser, password: userData.password });
      localStorage.setItem('registeredUsers', JSON.stringify(users));

      setUser(newUser);
      localStorage.setItem('userData', JSON.stringify(newUser));
      localStorage.setItem('isAdmin', 'false');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('isAdmin');
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    try {
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        
        // Update in registered users list
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const userIndex = users.findIndex((u: any) => u.id === user.id);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...data };
          localStorage.setItem('registeredUsers', JSON.stringify(users));
        }
      }
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};