import React, { useState } from 'react';
import { Wifi, Clock, Info, Zap, ArrowRight } from 'lucide-react';

export const PlanCard = ({ plan, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative bg-black/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 transition-all duration-300 p-6 flex flex-col h-full transform hover:scale-105 ${
        isHovered ? 'border-yellow-400 shadow-yellow-400/30' : 'border-yellow-500/40'
      }`}>
        
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs px-3 py-1.5 rounded-full font-bold">
          Popular
        </div>

        <div className="mb-6 pt-2">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-4xl font-bold text-yellow-400">₹{plan.price}</span>
            <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
          </div>
          <span className="inline-block bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
            {plan.name}
          </span>
        </div>

        <div className="space-y-4 flex-grow">
          <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/20 transition-all">
            <div className="bg-yellow-400/20 p-2 rounded-lg flex-shrink-0">
              <Wifi className="h-4 w-4 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Data</p>
              <p className="font-bold text-yellow-400">{plan.data}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/20 transition-all">
            <div className="bg-yellow-400/20 p-2 rounded-lg flex-shrink-0">
              <Clock className="h-4 w-4 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Validity</p>
              <p className="font-bold text-yellow-400">{plan.validity}</p>
            </div>
          </div>

          <div className="flex gap-2 text-xs bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-xl">
            <Info className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="line-clamp-2 text-gray-300">{plan.description}</p>
          </div>
        </div>

        <button
          onClick={() => onSelect(plan)}
          className="mt-6 w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 px-4 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-400/50 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 flex items-center justify-center gap-2 group/btn"
        >
          Select Plan
          <ArrowRight className={`h-4 w-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
        </button>
      </div>
    </div>
  );
};