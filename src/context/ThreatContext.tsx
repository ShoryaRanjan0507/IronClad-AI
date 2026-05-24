import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Threat {
  id: string;
  threat: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Investigating' | 'Mitigated' | 'Dismissed';
  ip: string;
  target: string;
  details: string;
  timestamp: string;
}

export interface SystemLog {
  id: string;
  text: string;
  type: 'stdout' | 'stderr' | 'info' | 'success' | 'warn';
  timestamp: string;
}

interface ThreatContextType {
  threats: Threat[];
  logs: SystemLog[];
  metrics: {
    totalThreats: number;
    activeAlerts: number;
    mitigatedThreats: number;
    systemIntegrity: number;
  };
  simulateThreat: (type: 'ddos' | 'bruteforce' | 'sqli' | 'malware') => void;
  mitigateThreat: (id: string) => void;
  dismissThreat: (id: string) => void;
  investigateThreat: (id: string) => void;
  addLog: (text: string, type?: SystemLog['type']) => void;
  clearAll: () => void;
}

const ThreatContext = createContext<ThreatContextType | undefined>(undefined);

const initialThreats: Threat[] = [
  {
    id: 'TR-8942',
    threat: 'Anomalous SQL Injection Signature',
    severity: 'Critical',
    status: 'Active',
    ip: '198.51.100.12',
    target: 'API Gateway Subnet',
    details: 'Payload contains recursive UNION SELECT statement targeted at auth database. Blocked at ingress gateway.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toLocaleTimeString()
  },
  {
    id: 'TR-1102',
    threat: 'Brute-force SSH Attempt Block',
    severity: 'High',
    status: 'Investigating',
    ip: '203.0.113.88',
    target: 'Auth Server Pool',
    details: 'More than 45 failed root SSH connections inside a 10s window. Source IP added to global firewall deny list.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toLocaleTimeString()
  },
  {
    id: 'TR-5891',
    threat: 'Unexpected Data Exfiltration Trend',
    severity: 'Medium',
    status: 'Mitigated',
    ip: '192.0.2.215',
    target: 'S3 Asset Buckets',
    details: 'Unusual outbound payload transfer rate detected from static storage assets. Restricting API write token privileges.',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toLocaleTimeString()
  }
];

const initialLogs: SystemLog[] = [
  { id: '1', text: 'Ironclad SOC system initialized successfully.', type: 'success', timestamp: new Date().toLocaleTimeString() },
  { id: '2', text: 'Connecting to global network defense grid...', type: 'info', timestamp: new Date().toLocaleTimeString() },
  { id: '3', text: 'Neural network threat predictor: Online (accuracy 99.85%)', type: 'success', timestamp: new Date().toLocaleTimeString() },
  { id: '4', text: 'Ingress traffic scanner: ACTIVE.', type: 'info', timestamp: new Date().toLocaleTimeString() }
];

