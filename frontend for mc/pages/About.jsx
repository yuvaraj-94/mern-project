import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Shield, Award, Target, Heart, ArrowLeft } from 'lucide-react';

export const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
        
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Mobi-Charge
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            India's most trusted mobile recharge platform, serving millions of customers with instant, secure, and reliable recharge services since 2020.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl shadow-xl p-8 text-center">
            <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">10M+ Users</h3>
            <p className="text-gray-300">Trusted by millions of customers across India</p>
          </div>

          <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl shadow-xl p-8 text-center">
            <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">100% Secure</h3>
            <p className="text-gray-300">Bank-grade security for all transactions</p>
          </div>

          <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl shadow-xl p-8 text-center">
            <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">Award Winning</h3>
            <p className="text-gray-300">Best Mobile Recharge App 2023</p>
          </div>
        </div>

        <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-3xl shadow-2xl p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-yellow-400 mb-6">Our Mission</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Target className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-400">Instant Recharges</h4>
                    <p className="text-gray-300">Lightning-fast recharges that complete in seconds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-400">Customer First</h4>
                    <p className="text-gray-300">24/7 support and customer satisfaction guarantee</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-400">Secure Payments</h4>
                    <p className="text-gray-300">Multiple payment options with top-tier security</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Why Choose Us?</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  All major operators supported
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Instant cashback and rewards
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  AI-powered plan recommendations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Transaction history tracking
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Multiple payment methods
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-500/30 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Join Millions of Happy Customers</h2>
          <p className="text-xl mb-8 text-gray-300">Experience the fastest and most reliable mobile recharge service in India</p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400">99.9%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">&lt;5s</div>
              <div className="text-sm text-gray-400">Average Recharge Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">24/7</div>
              <div className="text-sm text-gray-400">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};