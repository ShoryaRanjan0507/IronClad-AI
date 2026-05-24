import React, { useState } from 'react';
import { UserCheck, ShieldAlert, Plus, Shield, User as UserIcon, Trash } from 'lucide-react';
import './UserManagement.css';

interface SOCUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'officer';
  status: 'active' | 'suspended';
  createdAt: string;
}

const initialUsers: SOCUser[] = [
  { id: '1', username: 'Lead_administrator', email: 'admin@ironclad.ai', role: 'admin', status: 'active', createdAt: '2026-05-10' },
  { id: '2', username: 'Officer_vance', email: 'vance@ironclad.ai', role: 'officer', status: 'active', createdAt: '2026-05-12' },
  { id: '3', username: 'Analyst_hendrix', email: 'hendrix@ironclad.ai', role: 'officer', status: 'active', createdAt: '2026-05-15' },
  { id: '4', username: 'Suspended_operator', email: 'inactive@ironclad.ai', role: 'officer', status: 'suspended', createdAt: '2026-05-20' }
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<SOCUser[]>(initialUsers);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'officer'>('officer');
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
      }
      return u;
    }));
  };

  const toggleRole = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, role: u.role === 'admin' ? 'officer' : 'admin' };
      }
      return u;
    }));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newEmail) return;

    const newUser: SOCUser = {
      id: Math.random().toString(36).substring(2, 9),
      username: newUsername,
      email: newEmail,
      role: newRole,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [...prev, newUser]);
    setNewUsername('');
    setNewEmail('');
    setNewRole('officer');
    setShowAddForm(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center select-none">
        <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase">SOC USER REGISTRY</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-brand hover:bg-brand/90 text-white font-bold rounded-xl text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-md shadow-brand/10"
        >
          <Plus className="w-4 h-4" />
          Register Operator
        </button>
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <form onSubmit={handleAddUser} className="p-5 bg-slate-900/50 border border-white/5 rounded-2xl flex flex-col gap-4 max-w-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Username</label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Analyst_Smith"
                className="bg-slate-950 border border-white/5 rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand/40"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="smith@ironclad.ai"
                className="bg-slate-950 border border-white/5 rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand/40"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Authority</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setNewRole('officer')}
                  className={`py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    newRole === 'officer' ? 'bg-brand text-white' : 'bg-slate-950 text-slate-500 border border-white/5'
                  }`}
                >
                  Officer
                </button>
                <button
                  type="button"
                  onClick={() => setNewRole('admin')}
                  className={`py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    newRole === 'admin' ? 'bg-brand text-white' : 'bg-slate-950 text-slate-500 border border-white/5'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="py-2 px-5 bg-brand text-white font-bold rounded-xl text-xs uppercase"
            >
              Register Operator
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="soc-table-wrapper select-none">
        <table className="soc-table">
          <thead>
            <tr>
              <th>Operator</th>
              <th>Authority</th>
              <th>Status</th>
              <th>Registry Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 overflow-hidden flex items-center justify-center text-brand font-semibold text-xs">
                      {u.username.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-200">{u.username}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 w-fit border ${
                    u.role === 'admin' 
                      ? 'bg-brand/10 border-brand/20 text-brand' 
                      : 'bg-slate-800/40 border-white/5 text-slate-400'
                  }`}>
                    {u.role === 'admin' ? <Shield className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                    {u.role}
                  </span>
                </td>
                <td>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                    u.status === 'active' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td className="font-mono text-slate-500 text-xs">{u.createdAt}</td>
                <td>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => toggleRole(u.id)}
                      className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg text-[10px] uppercase font-semibold transition-all"
                    >
                      Change Role
                    </button>
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] uppercase font-semibold transition-all ${
                        u.status === 'active' 
                          ? 'bg-red-500/5 hover:bg-red-500/10 text-red-400 border border-red-500/10'
                          : 'bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 border border-emerald-500/10'
                      }`}
                    >
                      {u.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="p-1.5 bg-transparent hover:bg-white/5 text-slate-500 hover:text-red-400 rounded-lg transition-all"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
