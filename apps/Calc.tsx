
import React, { useState } from 'react';

export const Calc: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);
  const [pending, setPending] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);

  const handleNum = (n: string) => {
    setDisplay(prev => prev === '0' ? n : prev + n);
  };

  const handleOp = (nextOp: string) => {
    setPending(parseFloat(display));
    setOp(nextOp);
    setDisplay('0');
  };

  const calculate = () => {
    if (pending === null || op === null) return;
    const current = parseFloat(display);
    let result = 0;
    switch(op) {
      case '+': result = pending + current; break;
      case '-': result = pending - current; break;
      case '*': result = pending * current; break;
      case '/': result = pending / current; break;
    }
    const calculation = `${pending} ${op} ${current} = ${result}`;
    setHistory(prev => [calculation, ...prev].slice(0, 5));
    setDisplay(result.toString());
    setPending(null);
    setOp(null);
  };

  const clear = () => {
    setDisplay('0');
    setPending(null);
    setOp(null);
  };

  const btnClass = "h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all active:scale-95";
  const numBtn = `${btnClass} bg-white/5 hover:bg-white/10 text-white`;
  const opBtn = `${btnClass} bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/20`;

  return (
    <div className="h-full bg-slate-950 flex flex-col p-6 font-sans select-none">
      <div className="mb-6">
        <div className="text-right text-[10px] text-blue-400 font-mono mb-1 h-4">
          {pending !== null ? `${pending} ${op}` : ''}
        </div>
        <div className="text-right text-3xl font-black text-white truncate tracking-tighter">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6">
        <button onClick={clear} className={`${btnClass} col-span-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20`}>CLEAR</button>
        <button onClick={() => handleOp('/')} className={opBtn}>÷</button>
        <button onClick={() => handleOp('*')} className={opBtn}>×</button>

        {[7, 8, 9].map(n => <button key={n} onClick={() => handleNum(n.toString())} className={numBtn}>{n}</button>)}
        <button onClick={() => handleOp('-')} className={opBtn}>−</button>

        {[4, 5, 6].map(n => <button key={n} onClick={() => handleNum(n.toString())} className={numBtn}>{n}</button>)}
        <button onClick={() => handleOp('+')} className={opBtn}>+</button>

        {[1, 2, 3].map(n => <button key={n} onClick={() => handleNum(n.toString())} className={numBtn}>{n}</button>)}
        <button onClick={calculate} className={`${opBtn} row-span-2 h-auto bg-blue-600 text-white`}>=</button>

        <button onClick={() => handleNum('0')} className={`${numBtn} col-span-2`}>0</button>
        <button onClick={() => handleNum('.')} className={numBtn}>.</button>
      </div>

      <div className="flex-1 border-t border-white/5 pt-4">
        <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-3">Kernel Log</h4>
        <div className="space-y-2">
          {history.map((h, i) => (
            <div key={i} className="text-[10px] font-mono text-white/40 flex justify-between">
              <span className="opacity-50">[{i}]</span>
              <span>{h}</span>
            </div>
          ))}
          {history.length === 0 && <div className="text-[10px] text-white/10 italic text-center py-4">No recent operations</div>}
        </div>
      </div>
    </div>
  );
};
