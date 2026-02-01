
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">C</div>
                <span className="text-xl font-bold tracking-tight">Choas OS</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8">
              Redefining computing through entropy-resistant architecture. 
              Built for those who demand the absolute best in speed, security, and design.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-white/40">Core</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Entropy Kernel</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Prism UI</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Chaos Link</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Zero-Trust</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-white/40">Developers</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">SDK Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">V-Layer Guide</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-white/40">Legal</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Security Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600 text-xs">
          <p>© 2025 Choas Systems International. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-white cursor-pointer transition-colors">Github</span>
            <span className="hover:text-white cursor-pointer transition-colors">Discord</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
