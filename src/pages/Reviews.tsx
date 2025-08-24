import React, { useState, useEffect } from 'react';
import { Star, User, Calendar, Filter } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  email: string;
  servicesUsed: string;
  performance: string;
  interfaceRating: number;
  overallFeedback: string;
  date: string;
  verified: boolean;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterRating, setFilterRating] = useState('All');
  const [filterService, setFilterService] = useState('All');

  const sampleReviews: Review[] = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.k@email.com',
      servicesUsed: 'Bill Payments',
      performance: 'Excellent',
      interfaceRating: 5,
      overallFeedback: 'Outstanding service! The bill payment process is seamless and secure. I can pay both my electricity and water bills in just a few clicks. The interface is intuitive and the transaction history feature is very helpful.',
      date: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      servicesUsed: 'Multiple Services',
      performance: 'Good',
      interfaceRating: 4,
      overallFeedback: 'Great platform for managing utilities. I love the usage tracking feature that helps me monitor my consumption. The limit setting feature has helped me reduce my monthly bills significantly.',
      date: '2024-01-12',
      verified: true
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.p@email.com',
      servicesUsed: 'Tracking Electricity',
      performance: 'Excellent',
      interfaceRating: 5,
      overallFeedback: 'The electricity tracking feature is amazing! Real-time monitoring and detailed analytics have helped me understand my consumption patterns. The mobile app works perfectly too.',
      date: '2024-01-10',
      verified: true
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      email: 'sneha.reddy@email.com',
      servicesUsed: 'Setting Limit',
      performance: 'Good',
      interfaceRating: 4,
      overallFeedback: 'The limit setting feature is very useful. I get timely notifications when I\'m approaching my consumption limits. This has helped me control my utility expenses effectively.',
      date: '2024-01-08',
      verified: false
    },
    {
      id: 5,
      name: 'Vikash Singh',
      email: 'vikash.singh@email.com',
      servicesUsed: 'Transaction History',
      performance: 'Average',
      interfaceRating: 3,
      overallFeedback: 'The transaction history feature is comprehensive. However, I would like to see more filtering options and maybe export functionality for better record keeping.',
      date: '2024-01-05',
      verified: true
    },
    {
      id: 6,
      name: 'Kavya Menon',
      email: 'kavya.m@email.com',
      servicesUsed: 'Tracking Water',
      performance: 'Excellent',
      interfaceRating: 5,
      overallFeedback: 'Water tracking has never been easier! The visual charts and monthly comparisons are very helpful. Customer support is also very responsive and helpful.',
      date: '2024-01-03',
      verified: true
    }
  ];

  useEffect(() => {
    // Simulate loading reviews
    setReviews(sampleReviews);
  }, []);

  const filteredReviews = reviews.filter(review => {
    const matchesRating = filterRating === 'All' || 
                         (filterRating === '5' && review.interfaceRating === 5) ||
                         (filterRating === '4' && review.interfaceRating === 4) ||
                         (filterRating === '3' && review.interfaceRating <= 3);
    const matchesService = filterService === 'All' || review.servicesUsed === filterService;
    return matchesRating && matchesService;
  });

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.interfaceRating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.interfaceRating === rating).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(review => review.interfaceRating === rating).length / reviews.length) * 100 
      : 0
  }));

  const StarDisplay = ({ rating, size = 'h-4 w-4' }: { rating: number; size?: string }) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-600 to-orange-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Star className="mr-3 h-8 w-8" />
              Customer Reviews
            </h1>
            <p className="text-yellow-100 mt-2">See what our users are saying about SmartUtility</p>
          </div>

          <div className="p-8">
            {/* Rating Overview */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mb-8 border border-yellow-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="text-center lg:text-left">
                  <div className="text-6xl font-bold text-yellow-600 mb-2">{averageRating}</div>
                  <StarDisplay rating={Math.round(Number(averageRating))} size="h-6 w-6" />
                  <div className="text-gray-600 mt-2">Based on {reviews.length} reviews</div>
                </div>
                
                <div className="space-y-2">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <span className="text-sm font-medium w-6">{rating}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="All">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars & Below</option>
              </select>
              
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="All">All Services</option>
                <option value="Bill Payments">Bill Payments</option>
                <option value="Setting Limit">Setting Limit</option>
                <option value="Tracking Electricity">Tracking Electricity</option>
                <option value="Tracking Water">Tracking Water</option>
                <option value="Transaction History">Transaction History</option>
                <option value="Multiple Services">Multiple Services</option>
              </select>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 flex items-center">
                          {review.name}
                          {review.verified && (
                            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Verified
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <StarDisplay rating={review.interfaceRating} />
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {review.servicesUsed}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {review.performance}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    "{review.overallFeedback}"
                  </p>
                </div>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <div className="text-center py-12">
                <Star className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;