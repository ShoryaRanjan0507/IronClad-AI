import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User, Mail, Shield, Check, Key } from 'lucide-react';
import './ProfileModal.css';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(username, email);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText('ic_live_73a90d81f1e948c2a49b6b71f92e40');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay">
      <div className="modal-content w-full max-w-md p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center select-none border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-brand" />
            <span className="text-xs font-bold text-white tracking-wider uppercase">Operator Profile Settings</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Avatar and static info */}
          <div className="flex items-center gap-4 bg-slate-900/40 border border-white/5 rounded-2xl p-4 select-none">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 bg-slate-950">
              <img src={user.avatar} alt="User avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Access Node Credentials</div>
              <div className="text-[10px] text-slate-400 font-mono mt-1 uppercase flex items-center gap-1.5 font-semibold">
                <Shield className="w-3.5 h-3.5 text-brand" />
                ROLE Authority: {user.role}
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Operator ID</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-slate-950 border border-white/5 rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand/40"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Secure Mailbox</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-950 border border-white/5 rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand/40"
              required
            />
          </div>

          {/* Key configuration */}
          <div className="flex flex-col gap-1.5 select-none">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Subnet Security Token</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value="ic_live_73a90d81f1e948..."
                className="flex-1 bg-slate-950 border border-white/5 rounded-xl py-2.5 px-3 text-xs text-slate-400 focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={copyApiKey}
                className="px-3.5 bg-slate-900 border border-white/5 text-slate-300 font-semibold rounded-xl text-xs uppercase hover:bg-slate-800 transition-colors"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-white/5 select-none">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl text-slate-400 hover:text-white font-semibold text-xs uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 bg-brand hover:bg-brand/90 text-white font-bold rounded-xl text-xs uppercase transition-colors flex items-center gap-1.5"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved Changes
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
