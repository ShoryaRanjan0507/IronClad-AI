import React from 'react';
import { useThreats } from '../context/ThreatContext';
import { Shield, ShieldAlert, ShieldCheck, Activity } from 'lucide-react';
import './MetricCards.css';

const MetricCards: React.FC = () => {
  const { metrics } = useThreats();

  const cards = [
    {
      title: 'Global Integrity',
      value: `${metrics.systemIntegrity}%`,
      desc: metrics.systemIntegrity > 85 ? 'System stable' : 'Threat active',
      icon: Shield,
      glow: 'soc-metric-glow-brand',
      iconColor: 'text-brand',
      valColor: 'text-white'
    },
    {
      title: 'Active Threats',
      value: metrics.activeAlerts,
      desc: 'Quarantine active',
      icon: ShieldAlert,
      glow: 'soc-metric-glow-red',
      iconColor: metrics.activeAlerts > 0 ? 'text-red-400' : 'text-slate-400',
      valColor: metrics.activeAlerts > 0 ? 'text-red-400' : 'text-white'
    },
    {
      title: 'Mitigated Incidents',
      value: metrics.mitigatedThreats,
      desc: '100% resolve rate',
      icon: ShieldCheck,
      glow: 'soc-metric-glow-emerald',
      iconColor: 'text-emerald-400',
      valColor: 'text-white'
    },
    {
      title: 'Logs Parsed',
      value: metrics.totalThreats * 142 + 2341,
      desc: 'Edge signals scan',
      icon: Activity,
      glow: 'soc-metric-glow-amber',
      iconColor: 'text-amber-400',
      valColor: 'text-white'
    }
  ];

  return (
    <div className="soc-metric-grid w-full">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div key={i} className={`soc-metric-card ${c.glow}`}>
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{c.title}</span>
              <Icon className={`w-5 h-5 ${c.iconColor}`} />
            </div>
            <div>
              <div className={`text-2xl font-bold tracking-tight ${c.valColor}`}>{c.value}</div>
              <p className="text-[10px] text-slate-400 font-medium mt-1">{c.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricCards;
