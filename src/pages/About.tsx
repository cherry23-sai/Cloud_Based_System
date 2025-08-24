import React from 'react';
import { Zap, Users, Target, Award, Shield, Clock, HeartHandshake, Globe } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Bank-grade security with 99.9% uptime guarantee for all your utility management needs.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you with any queries or technical issues.'
    },
    {
      icon: Globe,
      title: 'Cloud-Based',
      description: 'Access your utility data from anywhere, anytime with our robust cloud infrastructure.'
    },
    {
      icon: HeartHandshake,
      title: 'User-Centric',
      description: 'Designed with user experience in mind, making utility management simple and intuitive.'
    }
  ];

  const team = [
    {
      name: 'Dr. Arjun Mehta',
      role: 'Chief Technology Officer',
      description: 'Former IIT professor with 15+ years in smart city solutions and IoT development.'
    },
    {
      name: 'Ravi Gupta',
      role: 'Product Manager',
      description: 'Expert in utility management systems with deep understanding of consumer needs.'
    },
    {
      name: 'Nisha Patel',
      role: 'Lead Developer',
      description: 'Full-stack developer specializing in cloud-based applications and real-time systems.'
    },
    {
      name: 'Kiran Singh',
      role: 'Customer Success',
      description: 'Dedicated to ensuring every user gets maximum value from our platform.'
    }
  ];

  const stats = [
    { number: '15,000+', label: 'Active Users' },
    { number: '₹2.5Cr+', label: 'Bills Processed' },
    { number: '95%', label: 'Customer Satisfaction' },
    { number: '30%', label: 'Average Savings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About SmartUtility
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Revolutionizing utility management through innovative cloud-based solutions that empower users 
            to take control of their energy and water consumption.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-3 rounded-lg mr-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To democratize smart utility management by providing intuitive, affordable, and comprehensive 
                solutions that help households and businesses optimize their energy and water consumption, 
                reduce costs, and contribute to a sustainable future.
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-indigo-600 p-3 rounded-lg mr-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To become India's leading smart utility management platform, enabling millions of users 
                to make informed decisions about their resource consumption while building a more 
                sustainable and energy-efficient society.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose SmartUtility?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the most reliable, secure, and user-friendly utility management experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-10 w-10 text-blue-600 mr-3" />
              <h2 className="text-4xl font-bold text-gray-900">
                Meet Our Team
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dedicated team of experts is committed to delivering exceptional utility management solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium text-center mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Story */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Journey
            </h2>
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6">
                  SmartUtility was born from a simple observation: utility management in India was stuck in the past. 
                  Founded in 2020 by a team of IIT graduates and industry veterans, we recognized the need for a 
                  comprehensive, user-friendly platform that could help Indian households and businesses take control 
                  of their utility consumption.
                </p>
                
                <p className="mb-6">
                  Starting with a small pilot program in Bangalore, we quickly realized the immense potential of 
                  cloud-based utility management. Our platform helped early users reduce their utility bills by 
                  an average of 30% while providing unprecedented visibility into their consumption patterns.
                </p>
                
                <p className="mb-6">
                  Today, SmartUtility serves over 15,000 active users across 50+ cities in India. We've processed 
                  over ₹2.5 crores in bill payments and helped our users save millions in utility costs. But we're 
                  just getting started.
                </p>
                
                <p>
                  As we look to the future, we remain committed to our core mission: making smart utility management 
                  accessible, affordable, and effective for everyone. With continued innovation in IoT, artificial 
                  intelligence, and sustainable technologies, we're building the foundation for India's smart utility future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Smart Utility Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied users who have already transformed their utility management experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg"
            >
              Get Started Today
            </a>
            <a
              href="/feedback"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-colors"
            >
              Share Feedback
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;