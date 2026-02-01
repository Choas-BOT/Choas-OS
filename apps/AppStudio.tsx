
import React, { useState, useEffect } from 'react';
import { CustomApp, Theme } from '../App';

interface AppStudioProps {
  onCreate: (app: CustomApp) => void;
  onUpdate: (app: CustomApp) => void;
  existingApps: CustomApp[];
  theme: Theme;
}

const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Choas OS App</title>
  <style>
    /* 1. Global Styles */
    body { 
      background: #0f172a; 
      color: #38bdf8; 
      font-family: 'Segoe UI', system-ui, sans-serif;
      display: flex; 
      flex-direction: column; 
      align-items: center; 
      justify-content: center; 
      height: 100vh; 
      margin: 0; 
      overflow: hidden;
    }

    /* 2. UI Components */
    .container {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 2.5rem;
      border-radius: 2rem;
      text-align: center;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
    }

    input {
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid #38bdf8;
      color: white;
      padding: 0.8rem;
      border-radius: 0.8rem;
      margin: 1rem 0;
      width: 250px;
      outline: none;
    }

    button {
      background: #0284c7;
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 1rem;
      cursor: pointer;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      transition: all 0.2s;
    }

    button:hover { background: #0369a1; transform: scale(1.05); }
    button:active { transform: scale(0.95); }

    .status { font-size: 11px; margin-top: 1rem; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Entropy App</h1>
    <p>This is a persistent app built for Choas OS.</p>
    
    <input id="myInput" type="text" placeholder="Type something to save..." />
    <br/>
    <button onclick="saveData()">Save to Mesh</button>
    
    <div id="statusLabel" class="status">Waiting for user...</div>
  </div>

  <script>
    // --- CHOAS OS PERSISTENCE SDK ---
    // Use EntropyMesh.save(key, data) to store info forever.
    // Use EntropyMesh.load(key, callback) to get it back.

    const input = document.getElementById('myInput');
    const label = document.getElementById('statusLabel');

    // Automatically load data when the app opens
    window.addEventListener('load', () => {
      if (window.EntropyMesh) {
        window.EntropyMesh.load('user_text', (savedValue) => {
          if (savedValue) {
            input.value = savedValue;
            label.innerText = "Data restored from Entropy Mesh.";
          }
        });
      }
    });

    function saveData() {
      if (window.EntropyMesh) {
        const val = input.value;
        window.EntropyMesh.save('user_text', val);
        label.innerText = "Data successfully synchronized.";
        setTimeout(() => { label.innerText = "Session active."; }, 2000);
      }
    }
  </script>
</body>
</html>`;

export const AppStudio: React.FC<AppStudioProps> = ({ onCreate, onUpdate, existingApps, theme }) => {
  const [selectedId, setSelectedId] = useState<string | 'new'>('new');
  const [name, setName] = useState('New Project');
  const [icon, setIcon] = useState('🚀');
  const [code, setCode] = useState(HTML_TEMPLATE);
  const isLight = theme === 'light';

  useEffect(() => {
    if (selectedId === 'new') {
      setName('New Project'); setIcon('🚀'); setCode(HTML_TEMPLATE);
    } else {
      const app = existingApps.find(a => a.id === selectedId);
      if (app) { setName(app.name); setIcon(app.icon); setCode(app.code); }
    }
  }, [selectedId, existingApps]);

  const handleSave = () => {
    if (selectedId === 'new') {
      const id = `custom_${Date.now()}`;
      onCreate({ id, name, icon, code });
      setSelectedId(id);
    } else {
      onUpdate({ id: selectedId, name, icon, code });
    }
    alert("Project saved successfully.");
  };

  return (
    <div className={`h-full flex flex-col ${isLight ? 'bg-white' : 'bg-slate-950 text-white'} font-sans`}>
      <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🛠️</div>
          <h2 className="text-xs font-black uppercase tracking-widest">App Studio</h2>
        </div>
        <div className="flex gap-2">
          <select value={selectedId} onChange={e => setSelectedId(e.target.value)} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] font-bold uppercase">
            <option value="new">+ NEW PROJECT</option>
            {existingApps.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <button onClick={handleSave} className="bg-blue-600 px-4 py-1 rounded text-[10px] font-black uppercase">Deploy</button>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-48 p-4 border-r border-white/10 space-y-4">
          <div><label className="text-[10px] block opacity-50 mb-1 font-bold">NAME</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs" /></div>
          <div><label className="text-[10px] block opacity-50 mb-1 font-bold">ICON</label>
          <input value={icon} onChange={e => setIcon(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs" /></div>
        </div>
        <textarea value={code} onChange={e => setCode(e.target.value)} className="flex-1 p-4 bg-transparent font-mono text-sm outline-none resize-none" spellCheck={false} />
      </div>
    </div>
  );
};
