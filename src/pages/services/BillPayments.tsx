import React, { useState } from 'react';
import { CreditCard, Calendar, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logTransaction } from '../../lib/activityLogger';

const BillPayments: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    billNo: '',
    lastDate: '',
    area: '',
    paymentType: '',
    amount: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Validate that user is using their assigned meter numbers
    if (user && formData.billNo !== user.electricity_meter_no && formData.billNo !== user.water_meter_no) {
      setError('Please use your assigned meter number only.');
      setIsProcessing(false);
      return;
    }
    
    // Simulate payment processing with validation
    if (!formData.billNo || !formData.amount || !formData.paymentType) {
      setIsProcessing(false);
      return;
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Log transaction
    if (user) {
      logTransaction(user.id, user.name, {
        billNo: formData.billNo,
        amount: formData.amount,
        paymentType: formData.paymentType,
        serviceType: formData.billNo.toLowerCase().includes('ele') ? 'electricity' : 'water',
        area: formData.area
      });
    }
    
    setIsProcessing(false);
    setPaymentSuccess(true);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your bill payment of ₹{formData.amount} has been processed successfully.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="text-sm text-gray-600 space-y-2">
              <p><span className="font-medium">Transaction ID:</span> TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              <p><span className="font-medium">Bill No:</span> {formData.billNo}</p>
              <p><span className="font-medium">Amount:</span> ₹{formData.amount}</p>
              <p><span className="font-medium">Payment Method:</span> {formData.paymentType}</p>
            </div>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Bill Payments</h1>
            <p className="text-blue-100 mt-2">Pay your utility bills quickly and securely</p>
          </div>

          <form onSubmit={handlePayment} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bill Number</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="billNo"
                  value={formData.billNo}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your bill number"
                  required
                />
              </div>
              {user && (
                <div className="mt-2 text-sm text-gray-600">
                  <p className="font-medium">Your Meter Numbers:</p>
                  <p>• {user.electricity_meter_no} (Electricity)</p>
                  <p>• {user.water_meter_no} (Water)</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="lastDate"
                  value={formData.lastDate}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your area</option>
                  <option value="sector-1">Sector 1</option>
                  <option value="sector-2">Sector 2</option>
                  <option value="sector-3">Sector 3</option>
                  <option value="downtown">Downtown</option>
                  <option value="uptown">Uptown</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Payment Type</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['UPI', 'NetBanking', 'Card'].map((type) => (
                  <label key={type} className="relative">
                    <input
                      type="radio"
                      name="paymentType"
                      value={type}
                      onChange={handleInputChange}
                      className="sr-only"
                      required
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.paymentType === type
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{type}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Payment Summary</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Bill Amount:</span>
                  <span>₹{formData.amount || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee:</span>
                  <span>₹0</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium text-gray-900">
                  <span>Total Amount:</span>
                  <span>₹{formData.amount || '0'}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing || !formData.billNo || !formData.amount || !formData.paymentType}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing Payment...' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BillPayments;