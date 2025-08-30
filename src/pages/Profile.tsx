import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Zap, Droplets, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    dob: user?.dob || '',
    area: user?.area || '',
    water_meter_no: user?.water_meter_no || '',
    electricity_meter_no: user?.electricity_meter_no || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const success = await updateProfile(editData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      dob: user?.dob || '',
      area: user?.area || '',
      water_meter_no: user?.water_meter_no || '',
      electricity_meter_no: user?.electricity_meter_no || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
          <a href="/auth" className="text-blue-600 hover:text-blue-800">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                  <User className="mr-3 h-8 w-8" />
                  User Profile
                </h1>
                <p className="text-blue-100 mt-2">Manage your account information and preferences</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors flex items-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Picture & Basic Info */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center border border-blue-200">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{user.name}</h2>
                  <p className="text-gray-600 mb-4">{user.email}</p>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600">
                      <p><span className="font-medium">Member since:</span></p>
                      <p>{new Date(user.created_at).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                      <User className="h-5 w-5 mr-2 text-blue-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="bg-white px-4 py-3 rounded-lg border border-gray-200">
                            {user.name}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                        {isEditing ? (
                          <input
                            type="date"
                            name="dob"
                            value={editData.dob}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="bg-white px-4 py-3 rounded-lg border border-gray-200">
                            {user.dob ? new Date(user.dob).toLocaleDateString('en-IN') : 'Not provided'}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                        {isEditing ? (
                          <select
                            name="area"
                            value={editData.area}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select your area</option>
                            <option value="sector-1">Sector 1</option>
                            <option value="sector-2">Sector 2</option>
                            <option value="sector-3">Sector 3</option>
                            <option value="downtown">Downtown</option>
                            <option value="uptown">Uptown</option>
                          </select>
                        ) : (
                          <div className="bg-white px-4 py-3 rounded-lg border border-gray-200">
                            {user.area || 'Not provided'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-green-600" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={editData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="bg-white px-4 py-3 rounded-lg border border-gray-200">
                            {user.email}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="mobile"
                            value={editData.mobile}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="bg-white px-4 py-3 rounded-lg border border-gray-200">
                            {user.mobile || 'Not provided'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Meter Information */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                      Meter Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Electricity Meter No</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="electricity_meter_no"
                            value={editData.electricity_meter_no}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="bg-white px-4 py-3 rounded-lg border border-gray-200 flex items-center">
                            <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                            {user.electricity_meter_no || 'Not provided'}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Water Meter No</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="water_meter_no"
                            value={editData.water_meter_no}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="bg-white px-4 py-3 rounded-lg border border-gray-200 flex items-center">
                            <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                            {user.water_meter_no || 'Not provided'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {isEditing && (
                    <div className="flex space-x-4">
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                      >
                        <Save className="h-5 w-5 mr-2" />
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium flex items-center justify-center"
                      >
                        <X className="h-5 w-5 mr-2" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;