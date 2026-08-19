import { useState } from 'react';
import { Wrench, Plus, Clock, AlertTriangle, CheckCircle, User, GripVertical } from 'lucide-react';

export default function Maintenance() {
  const [tickets, setTickets] = useState([
    { id: 'WR-8091', asset: 'TR-105', title: 'Brake Pad Replacement', status: 'Pending', priority: 'High', assignee: 'Team Alpha', time: '2 hrs ago' },
    { id: 'WR-8092', asset: 'Aluva Station', title: 'Escalator Motor Check', status: 'Pending', priority: 'Medium', assignee: 'Mech Ops', time: '5 hrs ago' },
    { id: 'WR-8088', asset: 'TR-102', title: 'HVAC Filter Cleaning', status: 'In Progress', priority: 'Low', assignee: 'Ramesh K.', time: '1 day ago' },
    { id: 'WR-8085', asset: 'Track Sec 4', title: 'Signal Sensor Calibration', status: 'In Progress', priority: 'High', assignee: 'Signal Team', time: '2 days ago' },
    { id: 'WR-8070', asset: 'TR-101', title: 'Door Mechanism Lube', status: 'Resolved', priority: 'Low', assignee: 'Team Beta', time: '3 days ago' },
  ]);

  const renderPriority = (priority) => {
    switch (priority) {
      case 'High': return <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-extrabold rounded-md uppercase flex items-center gap-1"><AlertTriangle size={10}/> High</span>;
      case 'Medium': return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-extrabold rounded-md uppercase">Medium</span>;
      case 'Low': return <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-extrabold rounded-md uppercase">Low</span>;
      default: return null;
    }
  };

  const Column = ({ title, status, count, colorClass, borderClass }) => (
    <div className="flex flex-col bg-slate-50/70 border border-slate-200 rounded-3xl h-full p-5">
      <div className={`flex items-center justify-between pb-4 mb-4 border-b-2 ${borderClass}`}>
        <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${colorClass}`}></span>
          {title}
        </h2>
        <span className="bg-white border border-slate-200 text-slate-700 text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
          {count}
        </span>
      </div>
      
      <div className="space-y-4 flex-1">
        {tickets.filter(t => t.status === status).map(ticket => (
          <div 
            key={ticket.id} 
            className="group bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 hover:-translate-y-1 transition-all relative"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-extrabold text-slate-400">{ticket.id}</span>
              {renderPriority(ticket.priority)}
            </div>
            
            <h3 className="font-bold text-slate-800 text-base mb-1">{ticket.title}</h3>
            <p className="text-xs font-semibold text-slate-500 mb-4 flex items-center gap-1.5">
              <Wrench size={13} className="text-amber-500" /> Asset: {ticket.asset}
            </p>
            
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold pt-3 border-t border-slate-100">
              <span className="flex items-center gap-1.5 text-slate-600"><User size={13}/> {ticket.assignee}</span>
              <span className="flex items-center gap-1.5"><Clock size={13}/> {ticket.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-4 w-full py-3 border-2 border-dashed border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-white hover:border-slate-300 hover:text-slate-800 transition-all flex items-center justify-center gap-2 text-xs">
        <Plus size={16} /> Add Work Order
      </button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            <Wrench size={28} className="text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Maintenance Kanban Board</h1>
            <p className="text-amber-200 text-sm mt-0.5">Track engineering work orders, parts replacement, and repair tickets.</p>
          </div>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-3 rounded-xl text-sm font-extrabold transition-all shadow-lg flex items-center justify-center gap-2">
          <Plus size={18} />
          Create Maintenance Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[550px]">
        <Column title="Pending Requests" status="Pending" count={tickets.filter(t => t.status === 'Pending').length} colorClass="bg-slate-400" borderClass="border-slate-200" />
        <Column title="Active Repairs" status="In Progress" count={tickets.filter(t => t.status === 'In Progress').length} colorClass="bg-blue-500 animate-pulse" borderClass="border-blue-200" />
        <Column title="Resolved" status="Resolved" count={tickets.filter(t => t.status === 'Resolved').length} colorClass="bg-emerald-500" borderClass="border-emerald-200" />
      </div>

    </div>
  );
}