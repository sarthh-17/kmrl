import { useState } from 'react';
import { FileText, Download, Search, Filter, FileSpreadsheet, File, Calendar, MoreVertical } from 'lucide-react';

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const reports = [
    { id: 'REP-1042', name: 'Daily Traffic Summary', type: 'PDF', date: 'Aug 16, 2026', size: '2.4 MB', category: 'Operations' },
    { id: 'REP-1041', name: 'Maintenance Log - Fleet', type: 'CSV', date: 'Aug 15, 2026', size: '845 KB', category: 'Engineering' },
    { id: 'REP-1040', name: 'Revenue & Ticketing Data', type: 'XLSX', date: 'Aug 14, 2026', size: '4.1 MB', category: 'Finance' },
    { id: 'REP-1039', name: 'Incident Report (TR-102)', type: 'PDF', date: 'Aug 12, 2026', size: '1.2 MB', category: 'Safety' },
    { id: 'REP-1038', name: 'Energy Consumption Metrics', type: 'CSV', date: 'Aug 10, 2026', size: '512 KB', category: 'Operations' },
    { id: 'REP-1037', name: 'Monthly Performance Review', type: 'PDF', date: 'Aug 01, 2026', size: '8.7 MB', category: 'Management' },
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) || report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || report.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF': return <File className="text-rose-500" size={20} />;
      case 'CSV': return <FileText className="text-blue-500" size={20} />;
      case 'XLSX': return <FileSpreadsheet className="text-emerald-500" size={20} />;
      default: return <File className="text-slate-500" size={20} />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 p-6 rounded-3xl text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
            <FileText size={28} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Document Hub & Automated Reports</h1>
            <p className="text-indigo-200 text-sm mt-0.5">Access, search, and download secure system logs and performance records.</p>
          </div>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2">
          <Download size={18} />
          Export All Records (ZIP)
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search reports by title or identifier ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl pl-11 pr-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mr-2">
            <Filter size={14} /> Format:
          </span>
          {['All', 'PDF', 'CSV', 'XLSX'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeFilter === filter 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-xs font-bold border-b border-slate-200 uppercase tracking-wider">
                <th className="p-4">Document Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Generated Date</th>
                <th className="p-4">File Size</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-indigo-50/40 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3.5">
                        <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
                          {getFileIcon(report.type)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{report.name}</p>
                          <p className="text-xs text-slate-400 font-medium">{report.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-extrabold">
                        {report.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-slate-600 font-semibold text-xs">
                        <Calendar size={14} className="text-slate-400" />
                        {report.date}
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-500 text-xs">
                      {report.size}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => alert(`Downloading ${report.name} (${report.id})...`)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" 
                          title="Download Record"
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-400 font-semibold">
                    No matching reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}