import React, { useState, useRef, useEffect } from 'react';
import { useThreats } from '../context/ThreatContext';
import { Send, Sparkles, Bot } from 'lucide-react';
import './CopilotChat.css';

interface Message {
  id: string;
  sender: 'user' | 'copilot';
  text: string;
  timestamp: string;
}

const CopilotChat: React.FC = () => {
  const { threats } = useThreats();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'copilot',
      text: 'Authorized Security Analyst, I am the Ironclad Defensive Copilot. Please query me for threat analysis, security logs, or routing configurations.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Generate smart simulated reply
    setTimeout(() => {
      let replyText = '';
      const activeCount = threats.filter(t => t.status === 'Active' || t.status === 'Investigating').length;

      if (query.toLowerCase().includes('status') || query.toLowerCase().includes('active')) {
        replyText = `We currently have ${activeCount} active threat alerts in our queue. ${
          activeCount > 0 
            ? `I recommend reviewing the highest priority threats immediately: "${threats[0]?.threat}".` 
            : 'Integrity levels are optimal.'
        }`;
      } else if (query.toLowerCase().includes('sql') || query.toLowerCase().includes('injection')) {
        replyText = 'SQL injection signatures match UNION SELECT bypass patterns. I suggest enabling request sanitization policies in your ingress API Gateway nodes and isolating target subnet databases.';
      } else if (query.toLowerCase().includes('ddos') || query.toLowerCase().includes('traffic')) {
        replyText = 'DDoS attack mitigation requires volumetric firewall filters. You can run "isolate-node Edge-Subnet" in the Defensive Command Terminal, or let Cloudflare handle amplification rules.';
      } else if (query.toLowerCase().includes('mitigat')) {
        replyText = 'To mitigate a threat, select the card in the threat queue and click "Authorize Mitigation". This automatically propagates rule blocks across all network interfaces.';
      } else {
        replyText = "I've analyzed your query against our local network metrics. Our system integrity is currently stable. Let me know if you would like me to draft an incident response ticket for any active alerts.";
      }

      const copilotMsg: Message = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'copilot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, copilotMsg]);
    }, 1000);
  };

  return (
    <div className="soc-copilot-container h-[480px]">
      <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4 select-none">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-brand" />
          <span className="text-xs font-bold text-slate-300 tracking-wider">IRONCLAD COPILOT</span>
        </div>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-brand animate-pulse" />
          Llama 3 // Local Core
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 mb-4 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`soc-chat-bubble ${
              msg.sender === 'user' ? 'bubble-user' : 'bubble-copilot'
            }`}
          >
            <div className="font-semibold">{msg.text}</div>
            <span className="text-[9px] text-slate-500 block text-right mt-1 font-mono">{msg.timestamp}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="relative select-none">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Copilot about threats..."
          className="w-full bg-[#0d1527]/50 border border-white/5 rounded-2xl py-3.5 pl-4 pr-12 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand/40"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-brand hover:bg-brand/90 text-white transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default CopilotChat;
