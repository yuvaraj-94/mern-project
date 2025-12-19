import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Building, Wallet, CheckCircle, ArrowLeft } from 'lucide-react';

export const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {};
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [processing, setProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    phoneNumber: ''
  });

  const paymentMethods = [
    { id: 'upi', name: 'UPI Apps', icon: Smartphone, desc: 'GPay, Paytm, PhonePe' },
    { id: 'debit', name: 'Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
    { id: 'credit', name: 'Credit Card', icon: CreditCard, desc: 'Visa, Mastercard, Amex' }
  ];

  const upiApps = [
    { 
      id: 'gpay', 
      name: 'Google Pay', 
      color: '#4285F4',
      icon: (
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
          G
        </div>
      )
    },
    { 
      id: 'paytm', 
      name: 'Paytm', 
      color: '#00BAF2',
      icon: (
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
          P
        </div>
      )
    },
    { 
      id: 'phonepe', 
      name: 'PhonePe', 
      color: '#5F259F',
      icon: (
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
          ₹
        </div>
      )
    },
    { 
      id: 'amazonpay', 
      name: 'Amazon Pay', 
      color: '#FF9900',
      icon: (
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
          A
        </div>
      )
    }
  ];

  if (!plan) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-400 text-xl mb-4">No plan selected</div>
          <button
            onClick={() => navigate('/plans')}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold"
          >
            Choose a Plan
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      const success = Math.random() > 0.1; // 90% success rate
      const transactionId = 'TXN' + Date.now();
      
      if (success) {
        // Save recharge to database
        try {
          const user = JSON.parse(localStorage.getItem('volt_user'));
          const rechargeData = {
            userId: user._id,
            planId: plan._id,
            phoneNumber: paymentDetails.phoneNumber || '9876543210',
            operator: selectedUpiApp === 'gpay' ? 'Jio' : selectedUpiApp === 'paytm' ? 'Airtel' : selectedUpiApp === 'phonepe' ? 'Vi' : 'BSNL'
          };
          
          console.log('Sending recharge data:', rechargeData);
          
          const response = await fetch('http://localhost:3001/api/recharge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rechargeData)
          });
          
          const result = await response.json();
          console.log('Recharge response:', result);
          
          if (!response.ok) {
            throw new Error(result.error || 'Failed to save recharge');
          }
          
          console.log('Recharge saved successfully:', result._id);
        } catch (error) {
          console.error('Failed to save recharge:', error);
          alert('Payment successful but failed to save transaction record');
        }
      }
      
      navigate('/payment-result', { 
        state: { 
          success, 
          plan, 
          paymentMethod: selectedMethod,
          upiApp: selectedUpiApp,
          transactionId
        } 
      });
    }, 3000);
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'upi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-yellow-400 text-sm font-semibold mb-3">Select UPI App</label>
              <div className="grid grid-cols-2 gap-3">
                {upiApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setSelectedUpiApp(app.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedUpiApp === app.id
                        ? 'border-yellow-400 bg-yellow-400/10'
                        : 'border-yellow-500/30 hover:border-yellow-400/50'
                    }`}
                  >
                    <div className="mx-auto mb-2">
                      {app.icon}
                    </div>
                    <div className="text-white text-sm font-semibold">{app.name}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-yellow-400 text-sm font-semibold mb-2">Phone Number</label>
              <input
                type="text"
                placeholder="9876543210"
                value={paymentDetails.phoneNumber}
                onChange={(e) => setPaymentDetails({...paymentDetails, phoneNumber: e.target.value})}
                className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
        );
      
      case 'debit':
      case 'credit':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-yellow-400 text-sm font-semibold mb-2">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
                maxLength="19"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-yellow-400 text-sm font-semibold mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
                  maxLength="5"
                />
              </div>
              <div>
                <label className="block text-yellow-400 text-sm font-semibold mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
                  maxLength="4"
                />
              </div>
            </div>
            <div>
              <label className="block text-yellow-400 text-sm font-semibold mb-2">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={paymentDetails.cardholderName}
                onChange={(e) => setPaymentDetails({...paymentDetails, cardholderName: e.target.value})}
                className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Plans
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Plan Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Plan Name</span>
                <span className="text-white font-semibold">{plan.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Data</span>
                <span className="text-white font-semibold">{plan.data}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Validity</span>
                <span className="text-white font-semibold">{plan.validity}</span>
              </div>
              <div className="border-t border-yellow-500/30 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl text-yellow-400 font-bold">Total Amount</span>
                  <span className="text-3xl text-yellow-400 font-bold">₹{plan.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Payment Method</h2>
            
            {/* Payment Method Selection */}
            <div className="space-y-3 mb-6">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                    selectedMethod === method.id
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-yellow-500/30 hover:border-yellow-400/50'
                  }`}
                >
                  <method.icon className="h-6 w-6 text-yellow-400" />
                  <div className="text-left">
                    <div className="text-white font-semibold">{method.name}</div>
                    <div className="text-gray-400 text-sm">{method.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Payment Form */}
            <div className="mb-6">
              {renderPaymentForm()}
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-yellow-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Processing Payment...
                </div>
              ) : (
                `Pay ₹${plan.price}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};