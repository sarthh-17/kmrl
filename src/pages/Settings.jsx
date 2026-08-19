import { useState } from 'react';
import { User, Bell, Shield, Globe, Smartphone, Save } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Profile');

  const ToggleSwitch = ({ label, description, defaultChecked }) => (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
      <div>
        <h3 className="text-sm font-bold text-slate-800">{label}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
      </label>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">System & Account Settings</h1>
          <p className="text-slate-300 text-sm mt-0.5">Manage operator credentials, notification dispatch rules, and system localization.</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2">
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Settings Navigation Tabs */}
        <div className="w-full md:w-64 shrink-0 space-y-1.5">
          {[
            { name: 'Profile', icon: User },
            { name: 'Notifications', icon: Bell },
            { name: 'Security & Access', icon: Shield },
            { name: 'System Preferences', icon: Globe },
          ].map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                activeTab === tab.name 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          
          {activeTab === 'Profile' && (
            <div className="p-6 md:p-8 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Administrator Profile</h2>
              
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                <div className="w-20 h-20 rounded-2xl bg-violet-100 text-violet-700 border-2 border-violet-200 flex items-center justify-center font-bold text-2xl shadow-inner">
                  AD
                </div>
                <div>
                  <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold shadow-sm transition-colors mb-2">
                    Upload New Avatar
                  </button>
                  <p className="text-xs text-slate-400">Supported formats: JPG, PNG. Max size: 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" defaultValue="Admin Supervisor" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-violet-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" defaultValue="admin@kmrl.co.in" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-violet-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Department</label>
                  <input type="text" defaultValue="Central Command Grid" disabled className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl px-4 py-3 text-sm font-semibold cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                  <input type="text" defaultValue="+91 98765 43210" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-violet-500" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="p-6 md:p-8 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-slate-800 mb-1">Alert Preferences</h2>
              <p className="text-sm text-slate-500 mb-6 pb-6 border-b border-slate-100">Select which automated system events trigger push notifications.</p>
              
              <div className="space-y-2">
                <ToggleSwitch label="Critical System Outages" description="Instant push notification for grid or train safety triggers." defaultChecked={true} />
                <ToggleSwitch label="Maintenance Work Orders" description="Alerts when new maintenance tasks are assigned to engineers." defaultChecked={true} />
                <ToggleSwitch label="Daily Traffic Summary PDF" description="Receive automated performance metrics every evening." defaultChecked={false} />
              </div>
            </div>
          )}

          {activeTab === 'Security & Access' && (
            <div className="p-6 md:p-8 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-6">Account Security</h2>
              <div className="space-y-6 max-w-md">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-3">Update Password</h3>
                  <div className="space-y-3">
                    <input type="password" placeholder="Current Password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500" />
                    <input type="password" placeholder="New Password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500" />
                    <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-slate-800 transition-colors">Update Password</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'System Preferences' && (
            <div className="p-6 md:p-8 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-6">Localization & Interface</h2>
              <div className="space-y-6 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Display Language</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-violet-500">
                    <option>English (US)</option>
                    <option>Malayalam</option>
                    <option>Hindi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Timezone</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-violet-500">
                    <option>(GMT+05:30) New Delhi, Mumbai, Kochi</option>
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}