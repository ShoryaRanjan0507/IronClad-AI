import React, { useState } from 'react';
import { useThreats, Threat } from '../context/ThreatContext';
import { Search, Filter, ShieldAlert } from 'lucide-react';
import './ThreatQueue.css';

interface ThreatQueueProps {
  selectedThreat: Threat | null;
  setSelectedThreat: (t: Threat) => void;
}

const ThreatQueue: React.FC<ThreatQueueProps> = ({ selectedThreat, setSelectedThreat }) => {
  const { threats } = useThreats();
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');

  const filteredThreats = threats.filter(t => {
    const matchesSearch = t.threat.toLowerCase().includes(search.toLowerCase()) || 
                          t.ip.includes(search) || 
                          t.id.toLowerCase().includes(search.toLowerCase());
    const matchesSeverity = severityFilter === 'ALL' || t.severity.toUpperCase() === severityFilter;
    return matchesSearch && matchesSeverity && t.status !== 'Dismissed';
  });

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search IP, name, threat ID..."
            className="w-full bg-[#0d1527]/50 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand/40"
          />
        </div>

        <div className="relative shrink-0">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-[#0d1527]/50 border border-white/5 rounded-xl py-2.5 pl-10 pr-8 text-xs text-slate-300 focus:outline-none focus:border-brand/40 appearance-none cursor-pointer"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* Queue */}
      <div className="soc-threat-list pr-1">
        {filteredThreats.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-slate-500 border border-dashed border-white/5 rounded-2xl bg-[#030712]/20">
            <ShieldAlert className="w-10 h-10 mb-3 opacity-30" />
            <span className="text-xs font-semibold uppercase tracking-wider">No threats match filters</span>
          </div>
        ) : (
          filteredThreats.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelectedThreat(t)}
              className={`soc-threat-item ${selectedThreat?.id === t.id ? 'selected' : ''}`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-wider">{t.id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  t.severity === 'Critical' ? 'badge-critical' :
                  t.severity === 'High' ? 'badge-high' :
                  t.severity === 'Medium' ? 'badge-medium' : 'badge-low'
                }`}>
                  {t.severity}
                </span>
              </div>
              <div className="text-sm font-semibold text-slate-200 tracking-wide line-clamp-1">{t.threat}</div>
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="font-medium text-slate-500">{t.target}</span>
                <span className="font-mono text-brand">{t.ip}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-1 pt-2 border-t border-white/5">
                <span>{t.timestamp}</span>
                <span className={`font-semibold ${
                  t.status === 'Mitigated' ? 'text-emerald-400' :
                  t.status === 'Investigating' ? 'text-amber-400' :
                  'text-red-400'
                }`}>{t.status.toUpperCase()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ThreatQueue;
