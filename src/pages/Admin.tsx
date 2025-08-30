import React, { useState, useEffect } from 'react';
import { Shield, Users, MessageSquare, Activity, Zap, Droplets, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
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
    
    setUsers(registeredUsers);
    setFeedbacks(userFeedbacks);

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

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold text-blue-900">{stats.totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Total Feedbacks</p>
              <p className="text-3xl font-bold text-green-900">{stats.totalFeedbacks}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Avg Rating</p>
              <p className="text-3xl font-bold text-yellow-900">{stats.avgRating}/5</p>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Total Usage</p>
              <p className="text-3xl font-bold text-purple-900">{stats.totalUsage.electricity + stats.totalUsage.water}</p>
            </div>
            <Activity className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Usage Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Usage Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 font-medium">Total Electricity Usage</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.totalUsage.electricity} kWh</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 font-medium">Total Water Usage</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalUsage.water} L</p>
              </div>
              <Droplets className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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

  const renderUsage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">User Meter Usage Details</h3>
        <div className="grid grid-cols-1 gap-6">
          {users.map((user, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600">{user.area}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Member since</p>
                  <p className="text-sm font-medium">{new Date(user.created_at).toLocaleDateString('en-IN')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-yellow-800">Electricity Usage</h5>
                    <Zap className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Meter No:</span> {user.electricityMeterNo}</p>
                    <p><span className="text-gray-600">Current Reading:</span> 4,892 kWh</p>
                    <p><span className="text-gray-600">Monthly Usage:</span> 136 kWh</p>
                    <p><span className="text-gray-600">Estimated Bill:</span> ₹1,632</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-blue-800">Water Usage</h5>
                    <Droplets className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Meter No:</span> {user.waterMeterNo}</p>
                    <p><span className="text-gray-600">Current Reading:</span> 12,456 L</p>
                    <p><span className="text-gray-600">Monthly Usage:</span> 566 L</p>
                    <p><span className="text-gray-600">Estimated Bill:</span> ₹849</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
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
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'users', label: 'Users', icon: Users },
                { id: 'feedbacks', label: 'Feedbacks', icon: MessageSquare },
                { id: 'usage', label: 'Usage Details', icon: Activity }
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
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'feedbacks' && renderFeedbacks()}
            {activeTab === 'usage' && renderUsage()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;