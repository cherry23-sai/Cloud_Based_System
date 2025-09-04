import React, { useState } from 'react';
import { Zap, TrendingUp, Activity, Calendar, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { logActivity } from '../../lib/activityLogger';

const TrackElectricity: React.FC = () => {
  const { user } = useAuth();
  const [meterInfo, setMeterInfo] = useState({
    meterNo: '',
    name: ''
  });

  const [currentReading, setCurrentReading] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeterInfo({ ...meterInfo, [e.target.name]: e.target.value });
  };

  const handleDisplay = () => {
    // Simulate fetching data
    if (user) {
      logActivity(
        user.id,
        user.name,
        user.email,
        'Electricity Reading Viewed',
        `Viewed electricity meter reading for ${meterInfo.meterNo}`,
        'meter_reading'
      );
    }
    
    setCurrentReading({
      meterNo: meterInfo.meterNo,
      name: meterInfo.name,
      currentReading: '4,892',
      lastReading: '4,756',
      consumption: '136',
      bill: '₹1,632',
      status: 'Active',
      lastUpdate: new Date().toLocaleString(),
      avgDaily: '4.5',
      peakHours: '6 PM - 10 PM',
      efficiency: '87%'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Zap className="mr-3 h-8 w-8" />
              Track Electricity Reading
            </h1>
            <p className="text-yellow-100 mt-2">Monitor your electricity consumption and usage patterns</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Meter Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meter Number</label>
                    <input
                      type="text"
                      name="meterNo"
                      value={meterInfo.meterNo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter electricity meter number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Consumer Name</label>
                    <input
                      type="text"
                      name="name"
                      value={meterInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter consumer name"
                    />
                  </div>
                  <button
                    onClick={handleDisplay}
                    disabled={!meterInfo.meterNo || !meterInfo.name}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Eye className="mr-2 h-5 w-5" />
                    Display Reading
                  </button>
                </div>
              </div>

              {/* Current Status */}
              {currentReading && (
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Activity className="mr-2 h-6 w-6 text-yellow-600" />
                    Current Status
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status:</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {currentReading.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Consumer:</span>
                      <span className="font-medium">{currentReading.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Meter No:</span>
                      <span className="font-medium">{currentReading.meterNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium text-sm">{currentReading.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Reading Information */}
            {currentReading && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Current Reading</p>
                      <p className="text-2xl font-bold text-blue-900">{currentReading.currentReading}</p>
                      <p className="text-blue-700 text-sm">kWh</p>
                    </div>
                    <Zap className="h-8 w-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Monthly Usage</p>
                      <p className="text-2xl font-bold text-green-900">{currentReading.consumption}</p>
                      <p className="text-green-700 text-sm">kWh</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Current Bill</p>
                      <p className="text-2xl font-bold text-purple-900">{currentReading.bill}</p>
                      <p className="text-purple-700 text-sm">Estimated</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">Daily Average</p>
                      <p className="text-2xl font-bold text-orange-900">{currentReading.avgDaily}</p>
                      <p className="text-orange-700 text-sm">kWh/day</p>
                    </div>
                    <Activity className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>
            )}

            {/* Usage Analytics */}
            {currentReading && (
              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Usage Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{currentReading.peakHours}</div>
                    <div className="text-gray-600 text-sm">Peak Usage Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{currentReading.efficiency}</div>
                    <div className="text-gray-600 text-sm">Energy Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">₹12.50</div>
                    <div className="text-gray-600 text-sm">Rate per kWh</div>
                  </div>
                </div>

                <div className="mt-6 bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Monthly Comparison</h4>
                  <div className="flex items-end space-x-2 h-32">
                    {[120, 145, 132, 156, 142, 136].map((value, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="bg-gradient-to-t from-yellow-500 to-orange-500 rounded-t w-full"
                          style={{ height: `${(value / 156) * 100}%` }}
                        ></div>
                        <div className="text-xs text-gray-600 mt-2">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                        </div>
                        <div className="text-xs font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackElectricity;