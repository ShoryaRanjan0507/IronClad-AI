import React, { useEffect, useRef } from 'react';
import { useThreats } from '../context/ThreatContext';
import { Terminal as TerminalIcon } from 'lucide-react';
import './LogTerminal.css';

const LogTerminal: React.FC = () => {
  const { logs } = useThreats();
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="soc-terminal h-[250px] md:h-[300px]">
      <div className="soc-terminal-header select-none">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-brand" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">LIVE SECURITY SCANNER</span>
        </div>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">STDOUT — STREAMING</span>
      </div>

      <div ref={bodyRef} className="soc-terminal-body flex-1 font-mono">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-2">
            <span className="text-slate-600 select-none">[{log.timestamp}]</span>
            <span className={`
              ${log.type === 'info' ? 'log-info' : ''}
              ${log.type === 'success' ? 'log-success' : ''}
              ${log.type === 'warn' ? 'log-warn' : ''}
              ${log.type === 'stderr' ? 'log-error' : ''}
              ${log.type === 'stdout' ? 'log-stdout' : ''}
            `}>
              {log.text}
            </span>
          </div>
        ))}
        <div className="flex gap-2 text-slate-500 animate-pulse">
          <span>[{new Date().toLocaleTimeString()}]</span>
          <span>Listening for edge signals...</span>
        </div>
      </div>
    </div>
  );
};

export default LogTerminal;
