import React, { useState } from 'react';
import { Settings, Zap, Droplets, Bell, Clock, Mail, Phone, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { logActivity } from '../../lib/activityLogger';
import { sendLimitAlert } from '../../lib/notificationService';

const SettingLimit: React.FC = () => {
  const { user } = useAuth();
  const [limits, setLimits] = useState({
    electricityMeterNo: '',
    electricityLimit: '',
    waterMeterNo: '',
    waterLimit: '',
    reminder: '24',
    snooze: '1',
    notifyPhone: true,
    notifyEmail: true
  });

  const [saved, setSaved] = useState(false);
  const [sendingAlerts, setSendingAlerts] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setLimits({
      ...limits,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that user is using their assigned meter numbers
    if (user) {
      if (limits.electricityMeterNo !== user.electricity_meter_no) {
        alert('Please use your assigned electricity meter number only.');
        return;
      }
      if (limits.waterMeterNo !== user.water_meter_no) {
        alert('Please use your assigned water meter number only.');
        return;
      }
    }
    
    setSendingAlerts(true);
    
    // Log activity
    if (user) {
      logActivity(
        user.id,
        user.name,
        user.email,
        'Limit Settings Updated',
        `Set electricity limit: ${limits.electricityLimit} kWh, water limit: ${limits.waterLimit} L`,
        'limit_setting'
      );
    }
    
    // Send alerts to user
    if (user && (limits.notifyPhone || limits.notifyEmail)) {
      try {
        const alertPromises = [];
        
        if (limits.notifyPhone && user.mobile) {
          alertPromises.push(
            sendLimitAlert('sms', user.mobile, user.name, 'electricity', limits.electricityLimit)
          );
          if (limits.waterLimit) {
            alertPromises.push(
              sendLimitAlert('sms', user.mobile, user.name, 'water', limits.waterLimit)
            );
          }
        }
        
        if (limits.notifyEmail && user.email) {
          alertPromises.push(
            sendLimitAlert('email', user.email, user.name, 'electricity', limits.electricityLimit)
          );
          if (limits.waterLimit) {
            alertPromises.push(
              sendLimitAlert('email', user.email, user.name, 'water', limits.waterLimit)
            );
          }
        }
        
        await Promise.all(alertPromises);
      } catch (error) {
        console.error('Error sending alerts:', error);
      }
    }
    
    setSendingAlerts(false);
    setSaved(true);
    
    // Show success message with alert details
    setTimeout(() => {
      setSaved(false);
      if (limits.notifyPhone || limits.notifyEmail) {
        alert(`Limit settings saved successfully!\n\nAlerts sent to:\n${limits.notifyPhone && user?.mobile ? `• SMS: ${user.mobile}\n` : ''}${limits.notifyEmail && user?.email ? `• Email: ${user.email}` : ''}`);
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Settings className="mr-3 h-8 w-8" />
              Setting Limits
            </h1>
            <p className="text-green-100 mt-2">Configure consumption limits and alerts for your utilities</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {saved && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center">
                <Save className="mr-2 h-5 w-5" />
                Settings saved successfully!
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Electricity Limits */}
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center mb-6">
                  <div className="bg-yellow-500 p-2 rounded-lg mr-3">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Electricity Limits</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meter Number</label>
                    <input
                      type="text"
                      name="electricityMeterNo"
                      value={limits.electricityMeterNo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter electricity meter number"
                      required
                    />
                    {user && (
                      <div className="mt-1 text-xs text-gray-500">
                        Your meter: {user.electricity_meter_no}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Limit (kWh)</label>
                    <input
                      type="number"
                      name="electricityLimit"
                      value={limits.electricityLimit}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter monthly consumption limit"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Water Limits */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-500 p-2 rounded-lg mr-3">
                    <Droplets className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Water Limits</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meter Number</label>
                    <input
                      type="text"
                      name="waterMeterNo"
                      value={limits.waterMeterNo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter water meter number"
                      required
                    />
                    {user && (
                      <div className="mt-1 text-xs text-gray-500">
                        Your meter: {user.water_meter_no}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Limit (Liters)</label>
                    <input
                      type="number"
                      name="waterLimit"
                      value={limits.waterLimit}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter monthly consumption limit"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Settings */}
            <div className="mt-8 bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center mb-6">
                <div className="bg-purple-500 p-2 rounded-lg mr-3">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Alert Settings</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reminder (Hours Before Limit)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      name="reminder"
                      value={limits.reminder}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="1">1 Hour</option>
                      <option value="6">6 Hours</option>
                      <option value="12">12 Hours</option>
                      <option value="24">24 Hours</option>
                      <option value="48">48 Hours</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Snooze Duration (Hours)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      name="snooze"
                      value={limits.snooze}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="0.5">30 Minutes</option>
                      <option value="1">1 Hour</option>
                      <option value="2">2 Hours</option>
                      <option value="4">4 Hours</option>
                      <option value="8">8 Hours</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">Notification Preferences</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      name="notifyPhone"
                      checked={limits.notifyPhone}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <Phone className="ml-3 h-5 w-5 text-gray-500" />
                    <span className="ml-2 text-gray-700">SMS Notifications</span>
                  </label>

                  <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      name="notifyEmail"
                      checked={limits.notifyEmail}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <Mail className="ml-3 h-5 w-5 text-gray-500" />
                    <span className="ml-2 text-gray-700">Email Notifications</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={sendingAlerts}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg hover:from-green-700 hover:to-emerald-800 transition-all font-medium flex items-center disabled:opacity-50"
              >
                <Save className="mr-2 h-5 w-5" />
                {sendingAlerts ? 'Saving & Sending Alerts...' : 'Save Limit Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingLimit;