import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Home, Settings, MessageSquare, Info, Star, LogOut, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userName = localStorage.getItem('userName') || 'User';

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-800">SmartUtility</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
              <Link
                to="/services"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/services') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="h-4 w-4 mr-1" />
                Services
              </Link>
              <Link
                to="/feedback"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/feedback') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Feedback
              </Link>
              <Link
                to="/reviews"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/reviews') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Star className="h-4 w-4 mr-1" />
                Reviews
              </Link>
              <Link
                to="/about"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/about') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Info className="h-4 w-4 mr-1" />
                About Us
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-blue-400 mr-2" />
                <span className="text-lg font-bold">SmartUtility</span>
              </div>
              <p className="text-gray-300 text-sm">
                Your trusted partner for smart utility management and bill tracking.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Bill Payments</li>
                <li>Usage Tracking</li>
                <li>Limit Setting</li>
                <li>Transaction History</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Live Chat</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
              <div className="text-sm text-gray-300 space-y-1">
                <p>support@smartutility.com</p>
                <p>1-800-SMART-01</p>
                <p>24/7 Customer Support</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>&copy; 2024 SmartUtility. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;