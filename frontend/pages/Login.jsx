import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Zap, Eye, EyeOff } from 'lucide-react';
import { loginUser } from '../services/apiService';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await loginUser(formData);
      localStorage.setItem('volt_user', JSON.stringify(response.user));
      navigate('/');
    } catch (error) {
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-gradient-to-br from-black/80 to-black/60 rounded-3xl backdrop-blur-xl border border-yellow-500/30 shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="relative bg-gradient-to-r from-yellow-400/10 to-orange-400/10 px-8 pt-8 pb-12 border-b border-white/10">
            <div className="relative">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Mobi-Charge</span>
              </div>
              <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>
              <p className="text-gray-300 text-center mt-2">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity blur"></div>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 h-5 w-5 text-gray-400 group-focus-within:text-rose-400 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Password Field */}
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
                    required
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
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 accent-yellow-400" />
                <span className="text-gray-300 group-hover:text-yellow-400 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium">
                Forgot password?
              </a>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold text-lg hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-gray-400 text-sm">New here?</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* Register Link */}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full py-3 rounded-lg border-2 border-white/20 text-white font-bold hover:border-yellow-400/50 hover:bg-white/5 transition-all"
            >
              Create a new account
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 py-6 bg-black/20 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              By signing in, you agree to our <a href="#" className="text-yellow-400 hover:underline">Terms of Service</a>
            </p>
          </div>
        </div>

        {/* Helper Text */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-gray-400 text-sm">
            Demo Users:
          </p>
          <div className="bg-black/60 border border-yellow-500/30 rounded-lg p-4 text-sm">
            <div className="text-yellow-400 font-medium mb-2">User Account:</div>
            <div className="text-gray-300">Email: <span className="text-yellow-300">demo@mobicharge.com</span></div>
            <div className="text-gray-300">Password: <span className="text-yellow-300">demo123</span></div>
            <div className="text-yellow-400 font-medium mt-3 mb-2">Admin Account:</div>
            <div className="text-gray-300">Email: <span className="text-yellow-300">admin@mobicharge.com</span></div>
            <div className="text-gray-300">Password: <span className="text-yellow-300">admin123</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
