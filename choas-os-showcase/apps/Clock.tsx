
import React, { useState, useEffect } from 'react';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const zones = [
    { label: 'UTC Sector', zone: 'UTC', offset: 0 },
    { label: 'Tokyo Node', zone: 'Asia/Tokyo', offset: 9 },
    { label: 'NYC Sector', zone: 'America/New_York', offset: -5 },
    { label: 'London Hub', zone: 'Europe/London', offset: 0 },
  ];

  return (
    <div className="h-full bg-slate-950 p-8 flex flex-col font-sans text-white">
      <div className="text-center mb-10">
        <div className="text-6xl font-black tracking-tighter mb-2 text-blue-500">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
        </div>
        <div className="text-xs font-mono uppercase tracking-[0.4em] text-white/30">Local Entropy Sync</div>
      </div>

      <div className="space-y-4">
        {zones.map(z => (
          <div key={z.zone} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center hover:bg-white/[0.08] transition-all group">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-white/80">{z.label}</div>
              <div className="text-[10px] text-white/20 font-mono">{z.zone}</div>
            </div>
            <div className="text-xl font-mono text-blue-400 group-hover:scale-110 transition-transform">
              {new Date(new Date().toLocaleString("en-US", {timeZone: z.zone})).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-8 flex items-center justify-center gap-2">
         <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
         <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Precision Atomic Link Active</span>
      </div>
    </div>
  );
};
