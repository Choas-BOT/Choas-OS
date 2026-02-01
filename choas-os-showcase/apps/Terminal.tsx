
import React, { useState, useRef, useEffect } from 'react';

interface TerminalProps {
  debug?: boolean;
  onRestart?: () => void;
  onShutdown?: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ debug, onRestart, onShutdown }) => {
  const [history, setHistory] = useState<string[]>(() => [
    "Entropy Kernel v1.0.4-LTS [Ready]",
    "System security: MAXIMUM (Zero-Trust Active)",
    debug ? "--- DEBUG MODE ACTIVE ---" : "Type 'help' for system commands.",
    debug ? "[INFO] Kernel Hook Loaded: 0x88f21" : "",
    debug ? "[DEBUG] Rendering Engine: Prism v4.1 (Buffer Ready)" : "",
    debug ? "[DEBUG] Networking Stack: Isolated/Encrypted" : ""
  ].filter(l => l));
  
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCmd = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let response = '';

    switch(cmd) {
      case 'help': response = 'Available: status, fetch, neofetch, clear, sudo, reboot, restart, shutdown, dmesg'; break;
      case 'status': response = 'CPU: 12% | RAM: 1.2GB/64GB | NET: 10Gbps | UPTIME: 14h 22m'; break;
      case 'neofetch': response = 'OS: Choas OS 2025\nKernel: Entropy 1.0\nShell: zsh-chaos\nDE: Prism v4\nWM: ChaosWM'; break;
      case 'clear': setHistory([]); setInput(''); return;
      case 'sudo': response = 'Permission denied. Nexus AI override required.'; break;
      case 'dmesg': response = debug ? 'Showing last 5 lines of debug log...\n[0.1] PCI-E v5.0 Link Ready\n[0.2] Entropy Core: CPUID Choas-9-Gen\n[0.5] Mounting rootfs /dev/nvme0n1p2\n[0.8] Loading Prism UI symbols\n[1.2] Boot Sequence Completed' : 'Debug logging not enabled for this session.'; break;
      case 'reboot': 
      case 'restart': 
        setHistory(prev => [...prev, `> ${input}`, 'System rebooting...']);
        setTimeout(() => onRestart?.(), 1000);
        setInput('');
        return;
      case 'shutdown':
        setHistory(prev => [...prev, `> ${input}`, 'System shutting down...']);
        setTimeout(() => onShutdown?.(), 1000);
        setInput('');
        return;
      default: response = `Command not found: ${cmd}`;
    }

    setHistory(prev => [...prev, `> ${input}`, response]);
    setInput('');
  };

  return (
    <div className="h-full bg-slate-950 font-mono text-[11px] p-4 flex flex-col text-green-400">
      <div className="flex-1 overflow-auto whitespace-pre-wrap">
        {history.map((line, i) => <div key={i} className="mb-1">{line}</div>)}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleCmd} className="flex mt-2 border-t border-green-900 pt-2">
        <span className="text-blue-400 mr-2">chaos@entropy ~ %</span>
        <input 
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none border-none text-white font-mono"
        />
      </form>
    </div>
  );
};
