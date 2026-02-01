
import React, { useRef, useState, useEffect } from 'react';
import { WindowState, Theme } from '../App';

interface WindowProps {
  window: WindowState;
  theme: Theme;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onMaximize: () => void;
  onUpdate: (updates: Partial<WindowState>) => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ window, theme, onClose, onMinimize, onFocus, onMaximize, onUpdate, children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    if ((e.target as HTMLElement).closest('.window-handle')) {
      setIsDragging(true);
      const pos = windowRef.current!.getBoundingClientRect();
      setRel({ x: e.pageX - pos.left, y: e.pageY - pos.top });
      onFocus();
    }
  };

  const onResizeStart = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setRel({ x: e.pageX, y: e.pageY });
    onFocus();
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onUpdate({ x: e.pageX - rel.x, y: e.pageY - rel.y });
      } else if (isResizing) {
        const dx = e.pageX - rel.x;
        const dy = e.pageY - rel.y;
        onUpdate({ 
          width: Math.max(300, window.width + dx), 
          height: Math.max(200, window.height + dy) 
        });
        setRel({ x: e.pageX, y: e.pageY });
      }
    };

    const onMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, isResizing, rel, onUpdate, window.width, window.height]);

  const style: React.CSSProperties = window.isMaximized 
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 80px)', // Dock space
        zIndex: window.zIndex,
        borderRadius: 0,
      }
    : {
        width: `${window.width}px`,
        height: `${window.height}px`,
        left: `${window.x}px`,
        top: `${window.y}px`,
        zIndex: window.zIndex,
      };

  const glassClass = theme === 'light' ? 'glass-light' : 'glass';

  return (
    <div
      ref={windowRef}
      onClick={onFocus}
      className={`absolute ${glassClass} flex flex-col overflow-hidden window-shadow transition-[box-shadow,opacity,transform] duration-300 ${isDragging ? 'opacity-80 scale-[0.99]' : ''} ${isResizing ? 'ring-2 ring-blue-500/30' : ''} ${window.isMaximized ? '' : 'rounded-2xl'} ${window.isMinimized ? 'scale-90 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      style={{
        ...style,
        display: window.isMinimized ? 'none' : 'flex'
      }}
    >
      <div className={`window-handle h-11 px-4 flex items-center justify-between border-b ${theme === 'light' ? 'bg-black/5 border-black/5' : 'bg-white/5 border-white/5'} ${window.isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`} onMouseDown={onMouseDown}>
        <div className="flex items-center gap-2">
          <div className="flex gap-2 mr-4">
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors shadow-sm" />
            <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors shadow-sm" />
            <button onClick={(e) => { e.stopPropagation(); onMaximize(); }} className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors shadow-sm" />
          </div>
          <span className={`text-xs font-bold tracking-widest uppercase pointer-events-none ${theme === 'light' ? 'text-slate-800/60' : 'text-white/50'}`}>{window.title}</span>
        </div>
      </div>
      
      <div className={`flex-1 overflow-auto select-text relative ${theme === 'light' ? 'bg-white/10' : 'bg-black/20'}`}>
        {children}
        
        {/* Resize Overlay Dimensions */}
        {isResizing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[60]">
            <div className={`px-4 py-2 rounded-full font-mono text-xs font-black shadow-2xl animate-in fade-in zoom-in duration-150 ${theme === 'light' ? 'bg-white/90 text-blue-600 border border-blue-100' : 'bg-slate-900/90 text-cyan-400 border border-white/10'}`}>
              {Math.round(window.width)} × {Math.round(window.height)}
            </div>
          </div>
        )}
      </div>
      
      {!window.isMaximized && (
        <div 
          onMouseDown={onResizeStart}
          className={`absolute bottom-0 right-0 w-8 h-8 cursor-nwse-resize flex items-end justify-end p-1 transition-all group z-[100] ${isResizing ? 'bg-blue-500/10' : 'hover:bg-white/5'}`}
        >
          <div className={`w-4 h-4 border-r-2 border-b-2 transition-colors ${isResizing ? 'border-blue-500' : (theme === 'light' ? 'border-slate-400' : 'border-white/20')} group-hover:border-blue-500`} />
          <div className={`absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 opacity-50 transition-colors ${isResizing ? 'border-blue-500' : (theme === 'light' ? 'border-slate-400' : 'border-white/20')} group-hover:border-blue-500`} />
        </div>
      )}
    </div>
  );
};
