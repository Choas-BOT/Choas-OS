
import React from 'react';

interface WelcomeScreenProps {
  onDismiss: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onDismiss }) => {
  return (
    <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center p-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[150px] animate-pulse delay-700" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
      
      <div className="relative max-w-xl w-full glass rounded-[3rem] p-12 border border-white/10 shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-1000">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] flex items-center justify-center text-5xl font-black text-white shadow-2xl shadow-blue-500/40 mb-8 animate-bounce">
          C
        </div>
        
        <h1 className="text-4xl font-black text-white tracking-tighter mb-4">
          Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Choas OS</span>
        </h1>
        
        <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-xs mx-auto font-medium">
          You are now connected to the <span className="text-blue-400">Entropy Mesh</span>. 
          Experience a system where isolation is the standard and performance is absolute.
        </p>

        <div className="grid grid-cols-2 gap-4 w-full mb-10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-left">
            <div className="text-blue-400 text-lg mb-1">🦀</div>
            <div className="text-[10px] font-black text-white uppercase tracking-widest">Entropy Kernel</div>
            <div className="text-[9px] text-white/40 leading-tight mt-1">Rust-powered microkernel architecture.</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-left">
            <div className="text-cyan-400 text-lg mb-1">🛡️</div>
            <div className="text-[10px] font-black text-white uppercase tracking-widest">Zero-Trust</div>
            <div className="text-[9px] text-white/40 leading-tight mt-1">Hardware isolation for every process.</div>
          </div>
        </div>

        <button 
          onClick={onDismiss}
          className="group relative w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/10"
        >
          <span className="relative z-10">Initialize Session</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-10 transition-opacity" />
        </button>
        
        <div className="mt-8 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Secure Handshake: Established</span>
        </div>
      </div>

      {/* Futuristic Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-[1001] bg-[length:100%_4px,3px_100%]" />
    </div>
  );
};
