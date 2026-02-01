
import React from 'react';

export const TechnicalSpecs: React.FC = () => {
  return (
    <div className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-black mb-8">The Entropy Kernel</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center font-bold">01</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Microkernel Architecture</h4>
                  <p className="text-gray-400">Unlike monolithic kernels, Entropy moves drivers and filesystems to user space, preventing a single failure from crashing the entire system.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-purple-500 flex items-center justify-center font-bold">02</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Memory Mirroring</h4>
                  <p className="text-gray-400">Redundant memory pages ensure that even hardware errors in RAM are corrected in real-time without user notification.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-cyan-500 flex items-center justify-center font-bold">03</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Quantum Resilience</h4>
                  <p className="text-gray-400">The bootloader and kernel drivers are signed using CRYSTALS-Kyber and Dilithium for protection against future quantum attacks.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full glass rounded-3xl p-8 border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
            <div className="relative space-y-6">
                <div className="flex justify-between items-center text-sm font-bold uppercase text-white/40 mb-4">
                    <span>Performance Metrics</span>
                    <span className="text-green-500">Optimized</span>
                </div>
                {[
                  { label: "Boot Time", value: "1.2s", width: "w-[90%]" },
                  { label: "Context Switching", value: "0.02μs", width: "w-[95%]" },
                  { label: "Memory Footprint", value: "180MB", width: "w-[70%]" },
                  { label: "App Start Speed", value: "Instant", width: "w-[100%]" }
                ].map((metric, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2 text-sm">
                        <span>{metric.label}</span>
                        <span className="font-mono text-blue-400">{metric.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full ${metric.width} transition-all duration-1000 delay-300`} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
