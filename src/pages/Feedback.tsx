import React, { useState } from 'react';
import { MessageSquare, Star, Send, CheckCircle, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { logActivity } from '../lib/activityLogger';
import { sendFeedbackConfirmation } from '../lib/notificationService';

const Feedback: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    servicesUsed: '',
    performance: '',
    interfaceRating: 0,
    overallFeedback: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStarClick = (rating: number) => {
    setFormData({ ...formData, interfaceRating: rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store feedback in localStorage for admin to view
    const feedbacks = JSON.parse(localStorage.getItem('userFeedbacks') || '[]');
    const newFeedback = {
      ...formData,
      userId: user?.id || 'anonymous',
      createdAt: new Date().toISOString(),
      id: Date.now().toString()
    };
    feedbacks.push(newFeedback);
    localStorage.setItem('userFeedbacks', JSON.stringify(feedbacks));
    
    // Log activity
    if (user) {
      logActivity(
        user.id,
        user.name,
        user.email,
        'Feedback Submitted',
        `Submitted feedback for ${formData.servicesUsed} with ${formData.interfaceRating}/5 rating`,
        'feedback'
      );
    }
    
    // Show animation
    setShowAnimation(true);
    
    // Send confirmation email
    setSendingEmail(true);
    try {
      await sendFeedbackConfirmation(
        formData.name,
        formData.email,
        formData.servicesUsed,
        formData.interfaceRating,
        formData.overallFeedback
      );
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
    setSendingEmail(false);
    
    // Processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setShowAnimation(false);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        servicesUsed: '',
        performance: '',
        interfaceRating: 0,
        overallFeedback: ''
      });
    }, 5000);
  };

  const StarRating = () => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          className={`h-8 w-8 ${
            star <= formData.interfaceRating
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          } hover:text-yellow-400 transition-colors`}
        >
          <Star className="h-full w-full" />
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {formData.interfaceRating > 0 ? `${formData.interfaceRating}/5` : 'Rate our interface'}
      </span>
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center text-green-700">
              <Mail className="h-5 w-5 mr-2" />
              <span className="text-sm">A thank-you email has been sent to {formData.email}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            Your feedback is invaluable to us. We appreciate you taking the time to help us improve our services.
          </p>
          <div className="text-sm text-gray-500">
            This message will disappear automatically...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <MessageSquare className="mr-3 h-8 w-8" />
              Your Feedback Matters
            </h1>
            <p className="text-blue-100 mt-2">Help us improve our services with your valuable insights</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Services Used *</label>
              <select
                name="servicesUsed"
                value={formData.servicesUsed}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select services you've used</option>
                <option value="Bill Payments">Bill Payments</option>
                <option value="Setting Limit">Setting Limit</option>
                <option value="Tracking Electricity">Tracking Electricity</option>
                <option value="Tracking Water">Tracking Water</option>
                <option value="Transaction History">Transaction History</option>
                <option value="Invoice Bills">Invoice Bills</option>
                <option value="Multiple Services">Multiple Services</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website Performance *</label>
              <select
                name="performance"
                value={formData.performance}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Rate our website performance</option>
                <option value="Excellent">Excellent - Very fast and responsive</option>
                <option value="Good">Good - Generally fast with minor delays</option>
                <option value="Average">Average - Acceptable speed</option>
                <option value="Below Average">Below Average - Somewhat slow</option>
                <option value="Poor">Poor - Very slow and unresponsive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Interface Rating *</label>
              <StarRating />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Overall Feedback *</label>
              <textarea
                name="overallFeedback"
                value={formData.overallFeedback}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your thoughts, suggestions, or any issues you've encountered..."
                required
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• You'll receive a thank-you email confirmation</li>
                <li>• Our team will review your feedback within 2 business days</li>
                <li>• We may reach out for clarification if needed</li>
                <li>• Your feedback helps us improve our services</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={showAnimation || !formData.name || !formData.email || !formData.servicesUsed || !formData.performance || !formData.interfaceRating || !formData.overallFeedback}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {showAnimation ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {sendingEmail ? 'Sending Email...' : 'Processing...'}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Submit Feedback
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;