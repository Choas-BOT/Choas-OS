
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          v1.0 "Entropy" Now Available
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tighter">
          The Operating System <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
            For Tomorrow
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Choas OS is a next-generation computing environment built on the 
          <strong> Entropy Kernel</strong>. Fast, secure, and infinitely customizable.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all transform hover:-translate-y-1">
            Get Started
          </button>
          <button className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-all border border-white/10">
            Read Documentation
          </button>
        </div>
      </div>

      {/* Floating Elements Mockup */}
      <div className="mt-20 relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10">
        <img 
          src="https://picsum.photos/seed/choas-os/1600/900" 
          alt="Choas OS Desktop" 
          className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass p-8 rounded-3xl border border-white/20 text-center max-w-md mx-4">
                <h3 className="text-2xl font-bold mb-2">Prism UI Engine</h3>
                <p className="text-gray-400 text-sm italic">"Visual perfection meets raw performance."</p>
            </div>
        </div>
      </div>
    </div>
  );
};