export const ThreatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [threats, setThreats] = useState<Threat[]>(initialThreats);
  const [logs, setLogs] = useState<SystemLog[]>(initialLogs);

  useEffect(() => {
    const benignLogs = [
      { text: "Ingress connection: Host 185.220.101.4 connected to node edge.", type: "info" as const },
      { text: "Auth Event: Lead_administrator verified security session certificate.", type: "success" as const },
      { text: "AI Threat Agent: Analyzed system access token. Verdict: Secure.", type: "success" as const },
      { text: "Authentication: Login request for user 'Officer_vance' from IP 192.168.1.10.", type: "info" as const },
      { text: "AI Threat Agent: Ingress sweep verified. Ignored 4 duplicate login attempts (benign noise).", type: "success" as const },
      { text: "Log Scanner: Network routing packet entropy within baseline standard limits.", type: "info" as const },
      { text: "AI Threat Agent: Analyzed port scan activity on gateway. Marked as benign false positive.", type: "success" as const },
      { text: "Firewall: Port forwarding rules refreshed for local sandboxes.", type: "info" as const }
    ];

    const interval = setInterval(() => {
      const randomLog = benignLogs[Math.floor(Math.random() * benignLogs.length)];
      setLogs(prev => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          text: randomLog.text,
          type: randomLog.type,
          timestamp: new Date().toLocaleTimeString()
        }
      ].slice(-100));
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const activeAlerts = threats.filter(t => t.status === 'Active' || t.status === 'Investigating').length;
  const mitigatedThreats = threats.filter(t => t.status === 'Mitigated').length;
  const totalThreats = threats.length;
  const systemIntegrity = Math.max(0, 100 - activeAlerts * 15);

  const addLog = (text: string, type: SystemLog['type'] = 'info') => {
    setLogs(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        text,
        type,
        timestamp: new Date().toLocaleTimeString()
      }
    ].slice(-100)); // Keep last 100 logs
  };

  const simulateThreat = (type: 'ddos' | 'bruteforce' | 'sqli' | 'malware') => {
    const ids = 'TR-' + Math.floor(1000 + Math.random() * 9000);
    const ip = `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    let threatName = '';
    let severity: Threat['severity'] = 'Medium';
    let target = '';
    let details = '';

    switch (type) {
      case 'ddos':
        threatName = 'Volumetric DDoS Attack Vector';
        severity = 'Critical';
        target = 'Edge Cloudflare CDN';
        details = 'Incoming connection threshold exceeded on port 443. High request amplification detected.';
        break;
      case 'bruteforce':
        threatName = 'Brute-force SSH Access Attempt';
        severity = 'High';
        target = 'Corporate Database Subnet';
        details = 'Rapid failure signature matching administrative log attempts detected.';
        break;
      case 'sqli':
        threatName = 'Web App Firewall SQL Bypass attempt';
        severity = 'High';
        target = 'Application Load Balancer';
        details = 'Invalid SQL arguments parsed in JSON request body headers.';
        break;
      case 'malware':
        threatName = 'Ransomware Cryptolocker file write';
        severity = 'Critical';
        target = 'Internal File Shares';
        details = 'Unusual file entropy modification rate matching ransomware signatures.';
        break;
    }

    const newThreat: Threat = {
      id: ids,
      threat: threatName,
      severity,
      status: 'Active',
      ip,
      target,
      details,
      timestamp: new Date().toLocaleTimeString()
    };

    setThreats(prev => [newThreat, ...prev]);
    addLog(`ALERT: ${threatName} detected targeting ${target} from IP ${ip}!`, 'warn');
  };

  const mitigateThreat = (id: string) => {
    setThreats(prev => prev.map(t => {
      if (t.id === id) {
        addLog(`MITIGATION SUCCESSFUL: Isolated target asset. Blocked IP subnet: ${t.ip}`, 'success');
        return { ...t, status: 'Mitigated' };
      }
      return t;
    }));
  };

  const investigateThreat = (id: string) => {
    setThreats(prev => prev.map(t => {
      if (t.id === id) {
        addLog(`INVESTIGATION TRIGGERED: SOC operator examining threat ${id}`, 'info');
        return { ...t, status: 'Investigating' };
      }
      return t;
    }));
  };

  const dismissThreat = (id: string) => {
    setThreats(prev => prev.map(t => {
      if (t.id === id) {
        addLog(`DISMISSAL: Threat ${id} marked as resolved/false positive.`, 'info');
        return { ...t, status: 'Dismissed' };
      }
      return t;
    }));
  };

  const clearAll = () => {
    setThreats([]);
    setLogs([]);
    addLog('All databases flushed. System monitoring reset.', 'info');
  };

  return (
    <ThreatContext.Provider value={{
      threats,
      logs,
      metrics: { totalThreats, activeAlerts, mitigatedThreats, systemIntegrity },
      simulateThreat,
      mitigateThreat,
      dismissThreat,
      investigateThreat,
      addLog,
      clearAll
    }}>
      {children}
    </ThreatContext.Provider>
  );
};

export const useThreats = () => {
  const context = useContext(ThreatContext);
  if (context === undefined) {
    throw new Error('useThreats must be used within a ThreatProvider');
  }
  return context;
};
