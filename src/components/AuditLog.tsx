import React, { useState } from 'react';
import { FileText, Search, User, Key, Globe, ShieldAlert } from 'lucide-react';
import './AuditLog.css';

interface AuditEvent {
  id: string;
  user: string;
  action: string;
  category: 'auth' | 'firewall' | 'system' | 'user';
  ip: string;
  timestamp: string;
}

const initialEvents: AuditEvent[] = [
  { id: 'AUD-901', user: 'Lead_administrator', action: 'Suspended user: Suspended_operator', category: 'user', ip: '127.0.0.1', timestamp: '12:15:30' },
  { id: 'AUD-892', user: 'Officer_vance', action: 'Authorized SQL Injection mitigation rule (TR-8942)', category: 'firewall', ip: '198.51.100.12', timestamp: '11:45:12' },
  { id: 'AUD-781', user: 'Lead_administrator', action: 'Configured global subnet replication delay', category: 'system', ip: '127.0.0.1', timestamp: '10:20:05' },
  { id: 'AUD-765', user: 'Lead_administrator', action: 'Authorized login session override', category: 'auth', ip: '192.168.1.105', timestamp: '09:12:44' },
  { id: 'AUD-652', user: 'Analyst_hendrix', action: 'Mitigated brute force SSH vector (TR-1102)', category: 'firewall', ip: '203.0.113.88', timestamp: '08:44:19' }
];

const AuditLog: React.FC = () => {
  const [events] = useState<AuditEvent[]>(initialEvents);
  const [search, setSearch] = useState('');

  const filteredEvents = events.filter(e => 
    e.action.toLowerCase().includes(search.toLowerCase()) ||
    e.user.toLowerCase().includes(search.toLowerCase()) ||
    e.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="soc-audit-wrapper flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4 select-none">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wider uppercase">Audit Log Registry</h3>
          <p className="text-[10px] text-slate-500 font-medium mt-0.5">Immutable record of administrator threat operations</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search operator, event..."
            className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand/40"
          />
        </div>
      </div>

      <div className="soc-audit-list select-none">
        {filteredEvents.map((e) => (
          <div key={e.id} className="soc-audit-item flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-brand shrink-0">
                {e.category === 'auth' && <Key className="w-4 h-4" />}
                {e.category === 'firewall' && <Globe className="w-4 h-4" />}
                {e.category === 'system' && <FileText className="w-4 h-4" />}
                {e.category === 'user' && <User className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-200">{e.action}</div>
                <div className="text-[10px] text-slate-500 font-medium flex items-center gap-2 mt-1">
                  <span>Operator: <span className="text-slate-400 font-bold">{e.user}</span></span>
                  <span className="text-slate-700">•</span>
                  <span>IP: <span className="text-slate-400 font-mono">{e.ip}</span></span>
                </div>
              </div>
            </div>

            <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
              <span className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest">{e.id}</span>
              <span className="text-[10px] text-slate-500 font-mono">{e.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditLog;
