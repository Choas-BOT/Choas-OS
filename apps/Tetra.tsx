
import React, { useState, useEffect, useCallback, useRef } from 'react';

const COLS = 10;
const ROWS = 20;
const SHAPES = {
  I: [[1, 1, 1, 1]],
  L: [[1, 0, 0], [1, 1, 1]],
  J: [[0, 0, 1], [1, 1, 1]],
  O: [[1, 1], [1, 1]],
  Z: [[1, 1, 0], [0, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  T: [[0, 1, 0], [1, 1, 1]],
};

const COLORS = {
  I: 'bg-cyan-400',
  L: 'bg-orange-400',
  J: 'bg-blue-400',
  O: 'bg-yellow-400',
  Z: 'bg-red-400',
  S: 'bg-green-400',
  T: 'bg-purple-400',
};

interface TetraProps {
  isActive?: boolean;
  highScore: number;
  onGameOver: (score: number) => void;
}

export const Tetra: React.FC<TetraProps> = ({ isActive, highScore, onGameOver }) => {
  const [grid, setGrid] = useState<string[][]>(Array.from({ length: ROWS }, () => Array(COLS).fill('')));
  const [piece, setPiece] = useState<{ x: number, y: number, shape: number[][], type: string } | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const spawnPiece = useCallback(() => {
    const keys = Object.keys(SHAPES);
    const type = keys[Math.floor(Math.random() * keys.length)];
    const shape = (SHAPES as any)[type];
    const newPiece = { x: Math.floor(COLS / 2) - 1, y: 0, shape, type };
    if (checkCollision(newPiece.x, newPiece.y, shape, grid)) {
      setGameOver(true);
      onGameOver(score);
      return null;
    }
    return newPiece;
  }, [grid, score, onGameOver]);

  const checkCollision = (x: number, y: number, shape: number[][], currentGrid: string[][]) => {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const newX = x + c;
          const newY = y + r;
          if (newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && currentGrid[newY][newX])) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const rotate = (shape: number[][]) => {
    return shape[0].map((_, i) => shape.map(row => row[i]).reverse());
  };

  const lockPiece = useCallback(() => {
    if (!piece) return;
    const newGrid = grid.map(row => [...row]);
    piece.shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell && piece.y + r >= 0) {
          newGrid[piece.y + r][piece.x + c] = piece.type;
        }
      });
    });

    let linesCleared = 0;
    const filteredGrid = newGrid.filter(row => {
      const isFull = row.every(cell => cell !== '');
      if (isFull) linesCleared++;
      return !isFull;
    });

    while (filteredGrid.length < ROWS) filteredGrid.unshift(Array(COLS).fill(''));
    setScore(s => s + [0, 100, 300, 500, 800][linesCleared]);
    setGrid(filteredGrid);
    setPiece(spawnPiece());
  }, [piece, grid, spawnPiece]);

  const moveDown = useCallback(() => {
    if (!piece || gameOver || !isActive) return;
    if (!checkCollision(piece.x, piece.y + 1, piece.shape, grid)) {
      setPiece(prev => prev ? { ...prev, y: prev.y + 1 } : null);
    } else lockPiece();
  }, [piece, grid, gameOver, isActive, lockPiece]);

  useEffect(() => {
    if (!piece && !gameOver) setPiece(spawnPiece());
  }, [piece, gameOver, spawnPiece]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isActive || !piece || gameOver) return;
      if (e.key === 'ArrowLeft' && !checkCollision(piece.x - 1, piece.y, piece.shape, grid)) setPiece(p => p ? { ...p, x: p.x - 1 } : null);
      if (e.key === 'ArrowRight' && !checkCollision(piece.x + 1, piece.y, piece.shape, grid)) setPiece(p => p ? { ...p, x: p.x + 1 } : null);
      if (e.key === 'ArrowDown') moveDown();
      if (e.key === 'ArrowUp') {
        const nextShape = rotate(piece.shape);
        if (!checkCollision(piece.x, piece.y, nextShape, grid)) setPiece(p => p ? { ...p, shape: nextShape } : null);
      }
      if (e.key === ' ') {
        let targetY = piece.y;
        while (!checkCollision(piece.x, targetY + 1, piece.shape, grid)) targetY++;
        setPiece(p => p ? { ...p, y: targetY } : null);
      }
    };
    window.addEventListener('keydown', handleKey);
    const interval = setInterval(moveDown, Math.max(100, 800 - (Math.floor(score / 500) * 100)));
    return () => {
      window.removeEventListener('keydown', handleKey);
      clearInterval(interval);
    };
  }, [isActive, piece, grid, gameOver, moveDown, score]);

  const reset = () => {
    setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill('')));
    setScore(0);
    setGameOver(false);
    setPiece(null);
  };

  return (
    <div className="h-full bg-slate-950 flex flex-col items-center justify-center p-4 font-mono select-none">
      <div className="w-[200px] flex justify-between mb-4 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
        <div className="flex flex-col">
          <span>Score: {score}</span>
          <span className="opacity-40">Best: {highScore}</span>
        </div>
        <span className={isActive ? 'animate-pulse' : 'opacity-20'}>Active</span>
      </div>

      <div className="relative bg-black border-2 border-white/5 shadow-2xl overflow-hidden" style={{ width: '200px', height: '400px' }}>
        <div className="grid grid-cols-10 h-full">
          {grid.map((row, r) => row.map((cell, c) => {
            const isPiece = piece && piece.shape[r - piece.y]?.[c - piece.x];
            const type = isPiece ? piece.type : cell;
            return <div key={`${r}-${c}`} className={`w-full h-full border-[0.5px] border-white/5 ${type ? (COLORS as any)[type] : 'bg-transparent'}`} />;
          }))}
        </div>
        {gameOver && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-red-500 font-black text-xl mb-4 tracking-tighter uppercase">Simulation Failed</h2>
            <button onClick={reset} className="px-6 py-2 bg-cyan-600 text-white text-[10px] font-bold uppercase tracking-widest rounded active:scale-95">Recalibrate</button>
          </div>
        )}
      </div>
    </div>
  );
};
