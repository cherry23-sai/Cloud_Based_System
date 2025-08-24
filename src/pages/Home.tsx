import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Shield, Clock } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/906531/pexels-photo-906531.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Smart Utility
            <span className="block text-blue-300">Management</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Take control of your electricity and water usage with our cloud-based intelligent system
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-full hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Project Info Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionizing Utility Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our cloud-based smart utility system empowers you to monitor, control, and optimize 
              your electricity and water consumption with real-time insights and intelligent automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Real-time Monitoring</h3>
              <p className="text-gray-600">
                Track your electricity and water usage in real-time with detailed analytics and insights.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Smart Limits & Alerts</h3>
              <p className="text-gray-600">
                Set consumption limits and receive instant notifications when approaching thresholds.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Automated Payments</h3>
              <p className="text-gray-600">
                Streamline your bill payments with automated processing and payment history tracking.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-6">
              Join Thousands of Smart Users
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              <div>
                <div className="text-4xl font-bold mb-2">15,000+</div>
                <div className="text-blue-200">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">₹2.5Cr+</div>
                <div className="text-blue-200">Bills Processed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">30%</div>
                <div className="text-blue-200">Average Savings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;