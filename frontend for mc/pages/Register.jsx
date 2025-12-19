import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Phone, ArrowRight, Zap, Eye, EyeOff } from 'lucide-react';
import { registerUser } from '../services/apiService';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const { confirmPassword, ...userData } = formData;
      const response = await registerUser(userData);
      
      localStorage.setItem('volt_user', JSON.stringify(response.user));
      navigate('/');
    } catch (error) {
      setErrors({ general: error.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const passwordStrength = formData.password.length > 0 ? Math.min((formData.password.length / 8) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 relative overflow-hidden py-12">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-gradient-to-br from-black/80 to-black/60 rounded-3xl backdrop-blur-xl border border-yellow-500/30 shadow-2xl overflow-hidden">
          <div className="relative bg-gradient-to-r from-yellow-400/10 to-orange-400/10 px-8 pt-8 pb-12 border-b border-white/10">
            <div className="relative">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Mobi-Charge</span>
              </div>
              <h2 className="text-3xl font-bold text-white text-center">Join Us</h2>
              <p className="text-gray-300 text-center mt-2">Create your account in seconds</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity blur"></div>
                <div className="relative flex items-center">
                  <User className="absolute left-4 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-all"
                  />
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity blur"></div>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-all"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">Phone Number</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity blur"></div>
                <div className="relative flex items-center">
                  <Phone className="absolute left-4 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-all"
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">Password</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity blur"></div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${passwordStrength < 33 ? 'bg-red-400' : passwordStrength < 66 ? 'bg-yellow-400' : 'bg-green-400'}`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400">
                      {passwordStrength < 33 ? 'Weak' : passwordStrength < 66 ? 'Medium' : 'Strong'} password
                    </p>
                  </div>
                )}
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">Confirm Password</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity blur"></div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" required className="w-4 h-4 accent-yellow-400 mt-1" />
              <span className="text-gray-300 text-sm group-hover:text-yellow-400 transition-colors">
                I agree to the <a href="#" className="text-yellow-400 hover:underline">Terms of Service</a> and <a href="#" className="text-yellow-400 hover:underline">Privacy Policy</a>
              </span>
            </label>

            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm text-center">{errors.general}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold text-lg hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 mt-6"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-gray-400 text-sm">Already member?</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full py-3 rounded-lg border-2 border-white/20 text-white font-bold hover:border-yellow-400/50 hover:bg-white/5 transition-all"
            >
              Sign in instead
            </button>
          </form>

          <div className="px-8 py-6 bg-black/20 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              We'll never share your information
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
