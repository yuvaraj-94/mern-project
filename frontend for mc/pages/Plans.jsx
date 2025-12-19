import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlans } from '../services/apiService';
import { Search, Filter, Clock, Wifi, Phone, Star, ArrowLeft } from 'lucide-react';

export const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [validityFilter, setValidityFilter] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Plans', icon: Star },
    { id: 'popular', name: 'Popular Plans', icon: Star },
    { id: 'unlimited', name: 'Unlimited Plans', icon: Wifi },
    { id: 'data', name: 'Data Plans', icon: Wifi },
    { id: 'talktime', name: 'Talktime Plans', icon: Phone },
    { id: 'validity', name: 'Validity Plans', icon: Clock },
    { id: 'special', name: 'Special Plans', icon: Star }
  ];

  useEffect(() => {
    loadPlans();
  }, []);

  useEffect(() => {
    filterPlans();
  }, [plans, activeCategory, searchTerm, priceFilter, validityFilter]);

  const loadPlans = async () => {
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (error) {
      console.error('Failed to load plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPlans = () => {
    let filtered = [...plans];

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(plan => {
        switch (activeCategory) {
          case 'popular':
            return plan.price >= 299 && plan.price <= 699;
          case 'unlimited':
            return plan.name.toLowerCase().includes('unlimited') || plan.data.includes('GB/day');
          case 'data':
            return plan.name.toLowerCase().includes('data') || parseFloat(plan.data) > 1;
          case 'talktime':
            return plan.name.toLowerCase().includes('talk') || plan.price < 100;
          case 'validity':
            return parseInt(plan.validity) > 84;
          case 'special':
            return plan.price > 1000 || plan.name.toLowerCase().includes('premium');
          default:
            return true;
        }
      });
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(plan =>
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    if (priceFilter !== 'all') {
      filtered = filtered.filter(plan => {
        switch (priceFilter) {
          case 'low':
            return plan.price < 200;
          case 'medium':
            return plan.price >= 200 && plan.price <= 600;
          case 'high':
            return plan.price > 600;
          default:
            return true;
        }
      });
    }

    // Validity filter
    if (validityFilter !== 'all') {
      filtered = filtered.filter(plan => {
        const validity = parseInt(plan.validity);
        switch (validityFilter) {
          case 'short':
            return validity <= 30;
          case 'medium':
            return validity > 30 && validity <= 90;
          case 'long':
            return validity > 90;
          default:
            return true;
        }
      });
    }

    setFilteredPlans(filtered);
  };

  const handleRecharge = (plan) => {
    const user = localStorage.getItem('volt_user');
    if (!user) {
      navigate('/login');
    } else {
      navigate('/payment', { state: { plan } });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading plans...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/landing')}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </button>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">Choose Your Perfect Plan</h1>
          <p className="text-xl text-gray-300">Select from our wide range of recharge plans</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white focus:ring-2 focus:ring-yellow-400"
            >
              <option value="all">All Prices</option>
              <option value="low">Under ₹200</option>
              <option value="medium">₹200 - ₹600</option>
              <option value="high">Above ₹600</option>
            </select>

            <select
              value={validityFilter}
              onChange={(e) => setValidityFilter(e.target.value)}
              className="px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white focus:ring-2 focus:ring-yellow-400"
            >
              <option value="all">All Validity</option>
              <option value="short">Up to 30 days</option>
              <option value="medium">31-90 days</option>
              <option value="long">Above 90 days</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm('');
                setPriceFilter('all');
                setValidityFilter('all');
                setActiveCategory('all');
              }}
              className="bg-yellow-400 text-black px-4 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeCategory === category.id
                  ? 'bg-yellow-400 text-black'
                  : 'bg-black/80 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-400/10'
              }`}
            >
              <category.icon className="h-4 w-4" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredPlans.map((plan) => (
            <div key={plan._id} className="bg-black/90 backdrop-blur-sm border-2 border-yellow-500/40 rounded-2xl p-6 hover:border-yellow-400 hover:shadow-yellow-400/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
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
                  <div className="text-xs text-gray-400 mb-1">Description</div>
                  <div className="text-sm text-gray-300">{plan.description}</div>
                </div>
              </div>

              <button
                onClick={() => handleRecharge(plan)}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-400/50 transition-all"
              >
                Recharge Now
              </button>
            </div>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-4">No plans found</div>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}

        <div className="text-center">
          <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-8 inline-block">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Need Help Choosing?</h3>
            <p className="text-gray-300 mb-4">Our AI assistant can recommend the perfect plan for you</p>
            <button
              onClick={() => navigate('/ai-recommender')}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-400/50 transition-all"
            >
              Get AI Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};