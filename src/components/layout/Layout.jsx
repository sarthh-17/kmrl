import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Radio, Calendar, Brain, Bot, Wrench, FileText, Settings, Bell, LogOut, X, Check } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Speed Surge Warning', text: 'TR-102 exceeded optimal speed limit near Kadavanthra.', time: '5m ago', unread: true },
    { id: 2, title: 'Maintenance Assigned', text: 'New work order WR-8091 assigned to Team Alpha.', time: '1h ago', unread: true },
    { id: 3, title: 'System Backup Complete', text: 'Daily telemetry database backup successful.', time: '3h ago', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const clearNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const navItems = [
    { path: '/', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/live-status', name: 'Live Status', icon: Radio },
    { path: '/scheduling', name: 'Scheduling', icon: Calendar },
    { path: '/analytics', name: 'AI Analytics', icon: Brain },
    { path: '/chatbot', name: 'Chatbot', icon: Bot },
    { path: '/maintenance', name: 'Maintenance', icon: Wrench },
    { path: '/reports', name: 'Reports', icon: FileText },
    { path: '/settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0 hidden md:flex">
        {/* Brand Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md">
            K
          </div>
          <div>
            <h1 className="font-extrabold text-white text-lg tracking-wider">KMRL</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">React Portal v2.0</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/40' 
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer Logout */}
        <div className="p-4 border-t border-slate-800">
          <Link 
            to="/login"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP NAVBAR */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 relative z-30">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-extrabold text-slate-800 capitalize tracking-tight">
              {location.pathname === '/' ? 'Command Dashboard' : location.pathname.replace('/', '').replace('-', ' ')}
            </h2>
          </div>

          <div className="flex items-center gap-4 relative">
            
            {/* INTERACTIVE BELL NOTIFICATION BUTTON */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-violet-600 transition-all relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center shadow-md animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* NOTIFICATION DROPDOWN MENU */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-slate-800 text-sm">System Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full text-[10px] font-bold">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs font-bold text-violet-600 hover:underline flex items-center gap-1"
                      >
                        <Check size={14} /> Mark read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div 
                          key={n.id} 
                          className={`p-4 transition-colors hover:bg-slate-50 flex items-start justify-between gap-3 ${n.unread ? 'bg-violet-50/30' : ''}`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {n.unread && <span className="w-2 h-2 rounded-full bg-violet-600"></span>}
                              <h4 className="text-xs font-bold text-slate-800">{n.title}</h4>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">{n.text}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{n.time}</p>
                          </div>
                          <button 
                            onClick={(e) => clearNotification(n.id, e)}
                            className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-400 text-xs font-semibold">
                        No new notifications.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Admin Avatar Profile Pill */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                AD
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-extrabold text-slate-800">Admin User</p>
                <p className="text-[10px] font-bold text-slate-400">Command Grid</p>
              </div>
            </div>

          </div>
        </header>

        {/* PAGE VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
