import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MessageCircle, Clock, CheckCircle, ArrowLeft } from 'lucide-react';

export const Support = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">Support Center</h1>
          <p className="text-xl text-gray-300">We're here to help you 24/7</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-400">Phone Support</h3>
                  <p className="text-gray-300">+91 1800-123-4567</p>
                  <p className="text-sm text-gray-400">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-400">Email Support</h3>
                  <p className="text-gray-300">support@mobicharge.com</p>
                  <p className="text-sm text-gray-400">Response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-400">Live Chat</h3>
                  <p className="text-gray-300">Available on website</p>
                  <p className="text-sm text-gray-400">Instant response</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-400">Business Hours</h3>
                  <p className="text-gray-300">24/7 Support</p>
                  <p className="text-sm text-gray-400">All days of the week</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="mb-6 bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                <p className="text-yellow-400">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-yellow-400 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-yellow-500/30 bg-black/50 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-yellow-400 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-yellow-500/30 bg-black/50 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-yellow-400 mb-2">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-yellow-500/30 bg-black/50 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="recharge-issue">Recharge Issue</option>
                  <option value="payment-problem">Payment Problem</option>
                  <option value="account-help">Account Help</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-yellow-400 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 border border-yellow-500/30 bg-black/50 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 placeholder-gray-400"
                  placeholder="Describe your issue or question..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};