
import React, { useState } from 'react';

const APPS = [
  { id: 'browser', name: 'Prism Web', color: 'bg-blue-500', icon: '🌐' },
  { id: 'settings', name: 'Settings', color: 'bg-gray-600', icon: '⚙️' },
  { id: 'files', name: 'Chaos Explorer', color: 'bg-yellow-600', icon: '📂' },
  { id: 'terminal', name: 'Entropy Term', color: 'bg-indigo-600', icon: '⌨️' },
  { id: 'media', name: 'Flow Music', color: 'bg-pink-600', icon: '🎵' },
  { id: 'games', name: 'Chaos Launcher', color: 'bg-red-600', icon: '🎮' },
];

export const DesktopDemo: React.FC = () => {
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const renderWindowContent = () => {
    switch(activeWindow) {
      case 'browser':
        return <div className="p-4">Browse the future with zero trackers. Prism Web uses quantum-resistant encryption by default.</div>;
      case 'terminal':
        return (
          <div className="p-4 font-mono text-sm text-green-400 bg-black h-full overflow-auto">
            <p>$ entropy --status</p>
            <p className="text-white">Kernel: v1.0.4-stable</p>
            <p className="text-white">Uptime: 24d 13h 22m</p>
            <p className="text-white">Process Isolation: ACTIVE</p>
            <p className="mt-4 animate-pulse">_</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-4 space-y-4">
             <div className="flex items-center justify-between p-3 glass rounded-xl">
                <span>Dark Mode</span>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
             </div>
             <div className="flex items-center justify-between p-3 glass rounded-xl">
                <span>AI Assistant (Nexus)</span>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
             </div>
          </div>
        );
      default:
        return <div className="p-4 text-gray-500">Feature demo in development...</div>;
    }
  };

  return (
    <div className="relative w-full aspect-[16/10] os-gradient rounded-3xl overflow-hidden border border-white/10 shadow-3xl">
      {/* Desktop Content */}
      <div className="absolute inset-0 p-8 grid grid-cols-1 grid-rows-6 md:grid-cols-6 md:grid-rows-1 gap-4">
        {/* Mock Icons */}
        <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setActiveWindow('files')}>
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-3xl group-hover:bg-white/10">📂</div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">Documents</span>
            </div>
            <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setActiveWindow('browser')}>
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-3xl group-hover:bg-white/10">🌎</div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">Browser</span>
            </div>
        </div>
      </div>

      {/* Window System */}
      {activeWindow && (
        <div className="absolute inset-20 glass rounded-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={() => setActiveWindow(null)}></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-xs font-bold text-white/70 uppercase tracking-tighter">
                {APPS.find(a => a.id === activeWindow)?.name}
              </span>
            </div>
          </div>
          <div className="flex-1 bg-black/40 overflow-auto">
            {renderWindowContent()}
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-3 glass rounded-2xl border border-white/10 flex items-center gap-4">
        {APPS.map(app => (
          <button 
            key={app.id} 
            onClick={() => setActiveWindow(app.id)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all hover:scale-110 active:scale-95 ${activeWindow === app.id ? 'bg-white/20 ring-2 ring-blue-500' : 'hover:bg-white/10'}`}
          >
            {app.icon}
          </button>
        ))}
        <div className="w-[1px] h-8 bg-white/10 mx-2" />
        <div className="text-xs font-mono text-white/60 text-right">
            <div>12:45 PM</div>
            <div className="text-[10px]">NOV 12, 2025</div>
        </div>
      </div>
    </div>
  );
};
