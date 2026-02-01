
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Theme } from '../App';

interface NexusAIProps {
  theme: Theme;
}

// Fixed: Added theme to props to resolve Type error in App.tsx
export const NexusAI: React.FC<NexusAIProps> = ({ theme }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isLight = theme === 'light';

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      // Fixed: Initializing GoogleGenAI with process.env.API_KEY directly as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "You are Nexus, the AI operating system intelligence of Choas OS. You help users manage their system, explain the Entropy Kernel, and act as a super-intelligent companion. Your tone is futuristic, sleek, and high-tech.",
          temperature: 0.9,
        },
      });
      // response.text is a property, not a method
      setMessages(prev => [...prev, { role: 'assistant', text: response.text || "Mesh connectivity issues." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: "The Entropy Mesh is recalibrating. Please retry." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`h-full flex flex-col ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950/40 text-white'}`}>
      <div className={`p-6 ${isLight ? 'bg-blue-600/5 border-black/5' : 'bg-blue-600/10 border-white/5'} border-b flex items-center gap-4`}>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-cyan-500/20">N</div>
        <div>
          <h2 className={`text-sm font-black uppercase tracking-widest ${isLight ? 'text-slate-800' : 'text-white'}`}>Nexus Intelligence</h2>
          <p className="text-[10px] text-cyan-400 font-mono">CORE STATUS: SYNCHRONIZED</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className={`h-full flex items-center justify-center text-center p-12 italic text-sm ${isLight ? 'text-slate-400' : 'opacity-30'}`}>
            "Hello. I am Nexus. How can I optimize your Chaos environment today?"
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : (isLight ? 'bg-white border border-slate-200 shadow-sm' : 'glass border border-white/10 rounded-tl-none')}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-blue-400 animate-pulse font-mono px-4">DECRYPTING RESPONSE...</div>}
      </div>

      <div className={`p-4 ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'} border-t`}>
        <div className="flex gap-2">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="System command or query..."
            className={`flex-1 ${isLight ? 'bg-white text-slate-900 border-slate-300' : 'bg-black/40 text-white border-white/10'} border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors`}
          />
          <button 
            onClick={handleSend}
            className="bg-blue-600 px-6 py-2 rounded-xl text-xs font-bold text-white hover:bg-blue-500 transition-colors"
          >
            EXEC
          </button>
        </div>
      </div>
    </div>
  );
};
