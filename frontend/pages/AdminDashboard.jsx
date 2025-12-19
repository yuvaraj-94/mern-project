import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CreditCard, TrendingUp, Plus, Eye, ArrowLeft, BarChart3 } from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [operatorStats, setOperatorStats] = useState([]);
  const [recharges, setRecharges] = useState([]);
  const [plans, setPlans] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    validity: '',
    data: '',
    description: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const { getAdminStats, getOperatorStats, getAllRecharges, getPlans } = await import('../services/apiService');
      
      const [statsData, operatorData, rechargesData, plansData] = await Promise.all([
        getAdminStats(),
        getOperatorStats(),
        getAllRecharges(),
        getPlans()
      ]);

      setStats(statsData);
      setOperatorStats(operatorData);
      setRecharges(rechargesData);
      setPlans(plansData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    try {
      const { createPlan } = await import('../services/apiService');
      
      await createPlan({
        ...newPlan,
        price: parseInt(newPlan.price)
      });
      
      setShowCreatePlan(false);
      setNewPlan({ name: '', price: '', validity: '', data: '', description: '' });
      loadDashboardData();
    } catch (error) {
      console.error('Failed to create plan:', error);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className={`bg-black/80 backdrop-blur-sm border border-${color}-500/30 rounded-2xl p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className={`text-3xl font-bold text-${color}-400`}>{value}</p>
        </div>
        <Icon className={`h-12 w-12 text-${color}-400`} />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-yellow-400 text-xl">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error}</div>
          <button
            onClick={loadDashboardData}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/landing')}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('admin_authenticated');
              navigate('/admin-login');
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Manage plans, view statistics, and monitor recharges</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'plans', name: 'Manage Plans', icon: CreditCard },
            { id: 'recharges', name: 'All Recharges', icon: Eye }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-yellow-400 text-black'
                  : 'bg-black/80 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-400/10'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Users" value={stats.totalUsers || 0} icon={Users} color="blue" />
              <StatCard title="Total Plans" value={stats.totalPlans || 0} icon={CreditCard} color="green" />
              <StatCard title="Total Recharges" value={stats.totalRecharges || 0} icon={TrendingUp} color="purple" />
              <StatCard title="Total Revenue" value={`₹${stats.totalRevenue || 0}`} icon={TrendingUp} color="yellow" />
            </div>

            {/* Operator Statistics */}
            <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">Top Operators by Recharges</h3>
              {operatorStats.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {operatorStats.map((operator, index) => (
                    <div key={operator._id} className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">#{index + 1}</div>
                        <div className="text-xl font-semibold text-white">{operator._id}</div>
                        <div className="text-gray-400">{operator.count} recharges</div>
                        <div className="text-yellow-400 font-semibold">₹{operator.revenue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400">No operator data available</div>
                  <div className="text-gray-500 text-sm mt-2">Complete some recharges to see statistics</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Plans Management Tab */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-yellow-400">Manage Plans</h3>
              <button
                onClick={() => setShowCreatePlan(true)}
                className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500"
              >
                <Plus className="h-5 w-5" />
                Create New Plan
              </button>
            </div>

            {/* Create Plan Modal */}
            {showCreatePlan && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-black/90 border border-yellow-500/30 rounded-2xl p-6 w-full max-w-md">
                  <h4 className="text-xl font-bold text-yellow-400 mb-4">Create New Plan</h4>
                  <form onSubmit={handleCreatePlan} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Plan Name"
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                      className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Price (₹)"
                      value={newPlan.price}
                      onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                      className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Validity (e.g., 28 days)"
                      value={newPlan.validity}
                      onChange={(e) => setNewPlan({...newPlan, validity: e.target.value})}
                      className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Data (e.g., 2GB/day)"
                      value={newPlan.data}
                      onChange={(e) => setNewPlan({...newPlan, data: e.target.value})}
                      className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white"
                      required
                    />
                    <textarea
                      placeholder="Description"
                      value={newPlan.description}
                      onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                      className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white"
                      rows="3"
                      required
                    />
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-yellow-400 text-black py-3 rounded-lg font-semibold"
                      >
                        Create Plan
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCreatePlan(false)}
                        className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Plans List */}
            {plans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div key={plan._id} className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-yellow-400">₹{plan.price}</div>
                      <div className="text-white font-semibold">{plan.name}</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Data:</span>
                        <span className="text-white">{plan.data}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Validity:</span>
                        <span className="text-white">{plan.validity}</span>
                      </div>
                      <div className="text-gray-300 text-xs mt-2">{plan.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-xl mb-4">No plans available</div>
                <p className="text-gray-500">Create your first plan to get started</p>
              </div>
            )}
          </div>
        )}

        {/* Recharges Tab */}
        {activeTab === 'recharges' && (
          <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6">All Recharges</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-yellow-500/30">
                    <th className="text-yellow-400 py-3">User</th>
                    <th className="text-yellow-400 py-3">Phone</th>
                    <th className="text-yellow-400 py-3">Operator</th>
                    <th className="text-yellow-400 py-3">Plan</th>
                    <th className="text-yellow-400 py-3">Amount</th>
                    <th className="text-yellow-400 py-3">Status</th>
                    <th className="text-yellow-400 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recharges.length > 0 ? (
                    recharges.slice(0, 20).map((recharge) => (
                      <tr key={recharge._id} className="border-b border-yellow-500/10">
                        <td className="text-white py-3">{recharge.userId?.name || 'N/A'}</td>
                        <td className="text-gray-300 py-3">{recharge.phoneNumber}</td>
                        <td className="text-gray-300 py-3">{recharge.operator}</td>
                        <td className="text-gray-300 py-3">{recharge.planId?.name || 'N/A'}</td>
                        <td className="text-yellow-400 py-3">₹{recharge.amount}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            recharge.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            recharge.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {recharge.status}
                          </span>
                        </td>
                        <td className="text-gray-400 py-3">
                          {new Date(recharge.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-12">
                        <div className="text-gray-400">No recharges found</div>
                        <div className="text-gray-500 text-sm mt-2">Recharge transactions will appear here</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};