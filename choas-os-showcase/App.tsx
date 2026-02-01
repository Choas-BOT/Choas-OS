
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Window } from './components/Window';
import { Dock } from './components/Dock';
import { StartMenu } from './components/StartMenu';
import { BootMenu } from './components/BootMenu';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Browser } from './apps/Browser';
import { Terminal } from './apps/Terminal';
import { NexusAI } from './apps/NexusAI';
import { Settings } from './apps/Settings';
import { Notepad } from './apps/Notepad';
import { Files } from './apps/Files';
import { ChoasPlay } from './apps/ChoasPlay';
import { About } from './apps/About';
import { AppStudio } from './apps/AppStudio';
import { WebContainer } from './apps/WebContainer';

// Desktop Component types
export type AppID = 'browser' | 'terminal' | 'nexus' | 'settings' | 'store' | 'notepad' | 'files' | 'about' | 'studio' | string;
export type Theme = 'dark' | 'light';

export interface FileItem {
  id: string;
  name: string;
  content: string;
  type: 'txt' | 'sys' | 'html';
  modifiedAt: number;
}

export interface CustomApp {
  id: string;
  name: string;
  icon: string;
  code: string;
}

export interface WindowState {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  customData?: CustomApp;
}

interface DesktopPos {
  x: number;
  y: number;
}

