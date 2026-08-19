import React, { useState, useEffect } from 'react';
import { Train, ShieldCheck, ShieldAlert, Wrench, Plus, Minus, Activity } from 'lucide-react';

const defaultFleet = Array.from({ length: 10 }, (_, i) => ({
  id: `Rake #${String(i + 1).padStart(2, '0')}`,
  mileage: Math.floor(Math.random() * 40000) + 15000,
  safetyCleared: i % 3 !== 0,
  jobCards: i % 4 === 0 ? Math.floor(Math.random() * 3) + 1 : 0, 
}));

export default function Dashboard() {
  const [fleet, setFleet] = useState(() => {
    const saved = localStorage.getItem('kmrl_fleet_data');
    if (saved) return JSON.parse(saved);
    return defaultFleet;
  });

  useEffect(() => {
    localStorage.setItem('kmrl_fleet_data', JSON.stringify(fleet));
  }, [fleet]);

  const toggleSafety = (id) => {
    setFleet(fleet.map(train => 
      train.id === id ? { ...train, safetyCleared: !train.safetyCleared } : train
    ));
  };

  const adjustJobCards = (id, delta) => {
    setFleet(fleet.map(train => {
      if (train.id === id) {
        const newJobCards = Math.max(0, train.jobCards + delta);
        return { ...train, jobCards: newJobCards };
      }
      return train;
    }));
  };

  const getTrainStatus = (train) => {
    if (train.jobCards > 2) return { label: 'Maintenance', color: 'bg-red-100 text-red-700 border-red-200' };
    if (!train.safetyCleared || train.jobCards > 0) return { label: 'Standby', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    return { label: 'Ready', color: 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#E11D48]/30' };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] flex items-center gap-3">
            <Activity className="w-8 h-8 text-[#E11D48]" />
            Fleet Health Dashboard
          </h1>
          <p className="text-gray-500 mt-1">KMRL AI-Driven Train Induction & Scheduling</p>
        </div>
        <div className="bg-[#0F172A] text-white px-4 py-2 rounded-lg shadow-md border border-slate-700 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse"></div>
          <span className="font-medium text-sm">System Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {fleet.map((train) => {
          const status = getTrainStatus(train);
          
          return (
            <div key={train.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
              <div className="bg-[#000000] p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Train className="w-5 h-5 text-[#00A896]" />
                  <span className="font-bold tracking-wide">{train.id}</span>
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${status.color}`}>
                  {status.label}
                </span>
              </div>

              <div className="p-5 space-y-5">
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Total Mileage</p>
                  <p className="text-lg font-bold text-gray-800">
                    {train.mileage.toLocaleString()} <span className="text-sm font-normal text-gray-500">km</span>
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    {train.safetyCleared ? (
                      <ShieldCheck className="w-5 h-5 text-[#3B82F6]" />
                    ) : (
                      <ShieldAlert className="w-5 h-5 text-yellow-500" />
                    )}
                    <span className="text-sm font-medium text-gray-700">Safety Clearance</span>
                  </div>
                  <button 
                    onClick={() => toggleSafety(train.id)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${train.safetyCleared ? 'bg-[#3B82F6]' : 'bg-gray-300'}`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${train.safetyCleared ? 'translate-x-4.5' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Open Job Cards</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => adjustJobCards(train.id, -1)}
                      disabled={train.jobCards === 0}
                      className="p-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-4 text-center font-bold text-gray-800">{train.jobCards}</span>
                    <button 
                      onClick={() => adjustJobCards(train.id, 1)}
                      className="p-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}