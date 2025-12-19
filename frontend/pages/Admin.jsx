import React, { useEffect, useState } from 'react';
import { Users, BarChart2, Settings, ShieldCheck, Plus, Edit, Trash2 } from 'lucide-react';
import { getAdminStats, getAllUsers, getAllRecharges, getPlans, createPlan, updatePlan, deletePlan } from '../services/apiService';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [recharges, setRecharges] = useState([]);
  const [plans, setPlans] = useState([]);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [planForm, setPlanForm] = useState({ name: '', price: '', validity: '', data: '', description: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, usersData, rechargesData, plansData] = await Promise.all([
        getAdminStats(),
        getAllUsers(),
        getAllRecharges(),
        getPlans()
      ]);
      setStats(statsData);
      setUsers(usersData);
      setRecharges(rechargesData);
      setPlans(plansData);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    }
  };

  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPlan) {
        await updatePlan(editingPlan._id, planForm);
      } else {
        await createPlan(planForm);
      }
      setShowPlanModal(false);
      setEditingPlan(null);
      setPlanForm({ name: '', price: '', validity: '', data: '', description: '' });
      loadData();
    } catch (error) {
      console.error('Failed to save plan:', error);
    }
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setPlanForm(plan);
    setShowPlanModal(true);
  };

  const handleDeletePlan = async (id) => {
    if (confirm('Are you sure you want to delete this plan?')) {
      try {
        await deletePlan(id);
        loadData();
      } catch (error) {
        console.error('Failed to delete plan:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-amber-400 p-3 rounded-lg text-purple-900">
              <BarChart2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-purple-200">Overview and management for Mobi-Charge</p>
            </div>
          </div>
        </header>

        <nav className="flex gap-4 mb-8">
          {['dashboard', 'users', 'plans', 'recharges'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg capitalize ${
                activeTab === tab ? 'bg-amber-400 text-purple-900' : 'bg-white/10 text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {activeTab === 'dashboard' && (
          <>
            <section className="grid md:grid-cols-4 gap-6 mb-10">
              <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 p-6 rounded-2xl">
                <div className="text-sm text-purple-200">Total Users</div>
                <div className="text-2xl font-bold mt-2">{stats.totalUsers || 0}</div>
              </div>
              <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 p-6 rounded-2xl">
                <div className="text-sm text-gray-300">Total Plans</div>
                <div className="text-2xl font-bold mt-2">{stats.totalPlans || 0}</div>
              </div>
              <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 p-6 rounded-2xl">
                <div className="text-sm text-gray-300">Total Recharges</div>
                <div className="text-2xl font-bold mt-2">{stats.totalRecharges || 0}</div>
              </div>
              <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/30 p-6 rounded-2xl">
                <div className="text-sm text-gray-300">Total Revenue</div>
                <div className="text-2xl font-bold mt-2">₹{stats.totalRevenue || 0}</div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'users' && (
          <section className="bg-white/5 p-6 rounded-2xl">
            <h2 className="text-lg font-semibold mb-4">All Users</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-purple-200/80">
                  <tr>
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Email</th>
                    <th className="pb-2">Phone</th>
                    <th className="pb-2">Role</th>
                    <th className="pb-2">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-t border-white/5">
                      <td className="py-3 text-purple-100">{user.name}</td>
                      <td className="py-3 text-purple-100">{user.email}</td>
                      <td className="py-3 text-purple-100">{user.phone}</td>
                      <td className="py-3 text-purple-100">{user.role}</td>
                      <td className="py-3 text-purple-100">{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'plans' && (
          <section className="bg-white/5 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Manage Plans</h2>
              <button
                onClick={() => setShowPlanModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-400 text-purple-900 rounded-lg"
              >
                <Plus className="h-4 w-4" /> Add Plan
              </button>
            </div>
            <div className="grid gap-4">
              {plans.map((plan) => (
                <div key={plan._id} className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{plan.name}</h3>
                    <p className="text-sm text-purple-200">₹{plan.price} • {plan.validity} • {plan.data}</p>
                    <p className="text-xs text-purple-300">{plan.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditPlan(plan)}
                      className="p-2 bg-blue-500 rounded"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan._id)}
                      className="p-2 bg-red-500 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'recharges' && (
          <section className="bg-white/5 p-6 rounded-2xl">
            <h2 className="text-lg font-semibold mb-4">All Recharges</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-purple-200/80">
                  <tr>
                    <th className="pb-2">Transaction ID</th>
                    <th className="pb-2">User</th>
                    <th className="pb-2">Phone</th>
                    <th className="pb-2">Plan</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recharges.map((recharge) => (
                    <tr key={recharge._id} className="border-t border-white/5">
                      <td className="py-3 text-purple-100">{recharge.transactionId}</td>
                      <td className="py-3 text-purple-100">{recharge.userId?.name}</td>
                      <td className="py-3 text-purple-100">{recharge.phoneNumber}</td>
                      <td className="py-3 text-purple-100">{recharge.planId?.name}</td>
                      <td className="py-3 text-purple-100">₹{recharge.amount}</td>
                      <td className="py-3 text-purple-100">{new Date(recharge.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {showPlanModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-purple-900 p-6 rounded-2xl w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                {editingPlan ? 'Edit Plan' : 'Add New Plan'}
              </h3>
              <form onSubmit={handlePlanSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Plan Name"
                  value={planForm.name}
                  onChange={(e) => setPlanForm({...planForm, name: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={planForm.price}
                  onChange={(e) => setPlanForm({...planForm, price: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Validity (e.g., 30 days)"
                  value={planForm.validity}
                  onChange={(e) => setPlanForm({...planForm, validity: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Data (e.g., 2GB/day)"
                  value={planForm.data}
                  onChange={(e) => setPlanForm({...planForm, data: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={planForm.description}
                  onChange={(e) => setPlanForm({...planForm, description: e.target.value})}
                  className="w-full p-3 bg-white/10 rounded-lg text-white"
                  rows="3"
                  required
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-amber-400 text-purple-900 rounded-lg font-semibold"
                  >
                    {editingPlan ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPlanModal(false);
                      setEditingPlan(null);
                      setPlanForm({ name: '', price: '', validity: '', data: '', description: '' });
                    }}
                    className="flex-1 py-3 bg-white/10 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};