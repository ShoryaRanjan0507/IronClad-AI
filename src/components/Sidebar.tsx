import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Shield, 
  Terminal, 
  Activity, 
  Sliders, 
  Users, 
  FileSpreadsheet, 
  LogOut, 
  UserCheck, 
  BarChart3, 
  User as UserIcon,
  MessageSquare,
  Home,
  X
} from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { id: string; label: string; icon: React.ComponentType<any> }[];
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, tabs, isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showSignOut, setShowSignOut] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile drawer backdrop */}
      {isOpen && onClose && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <div className={`soc-sidebar w-64 h-screen flex flex-col justify-between p-6 shrink-0 select-none ${isOpen ? 'open' : ''}`}>
        <div className="flex flex-col gap-6">
          {/* Brand Header & Mobile Close button at the very top */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand/10 border border-brand/20 rounded-xl text-brand">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-white tracking-wider text-sm">IRONCLAD SOC</h1>
                <span className="text-[10px] text-slate-500 font-mono font-semibold uppercase">NODE: ONLINE</span>
              </div>
            </div>
            {onClose && (
              <button 
                onClick={onClose}
                className="lg:hidden p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* HOME button link directly below Brand Header */}
          <Link 
            to="/" 
            onClick={onClose}
            className="flex items-center gap-2.5 text-xs font-bold text-slate-400 hover:text-white transition-all duration-200 group pb-4 border-b border-white/5"
          >
            <Home className="w-4.5 h-4.5 text-slate-500 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
            <span>HOME</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex flex-col gap-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (onClose) onClose();
                  }}
                  className={`soc-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* User details & collapsible Sign out */}
        {user && (
          <div className="flex flex-col gap-2 border-t border-white/5 pt-6">
            <div 
              onClick={() => setShowSignOut(!showSignOut)}
              className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-xl border border-transparent hover:border-white/5 transition-all"
            >
              <div className="soc-avatar-glow w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-900 border border-white/10">
                <img src={user.avatar} alt="User avatar" className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-semibold text-slate-200 truncate">{user.username}</div>
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <UserCheck className="w-3 h-3 text-brand" />
                  {user.role}
                </div>
              </div>
            </div>
            
            {showSignOut && (
              <button
                onClick={handleLogout}
                className="w-full mt-2 py-2 px-4 rounded-xl border border-red-500/10 hover:border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
