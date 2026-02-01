
import React, { useState } from 'react';
import { AppID } from '../App';

interface StoreApp {
  id: AppID;
  name: string;
  icon: string;
  category: 'Game' | 'QoL';
  description: string;
  rating: string;
  color: string;
}

const STORE_APPS: StoreApp[] = [
  // Games
  { id: 'snake', name: 'Zenith Snake', icon: '🐍', category: 'Game', description: 'Classic survival logic in high-definition.', rating: '4.8', color: 'from-green-500 to-emerald-700' },
  { id: 'sudoku', name: 'Cyber Sudoku', icon: '🔢', category: 'Game', description: 'Quantum-encrypted puzzles for the mind.', rating: '4.5', color: 'from-blue-500 to-indigo-700' },
  { id: 'tetra', name: 'Tetra Chaos', icon: '🧱', category: 'Game', description: 'Gravity-defying brick manipulation.', rating: '4.9', color: 'from-red-500 to-orange-700' },
  { id: 'racer', name: 'Void Racer', icon: '🏎️', category: 'Game', description: 'Sub-millisecond reaction racing.', rating: '4.7', color: 'from-purple-500 to-pink-700' },
  { id: 'binary', name: 'Binary Search', icon: '🔎', category: 'Game', description: 'Crack the system code in record time.', rating: '4.2', color: 'from-slate-500 to-slate-800' },
  // QoL
  { id: 'dashboard', name: 'System Dash', icon: '📊', category: 'QoL', description: 'Real-time telemetry for your kernel.', rating: '5.0', color: 'from-cyan-500 to-blue-600' },
  { id: 'clock', name: 'World Clock', icon: '🕒', category: 'QoL', description: 'Precision timekeeping across all sectors.', rating: '4.6', color: 'from-amber-500 to-yellow-600' },
  { id: 'weather', name: 'Chaos Weather', icon: '⛈️', category: 'QoL', description: 'Atmospheric prediction mesh.', rating: '4.4', color: 'from-sky-400 to-indigo-500' },
  { id: 'calc', name: 'Omni-Calc', icon: '➗', category: 'QoL', description: 'Multi-dimensional calculation engine.', rating: '4.3', color: 'from-rose-500 to-red-600' },
  { id: 'units', name: 'Unit Mesh', icon: '📏', category: 'QoL', description: 'Instant conversion between any standard.', rating: '4.1', color: 'from-teal-500 to-emerald-600' },
];

interface ChoasPlayProps {
  installedIds: AppID[];
  onInstall: (id: AppID) => void;
  onOpenStudio?: () => void;
}

export const ChoasPlay: React.FC<ChoasPlayProps> = ({ installedIds, onInstall, onOpenStudio }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Game' | 'QoL'>('All');
  const [installingId, setInstallingId] = useState<AppID | null>(null);

  const handleInstall = (id: AppID) => {
    if (installedIds.includes(id)) {
      onInstall(id);
      return;
    }
    setInstallingId(id);
    setTimeout(() => {
      onInstall(id);
      setInstallingId(null);
    }, 1500);
  };

  const filtered = activeTab === 'All' ? STORE_APPS : STORE_APPS.filter(a => a.category === activeTab);

  return (
    <div className="h-full flex flex-col bg-slate-900 text-white font-sans overflow-hidden">
      {/* Header */}
      <div className="p-8 bg-gradient-to-r from-blue-900/40 to-slate-900 border-b border-white/5">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter">ChoasPlay</h1>
            <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em] mt-1">Unified App Ecosystem</p>
          </div>
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
            {['All', 'Game', 'QoL'].map(t => (
              <button 
                key={t}
                onClick={() => setActiveTab(t as any)}
                className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === t ? 'bg-blue-600 shadow-xl' : 'text-white/40 hover:text-white'}`}
              >
                {t}s
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex-1 h-12 bg-black/40 rounded-2xl border border-white/10 px-6 flex items-center gap-3">
              <span className="opacity-30">🔍</span>
              <input placeholder="Search for games or tools..." className="bg-transparent border-none outline-none text-sm w-full" />
           </div>
           <button 
             onClick={onOpenStudio}
             className="px-6 h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
           >
             <span className="text-lg">🛠️</span> Build App
           </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(app => (
            <div 
              key={app.id}
              className="group relative bg-white/5 rounded-[2rem] p-6 border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.07] transition-all flex flex-col justify-between"
            >
              <div className="flex gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {app.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-lg leading-tight">{app.name}</h3>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-500">
                      <span>★</span> {app.rating}
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400/60 block mt-1">{app.category}</span>
                </div>
              </div>
              
              <p className="text-xs text-white/50 mt-4 leading-relaxed line-clamp-2">{app.description}</p>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">Verified Mesh Link</div>
                <button 
                  onClick={() => handleInstall(app.id)}
                  disabled={installingId === app.id}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    installingId === app.id ? 'bg-slate-700 text-slate-400 cursor-wait' :
                    installedIds.includes(app.id) ? 'bg-slate-800 text-red-400 hover:bg-red-500 hover:text-white' : 
                    'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95'
                  }`}
                >
                  {installingId === app.id ? 'CONNECTING...' : installedIds.includes(app.id) ? 'UNINSTALL' : 'INSTALL'}
                </button>
              </div>

              {installingId === app.id && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-[2rem] flex flex-col items-center justify-center">
                   <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                   <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 animate-pulse">Syncing Kernel</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-8 py-3 bg-black/20 border-t border-white/5 flex justify-between items-center text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">
        <div className="flex gap-6">
          <span className="text-blue-500">Mesh Core: ACTIVE</span>
          <span>Latency: 0.2ms</span>
        </div>
        <div>{installedIds.length} APPS SECURED ON THIS DEVICE</div>
      </div>
    </div>
  );
};
