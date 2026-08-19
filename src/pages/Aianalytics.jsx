import { useState } from 'react';
import { Brain, AlertCircle, Zap, Activity, RefreshCw, Layers, TrendingUp, CheckCircle, ShieldAlert } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AiAnalytics() {
  const [isScanning, setIsScanning] = useState(false);
  const [timeRange, setTimeRange] = useState('Today');
  const [activeTab, setActiveTab] = useState('Traffic');

  const trafficDataMap = {
    'Today': [
      { time: '06:00', passengers: 1200, threshold: 4000 },
      { time: '08:00', passengers: 3800, threshold: 4000 },
      { time: '10:00', passengers: 2100, threshold: 4000 },
      { time: '12:00', passengers: 2500, threshold: 4000 },
      { time: '14:00', passengers: 2300, threshold: 4000 },
      { time: '16:00', passengers: 3400, threshold: 4000 },
      { time: '18:00', passengers: 3950, threshold: 4000 },
      { time: '20:00', passengers: 1800, threshold: 4000 },
      { time: '22:00', passengers: 800, threshold: 4000 },
    ],
    'Tomorrow': [
      { time: '06:00', passengers: 1400, threshold: 4000 },
      { time: '08:00', passengers: 4200, threshold: 4000 },
      { time: '10:00', passengers: 2400, threshold: 4000 },
      { time: '12:00', passengers: 2700, threshold: 4000 },
      { time: '14:00', passengers: 2500, threshold: 4000 },
      { time: '16:00', passengers: 3800, threshold: 4000 },
      { time: '18:00', passengers: 4300, threshold: 4000 },
      { time: '20:00', passengers: 2100, threshold: 4000 },
      { time: '22:00', passengers: 950, threshold: 4000 },
    ]
  };

  const efficiencyData = [
    { name: 'Aluva', efficiency: 94, delay: 6 },
    { name: 'SN Jnc', efficiency: 82, delay: 18 },
    { name: 'MG Rd', efficiency: 98, delay: 2 },
    { name: 'Vyttila', efficiency: 75, delay: 25 },
    { name: 'Petta', efficiency: 91, delay: 9 },
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-violet-900 via-indigo-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            <Brain size={28} className="text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Predictive AI Neural Engine</h1>
            <p className="text-violet-200 text-sm mt-0.5">Machine learning forecasting models and automated anomaly detection.</p>
          </div>
        </div>
        <button 
          onClick={handleScan}
          disabled={isScanning}
          className="bg-white text-slate-900 hover:bg-violet-50 disabled:opacity-50 px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} className={`text-violet-600 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'Running Deep Neural Scan...' : 'Run Diagnostics'}
        </button>
      </div>

      {/* Top Interactive Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2.5 bg-violet-100 text-violet-600 rounded-xl"><TrendingUp size={20} /></span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">High Confidence</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Predicted Peak Load</p>
          <p className="text-3xl font-black text-slate-800 mt-1">18:00 HRS</p>
          <p className="text-xs text-slate-500 mt-2">Expected 15% surge on Aluva-Petta trunk line.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2.5 bg-rose-100 text-rose-600 rounded-xl"><ShieldAlert size={20} /></span>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">3 Active</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Anomaly Detections</p>
          <p className="text-3xl font-black text-slate-800 mt-1">3 Nodes</p>
          <p className="text-xs text-slate-500 mt-2">Door sensor latency increased on TR-105.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2.5 bg-teal-100 text-teal-600 rounded-xl"><CheckCircle size={20} /></span>
            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">Optimized</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Energy Feedback</p>
          <p className="text-3xl font-black text-slate-800 mt-1">+14.2%</p>
          <p className="text-xs text-slate-500 mt-2">Regenerative braking efficiency gain.</p>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Activity size={20} className="text-violet-600" />
                Network Load Forecast Simulation
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Passenger volume vs safe structural threshold.</p>
            </div>
            
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              {['Today', 'Tomorrow'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    timeRange === range ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficDataMap[timeRange]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPassengers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '1rem', padding: '10px 14px' }} 
                  itemStyle={{ color: '#a78bfa', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="passengers" stroke="#8b5cf6" strokeWidth={3} fill="url(#colorPassengers)" />
                <Area type="monotone" dataKey="threshold" stroke="#f43f5e" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Route Efficiency Bar Chart */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Layers size={20} className="text-teal-500" />
              Station Efficiency Index
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">On-time dispatch ratio vs delay risk.</p>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={efficiencyData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12, fontWeight: 600}} width={65} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="efficiency" stackId="a" fill="#14b8a6" radius={[0, 0, 0, 0]} name="Efficiency %" barSize={20} />
                <Bar dataKey="delay" stackId="a" fill="#f43f5e" radius={[0, 4, 4, 0]} name="Delay Risk %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
