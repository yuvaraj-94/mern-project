import React, { useEffect, useState } from 'react';
import { Calendar, CheckCircle, Smartphone } from 'lucide-react';
import { getUserRecharges } from '../services/apiService';

export const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('volt_user') || '{}');
      if (user._id) {
        const recharges = await getUserRecharges(user._id);
        setHistory(recharges);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
        <Calendar className="h-12 w-12 mb-4 text-gray-300" />
        <p className="text-lg">No recharge history found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-yellow-400 mb-8">Transaction History</h1>
      <div className="space-y-4">
        {history.map((tx) => (
          <div key={tx._id} className="bg-black/80 backdrop-blur-sm rounded-xl shadow-sm border border-yellow-500/30 p-6 flex flex-col md:flex-row md:items-center justify-between hover:shadow-md hover:border-yellow-400/50 transition-all">
            <div className="flex items-start gap-4 mb-4 md:mb-0">
               <div className="bg-indigo-50 p-3 rounded-lg">
                  <Smartphone className="h-6 w-6 text-indigo-600" />
               </div>
               <div>
                  <h3 className="font-semibold text-yellow-400">{tx.phoneNumber}</h3>
                  <p className="text-sm text-gray-300">{tx.planId?.name} - ₹{tx.amount}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(tx.createdAt).toLocaleDateString()} at {new Date(tx.createdAt).toLocaleTimeString()}</p>
                  <p className="text-xs text-gray-500">ID: {tx.transactionId}</p>
               </div>
            </div>
            
            <div className="flex items-center gap-6">
               <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-yellow-400">{tx.planId?.validity}</p>
                  <p className="text-xs text-gray-300">{tx.planId?.data}</p>
               </div>
               <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
                  <CheckCircle className="h-4 w-4" />
                  {tx.status}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};