import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import UserManagement from '../components/UserManagement';
import AuditLog from '../components/AuditLog';
import AnalyticsCharts from '../components/AnalyticsCharts';
import SimulatorControls from '../components/SimulatorControls';
import ProfileModal from '../components/ProfileModal';
import { Users, FileSpreadsheet, BarChart3, Sliders, Settings, Lock, Menu } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarTabs = [
    { id: 'users', label: 'User Registry', icon: Users },
    { id: 'audit', label: 'Audit Logs', icon: FileSpreadsheet },
    { id: 'analytics', label: 'Threat Analytics', icon: BarChart3 },
    { id: 'simulator', label: 'Threat Simulator', icon: Sliders }
  ];

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
              <h2 className="text-base md:text-xl font-bold tracking-tight text-white">SOC Admin Control Tower</h2>
              <span className="text-[10px] md:text-xs text-slate-500 font-medium">Logged in as {user?.username} // Head Administrator</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setProfileOpen(true)}
              className="p-2 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-white/15 transition-all flex items-center gap-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-wider"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </button>
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-brand" />
              <span className="hidden sm:inline text-xs text-slate-400 font-semibold tracking-wider font-mono">ROOT_LEVEL: GRANTED</span>
            </div>
          </div>
        </header>

        {/* Content grid */}
        <main className="flex-1 p-4 md:p-8 flex flex-col gap-4 md:gap-6">
          
          {/* Tab dynamic views */}
          <div className="flex-1">
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'audit' && <AuditLog />}
            {activeTab === 'analytics' && <AnalyticsCharts />}
            {activeTab === 'simulator' && <SimulatorControls />}
          </div>

        </main>
      </div>

      {/* Profile modal */}
      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
}
