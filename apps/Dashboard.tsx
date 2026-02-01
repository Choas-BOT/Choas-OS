
import React, { useState, useEffect } from 'react';

export const Dashboard: React.FC = () => {
  const [cpu, setCpu] = useState(12);
  const [ram, setRam] = useState(1.2);
  const [points, setPoints] = useState<number[]>(new Array(20).fill(20));

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(8 + Math.random() * 15));
      setRam(parseFloat((1.1 + Math.random() * 0.3).toFixed(1)));
      setPoints(prev => [...prev.slice(1), 10 + Math.random() * 40]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-slate-950 p-6 flex flex-col font-mono text-white overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-sm font-black uppercase tracking-widest text-blue-400">System Telemetry</h2>
        <div className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">NODE_01_ACTIVE</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
          <div className="text-[10px] text-white/40 uppercase mb-2">CPU Load</div>
          <div className="text-2xl font-black text-blue-400">{cpu}%</div>
          <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${cpu}%` }} />
          </div>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
          <div className="text-[10px] text-white/40 uppercase mb-2">RAM Usage</div>
          <div className="text-2xl font-black text-purple-400">{ram}GB</div>
          <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${(ram/64)*100}%` }} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex justify-between text-[10px] text-white/30 uppercase mb-2">
          <span>Entropy Flux (μs)</span>
          <span>Live Stream</span>
        </div>
        <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl relative overflow-hidden flex items-end px-2 pb-2 gap-1">
          {points.map((p, i) => (
            <div 
              key={i} 
              className="flex-1 bg-gradient-to-t from-blue-600/40 to-cyan-400/80 rounded-t-sm transition-all duration-1000"
              style={{ height: `${p}%` }}
            />
          ))}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-2 text-[8px] uppercase tracking-tighter text-white/20 font-bold">
        <div className="border-t border-white/5 pt-2">V-LAYER: INSTANCED</div>
        <div className="border-t border-white/5 pt-2 text-center">DISK: 4.0TB NVME</div>
        <div className="border-t border-white/5 pt-2 text-right">MESH: SYNCED</div>
      </div>
    </div>
  );
};
