
import React, { useState, useEffect } from 'react';

interface BootMenuProps {
  onStart: (choice: string) => void;
}

export const BootMenu: React.FC<BootMenuProps> = ({ onStart }) => {
  const [selected, setSelected] = useState(0);
  const options = [
    { label: 'Boot Choas OS v1.0 (Stable)', value: 'Stable' },
    { label: 'Choas OS Recovery Console', value: 'Recovery' },
    { label: 'Advanced System Options', value: 'Advanced' },
    { label: 'BIOS / UEFI Settings', value: 'BIOS' },
  ];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') setSelected(s => Math.max(0, s - 1));
      if (e.key === 'ArrowDown') setSelected(s => Math.min(options.length - 1, s + 1));
      if (e.key === 'Enter') onStart(options[selected].value);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onStart, options, selected]);

  return (
    <div className="h-screen w-screen bg-black text-white font-mono p-12 flex flex-col justify-between select-none">
      <div className="space-y-4">
        <div className="text-blue-500 font-bold text-xl mb-8">CHOAS SYSTEMS - ENTROPY BIOS v4.2.0</div>
        <div className="text-xs text-gray-500 uppercase tracking-widest">System Diagnostics:</div>
        <div className="text-xs space-y-1">
          <p>Processor: Choas Quantum Core i9 [OK]</p>
          <p>Memory: 65536MB LPDDR6 [OK]</p>
          <p>Storage: NVMe Gen5 4.0TB [OK]</p>
          <p>Security: Zero-Trust TPM 3.0 [ACTIVE]</p>
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-sm text-gray-400">Select Boot Media:</p>
        <div className="space-y-2">
          {options.map((opt, i) => (
            <div 
              key={i} 
              onClick={() => onStart(opt.value)}
              className={`px-4 py-2 text-sm cursor-pointer transition-colors ${selected === i ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              {selected === i ? '> ' : '  '}{opt.label}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-end border-t border-white/10 pt-8">
        <div className="text-[10px] text-gray-600">
          <p>Use [UP/DOWN] to navigate, [ENTER] to select.</p>
          <p>F12 for Network Boot, ESC for System Setup.</p>
        </div>
        <div className="text-right">
          <div className="w-8 h-8 bg-blue-600/20 rounded flex items-center justify-center font-bold text-blue-500 border border-blue-500/30">C</div>
        </div>
      </div>
    </div>
  );
};