const INITIAL_WINDOWS: WindowState[] = [
  { id: 'browser', title: 'Prism Web', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 80, y: 40, width: 900, height: 600 },
  { id: 'terminal', title: 'Entropy Terminal', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 120, y: 80, width: 700, height: 450 },
  { id: 'nexus', title: 'Nexus AI', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 20, x: 600, y: 100, width: 450, height: 650 },
  { id: 'settings', title: 'System Settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 200, y: 150, width: 600, height: 500 },
  { id: 'notepad', title: 'Notepad', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 300, y: 250, width: 500, height: 400 },
  { id: 'files', title: 'Chaos Files', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 50, y: 50, width: 600, height: 450 },
  { id: 'store', title: 'ChoasPlay Store', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 150, y: 100, width: 850, height: 600 },
  { id: 'about', title: 'About Choas OS', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 250, y: 120, width: 550, height: 600 },
  { id: 'studio', title: 'App Studio', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 100, y: 50, width: 900, height: 700 },
];

const App: React.FC = () => {
  const [bootPhase, setBootPhase] = useState<'menu' | 'loading' | 'desktop'>('menu');
  const [showWelcome, setShowWelcome] = useState(() => localStorage.getItem('choas_welcome_dismissed') !== 'true');
  const [appData, setAppData] = useState<Record<string, any>>(() => {
    try {
      const saved = localStorage.getItem('choas_app_persistence');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [installedAppIds, setInstalledAppIds] = useState<AppID[]>(() => {
    try {
      const saved = localStorage.getItem('choas_installed_apps');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [customApps, setCustomApps] = useState<CustomApp[]>(() => {
    try {
      const saved = localStorage.getItem('choas_custom_apps');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [desktopPositions, setDesktopPositions] = useState<Record<string, DesktopPos>>(() => {
    try {
      const saved = localStorage.getItem('choas_desktop_layout');
      return saved ? JSON.parse(saved) : { files: { x: 40, y: 40 }, browser: { x: 40, y: 160 }, store: { x: 40, y: 280 }, studio: { x: 40, y: 400 } };
    } catch { return { files: { x: 40, y: 40 } }; }
  });
  const [windows, setWindows] = useState<WindowState[]>(() => {
    try {
      const saved = localStorage.getItem('choas_window_states');
      if (!saved) return INITIAL_WINDOWS;
      const parsed = JSON.parse(saved);
      const merged = [...INITIAL_WINDOWS];
      parsed.forEach((p: WindowState) => {
        const idx = merged.findIndex(m => m.id === p.id);
        if (idx !== -1) merged[idx] = { ...merged[idx], ...p, isOpen: false };
        else if (p.id.startsWith('custom_')) merged.push({ ...p, isOpen: false });
      });
      return merged;
    } catch { return INITIAL_WINDOWS; }
  });

  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('choas_theme') as Theme) || 'dark');
  const [wallpaper, setWallpaper] = useState(() => localStorage.getItem('choas_wallpaper_type') || 'os-bg');
  const [isStartOpen, setIsStartOpen] = useState(false);

  // Persistence Sync
  useEffect(() => {
    localStorage.setItem('choas_installed_apps', JSON.stringify(installedAppIds));
    localStorage.setItem('choas_custom_apps', JSON.stringify(customApps));
    localStorage.setItem('choas_desktop_layout', JSON.stringify(desktopPositions));
    localStorage.setItem('choas_theme', theme);
    localStorage.setItem('choas_window_states', JSON.stringify(windows));
    localStorage.setItem('choas_app_persistence', JSON.stringify(appData));
    localStorage.setItem('choas_wallpaper_type', wallpaper);
  }, [installedAppIds, customApps, desktopPositions, theme, windows, appData, wallpaper]);

  // Mesh Bridge API
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const { type, appId, key, data } = e.data;
      if (type === 'MESH_SAVE') {
        setAppData(prev => ({ ...prev, [appId]: { ...(prev[appId] || {}), [key]: data } }));
      } else if (type === 'MESH_LOAD') {
        (e.source as Window).postMessage({ type: 'MESH_LOAD_RESPONSE', key, data: appData[appId]?.[key] || null }, { targetOrigin: '*' });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [appData]);

  const openApp = useCallback((id: AppID) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 10);
      return prev.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZ + 1 } : w);
    });
    setIsStartOpen(false);
  }, []);

  const closeApp = (id: AppID) => setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  const minimizeApp = (id: AppID) => setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  const focusApp = useCallback((id: AppID) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 10);
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w);
    });
  }, []);

  const handleCreateApp = (app: CustomApp) => {
    setCustomApps(prev => [...prev, app]);
    setWindows(prev => [...prev, {
      id: app.id, title: app.name, isOpen: true, isMinimized: false, isMaximized: false,
      zIndex: Math.max(...prev.map(w => w.zIndex), 10) + 1,
      x: 100, y: 100, width: 600, height: 500, customData: app
    }]);
    setDesktopPositions(pos => ({ ...pos, [app.id]: { x: 160, y: 40 } }));
  };

  const handleUpdateApp = (app: CustomApp) => {
    setCustomApps(prev => prev.map(a => a.id === app.id ? app : a));
    setWindows(prev => prev.map(w => w.id === app.id ? { ...w, title: app.name, customData: app } : w));
  };

  if (bootPhase === 'menu') return <BootMenu onStart={() => { setBootPhase('loading'); setTimeout(() => setBootPhase('desktop'), 1500); }} />;
  if (bootPhase === 'loading') return <div className="h-screen w-screen bg-black flex items-center justify-center text-blue-500 font-mono">INITIALIZING MESH...</div>;

  return (
    <div className={`h-screen w-screen relative overflow-hidden ${wallpaper} ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
      {showWelcome && <WelcomeScreen onDismiss={() => { localStorage.setItem('choas_welcome_dismissed', 'true'); setShowWelcome(false); }} />}
      
      {/* Desktop Icons */}
      <div className="absolute inset-0 z-0">
        {[
          { id: 'files', icon: '📂', label: 'Files' },
          { id: 'browser', icon: '🌐', label: 'Prism' },
          { id: 'store', icon: '🛍️', label: 'Store' },
          { id: 'studio', icon: '🛠️', label: 'Studio' },
          ...customApps.map(a => ({ id: a.id, icon: a.icon, label: a.name }))
        ].map(app => {
          const pos = desktopPositions[app.id] || { x: 40, y: 40 };
          return (
            <div 
              key={app.id} 
              onDoubleClick={() => openApp(app.id)}
              style={{ left: pos.x, top: pos.y }}
              className="absolute flex flex-col items-center gap-1 group w-20 p-2 rounded-2xl hover:bg-white/10 cursor-pointer select-none"
            >
              <div className="text-4xl filter drop-shadow-lg">{app.icon}</div>
              <span className="text-[9px] font-black uppercase text-center text-white/70">{app.label}</span>
            </div>
          );
        })}
      </div>

      {/* Windows Layer */}
      {windows.filter(w => w.isOpen).map(w => (
        <Window 
          key={w.id} theme={theme} window={w} 
          onClose={() => closeApp(w.id)} onMinimize={() => minimizeApp(w.id)} 
          onFocus={() => focusApp(w.id)} onUpdate={(upd) => setWindows(prev => prev.map(win => win.id === w.id ? { ...win, ...upd } : win))} 
          onMaximize={() => setWindows(prev => prev.map(win => win.id === w.id ? { ...win, isMaximized: !win.isMaximized } : win))}
        >
          {w.id === 'browser' && <Browser />}
          {w.id === 'terminal' && <Terminal onRestart={() => window.location.reload()} />}
          {w.id === 'nexus' && <NexusAI theme={theme} />}
          {w.id === 'settings' && <Settings onWallpaperChange={setWallpaper} currentWallpaperType={wallpaper} theme={theme} onThemeChange={setTheme} />}
          {w.id === 'studio' && <AppStudio onCreate={handleCreateApp} onUpdate={handleUpdateApp} existingApps={customApps} theme={theme} />}
          {w.id.startsWith('custom_') && <WebContainer app={customApps.find(a => a.id === w.id) || w.customData!} />}
        </Window>
      ))}

      {isStartOpen && <StartMenu theme={theme} onAppClick={openApp} onClose={() => setIsStartOpen(false)} onRestart={() => window.location.reload()} onShutdown={() => window.location.reload()} installedApps={installedAppIds} />}
      <Dock theme={theme} onStartClick={() => setIsStartOpen(!isStartOpen)} openApps={windows.filter(w => w.isOpen)} onAppClick={focusApp} />
    </div>
  );
};

export default App;
