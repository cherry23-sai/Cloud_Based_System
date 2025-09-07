import React, { useState, useEffect } from 'react';
import { Shield, Users, MessageSquare, Activity, Zap, Droplets, Star, TrendingUp, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getActivities, getTransactions, Activity as ActivityType } from '../lib/activityLogger';

interface AdminStats {
  totalUsers: number;
  totalFeedbacks: number;
  avgRating: number;
  totalUsage: {
    electricity: number;
    water: number;
  };
}

const Admin: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('activities');
  const [users, setUsers] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalFeedbacks: 0,
    avgRating: 0,
    totalUsage: { electricity: 0, water: 0 }
  });

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin]);

  const loadAdminData = () => {
    // Load users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userFeedbacks = JSON.parse(localStorage.getItem('userFeedbacks') || '[]');
    const userActivities = getActivities();
    const userTransactions = getTransactions();
    
    setUsers(registeredUsers);
    setFeedbacks(userFeedbacks);
    setActivities(userActivities);
    setTransactions(userTransactions);

    // Calculate stats
    const avgRating = userFeedbacks.length > 0 
      ? userFeedbacks.reduce((sum: number, f: any) => sum + f.interfaceRating, 0) / userFeedbacks.length 
      : 0;

    setStats({
      totalUsers: registeredUsers.length,
      totalFeedbacks: userFeedbacks.length,
      avgRating: Math.round(avgRating * 10) / 10,
      totalUsage: {
        electricity: registeredUsers.length * 136, // Sample calculation
        water: registeredUsers.length * 566
      }
    });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }


  const renderUsers = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Registered Users</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Electricity Meter</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Water Meter</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.mobile}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.area}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.electricityMeterNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.waterMeterNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(user.created_at).toLocaleDateString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFeedbacks = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">User Feedbacks</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6">
          {feedbacks.map((feedback, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{feedback.name}</h4>
                  <p className="text-sm text-gray-600">{feedback.email}</p>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= feedback.interfaceRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{feedback.interfaceRating}/5</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">Services Used:</span>
                  <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {feedback.servicesUsed}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Performance:</span>
                  <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    {feedback.performance}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 italic">"{feedback.overallFeedback}"</p>
              <p className="text-xs text-gray-500 mt-2">
                Submitted on {new Date(feedback.createdAt).toLocaleDateString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


  const renderActivities = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">User Activities</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className={`p-2 rounded-full ${
                activity.type === 'payment' ? 'bg-green-100' :
                activity.type === 'feedback' ? 'bg-blue-100' :
                activity.type === 'login' ? 'bg-purple-100' :
                activity.type === 'registration' ? 'bg-yellow-100' :
                'bg-gray-100'
              }`}>
                <Activity className={`h-5 w-5 ${
                  activity.type === 'payment' ? 'text-green-600' :
                  activity.type === 'feedback' ? 'text-blue-600' :
                  activity.type === 'login' ? 'text-purple-600' :
                  activity.type === 'registration' ? 'text-yellow-600' :
                  'text-gray-600'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900">{activity.userName}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-sm text-gray-700 font-medium">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.details}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.userEmail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Shield className="mr-3 h-8 w-8" />
              Admin Dashboard
            </h1>
            <p className="text-gray-300 mt-2">Monitor user activity, feedback, and system performance</p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'activities', label: 'User Activities', icon: Activity },
                { id: 'users', label: 'Users', icon: Users },
                { id: 'feedbacks', label: 'Feedbacks', icon: MessageSquare },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'activities' && renderActivities()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'feedbacks' && renderFeedbacks()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;