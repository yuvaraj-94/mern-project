import React, { useState, useEffect } from 'react';
import { PlanCard } from '../components/PlanCard';
import { getAIPlanRecommendation } from '../services/geminiService';
import { getPlans } from '../services/apiService';
import { Operator } from '../types';
import { Smartphone, Bot, Sparkles, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Recharge = () => {
  const [step, setStep] = useState(0);
  const [mobileNumber, setMobileNumber] = useState('');
  const [operator, setOperator] = useState(Operator.JIO);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleFetchPlans = async (e) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) return alert('Please enter a valid 10-digit number');
    
    setLoading(true);
    try {
      const data = await getPlans();
      setPlans(data);
      setStep(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAskAI = async () => {
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    setAiResponse('');
    try {
      const response = await getAIPlanRecommendation(aiQuery, plans);
      setAiResponse(response);
    } catch (e) {
      setAiResponse("Failed to get recommendation.");
    } finally {
      setAiLoading(false);
    }
  };

  const handlePlanSelect = (plan) => {
    const user = localStorage.getItem('volt_user');
    if (!user) {
      navigate('/login');
    } else {
      navigate('/payment', { state: { plan } });
    }
  };

  if (step === 0) {
    return (
      <div className="min-h-screen bg-transparent py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-yellow-500/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-3 rounded-xl">
                  <Smartphone className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-yellow-400">Recharge Now</h1>
                  <p className="text-gray-300 text-sm">Instant mobile recharge in seconds</p>
                </div>
              </div>

              <form onSubmit={handleFetchPlans} className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-yellow-400 mb-3">Mobile Number</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity blur"></div>
                    <div className="relative flex items-center">
                      <Smartphone className="absolute left-4 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 rounded-xl border border-yellow-500/30 bg-black/50 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-lg placeholder-gray-400"
                        placeholder="98765 43210"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-yellow-400 mb-4">Select Operator</label>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.values(Operator).map((op) => (
                      <button
                        key={op}
                        type="button"
                        onClick={() => setOperator(op)}
                        className={`p-4 rounded-xl border-2 text-sm font-bold transition-all transform hover:scale-105 ${
                          operator === op 
                          ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400 shadow-lg' 
                          : 'border-yellow-500/30 hover:border-yellow-400/50 text-gray-300 hover:text-yellow-400'
                        }`}
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-400/50 transition-all flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 text-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-6 w-6 mr-2" />
                      Loading Plans...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Browse Plans
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-yellow-400">Why choose Mobi-Charge?</p>
                    <ul className="mt-2 space-y-1 text-xs text-gray-300">
                      <li>✓ Instant activation</li>
                      <li>✓ 24/7 customer support</li>
                      <li>✓ Best rates guaranteed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-4">
            <h1 className="text-2xl font-bold text-yellow-400">Browse Plans</h1>
            <p className="text-gray-300">For {operator} - {mobileNumber}</p>
          </div>
          <button 
            onClick={() => setStep(0)}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
          >
            Change Number
          </button>
        </div>

        <div className="mb-10 bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6">
           <div className="flex items-start gap-4">
              <div className="bg-yellow-500/20 p-3 rounded-full">
          <Sparkles className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                 <h2 className="text-lg font-semibold text-yellow-400 mb-2">AI Plan Recommender</h2>
                 <p className="text-sm text-gray-300 mb-4">
                   Not sure which plan to pick? Ask our AI assistant.
                   <br/>
                   <span className="text-xs text-gray-400 italic">Try "I need 2GB daily data for 3 months"</span>
                 </p>
                 
                 <div className="flex gap-2">
                   <input 
                      type="text" 
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      placeholder="Describe your needs..."
                      className="flex-1 px-4 py-2 rounded-lg border border-yellow-500/30 bg-black/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                   />
                   <button 
                     onClick={handleAskAI}
                     disabled={aiLoading}
                     className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-70 font-semibold"
                   >
                     {aiLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Ask AI'}
                   </button>
                 </div>

                 {aiResponse && (
                   <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg text-gray-300 text-sm leading-relaxed">
                      <div className="flex gap-2 mb-2">
                         <Bot className="h-4 w-4 text-yellow-400" /> 
                         <span className="font-semibold text-yellow-400">Recommendation:</span>
                      </div>
                      {aiResponse}
                   </div>
                 )}
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan._id} plan={plan} onSelect={handlePlanSelect} />
          ))}
        </div>
      </div>
    );
  }

  return null;
};