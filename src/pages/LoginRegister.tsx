import React, { useState } from 'react';
import { Mail, Phone, User, Calendar, MapPin, Zap, Droplets, Eye, EyeOff, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { sendOTP } from '../lib/notificationService';

const LoginRegister: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState({ mobile: false, email: false });
  const [otpValues, setOtpValues] = useState({ mobile: '', email: '' });
  const [sendingOtp, setSendingOtp] = useState({ mobile: false, email: false });
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    area: '',
    mobile: '',
    email: '',
    waterMeterNo: '',
    electricityMeterNo: '',
    password: '',
    emailOtp: ''
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login(loginData.email, loginData.password);
    
    if (success) {
      navigate('/services');
    } else {
      setError('Invalid email or password. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await register(formData);
    
    if (success) {
      navigate('/services');
    } else {
      setError('Registration failed. Please try again.');
    }
    
    setIsLoading(false);
  };

  const sendOtp = async (type: 'mobile' | 'email') => {
    setSendingOtp({ ...sendingOtp, [type]: true });
    
    const contact = type === 'mobile' ? formData.mobile : formData.email;
    const otpType = type === 'mobile' ? 'sms' : 'email';
    
    try {
      const result = await sendOTP(otpType, contact);
      
      if (result.success) {
        setOtpSent({ ...otpSent, [type]: true });
        // Store OTP for validation (in production, this would be server-side)
        setOtpValues({ ...otpValues, [type]: result.otp || '' });
        
        // Show success message
        alert(`OTP sent to your ${type === 'mobile' ? 'phone number' : 'email address'}`);
      } else {
        alert(`Failed to send OTP: ${result.message}`);
      }
    } catch (error) {
      alert('Failed to send OTP. Please try again.');
    } finally {
      setSendingOtp({ ...sendingOtp, [type]: false });
    }
  };

  const validateOtp = (type: 'mobile' | 'email', enteredOtp: string): boolean => {
    return enteredOtp === otpValues[type];
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const generateMeterNumbers = () => {
    const timestamp = Date.now().toString().slice(-6);
    const electricityMeter = `ELE${timestamp}`;
    const waterMeter = `WAT${timestamp}`;
    
    setFormData({
      ...formData,
      electricityMeterNo: electricityMeter,
      waterMeterNo: waterMeter
    });
  };

  React.useEffect(() => {
    if (step === 3 && !formData.electricityMeterNo && !formData.waterMeterNo) {
      generateMeterNumbers();
    }
  }, [step]);

  const renderRegistrationStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-6">Personal Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name (as per Aadhaar)</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
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
            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              disabled={!formData.name || !formData.dob || !formData.area}
            >
              Continue to Contact Information
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-6">Contact Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your mobile number"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Mobile number will be used for SMS notifications</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="flex mt-2">
                <input
                  type="text"
                  name="emailOtp"
                  value={formData.emailOtp}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter OTP"
                />
                <button
                  type="button"
                  onClick={() => sendOtp('email')}
                  disabled={!formData.email || sendingOtp.email}
                  className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors text-sm disabled:opacity-50"
                >
                  {sendingOtp.email ? 'Sending...' : otpSent.email ? 'Sent ✓' : 'Send OTP'}
                </button>
              </div>
              {otpSent.email && (
               <p className="text-xs text-green-600 mt-1">
                 Demo OTP sent to your email address. Use the generated OTP: {otpValues.email}
               </p>
              )}
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                disabled={
                  !formData.mobile || 
                  !formData.email || 
                  !formData.emailOtp ||
                  !validateOtp('email', formData.emailOtp)
                }
              >
                Continue to Meter Information
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-6">Meter Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Water Meter Number</label>
              <div className="relative">
                <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="waterMeterNo"
                  value={formData.waterMeterNo}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Auto-generated: WAT######"
                  readOnly
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Water meter number will be auto-generated</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Electricity Meter Number</label>
              <div className="relative">
                <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="electricityMeterNo"
                  value={formData.electricityMeterNo}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Auto-generated: ELE######"
                  readOnly
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Electricity meter number will be auto-generated</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={isLoading || !formData.waterMeterNo || !formData.electricityMeterNo || !formData.password}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    Creating Account...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderLogin = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email or Mobile</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email or mobile number"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
          <label className="ml-2 text-sm text-gray-600">Remember me</label>
        </div>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={isLoading || !loginData.email || !loginData.password}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <Loader className="animate-spin h-5 w-5 mr-2" />
            Signing In...
          </>
        ) : (
          'Sign In'
        )}
      </button>
      
      <div className="text-center text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <strong>Demo Credentials:</strong><br />
        <strong>Admin:</strong> admin@smartutility.com / admin123<br />
        <strong>Users:</strong><br />
        rajesh.kumar@email.com / user123<br />
        priya.sharma@email.com / user123<br />
        amit.patel@email.com / user123
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Zap className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Sign in to your account' : 'Join our smart utility platform'}
          </p>
        </div>

        <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => { setIsLogin(true); setStep(1); setError(''); }}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              isLogin 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsLogin(false); setStep(1); setError(''); }}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              !isLogin 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Sign Up
          </button>
        </div>

        {!isLogin && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Step {step} of 3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {isLogin ? renderLogin() : renderRegistrationStep()}
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setIsLogin(!isLogin); setStep(1); setError(''); }}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;