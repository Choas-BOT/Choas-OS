
import React from 'react';
import { FileItem } from '../App';

interface FilesProps {
  files: FileItem[];
  onOpenFile: (file: FileItem) => void;
  onDelete: (id: string) => void;
}

export const Files: React.FC<FilesProps> = ({ files, onOpenFile, onDelete }) => {
  return (
    <div className="h-full flex flex-col bg-slate-50 text-slate-800">
      <div className="p-4 bg-white border-b border-slate-200 flex items-center gap-4">
        <div className="flex gap-1">
          <button className="p-1.5 hover:bg-slate-100 rounded">←</button>
          <button className="p-1.5 hover:bg-slate-100 rounded">→</button>
        </div>
        <div className="flex-1 bg-slate-100 rounded-lg px-3 py-1 text-xs text-slate-500 border border-slate-200 font-mono">
          Root / User / Documents
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
          {files.map(file => (
            <div 
              key={file.id} 
              className="group relative flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all"
            >
              <button 
                onDoubleClick={() => onOpenFile(file)}
                className="flex flex-col items-center gap-2"
              >
                <div className="text-4xl group-hover:scale-110 transition-transform select-none">
                  {file.type === 'txt' ? '📄' : '⚙️'}
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold truncate max-w-[80px]">{file.name}</div>
                  <div className="text-[8px] text-slate-400">{file.type.toUpperCase()}</div>
                </div>
              </button>
              
              {file.type === 'txt' && (
                <button 
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete ${file.name}?`)) {
                      onDelete(file.id);
                    }
                  }}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 p-1 bg-red-50 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all text-[8px]"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 border-t border-slate-200 bg-white">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Storage Diagnostics</h4>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
             <div className="h-full bg-blue-500" style={{ width: `${Math.min(100, (files.length / 50) * 100)}%` }} />
          </div>
          <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
            {files.length} Files / 50 Max
          </span>
        </div>
      </div>
    </div>
  );
};
