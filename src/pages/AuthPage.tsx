import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Mail, Lock, User, ChevronRight, AlertCircle } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'officer'>('officer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      // Simulate auth check
      await login(email, role);
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center px-4 overflow-hidden select-none">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-slate-950/70 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <Link to="/" className="p-3 rounded-2xl bg-brand/10 border border-brand/20 text-brand">
            <Shield className="w-8 h-8" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {isLogin ? 'Access Security Node' : 'Register Secure Asset'}
            </h2>
            <p className="text-sm text-slate-400 mt-1.5 font-medium">
              {isLogin ? 'Enter credentials to authorize session' : 'Create credentials to register access'}
            </p>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Role selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Node Role</label>
            <div className="grid grid-cols-2 gap-2.5 p-1 rounded-xl bg-slate-900 border border-white/5">
              <button
                type="button"
                onClick={() => setRole('officer')}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                  role === 'officer' 
                    ? 'bg-brand text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Security Officer
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                  role === 'admin' 
                    ? 'bg-brand text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                SOC Admin
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@ironclad.ai"
                className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand/50 transition-colors"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Passphrase</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand/50 transition-colors"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-brand hover:bg-brand/90 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Authorizing Node...' : isLogin ? 'Authorize Connection' : 'Register Credentials'}
            {!loading && <ChevronRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="h-px bg-white/5" />

        <div className="text-center text-xs text-slate-500 font-medium">
          {isLogin ? "Need access credentials? " : "Already have credentials? "}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-brand hover:underline font-semibold"
          >
            {isLogin ? 'Register New Asset' : 'Request Access'}
          </button>
        </div>
      </div>
    </div>
  );
}
