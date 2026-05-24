import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useThreats, Threat } from '../context/ThreatContext';
import Sidebar from '../components/Sidebar';
import MetricCards from '../components/MetricCards';
import ThreatQueue from '../components/ThreatQueue';
import ThreatDetails from '../components/ThreatDetails';
import LogTerminal from '../components/LogTerminal';
import ActionTerminal from '../components/ActionTerminal';
import CopilotChat from '../components/CopilotChat';
import { Shield, ShieldAlert, Terminal, MessageSquare, AlertTriangle, X, Menu } from 'lucide-react';

export default function SecurityDashboard() {
  const { user } = useAuth();
  const { threats } = useThreats();
  const [activeTab, setActiveTab] = useState('threats');
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(threats[0] || null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarTabs = [
    { id: 'threats', label: 'Threat Queue', icon: Shield },
    { id: 'terminals', label: 'Security Terminals', icon: Terminal },
    { id: 'copilot', label: 'Triage Copilot', icon: MessageSquare }
  ];

  const activeCriticalAlerts = threats.filter(t => t.severity === 'Critical' && t.status !== 'Mitigated' && t.status !== 'Dismissed');

  return (
    <div className="flex bg-[#020617] text-slate-100 min-h-screen font-sans overflow-hidden">
      {/* Sidebar navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tabs={sidebarTabs} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main dashboard viewport */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* Header toolbar */}
        <header className="px-4 md:px-8 py-4 md:py-5 border-b border-white/5 bg-[#020617]/50 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base md:text-xl font-bold tracking-tight text-white">SOC Command Console</h2>
              <span className="text-[10px] md:text-xs text-slate-500 font-medium">Logged in as {user?.username} // Security Analyst</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
            <span className="hidden sm:inline text-xs text-slate-400 font-semibold tracking-wider font-mono">NODE_US_EAST: ACTIVE</span>
          </div>
        </header>

        {/* Content grid */}
        <main className="flex-1 p-4 md:p-8 flex flex-col gap-4 md:gap-6">
          
          {/* Alarms banner if there are active critical threats */}
          {activeCriticalAlerts.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-semibold select-none animate-pulse">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>CRITICAL ANOMALY ALERT: Volumetric threat signature active on security perimeter. Mitigation recommended.</span>
              </div>
            </div>
          )}

          {/* Metric cards always visible */}
          <MetricCards />

          {/* Tab dynamic views */}
          <div className="flex-1 min-h-[480px]">
            {activeTab === 'threats' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-stretch">
                <div className="lg:col-span-5">
                  <ThreatQueue selectedThreat={selectedThreat} setSelectedThreat={setSelectedThreat} />
                </div>
                <div className="lg:col-span-7">
                  <ThreatDetails threat={selectedThreat} />
                </div>
              </div>
            )}

            {activeTab === 'terminals' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full items-stretch">
                <LogTerminal />
                <ActionTerminal />
              </div>
            )}

            {activeTab === 'copilot' && (
              <div className="max-w-3xl mx-auto h-full">
                <CopilotChat />
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
