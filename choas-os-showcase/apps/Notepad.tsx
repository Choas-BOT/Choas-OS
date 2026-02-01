
import React, { useState, useEffect } from 'react';
import { FileItem } from '../App';

interface NotepadProps {
  files: FileItem[];
  onSave: (id: string, content: string) => void;
  onCreate: (name: string, content: string) => FileItem;
  activeFileId: string | null;
  setActiveFileId: (id: string | null) => void;
}

export const Notepad: React.FC<NotepadProps> = ({ files, onSave, onCreate, activeFileId, setActiveFileId }) => {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('untitled.txt');
  const [isSaved, setIsSaved] = useState(true);

  // Sync with system-wide active file
  useEffect(() => {
    if (activeFileId) {
      const file = files.find(f => f.id === activeFileId);
      if (file) {
        setContent(file.content);
        setFileName(file.name);
        setIsSaved(true);
      }
    } else {
      setContent('');
      setFileName('untitled.txt');
      setIsSaved(true);
    }
  }, [activeFileId, files]);

  const handleSave = () => {
    if (activeFileId) {
      onSave(activeFileId, content);
      setIsSaved(true);
    } else {
      const name = prompt('Enter file name:', fileName) || 'untitled.txt';
      const newFile = onCreate(name, content);
      setActiveFileId(newFile.id);
      setIsSaved(true);
    }
  };

  const handleNew = () => {
    setActiveFileId(null);
    setContent('');
    setFileName('untitled.txt');
    setIsSaved(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  return (
    <div className="h-full flex flex-col bg-white text-slate-800 font-sans">
      <div className="flex items-center gap-4 px-4 py-2 bg-slate-50 border-b border-slate-200">
        <div className="flex gap-2">
          <button 
            onClick={handleNew}
            className="px-3 py-1 text-xs font-bold hover:bg-slate-200 rounded transition-colors"
          >
            New
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaved && !!activeFileId}
            className={`px-3 py-1 text-xs font-bold rounded transition-colors ${isSaved && !!activeFileId ? 'text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-[10px] text-slate-400 font-mono">FILESYSTEM:</span>
          <span className="text-xs font-bold truncate max-w-[200px]">{fileName}{!isSaved && '*'}</span>
        </div>
      </div>

      <div className="flex-1 relative">
        <textarea 
          value={content}
          onChange={handleContentChange}
          placeholder="Start typing your thoughts..."
          className="absolute inset-0 w-full h-full p-6 outline-none resize-none text-sm leading-relaxed font-mono"
          spellCheck={false}
        />
      </div>

      <div className="px-4 py-1.5 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400">
        <div className="flex gap-4">
          <span>{content.length} characters</span>
          <span>{content.split(/\s+/).filter(x => x).length} words</span>
        </div>
        <div className="font-mono flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full ${isSaved ? 'bg-green-500' : 'bg-orange-500'}`} />
          {isSaved ? 'STORAGE SYNCED' : 'UNSAVED CHANGES'}
        </div>
      </div>
    </div>
  );
};
