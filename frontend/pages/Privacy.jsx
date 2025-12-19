import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, Database, ArrowLeft } from 'lucide-react';

export const Privacy = () => {
  const navigate = useNavigate();
  
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
        
        <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-3xl shadow-xl p-12">
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">Privacy Policy</h1>
            <p className="text-gray-300">Last updated: December 2024</p>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-yellow-400">Information We Collect</h2>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                <ul className="space-y-2 text-gray-300">
                  <li>• Personal information (name, email, phone number)</li>
                  <li>• Transaction history and recharge details</li>
                  <li>• Device information and usage analytics</li>
                  <li>• Payment information (securely processed)</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-6 w-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-yellow-400">How We Use Your Information</h2>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                <ul className="space-y-2 text-gray-300">
                  <li>• Process mobile recharges and transactions</li>
                  <li>• Provide customer support and assistance</li>
                  <li>• Send transaction confirmations and updates</li>
                  <li>• Improve our services and user experience</li>
                  <li>• Comply with legal and regulatory requirements</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-yellow-400">Data Security</h2>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                <p className="text-gray-300 mb-4">
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• 256-bit SSL encryption for all data transmission</li>
                  <li>• Secure payment processing through certified gateways</li>
                  <li>• Regular security audits and vulnerability assessments</li>
                  <li>• Access controls and employee training programs</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Your Rights</h2>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                <p className="text-gray-300 mb-4">You have the right to:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Access your personal data</li>
                  <li>• Correct inaccurate information</li>
                  <li>• Request deletion of your data</li>
                  <li>• Opt-out of marketing communications</li>
                  <li>• Data portability</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Contact Us</h2>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                <p className="text-gray-300 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2 text-gray-300">
                  <p>Email: privacy@mobicharge.com</p>
                  <p>Phone: +91 1800-123-4567</p>
                  <p>Address: 123 Tech Park, Bangalore, India 560001</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};