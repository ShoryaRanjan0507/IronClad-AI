import React, { useState, useRef, useEffect } from 'react';
import { useThreats } from '../context/ThreatContext';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import './ActionTerminal.css';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

const ActionTerminal: React.FC = () => {
  const { addLog, clearAll } = useThreats();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'Ironclad SOC Defensive Command Node v1.0.0', type: 'success' },
    { text: 'Type "help" to list available mitigation commands.', type: 'output' }
  ]);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const newLines: TerminalLine[] = [{ text: `$ ${cmd}`, type: 'input' }];
    const parts = cmd.split(' ');
    const baseCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    switch (baseCmd) {
      case 'help':
        newLines.push(
          { text: 'Available commands:', type: 'output' },
          { text: '  scan-system              — Runs full system firewall & integrity checks', type: 'output' },
          { text: '  ban <IP>                 — Denies all traffic from specified IP', type: 'output' },
          { text: '  isolate-node <subnet>    — Isolates virtual asset subnet from routing', type: 'output' },
          { text: '  clear-logs               — Flushes system logs & scanner output', type: 'output' },
          { text: '  clear                    — Clears this terminal screen history', type: 'output' }
        );
        break;
      case 'scan-system':
        newLines.push(
          { text: 'Scanning system subnets...', type: 'output' },
          { text: 'Firewall rules: active.', type: 'success' },
          { text: 'Asset quarantine: stable.', type: 'success' },
          { text: 'Regression predictor: 100% synchronized.', type: 'success' },
          { text: 'No active intrusions found in running hosts.', type: 'output' }
        );
        addLog('Administrative manual system scan initiated.', 'info');
        break;
      case 'ban':
        if (!arg) {
          newLines.push({ text: 'Error: Must specify IP address. Example: "ban 198.51.100.42"', type: 'error' });
        } else {
          newLines.push({ text: `IP address ${arg} successfully added to global block list.`, type: 'success' });
          addLog(`COMMAND: IP block rule set for source: ${arg}`, 'warn');
        }
        break;
      case 'isolate-node':
        if (!arg) {
          newLines.push({ text: 'Error: Must specify subnet name. Example: "isolate-node API-Subnet"', type: 'error' });
        } else {
          newLines.push({ text: `Asset subnet "${arg}" completely isolated from internal routers.`, type: 'success' });
          addLog(`COMMAND: Isolated host subnet: ${arg}`, 'warn');
        }
        break;
      case 'clear-logs':
        clearAll();
        newLines.push({ text: 'Security logs and databases cleared successfully.', type: 'success' });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        newLines.push({ text: `Command not recognized: "${baseCmd}". Type "help" for a list of commands.`, type: 'error' });
        break;
    }

    setHistory(prev => [...prev, ...newLines]);
    setInput('');
  };

  return (
    <div className="soc-action-terminal h-[250px] md:h-[300px]">
      <div className="soc-terminal-header select-none">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-[#10b981]" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">DEFENSIVE CONTROL INTERFACE</span>
        </div>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">CONSOLE — ACTIVE</span>
      </div>

      <div ref={bodyRef} className="soc-terminal-body flex-1 font-mono overflow-y-auto">
        {history.map((line, i) => (
          <div 
            key={i} 
            className={`
              ${line.type === 'input' ? 'text-slate-300 font-bold' : ''}
              ${line.type === 'output' ? 'text-slate-400' : ''}
              ${line.type === 'error' ? 'text-red-400 font-medium' : ''}
              ${line.type === 'success' ? 'text-emerald-400 font-medium' : ''}
            `}
          >
            {line.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="soc-action-input-wrapper select-none">
        <ChevronRight className="w-4 h-4 text-[#10b981] flex-shrink-0" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command..."
          className="soc-action-input font-mono"
        />
      </form>
    </div>
  );
};

export default ActionTerminal;
