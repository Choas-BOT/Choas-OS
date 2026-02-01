
import React, { useState, useEffect } from 'react';

const BOOKMARKS = [
  { name: 'Google', url: 'https://www.google.com/search?q=Choas+OS', icon: '🔍' },
  { name: 'Wikipedia', url: 'https://en.wikipedia.org', icon: '📖' },
  { name: 'NASA', url: 'https://www.nasa.gov', icon: '🚀' },
  { name: 'The Verge', url: 'https://www.theverge.com', icon: '📰' },
  { name: 'Reddit', url: 'https://www.reddit.com', icon: '🧡' },
];

export const Browser: React.FC = () => {
  const [url, setUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const navigateTo = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return;

    let targetUrl = '';
    // Detect if it's a search or a URL
    const isUrl = trimmed.includes('.') && !trimmed.includes(' ');

    if (isUrl) {
      targetUrl = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
    } else {
      // Direct Google Search Engine Submission
      targetUrl = `https://www.google.com/search?q=${encodeURIComponent(trimmed)}&igu=1`;
    }

    setUrl(targetUrl);
    setInputUrl(targetUrl);
    setIsLoading(true);
    setHasError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') navigateTo(inputUrl);
  };

  useEffect(() => {
    // Reset loading after a timeout to handle iframe behavior
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className="h-full flex flex-col bg-white text-slate-900 select-text font-sans overflow-hidden">
      {/* Browser Toolbar */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-100 bg-white z-20 shadow-sm">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => { setUrl(''); setInputUrl(''); }}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
            title="Home"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          </button>
        </div>

        <div className="flex-1 flex items-center bg-slate-100 rounded-xl px-4 py-1.5 border border-transparent focus-within:border-blue-500/30 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/5 transition-all">
          <span className="text-xs mr-2 opacity-40">🔒</span>
          <input 
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search Google or type a URL..."
            className="w-full bg-transparent border-none outline-none text-xs font-bold text-slate-700 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2">
          {isLoading && (
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          )}
          <div className="hidden sm:block px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-black uppercase tracking-tighter">
            Prism v10 Engine
          </div>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 relative bg-slate-50">
        {!url ? (
          <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-slate-50">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-4xl font-black mb-8 shadow-2xl shadow-blue-500/20 animate-bounce">G</div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Prism Browser</h1>
            <p className="text-slate-400 text-sm mb-12 font-medium">Powered by real-time Entropy Mesh networking.</p>
            
            <div className="w-full max-w-2xl grid grid-cols-2 md:grid-cols-5 gap-3">
              {BOOKMARKS.map(bm => (
                <button 
                  key={bm.name}
                  onClick={() => navigateTo(bm.url)}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-slate-100 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">{bm.icon}</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{bm.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col relative">
            {/* The Real Iframe Engine */}
            <iframe 
              src={url}
              className="w-full h-full border-none bg-white"
              title="Prism Web Engine"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />

            {/* Shield & Bypass Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none w-full max-w-md px-6">
              <div className="w-full p-4 glass-light border border-blue-500/20 rounded-2xl shadow-2xl pointer-events-auto text-center backdrop-blur-md">
                 <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">Entropy Isolation Active</div>
                 <p className="text-[10px] text-slate-500 font-medium mb-3 leading-tight">
                    Some sites (Google/YouTube) block themselves from display within iframes for security. 
                    If this window is blank, use the native bypass below.
                 </p>
                 <div className="flex gap-2 justify-center">
                    <button 
                       onClick={() => setUrl('')}
                       className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-[10px] font-black uppercase hover:bg-slate-300 transition-colors"
                    >
                       Back
                    </button>
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
                    >
                      Bypass Shield ↗
                    </a>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Browser Footer Status */}
      <div className="px-4 py-1.5 bg-slate-50 border-t border-slate-100 flex justify-between items-center font-bold text-[9px] text-slate-400 uppercase tracking-widest">
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1.5 text-blue-500">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
             Core Synchronized
          </span>
          <span className="opacity-50">Encrypted Tunnel: ON</span>
        </div>
        <div className="flex gap-4">
          <span>{url ? 'RENDER_MODE: IFRAME' : 'MODE: READY'}</span>
        </div>
      </div>
    </div>
  );
};
