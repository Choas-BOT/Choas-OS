
import React from 'react';
import { AppID, WindowState, Theme } from '../App';

interface DockProps {
  onStartClick: () => void;
  openApps: WindowState[];
  onAppClick: (id: AppID) => void;
  theme: Theme;
  isSyncing?: boolean;
}

export const Dock: React.FC<DockProps> = ({ onStartClick, openApps, onAppClick, theme, isSyncing }) => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const isLight = theme === 'light';
  const glassClass = isLight ? 'glass-light' : 'glass';

  const getIcon = (id: AppID) => {
    switch(id) {
      case 'browser': return '🌐';
      case 'terminal': return '⌨️';
      case 'nexus': return '🧠';
      case 'settings': return '⚙️';
      case 'notepad': return '📝';
      case 'files': return '📂';
      case 'store': return '🛍️';
      case 'about': return 'ℹ️';
      case 'snake': return '🐍';
      case 'sudoku': return '🔢';
      case 'tetra': return '🧱';
      case 'racer': return '🏎️';
      case 'binary': return '🔎';
      case 'dashboard': return '📊';
      case 'clock': return '🕒';
      case 'weather': return '⛈️';
      case 'calc': return '➗';
      case 'units': return '📏';
      default: return '📱';
    }
  };

  return (
    <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 ${glassClass} rounded-3xl z-[100] transition-all duration-500`}>
      <button 
        onClick={onStartClick}
        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-blue-500/20 hover:scale-110 transition-transform active:scale-95"
      >
        C
      </button>
      
      <div className={`w-[1px] h-8 mx-2 ${isLight ? 'bg-black/10' : 'bg-white/10'}`} />

      <div className="flex items-center gap-2">
        {openApps.map(app => (
          <button
            key={app.id}
            onClick={() => onAppClick(app.id)}
            className={`relative w-12 h-12 rounded-xl glass hover:bg-black/5 transition-all flex items-center justify-center text-2xl group ${app.isMinimized ? 'opacity-60 grayscale-[0.5]' : 'opacity-100'}`}
          >
            {getIcon(app.id)}
            <div className={`absolute -bottom-1 w-1 h-1 rounded-full shadow-[0_0_5px_cyan] transition-colors ${app.isMinimized ? 'bg-slate-400' : 'bg-blue-500'}`} />
            <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 ${glassClass} rounded text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap ${isLight ? 'text-slate-800' : 'text-white'}`}>
              {app.title}
            </div>
          </button>
        ))}
      </div>

      <div className={`w-[1px] h-8 mx-2 ${isLight ? 'bg-black/10' : 'bg-white/10'}`} />

      <div className="flex items-center gap-4 px-2">
        <div className={`flex flex-col items-end font-mono ${isLight ? 'text-slate-800/80' : 'text-white/60'}`}>
          <span className="text-[11px] font-bold leading-none">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span className="text-[9px] leading-none mt-1 uppercase">{time.toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isSyncing ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'bg-white/10'}`} title="Entropy Storage Sync" />
          <span className="text-[6px] font-black uppercase tracking-tighter opacity-20 mt-1">SYNC</span>
        </div>
      </div>
    </div>
  );
};
