import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Home, RotateCcw } from 'lucide-react';

export const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { success, plan, paymentMethod, transactionId } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate('/plans');
    }
  }, [location.state, navigate]);

  if (!location.state) {
    return null;
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-black/90 backdrop-blur-sm border border-yellow-500/30 rounded-3xl p-8 text-center">
          {success ? (
            <>
              {/* Success */}
              <div className="mb-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-green-400 mb-2">Payment Successful!</h1>
                <p className="text-gray-300">Your recharge has been completed successfully</p>
              </div>

              {/* Transaction Details */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-8 text-left">
                <h3 className="text-lg font-bold text-green-400 mb-4">Transaction Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transaction ID</span>
                    <span className="text-white font-mono text-sm">{transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plan</span>
                    <span className="text-white">{plan?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount</span>
                    <span className="text-white">₹{plan?.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Method</span>
                    <span className="text-white capitalize">{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date</span>
                    <span className="text-white">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Success Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/history')}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-400/50 transition-all"
                >
                  View Transaction History
                </button>
                <button
                  onClick={() => navigate('/plans')}
                  className="w-full bg-black/50 border border-yellow-500/30 text-yellow-400 py-3 rounded-xl font-bold hover:bg-yellow-400/10 transition-all"
                >
                  Recharge Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full text-gray-400 py-2 hover:text-yellow-400 transition-colors flex items-center justify-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Go to Home
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Failure */}
              <div className="mb-8">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-12 w-12 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-red-400 mb-2">Payment Failed!</h1>
                <p className="text-gray-300">Your payment could not be processed</p>
              </div>

              {/* Error Details */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-red-400 mb-2">What went wrong?</h3>
                <ul className="text-gray-300 text-sm space-y-1 text-left">
                  <li>• Insufficient balance in your account</li>
                  <li>• Network connectivity issues</li>
                  <li>• Invalid payment details</li>
                  <li>• Bank server temporarily unavailable</li>
                </ul>
              </div>

              {/* Failure Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/payment', { state: { plan } })}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-400/50 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/plans')}
                  className="w-full bg-black/50 border border-yellow-500/30 text-yellow-400 py-3 rounded-xl font-bold hover:bg-yellow-400/10 transition-all"
                >
                  Choose Different Plan
                </button>
                <button
                  onClick={() => navigate('/support')}
                  className="w-full text-gray-400 py-2 hover:text-yellow-400 transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};