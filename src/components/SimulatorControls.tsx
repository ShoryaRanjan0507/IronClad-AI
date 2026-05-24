import React from 'react';
import { useThreats } from '../context/ThreatContext';
import { ShieldAlert, Zap, Globe, Lock, Play } from 'lucide-react';
import './SimulatorControls.css';

const SimulatorControls: React.FC = () => {
  const { simulateThreat, addLog } = useThreats();

  const handleSimulate = (type: 'ddos' | 'bruteforce' | 'sqli' | 'malware') => {
    simulateThreat(type);
    addLog(`SIMULATION INITIATED: Triggered manual attack injection: ${type.toUpperCase()}`, 'warn');
  };

  const simulationScenarios = [
    {
      type: 'ddos' as const,
      name: 'Volumetric DDoS Attack',
      desc: 'Simulates a massive Layer 7 flood targeting public endpoints. Generates Critical alerts and impacts integrity score.',
      severity: 'Critical',
      icon: Globe,
      style: 'sim-btn-critical'
    },
    {
      type: 'malware' as const,
      name: 'Ransomware Encryption Signature',
      desc: 'Simulates anomalous write access on static file servers matching lock signature behavior. Generates Critical alerts.',
      severity: 'Critical',
      icon: Lock,
      style: 'sim-btn-critical'
    },
    {
      type: 'sqli' as const,
      name: 'SQL Injection API Bypass',
      desc: 'Simulates target access attempts to credentials. Generates High priority events with automated ingress blocks.',
      severity: 'High',
      icon: ShieldAlert,
      style: 'sim-btn-high'
    },
    {
      type: 'bruteforce' as const,
      name: 'SSH Auth Brute-Force Vector',
      desc: 'Simulates rapid failed root administrative logins from blacklisted subnet pools. Generates High alerts.',
      severity: 'High',
      icon: Zap,
      style: 'sim-btn-high'
    }
  ];

  return (
    <div className="soc-simulator-card flex flex-col gap-6">
      <div className="border-b border-white/5 pb-4 select-none">
        <h3 className="text-sm font-bold text-white tracking-wider uppercase">SECURE THREAT SIMULATOR</h3>
        <p className="text-[10px] text-slate-500 font-medium mt-0.5">Inject synthetic incidents into live database grids to test network policies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
        {simulationScenarios.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="p-5 bg-slate-900/30 border border-white/5 rounded-2xl flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4.5 h-4.5 text-slate-400" />
                    <span className="text-xs font-bold text-slate-200 tracking-wide">{s.name}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                    s.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-500/15' : 'bg-amber-500/10 text-amber-400 border border-amber-500/15'
                  }`}>
                    {s.severity}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{s.desc}</p>
              </div>

              <button
                onClick={() => handleSimulate(s.type)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 ${s.style}`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Inject Incident Signal
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimulatorControls;
