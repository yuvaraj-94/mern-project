import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Smartphone, Wifi, Clock, DollarSign } from 'lucide-react';

export const AIRecommender = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    budget: '',
    usage: '',
    priority: '',
    validity: '',
    dataNeeds: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else generateRecommendations();
  };

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/ai-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences)
      });
      const data = await response.json();
      setRecommendations(data.recommendations);
      setStep(6);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecharge = (plan) => {
    const user = localStorage.getItem('volt_user');
    if (!user) {
      navigate('/login');
    } else {
      navigate('/payment', { state: { plan } });
    }
  };

  const questions = [
    {
      id: 1,
      title: "What's your monthly budget?",
      icon: DollarSign,
      options: [
        { value: 'low', label: 'Under ₹200', desc: 'Budget-friendly options' },
        { value: 'medium', label: '₹200 - ₹600', desc: 'Balanced plans' },
        { value: 'high', label: 'Above ₹600', desc: 'Premium plans' }
      ],
      field: 'budget'
    },
    {
      id: 2,
      title: "How do you primarily use your phone?",
      icon: Smartphone,
      options: [
        { value: 'light', label: 'Basic calls & texts', desc: 'Minimal data usage' },
        { value: 'moderate', label: 'Social media & browsing', desc: 'Regular data usage' },
        { value: 'heavy', label: 'Streaming & gaming', desc: 'High data consumption' }
      ],
      field: 'usage'
    },
    {
      id: 3,
      title: "What's most important to you?",
      icon: Brain,
      options: [
        { value: 'data', label: 'More Data', desc: 'Maximum data allowance' },
        { value: 'validity', label: 'Long Validity', desc: 'Extended plan duration' },
        { value: 'price', label: 'Best Price', desc: 'Most affordable option' }
      ],
      field: 'priority'
    },
    {
      id: 4,
      title: "Preferred plan validity?",
      icon: Clock,
      options: [
        { value: 'short', label: '1-30 days', desc: 'Short-term plans' },
        { value: 'medium', label: '31-90 days', desc: 'Medium-term plans' },
        { value: 'long', label: '90+ days', desc: 'Long-term plans' }
      ],
      field: 'validity'
    },
    {
      id: 5,
      title: "Daily data requirement?",
      icon: Wifi,
      options: [
        { value: 'low', label: 'Under 1GB/day', desc: 'Light browsing' },
        { value: 'medium', label: '1-3GB/day', desc: 'Regular usage' },
        { value: 'high', label: '3GB+/day', desc: 'Heavy streaming' }
      ],
      field: 'dataNeeds'
    }
  ];

  const currentQuestion = questions[step - 1];

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-yellow-400 text-xl">AI is analyzing your preferences...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/plans')}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Plans
        </button>

        {step <= 5 && (
          <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="h-8 w-8 text-yellow-400" />
                <h1 className="text-3xl font-bold text-yellow-400">AI Plan Recommender</h1>
              </div>
              <div className="flex justify-center mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full mx-1 ${
                      i <= step ? 'bg-yellow-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="text-center mb-8">
              {React.createElement(currentQuestion.icon, { className: "h-16 w-16 text-yellow-400 mx-auto mb-4" })}
              <h2 className="text-2xl font-bold text-white mb-2">{currentQuestion.title}</h2>
              <p className="text-gray-400">Step {step} of 5</p>
            </div>

            <div className="grid gap-4 max-w-2xl mx-auto">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setPreferences({
                      ...preferences,
                      [currentQuestion.field]: option.value
                    });
                    setTimeout(handleNext, 300);
                  }}
                  className="p-6 bg-black/50 border-2 border-yellow-500/30 rounded-xl hover:border-yellow-400 hover:bg-yellow-400/10 transition-all text-left"
                >
                  <div className="text-xl font-semibold text-white mb-2">{option.label}</div>
                  <div className="text-gray-400">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="h-8 w-8 text-yellow-400" />
                <h1 className="text-3xl font-bold text-yellow-400">AI Recommendations</h1>
              </div>
              <p className="text-gray-300">Based on your preferences, here are the best plans for you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((plan, index) => (
                <div
                  key={plan._id}
                  className={`bg-black/90 backdrop-blur-sm border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    index === 0
                      ? 'border-yellow-400 shadow-yellow-400/30'
                      : 'border-yellow-500/40 hover:border-yellow-400'
                  }`}
                >
                  {index === 0 && (
                    <div className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                      🏆 BEST MATCH
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">₹{plan.price}</div>
                    <div className="bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 text-sm font-semibold px-3 py-1 rounded-full inline-block">
                      {plan.name}
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <Wifi className="h-5 w-5 text-yellow-400" />
                      <div>
                        <div className="text-xs text-gray-400">Data</div>
                        <div className="font-semibold text-white">{plan.data}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-400" />
                      <div>
                        <div className="text-xs text-gray-400">Validity</div>
                        <div className="font-semibold text-white">{plan.validity}</div>
                      </div>
                    </div>

                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Why this plan?</div>
                      <div className="text-sm text-gray-300">{plan.aiReason}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRecharge(plan)}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      index === 0
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:shadow-lg hover:shadow-yellow-400/50'
                        : 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 hover:bg-yellow-400/10'
                    }`}
                  >
                    Choose This Plan
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setStep(1);
                  setPreferences({
                    budget: '',
                    usage: '',
                    priority: '',
                    validity: '',
                    dataNeeds: ''
                  });
                  setRecommendations([]);
                }}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};