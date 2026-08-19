import React, { useState } from 'react';
import { Train, Activity, Clock, RefreshCw, Navigation2, Search, MapPin, Users, AlertCircle, Wifi, ShieldCheck } from 'lucide-react';

export default function LiveStatus() {
  const [activeTrainId, setActiveTrainId] = useState('KM-104');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Safely mapping Tailwind classes (fixes the dynamic color bug)
  const themes = {
    blue: { text: 'text-blue-600', bg: 'bg-blue-600', light: 'bg-blue-50', border: 'border-blue-500', ping: 'bg-blue-400' },
    orange: { text: 'text-orange-600', bg: 'bg-orange-600', light: 'bg-orange-50', border: 'border-orange-500', ping: 'bg-orange-400' },
    emerald: { text: 'text-emerald-600', bg: 'bg-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-500', ping: 'bg-emerald-400' }
  };

  const fleetData = [
    {
      id: 'KM-104',
      status: 'On Time',
      speed: '45 km/h',
      occupancy: '68%',
      theme: 'blue',
      route: [
        { name: 'Aluva', state: 'passed', time: '10:05 AM' },
        { name: 'Kalamassery', state: 'passed', time: '10:15 AM' },
        { name: 'Edapally', state: 'current', time: 'Arriving now' },
        { name: 'MG Road', state: 'upcoming', time: '10:35 AM' }
      ]
    },
    {
      id: 'KM-092',
      status: 'Delayed',
      speed: '15 km/h',
      occupancy: '92%',
      theme: 'orange',
      route: [
        { name: 'Palarivattom', state: 'passed', time: '09:50 AM' },
        { name: 'Kaloor', state: 'current', time: 'Held at station' },
        { name: 'Ernakulam South', state: 'upcoming', time: '10:45 AM' }
      ]
    },
    {
      id: 'KM-118',
      status: 'Express',
      speed: '65 km/h',
      occupancy: '45%',
      theme: 'emerald',
      route: [
        { name: 'Vytila', state: 'passed', time: '10:10 AM' },
        { name: 'Kadavanthra', state: 'current', time: 'Passing through' },
        { name: 'Maharaja\'s', state: 'upcoming', time: '10:20 AM' }
      ]
    }
  ];

  const activeTrain = fleetData.find(t => t.id === activeTrainId);
  const activeTheme = themes[activeTrain.theme];
  
  // Filter trains based on search
  const filteredFleet = fleetData.filter(train => 
    train.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    train.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-screen bg-gray-50">
      
      {/* Top Navigation Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-5 rounded-2xl shadow-sm border border-gray-200 mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-900 rounded-xl">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Command Center</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Connection Established
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-400 mr-4">
            <Wifi className="w-4 h-4" /> Live
          </span>
          <button 
            onClick={handleRefresh}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-all shadow-md active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Sync Network
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Left Sidebar: Fleet Manager */}
        <div className="xl:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col h-[700px]">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Navigation2 className="text-gray-900 w-5 h-5" /> Active Fleet
          </h2>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search train or status..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            />
          </div>

          {/* Train List */}
          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {filteredFleet.map((train) => (
              <div 
                key={train.id}
                onClick={() => setActiveTrainId(train.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                  activeTrainId === train.id 
                    ? `${themes[train.theme].border} ${themes[train.theme].light} shadow-md` 
                    : 'border-transparent bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-gray-900 text-lg">{train.id}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md bg-white shadow-sm ${themes[train.theme].text}`}>
                    {train.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {train.speed}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {train.occupancy} Full</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area: Interactive Map & Tracking (Spans 3 columns) */}
        <div className="xl:col-span-3 relative h-[700px] w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-200 group">
          
          <iframe
            title="Kochi Metro Live Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125745.38501258666!2d76.242137!3d9.9822452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1714500000000!5m2!1sen!2sin"
            className="absolute inset-0 w-full h-full transition-opacity duration-300"
            style={{ opacity: isRefreshing ? 0.5 : 1, filter: 'contrast(1.1) saturation(1.2)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Floating Telemetry Panel */}
          <div className="absolute top-6 left-6 w-[340px] bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/60 transition-all duration-300">
            
            {/* Panel Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <div>
                <h3 className="font-black text-gray-900 flex items-center gap-2 text-xl">
                  <Train className={activeTheme.text} /> {activeTrain.id}
                </h3>
                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">Live Telemetry</p>
              </div>
              {activeTrain.status === 'Delayed' && (
                <AlertCircle className="text-orange-500 w-6 h-6 animate-pulse" />
              )}
            </div>
            
            {/* Route Timeline */}
            <div className="space-y-6 relative pl-3">
              {/* Progress Line */}
              <div className="absolute left-[19px] top-3 bottom-3 w-1 bg-gray-100 rounded-full"></div>
              
              {/* Active Progress Fill */}
              <div 
                className={`absolute left-[19px] top-3 w-1 rounded-full transition-all duration-500 ${activeTheme.bg}`}
                style={{ height: '50%' }} // Simulates how far the train is down the route
              ></div>

              {activeTrain.route.map((station, index) => (
                <div key={index} className="flex gap-5 relative z-10">
                  
                  {/* Status Nodes */}
                  <div className="relative flex items-center justify-center w-6 h-6">
                    {station.state === 'passed' && (
                      <div className={`w-3.5 h-3.5 rounded-full ${activeTheme.bg} ring-4 ring-white`} />
                    )}
                    {station.state === 'current' && (
                      <>
                        <span className={`absolute w-10 h-10 rounded-full ${activeTheme.ping} opacity-30 animate-ping`}></span>
                        <div className={`w-5 h-5 rounded-full ${activeTheme.bg} text-white shadow-lg ring-4 ring-white flex items-center justify-center`}>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                      </>
                    )}
                    {station.state === 'upcoming' && (
                      <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-gray-300 ring-4 ring-white" />
                    )}
                  </div>

                  {/* Station Details */}
                  <div className="flex-1 mt-0.5">
                    <p className={`font-bold text-base ${station.state === 'current' ? activeTheme.text : 'text-gray-800'}`}>
                      {station.name}
                    </p>
                    <p className={`text-sm font-medium mt-0.5 ${station.state === 'current' ? 'text-gray-900' : 'text-gray-400'}`}>
                      {station.state === 'current' ? `Moving at ${activeTrain.speed}` : station.time}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}