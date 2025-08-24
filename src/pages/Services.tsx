import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Settings, Zap, Droplets, History, FileText, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      title: 'Bill Payments',
      description: 'Pay your electricity and water bills quickly and securely with multiple payment options.',
      icon: CreditCard,
      color: 'from-blue-500 to-blue-600',
      link: '/services/bill-payments'
    },
    {
      title: 'Setting Limit',
      description: 'Set consumption limits and receive alerts when approaching your threshold.',
      icon: Settings,
      color: 'from-green-500 to-green-600',
      link: '/services/setting-limit'
    },
    {
      title: 'Tracking Electricity Reading',
      description: 'Monitor your electricity consumption with real-time meter readings and analytics.',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      link: '/services/track-electricity'
    },
    {
      title: 'Tracking Water Reading',
      description: 'Track your water usage patterns and identify opportunities for conservation.',
      icon: Droplets,
      color: 'from-cyan-500 to-blue-500',
      link: '/services/track-water'
    },
    {
      title: 'Transaction History',
      description: 'View detailed history of all your payments and transactions with downloadable invoices.',
      icon: History,
      color: 'from-purple-500 to-indigo-600',
      link: '/services/transaction-history'
    },
    {
      title: 'Invoice of Bills',
      description: 'Generate and download detailed invoices for all your utility payments.',
      icon: FileText,
      color: 'from-pink-500 to-rose-600',
      link: '/services/invoice-bills'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Services Provided by
            <span className="block text-blue-200">Our Website</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive utility management tools designed to simplify your life and optimize your consumption
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link
                  key={index}
                  to={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                  <div className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      <span>Learn More</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who have already optimized their utility management
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;