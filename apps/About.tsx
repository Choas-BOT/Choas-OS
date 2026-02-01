
import React, { useEffect, useState } from 'react';

export const About: React.FC = () => {
  const [entropyData, setEntropyData] = useState<number[]>(new Array(20).fill(40));

  // Simulate live data movement for the flux graph
  useEffect(() => {
    const interval = setInterval(() => {
      setEntropyData(prev => {
        const next = [...prev.slice(1), 30 + Math.random() * 40];
        return next;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const generatePath = () => {
    return entropyData.map((val, i) => `${i * 15},${100 - val}`).join(' ');
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-white font-sans overflow-y-auto scrollbar-hide">
      {/* Hero Header */}
      <div className="relative p-12 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-600/20 to-transparent pointer-events-none" />
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[2rem] flex items-center justify-center text-3xl font-black mb-6 shadow-2xl shadow-blue-500/20">
          C
        </div>
        <h1 className="text-3xl font-black tracking-tighter mb-1">Choas OS v1.5</h1>
        <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6">Entropy Edition</p>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-[9px] font-black uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Kernel Integrity: Verified
        </div>
      </div>

      <div className="px-8 pb-12 space-y-8">
        {/* System Telemetry Section */}
        <section>
          <div className="flex justify-between items-end mb-4">
             <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Entropy Telemetry</h3>
             <span className="text-[9px] font-mono text-blue-500/60 uppercase">Real-time Kernel Stream</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CPU Threads Chart */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 flex flex-col gap-4">
               <div className="flex justify-between items-center text-[10px] font-bold uppercase text-white/40">
                  <span>Kernel Threads</span>
                  <span className="text-blue-400">8 Cores Active</span>
               </div>
               <div className="flex items-end justify-between h-16 gap-1.5">
                  {[65, 42, 88, 30, 55, 76, 45, 92].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-500/10 rounded-t-sm relative group overflow-hidden" style={{height: '100%'}}>
                       <div 
                         className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-1000" 
                         style={{height: `${h}%`}}
                       />
                       <div className="absolute inset-0 bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
               </div>
               <p className="text-[9px] text-white/20 font-mono text-center uppercase tracking-tighter">Instruction Cycles: Sub-0.02μs</p>
            </div>

            {/* Entropy Flux Sparkline */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 flex flex-col gap-4">
               <div className="flex justify-between items-center text-[10px] font-bold uppercase text-white/40">
                  <span>Entropy Flux</span>
                  <span className="text-purple-400">Stable @ 0.003%</span>
               </div>
               <div className="h-16 w-full flex items-center justify-center">
                  <svg viewBox="0 0 285 100" className="w-full h-full">
                    <polyline
                      fill="none"
                      stroke="url(#fluxGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={generatePath()}
                      className="transition-all duration-700 ease-in-out"
                    />
                    <defs>
                      <linearGradient id="fluxGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
               </div>
               <p className="text-[9px] text-white/20 font-mono text-center uppercase tracking-tighter">Quantum Noise Filtering: ACTIVE</p>
            </div>

            {/* Memory Allocation Mesh */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 col-span-1 md:col-span-2 space-y-4">
               <div className="flex justify-between items-center text-[10px] font-bold uppercase text-white/40">
                  <span>Memory Mesh Allocation</span>
                  <span className="text-cyan-400">Used: 180MB / 64GB</span>
               </div>
               <div className="h-3 w-full bg-white/5 rounded-full flex overflow-hidden">
                  <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{width: '15%'}} title="Kernel Core" />
                  <div className="h-full bg-indigo-500 opacity-80" style={{width: '45%'}} title="User Space" />
                  <div className="h-full bg-cyan-400 opacity-60" style={{width: '10%'}} title="Entropy Buffer" />
               </div>
               <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-white/20">
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Kernel Core (24MB)</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> User Space (112MB)</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Entropy (44MB)</div>
               </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
             <div className="text-blue-400 text-xl mb-3">🦀</div>
             <h4 className="text-xs font-black uppercase mb-2">Entropy Kernel</h4>
             <p className="text-[11px] text-white/40 leading-relaxed">Rust-based microkernel with total process isolation.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
             <div className="text-purple-400 text-xl mb-3">🛡️</div>
             <h4 className="text-xs font-black uppercase mb-2">Zero-Trust V2</h4>
             <p className="text-[11px] text-white/40 leading-relaxed">Hardware-scoped sandboxing for every process.</p>
          </div>
        </div>

        <section className="pt-4">
          <div className="flex justify-between items-center text-[10px] font-mono text-white/20 mb-4 uppercase tracking-[0.2em]">
             <span>System Specifications</span>
             <span>BUILD_REV_150</span>
          </div>
          <div className="space-y-2">
             {[
               { k: 'Version', v: '1.5.0-gold' },
               { k: 'Kernel', v: 'Entropy 1.5.42-LTS (x86_64)' },
               { k: 'UI Engine', v: 'Prism V4 "Aero"' },
               { k: 'Uptime', v: '14 days, 22:15:04' }
             ].map(i => (
               <div key={i.k} className="flex justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[10px] font-bold text-white/40 uppercase">{i.k}</span>
                  <span className="text-[10px] font-bold text-blue-400 font-mono">{i.v}</span>
               </div>
             ))}
          </div>
        </section>
      </div>

      <div className="mt-auto p-8 border-t border-white/5 bg-black/40 text-center">
         <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">© 2025 Choas Systems. All Rights Reserved.</p>
      </div>
    </div>
  );
};
