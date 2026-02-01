
import React, { useRef, useState } from 'react';
import { Theme } from '../App';

// IndexedDB Helper
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('choas_os_assets', 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore('wallpapers');
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveAsset = async (key: string, data: Blob): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('wallpapers', 'readwrite');
    const request = transaction.objectStore('wallpapers').put(data, key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

interface SettingsProps {
  onWallpaperChange: (w: string) => void;
  currentWallpaperType: string;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
  onOpenAbout?: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onWallpaperChange, currentWallpaperType, theme, onThemeChange, onOpenAbout }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const isLight = theme === 'light';

  const presets = [
    { id: 'os-bg', name: 'Entropy Deep', class: 'bg-slate-900' },
    { id: 'neon', name: 'Neon City', class: 'bg-gradient-to-br from-indigo-900 to-purple-900' },
    { id: 'os-bg-vivid', name: 'Iridescent', class: 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500' },
    { id: 'solar', name: 'Solar Flare', class: 'bg-gradient-to-tr from-orange-500 to-red-600' },
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 20 * 1024 * 1024; 
    if (file.size > MAX_SIZE) {
      setError("File exceeds 20MB system limit.");
      return;
    }

    setIsUploading(true);
    try {
      await saveAsset('current_wallpaper', file);
      onWallpaperChange('custom');
    } catch (err) {
      setError("System Disk Error: Failed to store large asset.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleExportData = () => {
    const backup: Record<string, string | null> = {};
    const keys = [
      'choas_installed_apps', 'choas_custom_apps', 'choas_desktop_layout', 
      'choas_files', 'choas_high_scores', 'choas_theme', 
      'choas_window_states', 'choas_app_persistence', 'choas_wallpaper_type'
    ];
    keys.forEach(k => { backup[k] = localStorage.getItem(k); });
    
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `choas_os_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFactoryReset = () => {
    if (confirm("WARNING: This will erase all files, custom apps, and settings. Proceed?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className={`h-full p-8 overflow-y-auto transition-colors duration-500 ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-900 text-white'}`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black">System Preferences</h2>
        <div className={`text-[10px] font-mono ${isLight ? 'text-slate-400' : 'text-white/30'}`}>BUILD 1.5.0-PERSISTENCE</div>
      </div>

      <section className="mb-12">
        <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 ${isLight ? 'text-slate-400' : 'text-white/40'}`}>System Data & Backup</h3>
        <div className="space-y-4">
           <button 
             onClick={handleExportData}
             className={`w-full p-6 rounded-2xl border transition-all flex items-center justify-between ${isLight ? 'border-blue-100 bg-blue-50 hover:bg-blue-100' : 'border-blue-500/10 bg-blue-500/5 hover:bg-blue-500/10'}`}
           >
             <div className="flex items-center gap-4 text-left">
                <span className="text-2xl">💾</span>
                <div>
                   <div className="text-xs font-bold uppercase">Export System Snapshot</div>
                   <div className="text-[10px] opacity-40">Save a readable HTML/JSON backup of your OS</div>
                </div>
             </div>
             <span className="text-blue-500 font-bold text-[10px] tracking-widest">DOWNLOAD</span>
           </button>
           
           <button 
             onClick={handleFactoryReset}
             className={`w-full p-6 rounded-2xl border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 transition-all flex items-center justify-between`}
           >
             <div className="flex items-center gap-4 text-left">
                <span className="text-2xl">⚠️</span>
                <div>
                   <div className="text-xs font-bold uppercase text-red-500">Factory Reset</div>
                   <div className="text-[10px] opacity-40 text-red-500/60">Wipe all system data and start fresh</div>
                </div>
             </div>
           </button>
        </div>
      </section>

      <section className="mb-12">
        <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 ${isLight ? 'text-slate-400' : 'text-white/40'}`}>Appearance Mode</h3>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => onThemeChange('dark')}
            className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 ${theme === 'dark' ? 'border-blue-500 bg-blue-500/10' : 'border-transparent bg-black/5 hover:bg-black/10'}`}
          >
            <span className="text-2xl">🌙</span>
            <span className="text-xs font-bold uppercase">Dark Mode</span>
          </button>
          <button 
            onClick={() => onThemeChange('light')}
            className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 ${theme === 'light' ? 'border-blue-500 bg-blue-500/10' : 'border-transparent bg-black/5 hover:bg-black/10'}`}
          >
            <span className="text-2xl">☀️</span>
            <span className="text-xs font-bold uppercase">Light Mode</span>
          </button>
        </div>
      </section>
      
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xs font-bold uppercase tracking-widest ${isLight ? 'text-slate-400' : 'text-white/40'}`}>Desktop Wallpaper</h3>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-[10px] font-bold text-white transition-colors uppercase tracking-widest"
          >
            Upload Custom
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            {presets.map(w => (
                <button 
                    key={w.id}
                    onClick={() => onWallpaperChange(w.id)}
                    className={`group relative h-24 rounded-xl overflow-hidden border transition-all ${currentWallpaperType === w.id ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-white/5 hover:border-white/20'}`}
                >
                    <div className={`absolute inset-0 ${w.class}`} />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-[10px] text-white font-bold uppercase">{w.name}</span>
                    </div>
                </button>
            ))}
        </div>
      </section>
    </div>
  );
};
