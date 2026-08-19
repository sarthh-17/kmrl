import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, Filter, Train, Wrench, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Scheduling() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState(16);

  const schedules = [
    { id: 'TR-101', title: 'Morning Commute Deployment', route: 'Aluva to Petta', time: '06:00 AM - 02:00 PM', operator: 'Rajesh K.', type: 'Active', status: 'In Progress' },
    { id: 'TR-102', title: 'Express Run', route: 'Petta to Aluva', time: '07:30 AM - 03:30 PM', operator: 'Priya M.', type: 'Active', status: 'In Progress' },
    { id: 'TR-105', title: 'Routine Brake Inspection', route: 'Muttom Depot Bay 4', time: '09:00 AM - 11:30 AM', operator: 'Tech Team Alpha', type: 'Maintenance', status: 'Scheduled' },
    { id: 'TR-106', title: 'Midday Shift', route: 'MG Road to Vyttila', time: '12:00 PM - 08:00 PM', operator: 'Anand V.', type: 'Active', status: 'Upcoming' },
    { id: 'TR-104', title: 'System Software Update', route: 'Terminal 2', time: '01:00 PM - 02:00 PM', operator: 'IT Ops', type: 'Maintenance', status: 'Upcoming' },
  ];

  const filteredSchedules = schedules.filter(item => 
    activeFilter === 'All' ? true : item.type === activeFilter
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            <CalendarIcon size={28} className="text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Fleet Scheduling & Agenda</h1>
            <p className="text-blue-200 text-sm mt-0.5">Manage daily deployments, operator shifts, and maintenance windows.</p>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2">
          <Plus size={18} />
          Create Schedule Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Calendar & Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800">August 2026</h3>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-slate-100 font-bold">&lt;</button>
                <button className="w-8 h-8 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-slate-100 font-bold">&gt;</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-3">
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold">
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDate === day;
                return (
                  <div 
                    key={i} 
                    onClick={() => setSelectedDate(day)}
                    className={`py-2 rounded-xl cursor-pointer transition-all ${
                      isSelected ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Filter size={18} className="text-slate-400" />
              Category Filter
            </h3>
            <div className="space-y-2">
              {['All', 'Active', 'Maintenance'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeFilter === filter 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {filter} Events
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Agenda Timeline List */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-sm p-2">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-3xl">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Agenda for August {selectedDate}, 2026</h2>
              <p className="text-xs text-slate-500 mt-0.5">Showing scheduled items for selected date.</p>
            </div>
            <span className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-sm">
              {filteredSchedules.length} Active Records
            </span>
          </div>

          <div className="p-6 space-y-4">
            {filteredSchedules.map((schedule, i) => (
              <div 
                key={i} 
                className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all bg-white cursor-pointer relative overflow-hidden"
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${schedule.type === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>

                <div className="flex items-start gap-4 pl-2">
                  <div className={`p-3.5 rounded-2xl mt-1 ${schedule.type === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {schedule.type === 'Active' ? <Train size={22} /> : <Wrench size={22} />}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-800 text-base">{schedule.title}</h3>
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-extrabold uppercase">
                        {schedule.id}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 mt-2">
                      <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" />{schedule.time}</span>
                      <span className="flex items-center gap-1.5"><ArrowRight size={14} className="text-slate-400" />{schedule.route}</span>
                      <span className="flex items-center gap-1.5"><User size={14} className="text-slate-400" />{schedule.operator}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 pl-2 md:pl-0 flex items-center justify-between md:justify-end gap-4">
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    schedule.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                    schedule.status === 'Scheduled' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {schedule.status === 'In Progress' && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>}
                    {schedule.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}