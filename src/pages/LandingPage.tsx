import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Terminal as TerminalIcon, 
  Cpu, 
  Activity, 
  ChevronRight, 
  Play, 
  Zap, 
  Lock, 
  Globe, 
  Check, 
  Layers, 
  Clock,
  Menu,
  X,
  Database,
  Eye,
  Sliders,
  AlertTriangle,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// SVG Filters
const NoiseFilter = () => (
  <svg className="sr-only" width="0" height="0">
    <filter id="c3-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.07 0" />
      <feComposite operator="in" in2="SourceGraphic" />
    </filter>
  </svg>
);

// Logo Mark SVG
const ShieldLogo = () => (
  <svg className="w-8 h-8 text-brand" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" fill="#3D81E3" className="animate-pulse" />
  </svg>
);

export default function LandingPage() {
  const { isAuthenticated, user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mockActiveAlert, setMockActiveAlert] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  // Clock for macOS style Menu Bar
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
      };
      setCurrentTime(date.toLocaleDateString('en-US', options).replace(',', ''));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const pricingTiers = [
    {
      name: 'Standard',
      price: isYearly ? '79' : '99',
      desc: 'Proactive threat defense and automated triage for growing teams and standard networks.',
      features: [
        'Real-time threat monitoring (up to 50 assets)',
        'AI Triage Copilot with 5,000 queries/mo',
        'Automatic firewall rules & subnet isolation',
        'Audit logs with 30-day retention',
        'Admin simulator & alert testing controls',
        'Standard dashboard access & reporting'
      ],
      btnText: 'Deploy Standard Node',
      isPro: false
    },
    {
      name: 'Enterprise Neural',
      price: isYearly ? '239' : '299',
      desc: 'Full-scale automated defense utilizing local regression neural nets and customized models.',
      features: [
        'Infinite asset monitoring & scanning',
        'Unlimited AI Triage Copilot queries',
        'Custom local YOLOv8 neural network fine-tuning',
        'Automatic cross-subnet traffic quarantine',
        'Unlimited audit logs & system analytics',
        'Dedicated SOC support & custom alerts'
      ],
      btnText: 'Deploy Enterprise Shield',
      isPro: true
    },
    {
      name: 'Developer Environment',
      price: '0',
      desc: 'Full access to API keys, simulator panel, and local test environment settings.',
      features: [
        'Local host threat monitoring (1 asset)',
        'Simulator control panel access',
        'Basic threat queue & metric cards',
        'Console command input testing',
        '100 Copilot queries/mo',
        'Developer Documentation Access'
      ],
      btnText: 'Launch Free Environment',
      isPro: false
    }
  ];

  const testimonials = [
    {
      quote: "Ironclad AI completely shifted our defensive response. Threats that used to take our SecOps team hours to trace and quarantine are now mitigated automatically in seconds by the local regression net.",
      author: "MAYA HENDRIX",
      role: "HEAD OF SECURITY, COHERE",
      metric: "99.8%",
      metricDesc: "AUTO-MITIGATION RATE"
    },
    {
      quote: "The Copilot Chat has become our main war-room tool. We can feed firewall dump data directly into the console, ask it to identify anomalies, and execute block actions on the fly.",
      author: "LEONARD VANCE",
      role: "VP OF INFRASTRUCTURE, LUNAR",
      metric: "4.2s",
      metricDesc: "AVERAGE RESPONSE TIME"
    },
    {
      quote: "The interface alone sold us, but the intelligence keeps us secured. The liquid-glass interface gives our security operations center an extremely readable overview of live incidents without any noise.",
      author: "SARAH CHEN",
      role: "CHIEF INFORMATION SECURITY OFFICER, RETOOL",
      metric: "10x",
      metricDesc: "TRIAGE FREQUENCY"
    }
  ];

  const mockThreats = [
    {
      id: 'TR-8942',
      target: 'API Gateway Subnet',
      threat: 'Anomalous SQL Injection Signature',
      status: 'Quarantined',
      severity: 'Critical',
      ip: '198.51.100.12',
      details: 'Payload contains recursive UNION SELECT statement targeted at auth database. Blocked at ingress gateway.'
    },
    {
      id: 'TR-1102',
      target: 'Auth Server Pool',
      threat: 'Brute-force SSH Attempt Block',
      status: 'Mitigated',
      severity: 'High',
      ip: '203.0.113.88',
      details: 'More than 45 failed root SSH connections inside a 10s window. Source IP added to global firewall deny list.'
    },
    {
      id: 'TR-5891',
      target: 'S3 Asset Buckets',
      threat: 'Unexpected Data Exfiltration Trend',
      status: 'Investigating',
      severity: 'Medium',
      ip: '192.0.2.215',
      details: 'Unusual outbound payload transfer rate detected from static storage assets. Restricting API write token privileges.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden font-sans antialiased selection:bg-brand/30">
      <NoiseFilter />
      
      {/* Background Looping Cinematic Video */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none opacity-40">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute min-w-full min-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
        >
          <source 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-[#020617]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05)_0%,rgba(2,6,23,0.95)_75%)]" />
      </div>

      {/* Grid Guide Overlay (Desktop only) */}
      <div className="hidden lg:block fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-8 pointer-events-none z-10 opacity-10">
        <div className="w-full h-full border-x border-slate-700/50 flex justify-between">
          <div className="w-px h-full bg-slate-700/50" />
          <div className="w-px h-full bg-slate-700/50" />
          <div className="w-px h-full bg-slate-700/50" />
        </div>
      </div>

      <div className="relative z-20">
        {/* Section 1: Navigation */}
        <nav className="sticky top-0 w-full backdrop-blur-md border-b border-white/5 z-50 bg-[#020617]/50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <ShieldLogo />
              <span className="font-semibold tracking-wider text-xl bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">
                IRONCLAD AI
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {['Features', 'Triage System', 'Testimonials', 'Pricing'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4 relative">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2.5 p-1 pr-3.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                      <img src={user.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-semibold text-slate-300">{user.username}</span>
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2.5 w-52 bg-slate-950/95 border border-white/10 rounded-2xl p-2.5 shadow-2xl flex flex-col gap-1 z-50 backdrop-blur-xl"
                      >
                        <Link 
                          to={user.role === 'admin' ? '/admin' : '/dashboard'}
                          className="px-3.5 py-2.5 rounded-xl hover:bg-white/5 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-2 text-left"
                        >
                          <Shield className="w-4 h-4 text-brand" />
                          Security Console
                        </Link>
                        <button
                          onClick={() => {
                            alert('Help and Support portal is active. Please reach out to SecOps support at support@ironclad.ai');
                            setUserMenuOpen(false);
                          }}
                          className="px-3.5 py-2.5 rounded-xl hover:bg-white/5 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-2 text-left w-full"
                        >
                          <HelpCircle className="w-4 h-4 text-cyan-400" />
                          Help & Support
                        </button>
                        <button
                          onClick={handleLogout}
                          className="px-3.5 py-2.5 rounded-xl hover:bg-red-500/10 text-xs font-semibold text-red-400 hover:text-red-300 transition-all flex items-center gap-2 text-left w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link 
                    to="/auth" 
                    className="px-4 py-2 text-sm font-semibold text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300"
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/auth" 
                    className="px-5 py-2 text-sm font-semibold text-black bg-white hover:bg-slate-200 rounded-full shadow-lg hover:shadow-white/10 transition-all duration-300 flex items-center gap-2 group"
                  >
                    Launch Console
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Icon */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden text-slate-300 hover:text-white p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-b border-white/5 bg-[#020617]/90 px-6 py-4 flex flex-col gap-4"
              >
                {['Features', 'Triage System', 'Testimonials', 'Pricing'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base text-slate-400 hover:text-white"
                  >
                    {item}
                  </a>
                ))}
                <div className="h-px bg-white/5 my-2" />
                <div className="flex gap-4">
                  {isAuthenticated && user ? (
                    <div className="flex flex-col gap-2 w-full">
                      <Link 
                        to={user.role === 'admin' ? '/admin' : '/dashboard'}
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2.5 text-center text-sm font-semibold bg-white text-black rounded-full"
                      >
                        Security Console
                      </Link>
                      <button 
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="py-2.5 text-center text-sm font-semibold border border-red-500/20 text-red-400 rounded-full bg-red-500/5"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link 
                        to="/auth" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex-1 py-2 text-center text-sm font-semibold border border-white/10 rounded-full text-white/90 hover:bg-white/5"
                      >
                        Log In
                      </Link>
                      <Link 
                        to="/auth" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex-1 py-2 text-center text-sm font-semibold bg-white text-black rounded-full"
                      >
                        Launch Console
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Section 2: Hero */}
        <section className="relative pt-24 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-8 text-xs font-semibold tracking-wider text-brand uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            AI-Native Cyber Defense Node
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-5xl mb-8 leading-tight">
            Threat monitoring.<br />
            <span 
              className="bg-gradient-to-r from-brand via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-shiny"
              style={{
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Revitalized.
            </span>
          </h1>

          {/* Explainer Paragraph */}
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mb-12 font-medium leading-relaxed">
            Ironclad AI leverages state-of-the-art predictive neural networks and computer vision to analyze, triage, and defend against security hazards in real-time. Protect your infrastructure with automated subnet isolation and instant incident summaries.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
            <Link 
              to={isAuthenticated && user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/auth'} 
              className="w-full sm:w-auto px-8 py-4 bg-brand hover:bg-brand/90 text-white font-semibold rounded-full shadow-lg shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Shield className="w-5 h-5" />
              Deploy Threat Terminal
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#triage-system" 
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <TerminalIcon className="w-5 h-5 text-slate-400" />
              Explore Testing Environment
            </a>
          </div>
        </section>

        {/* Section 3 & 4: macOS Menu Bar Strip + Console Mockup */}
        <section id="features" className="max-w-6xl mx-auto px-6 mb-32">
          {/* macOS Menu Bar Strip */}
          <div className="w-full bg-[#0d1527] border border-white/10 rounded-t-xl px-4 py-2 flex items-center justify-between text-xs text-slate-400 font-medium select-none shadow-2xl">
            <div className="flex items-center gap-4">
              <ShieldLogo />
              <span className="font-bold text-white">Ironclad Console</span>
              <span className="hidden sm:inline hover:text-white cursor-pointer">File</span>
              <span className="hidden sm:inline hover:text-white cursor-pointer">Edit</span>
              <span className="hidden sm:inline hover:text-white cursor-pointer">View</span>
              <span className="hidden sm:inline hover:text-white cursor-pointer">Monitor</span>
              <span className="hidden sm:inline hover:text-white cursor-pointer">Triage</span>
              <span className="hidden sm:inline hover:text-white cursor-pointer">System</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
              <span className="hidden sm:inline text-slate-500">Node Local: OK</span>
              <span>{currentTime || 'Loading console clock...'}</span>
            </div>
          </div>

          {/* Console Mockup body (3-pane layout) */}
          <div className="w-full bg-[#030712]/95 border-x border-b border-white/10 rounded-b-xl min-h-[500px] flex flex-col md:flex-row overflow-hidden shadow-2xl backdrop-blur-xl">
            
            {/* Sidebar navigation */}
            <div className="w-full md:w-56 border-r border-white/5 p-4 flex flex-col gap-6 bg-[#030712]/50">
              <div className="flex items-center gap-3 px-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_4px_#10b981]" />
                <span className="text-xs uppercase tracking-widest font-semibold text-slate-400">ACTIVE SOC LAYER</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-medium text-sm">
                  <Activity className="w-4 h-4 text-brand" />
                  Threat Queue
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 text-sm hover:bg-white/5 cursor-pointer">
                  <TerminalIcon className="w-4 h-4" />
                  Action logs
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 text-sm hover:bg-white/5 cursor-pointer">
                  <Cpu className="w-4 h-4" />
                  Neural Estimator
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 text-sm hover:bg-white/5 cursor-pointer">
                  <Sliders className="w-4 h-4" />
                  SOC Simulator
                </div>
              </div>

              {/* Status meter */}
              <div className="mt-auto p-3.5 rounded-xl bg-slate-950/80 border border-white/5 flex flex-col gap-3">
                <div className="text-xs font-semibold text-slate-500 uppercase">SYS MONITOR</div>
                <div className="flex justify-between items-center text-xs">
                  <span>Threat Level</span>
                  <span className="text-emerald-400 font-medium">STABLE</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-1/4 h-full bg-emerald-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* List panel */}
            <div className="w-full md:w-80 border-r border-white/5 flex flex-col">
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#040a17]/50">
                <span className="text-xs font-bold text-slate-400 tracking-wider">INCIDENTS</span>
                <span className="px-2 py-0.5 rounded bg-brand/20 border border-brand/30 text-[10px] text-brand font-semibold">
                  3 ACTIVE
                </span>
              </div>
              <div className="flex-1 divide-y divide-white/5 overflow-y-auto">
                {mockThreats.map((t, idx) => (
                  <div 
                    key={t.id} 
                    onClick={() => setMockActiveAlert(idx)}
                    className={`p-4 flex flex-col gap-2.5 cursor-pointer transition-colors ${
                      mockActiveAlert === idx ? 'bg-brand/10 border-l-2 border-brand' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-slate-500">{t.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        t.severity === 'Critical' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                        t.severity === 'High' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                        'bg-blue-500/10 border-blue-500/20 text-blue-400'
                      }`}>
                        {t.severity}
                      </span>
                    </div>
                    <div className="font-semibold text-sm text-slate-200 tracking-wide line-clamp-1">{t.threat}</div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{t.target}</span>
                      <span className="font-mono">{t.ip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Pane & Chatbot Copilot */}
            <div className="flex-1 p-6 flex flex-col gap-6 bg-[#020613]/80">
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div>
                  <div className="text-xs text-slate-500 font-mono mb-1">{mockThreats[mockActiveAlert].id}</div>
                  <h3 className="text-lg font-bold text-slate-200 tracking-wide">{mockThreats[mockActiveAlert].threat}</h3>
                </div>
                <span className="px-3 py-1 rounded bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-xs font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  {mockThreats[mockActiveAlert].status}
                </span>
              </div>

              {/* Liquid-glass Copilot Sparkle Summary block */}
              <div className="liquid-glass rounded-2xl p-5 border border-white/10 flex flex-col gap-3 shadow-inner">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
                  AI SECURITY THREAT AGENT ANALYSIS
                </div>
                <div className="text-xs text-slate-300 leading-relaxed font-medium">
                  {mockActiveAlert === 0 && (
                    <div className="flex flex-col gap-1 text-left">
                      <span className="text-amber-400 font-bold">[AGENT PRIORITY: HIGH]</span>
                      <span><strong>Attack Pattern:</strong> SQL Injection (attacker running commands to bypass authentication tables).</span>
                      <span><strong>Action:</strong> Filtered 230 normal security heartbeat requests (false positives) and prioritized threat.</span>
                    </div>
                  )}
                  {mockActiveAlert === 1 && (
                    <div className="flex flex-col gap-1 text-left">
                      <span className="text-amber-400 font-bold">[AGENT PRIORITY: HIGH]</span>
                      <span><strong>Attack Pattern:</strong> SSH Brute-Force (attacker trying rapid credentials to compromise command-line host).</span>
                      <span><strong>Action:</strong> Filtered 15 baseline user login failures (false positives) and quarantined source IP.</span>
                    </div>
                  )}
                  {mockActiveAlert === 2 && (
                    <div className="flex flex-col gap-1 text-left">
                      <span className="text-emerald-400 font-bold">[AGENT PRIORITY: MEDIUM]</span>
                      <span><strong>Attack Pattern:</strong> Suspicious Outbound Transfer (possible exfiltration of static storage files).</span>
                      <span><strong>Action:</strong> Verified baseline scheduled system backups (false positive validation) and restricted tokens.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Network payload terminal block */}
              <div className="flex-1 bg-black/70 border border-white/5 rounded-xl p-4 font-mono text-xs text-emerald-400 flex flex-col gap-2 shadow-inner">
                <div className="text-slate-500 flex justify-between border-b border-white/5 pb-2 mb-2 select-none">
                  <span>LOG OUTPUT SIGNAL — STDOUT</span>
                  <span>IP: {mockThreats[mockActiveAlert].ip}</span>
                </div>
                <div>[04:22:15] INGRESS DISPATCH: Threat isolated to virtual sandbox environment.</div>
                <div>[04:22:16] COGNITIVE NEURAL NET: Analyzed SQL syntax threat probability: 98.4%.</div>
                <div>[04:22:17] AUTO-DISPATCH ACTIVE: Firewall policies updated for subnets: [API-GW-0].</div>
                <div className="animate-pulse">[04:22:18] Waiting for manual operator action... _</div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 5: Feature Triage */}
        <section id="triage-system" className="max-w-7xl mx-auto px-6 mb-32 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                AUTOMATED DISPATCH SYSTEM
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Triage and counter threats without human latency.
              </h2>
              <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed">
                Ironclad AI intercepts suspicious network signals and instantly dispatches filters. Our machine-learning estimator forecasts threat vectors based on attack patterns, automatically configuring firewall blocks.
              </p>
              
              <div className="flex flex-col gap-4 w-full">
                {[
                  { icon: Lock, title: "Zero Trust Automation", desc: "Instantly locks down unauthorized subnets and invalid active access keys." },
                  { icon: Globe, title: "Edge Deployment", desc: "Quarantine policies propagate automatically to edge CDNs in less than 3 seconds." },
                  { icon: Database, title: "Immutable Audit Logs", desc: "Every defensive trigger, automated sandbox, and admin update is recorded cryptographically." }
                ].map((f, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-brand">
                      <f.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{f.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right liquid-glass triage card */}
            <div className="liquid-glass rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <span className="font-semibold text-white tracking-wide text-sm">LIVE SYSTEM METRICS</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">ESTIMATOR NODE #4812</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Active Connections", val: "14,892", delta: "+4.2%", stat: "dot-active" },
                  { label: "Alert Triage Frequency", val: "0.24ms", delta: "-8.4%", stat: "dot-active" },
                  { label: "Critical Alerts", val: "0", delta: "0", stat: "dot-active" },
                  { label: "Neural Network Confidence", val: "99.85%", delta: "+0.1%", stat: "dot-active" }
                ].map((s, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#030712]/50 border border-white/5 flex flex-col gap-2">
                    <span className="text-xs text-slate-500 font-medium">{s.label}</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-bold text-white tracking-tight">{s.val}</span>
                      <span className={`text-[10px] font-mono font-semibold ${
                        s.delta.startsWith('+') ? 'text-emerald-400' : s.delta === '0' ? 'text-slate-400' : 'text-emerald-400'
                      }`}>{s.delta}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live activity graphic */}
              <div className="h-28 bg-slate-950/80 border border-white/5 rounded-2xl p-4 flex flex-col justify-between overflow-hidden shadow-inner select-none">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Real-Time Incident Stream</span>
                <div className="flex items-end gap-1.5 h-16 w-full">
                  {[20, 45, 15, 30, 60, 40, 25, 35, 75, 50, 65, 80, 45, 90, 30, 55, 40, 60, 20, 45, 15, 30, 60, 40].map((h, i) => (
                    <div 
                      key={i} 
                      style={{ height: `${h}%` }}
                      className={`flex-1 rounded-t-sm transition-all duration-300 ${
                        h > 70 ? 'bg-red-400/80 shadow-[0_0_4px_rgba(239,68,68,0.5)]' :
                        h > 50 ? 'bg-amber-400/80 shadow-[0_0_4px_rgba(245,158,11,0.5)]' :
                        'bg-brand/80 shadow-[0_0_4px_rgba(61,129,227,0.5)]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Logo Cloud */}
        <section className="border-y border-white/5 py-12 bg-black/10 select-none mb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-xs uppercase tracking-widest font-semibold text-slate-500 mb-8">
              SECURING DEPLOYED SERVICES AT SCALE
            </p>
            <div className="logo-marquee-container opacity-80">
              <div className="logo-marquee-track">
                {[
                  'Mercury', 'Cohere', 'Lunar', 'Retool', 'Linear', 'Supabase',
                  'Mercury', 'Cohere', 'Lunar', 'Retool', 'Linear', 'Supabase'
                ].map((name, i) => (
                  <span key={i} className="text-xl sm:text-2xl font-extrabold tracking-widest text-slate-200 hover:text-white transition-colors duration-300 cursor-default shrink-0">
                    {name.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Testimonials */}
        <section id="testimonials" className="max-w-7xl mx-auto px-6 mb-32 scroll-mt-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              SecOps Validation
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Trusted by the developers securing next-gen platforms.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="liquid-glass rounded-3xl p-8 border border-white/10 flex flex-col justify-between shadow-xl">
                <div className="flex flex-col gap-6">
                  <div className="text-3xl font-extrabold tracking-tight text-brand">
                    {t.metric}
                    <span className="text-xs font-semibold block text-slate-500 uppercase mt-1 tracking-wider">
                      {t.metricDesc}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed font-medium italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-8 border-t border-white/5 pt-4">
                  <div className="font-bold text-white text-xs tracking-wider">{t.author}</div>
                  <div className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Pricing */}
        <section id="pricing" className="c3-pricing-section scroll-mt-24">
          {/* Watermark background */}
          <div className="c3-watermark-container pointer-events-none select-none">
            <h2 className="c3-watermark-main text-slate-950">
              <span className="c3-watermark-line-1 opacity-5">IRONCLAD AI</span>
              <span className="c3-watermark-line-2 opacity-10">DEFEND IN REALTIME</span>
            </h2>
          </div>

          {/* Toggle */}
          <div className="c3-toggle-wrap">
            <span className="text-sm font-semibold text-slate-400">Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)} 
              className={`c3-toggle ${isYearly ? 'active' : ''}`}
            >
              <div className="c3-toggle-knob" />
            </button>
            <span className="text-sm font-semibold text-white">Yearly (Save 20%)</span>
          </div>

          {/* Pricing Grid */}
          <div className="c3-grid">
            {pricingTiers.map((tier, idx) => (
              <div 
                key={idx} 
                className={`c3-card border border-white/10 ${tier.isPro ? 'c3-card-pro border-brand/50 ring-1 ring-brand/20' : ''}`}
              >
                {tier.isPro && (
                  <div className="absolute top-0 right-0 px-4 py-1.5 bg-brand text-black font-extrabold text-[10px] tracking-wider uppercase rounded-bl-2xl">
                    RECOMMENDED NODE
                  </div>
                )}
                
                <div className="c3-tier-small font-semibold tracking-wider text-slate-500 uppercase">{tier.name}</div>
                <div className="c3-tier-large">
                  ${tier.price}
                  <span className="text-sm font-semibold text-slate-500 tracking-wider uppercase ml-1">/ mo</span>
                </div>
                <p className="c3-desc">{tier.desc}</p>
                
                <div className="h-px bg-white/5 my-2 mb-6" />

                <ul className="c3-list flex flex-col gap-3">
                  {tier.features.map((f, fIdx) => (
                    <li key={fIdx}>
                      <span className="c3-check bg-brand/10 text-brand">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>                 <Link 
                  to={isAuthenticated && user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/auth'} 
                  className={`c3-btn w-full text-center py-3.5 rounded-full font-bold ${
                    tier.isPro ? 'bg-brand text-white hover:bg-brand/90' : 'bg-white text-black hover:bg-slate-200'
                  } transition-all duration-300 mt-8`}
                >
                  {tier.btnText}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Section 9: Final CTA */}
        <section className="max-w-5xl mx-auto px-6 py-10 mb-16">
          <div className="liquid-glass rounded-3xl p-6 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden text-center flex flex-col items-center gap-8">
            <div className="absolute -inset-10 bg-radial-gradient-glow opacity-25 pointer-events-none" />
            <ShieldLogo />
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl leading-tight">
              Ready to automate security threat triage?
            </h2>
            <p className="text-slate-400 max-w-xl font-medium text-base">
              Deploy your local threat monitoring node in seconds. Integrates easily with modern developer workflows.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <Link 
                to={isAuthenticated && user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/auth'} 
                className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-slate-200 font-bold rounded-full transition-all duration-300"
              >
                Launch Developer Environment
              </Link>
              <Link 
                to={isAuthenticated && user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/auth'} 
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                Consult Security Operations Architect
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-slate-950/20 py-12 text-xs text-slate-500 font-medium">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <ShieldLogo />
              <span className="font-bold tracking-wider text-slate-400">IRONCLAD AI</span>
            </div>
            <div>
              © 2026 Ironclad Online Services. All cryptographical rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300">Terms of Node Deployment</a>
              <a href="#" className="hover:text-slate-300">Contact SOC</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
