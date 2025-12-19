import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent">
      {/* Navigation Bar */}
      <nav className="backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Mobi-Charge</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-300"
              >
                Register
              </button>
              <button
                onClick={() => navigate('/admin-login')}
                className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-300"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                Charge Your Phone,
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Instantly</span>
              </h1>
              <p className="text-xl text-gray-300">Get instant mobile recharge with just a tap. Secure, fast, and reliable service for all networks.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/plans')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-105"
              >
                View Plans
              </button>
              <button
                onClick={() => navigate('/register')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-yellow-400/50 text-yellow-400 font-bold text-lg hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300"
              >
                Get Started
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-yellow-400">50K+</div>
                <div className="text-gray-300 text-sm">Users Active</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-yellow-400">100%</div>
                <div className="text-gray-300 text-sm">Secure Payment</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-yellow-400">24/7</div>
                <div className="text-gray-300 text-sm">Support</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-12 border border-white/20 backdrop-blur-xl">
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-2xl opacity-30"></div>
                  <div className="h-48 w-48 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-6xl font-bold text-black relative">
                    ₹
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-gray-300">Instant Recharge</p>
                  <p className="text-white text-2xl font-bold">₹19 - ₹2999</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Why Choose Mobi-Charge?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Lightning Fast',
              desc: 'Recharge your phone in seconds with our optimized system'
            },
            {
              title: 'Secure & Safe',
              desc: 'Military-grade encryption protects your personal data'
            },
            {
              title: 'Best Rates',
              desc: 'Get the most competitive prices on the market'
            }
          ].map((feature, idx) => (
            <div key={idx} className="group bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 backdrop-blur-xl hover:border-yellow-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/20">
              <div className="h-12 w-12 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl p-12 border border-yellow-400/30 backdrop-blur-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-5"></div>
          <div className="relative text-center space-y-6">
            <h2 className="text-4xl font-bold text-white">Ready to Power Up?</h2>
            <p className="text-xl text-gray-300">Join thousands of satisfied customers today</p>
            <button
              onClick={() => navigate('/plans')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-105"
            >
              View Plans
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Mobi-Charge</span>
            </div>
            <p className="text-gray-400 text-sm">© 2024 Mobi-Charge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
