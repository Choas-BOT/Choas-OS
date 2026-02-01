
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

export const NIAIExperience: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
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
          systemInstruction: "You are Nexus, the built-in AI assistant for Choas OS. You are futuristic, helpful, and technically expert about the OS. Choas OS uses the Entropy Kernel (Rust-based microkernel), Prism UI, and Zero-Trust hardware isolation. Keep responses concise and insightful.",
          temperature: 0.7,
        },
      });

      // response.text is a property
      const aiText = response.text || "I'm processing your request via the Entropy Mesh...";
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Connectivity interrupted. The Entropy Mesh is recalibrating." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 px-6 bg-gradient-to-t from-black to-[#050505]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-4">Meet Nexus</h2>
          <p className="text-gray-400">The first OS-integrated AI that predicts your needs before you do.</p>
        </div>

        <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[500px]">
          <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20 animate-pulse">N</div>
              <div>
                <div className="text-sm font-bold">Nexus Assistant</div>
                <div className="text-[10px] text-green-400 uppercase tracking-widest font-bold">System Level v4.2</div>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 p-6 overflow-y-auto space-y-6 scroll-smooth"
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 italic space-y-4">
                <p>"Ask me about the Entropy Kernel, app compatibility, or how to secure your workspace."</p>
                <div className="flex gap-2">
                    {['Security', 'Performance', 'Apps'].map(t => (
                        <button key={t} onClick={() => setInput(`Tell me about ${t} in Choas OS`)} className="px-4 py-1 rounded-full border border-white/10 text-xs hover:bg-white/5 transition-colors">
                            {t}
                        </button>
                    ))}
                </div>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'glass border border-white/10 rounded-tl-none'}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="glass p-4 rounded-2xl rounded-tl-none animate-pulse">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 bg-white/5">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Talk to Nexus..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="absolute right-3 px-4 py-2 bg-blue-600 rounded-lg text-sm font-bold hover:bg-blue-500 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
