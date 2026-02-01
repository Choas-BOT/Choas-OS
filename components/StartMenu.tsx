
import React, { useState } from 'react';
import { AppID, Theme } from '../App';

interface StartMenuProps {
  theme: Theme;
  onAppClick: (id: AppID) => void;
  onClose: () => void;
  onRestart: () => void;
  onShutdown: () => void;
  safeMode?: boolean;
  networking?: boolean;
  installedApps: AppID[];
}

interface MenuApp {
  id: AppID;
  name: string;
  icon: string;
  desc: string;
  system?: boolean;
  network?: boolean;
}

export const StartMenu: React.FC<StartMenuProps> = ({ theme, onAppClick, onClose, onRestart, onShutdown, safeMode, networking, installedApps }) => {
  const [search, setSearch] = useState('');

  const isLight = theme === 'light';
  const glassClass = isLight ? 'glass-light' : 'glass';

  const baseApps: MenuApp[] = [
    { id: 'browser', name: 'Prism Web', icon: '🌐', desc: 'Secure browsing', network: true },
    { id: 'files', name: 'Chaos Files', icon: '📂', desc: 'Manage your storage', system: true },
    { id: 'terminal', name: 'Entropy Term', icon: '⌨️', desc: 'Kernel shell', system: true },
    { id: 'nexus', name: 'Nexus AI', icon: '🧠', desc: 'System assistant' },
    { id: 'notepad', name: 'Notepad', icon: '📝', desc: 'Fast text editing', system: true },
    { id: 'settings', name: 'Control Panel', icon: '⚙️', desc: 'OS Configuration', system: true },
    { id: 'store', name: 'ChoasPlay', icon: '🛍️', desc: 'App Ecosystem', system: true },
  ];

  const storeApps: MenuApp[] = installedApps.map(id => {
    const icons: Record<string, string> = { 
      snake: '🐍', sudoku: '🔢', tetra: '🧱', racer: '🏎️', binary: '🔎', 
      dashboard: '📊', clock: '🕒', weather: '⛈️', calc: '➗', units: '📏' 
    };
    return { id, name: id.toUpperCase(), icon: icons[id] || '📱', desc: 'Installed via ChoasPlay' };
  });

  const allApps = [...baseApps, ...storeApps];

  const filteredApps = allApps.filter(app => {
    if (safeMode && !app.system && app.id !== 'notepad') return false;
    if (!networking && app.network) return false;
    return app.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className={`absolute bottom-24 left-1/2 -translate-x-1/2 w-[500px] ${glassClass} rounded-[2.5rem] border ${isLight ? 'border-black/5' : 'border-white/20'} p-8 z-[99] animate-in slide-in-from-bottom-10 duration-300 shadow-2xl overflow-hidden`}>
      <div className="relative mb-8">
        <input 
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search apps, files, or settings..."
          className={`w-full ${isLight ? 'bg-black/5 border-black/10 text-slate-900 placeholder:text-slate-400' : 'bg-white/5 border-white/10 text-white placeholder:text-white/20'} rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
        />
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
           <h3 className={`text-[10px] font-bold ${isLight ? 'text-slate-400' : 'text-white/30'} uppercase tracking-[0.3em]`}>
             All Applications
           </h3>
           <span className="text-[9px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-bold">ENTROPY CORE</span>
        </div>
        
        <div className="grid grid-cols-4 gap-4 max-h-[300px] overflow-y-auto scrollbar-hide">
          {filteredApps.map(app => (
            <button
              key={app.id}
              onClick={() => onAppClick(app.id)}
              className={`flex flex-col items-center gap-3 p-4 rounded-3xl ${isLight ? 'hover:bg-black/5' : 'hover:bg-white/5'} transition-all group`}
            >
              <div className="text-4xl filter group-hover:scale-110 transition-transform">{app.icon}</div>
              <span className={`text-[9px] font-black ${isLight ? 'text-slate-600' : 'text-white/60'} text-center uppercase tracking-tighter truncate w-full`}>{app.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`pt-6 border-t ${isLight ? 'border-black/5' : 'border-white/5'} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
            A
          </div>
          <div>
            <div className={`text-xs font-black ${isLight ? 'text-slate-700' : 'text-white/90'}`}>Admin User</div>
            <button 
              onClick={() => onAppClick('about')}
              className={`text-[8px] ${isLight ? 'text-blue-600 hover:text-blue-500' : 'text-blue-400 hover:text-blue-300'} font-mono uppercase font-bold tracking-widest`}
            >
              About Choas OS →
            </button>
          </div>
        </div>
        
        <div className="flex gap-2">
            <button onClick={onRestart} className={`p-3 rounded-xl ${isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-white/5 hover:bg-white/10 text-white/50'} transition-all`} title="Restart">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
            <button onClick={onShutdown} className={`p-3 rounded-xl ${isLight ? 'bg-slate-100 hover:bg-red-100 text-red-500' : 'bg-red-500/10 hover:bg-red-500/20 text-red-400'} transition-all`} title="Shutdown">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </button>
        </div>
      </div>
    </div>
  );
};
