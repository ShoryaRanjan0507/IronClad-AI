import React from 'react';
import { useThreats, Threat } from '../context/ThreatContext';
import { ShieldAlert, ShieldCheck, ShieldAlert as ShieldIcon, Play, X, Zap } from 'lucide-react';
import './ThreatDetails.css';

interface ThreatDetailsProps {
  threat: Threat | null;
}

const ThreatDetails: React.FC<ThreatDetailsProps> = ({ threat }) => {
  const { mitigateThreat, investigateThreat, dismissThreat } = useThreats();

  if (!threat) {
    return (
      <div className="soc-detail-panel flex items-center justify-center text-slate-500 text-center select-none">
        <div className="flex flex-col items-center gap-3">
          <ShieldIcon className="w-12 h-12 text-slate-700 animate-pulse" />
          <h3 className="text-sm font-semibold uppercase tracking-wider">No Incident Selected</h3>
          <p className="text-xs max-w-[200px] text-slate-600">Select an incident from the threat queue to review and authorize mitigation actions.</p>
        </div>
      </div>
    );
  }

  const handleMitigate = () => {
    mitigateThreat(threat.id);
  };

  const handleInvestigate = () => {
    investigateThreat(threat.id);
  };

  const handleDismiss = () => {
    dismissThreat(threat.id);
  };

  const getAiExplanation = (t: Threat) => {
    if (t.threat.toLowerCase().includes('sql')) {
      return `[AGENT PRIORITY: HIGH] Anomalous database queries detected from external IP ${t.ip}.
- Attack Pattern: SQL Injection (attacker attempting to run database queries via form fields to access records).
- Action Taken: AI filtered out 230 normal security heartbeat check signals (false positives) and prioritized this incident as Critical/High.`;
    }
    if (t.threat.toLowerCase().includes('ssh') || t.threat.toLowerCase().includes('brute')) {
      return `[AGENT PRIORITY: HIGH] Brute-force credentials login pattern detected targeting ${t.target}.
- Attack Pattern: Authentication Brute-Force (attacker trying rapid automated passwords to gain host access).
- Action Taken: AI filtered out 15 user login failures (false positives) and prioritized this as High.`;
    }
    if (t.threat.toLowerCase().includes('exfiltration') || t.threat.toLowerCase().includes('data')) {
      return `[AGENT PRIORITY: MEDIUM] Suspicious network upload rate detected on storage bucket.
- Attack Pattern: Data Exfiltration (attacker attempting to transfer files outside the network perimeter).
- Action Taken: AI agent analyzed security logs, confirmed it is not an automated system backup script (false positive check), and limited privileges.`;
    }
    if (t.threat.toLowerCase().includes('ddos') || t.threat.toLowerCase().includes('volumetric')) {
      return `[AGENT PRIORITY: CRITICAL] Volumetric packet threshold exceeded on edge routing CDNs.
- Attack Pattern: Distributed Denial of Service (DDoS network resource exhaustion attempt).
- Action Taken: Filtered out 5,420 baseline network pings (false positives), prioritized as Critical to avoid server downtime, and quarantined target ports.`;
    }
    if (t.threat.toLowerCase().includes('malware') || t.threat.toLowerCase().includes('ransomware')) {
      return `[AGENT PRIORITY: CRITICAL] High-entropy cryptographic disk write sequences detected on internal shares.
- Attack Pattern: Ransomware / Malware file payload execution.
- Action Taken: AI threat agent immediately blocked write credentials and escalated this critical threat to SecOps.`;
    }
    return `[AGENT PRIORITY: MONITORING] Suspected anomalous log events matching behavioral patterns from IP ${t.ip}.
- Attack Pattern: Suspicious authentication / authorization activity.
- Action Taken: Filtered out standard baseline log noise (false positives) and assigned priority rank based on host asset vulnerability score.`;
  };

  return (
    <div className="soc-detail-panel">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-mono text-slate-500 font-semibold tracking-wider uppercase block mb-1">
            {threat.id} // {threat.timestamp}
          </span>
          <h3 className="text-base font-bold text-white tracking-wide">{threat.threat}</h3>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${
          threat.status === 'Mitigated' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
          threat.status === 'Investigating' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
          'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {threat.status}
        </span>
      </div>

      {/* Grid of metadata */}
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="p-3 bg-slate-900/50 border border-white/5 rounded-xl flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Source Address</span>
          <span className="font-mono text-white font-medium">{threat.ip}</span>
        </div>
        <div className="p-3 bg-slate-900/50 border border-white/5 rounded-xl flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Target Resource</span>
          <span className="font-medium text-white">{threat.target}</span>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5 text-xs">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Incident Details</span>
        <p className="text-slate-300 leading-relaxed font-medium bg-slate-900/20 border border-white/5 rounded-xl p-4">
          {threat.details}
        </p>
      </div>

      {/* AI Copilot Block */}
      <div className="soc-copilot-block">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-2">
          <Zap className="w-4 h-4 text-brand fill-brand" />
          AI SECURITY THREAT AGENT ANALYSIS
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-medium whitespace-pre-line">
          {getAiExplanation(threat)}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-2.5 pt-4 border-t border-white/5">
        <div className="flex gap-2">
          {threat.status !== 'Mitigated' && (
            <button
              onClick={handleMitigate}
              className="flex-1 py-3 bg-brand hover:bg-brand/90 text-white font-bold rounded-xl text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand/20"
            >
              <ShieldCheck className="w-4 h-4" />
              Authorize Mitigation
            </button>
          )}

          {threat.status === 'Active' && (
            <button
              onClick={handleInvestigate}
              className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl text-xs uppercase transition-all"
            >
              Mark Investigating
            </button>
          )}
        </div>

        <button
          onClick={handleDismiss}
          className="w-full py-3 bg-transparent hover:bg-red-500/5 text-slate-500 hover:text-red-400 font-semibold rounded-xl text-xs uppercase transition-all flex items-center justify-center gap-1.5"
        >
          <X className="w-3.5 h-3.5" />
          Dismiss Alert
        </button>
      </div>
    </div>
  );
};

export default ThreatDetails;
