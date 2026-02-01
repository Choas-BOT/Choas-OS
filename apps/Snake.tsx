
import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_FOOD = { x: 5, y: 5 };

interface SnakeProps {
  isActive?: boolean;
  highScore: number;
  onGameOver: (score: number) => void;
}

export const Snake: React.FC<SnakeProps> = ({ isActive, highScore, onGameOver }) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const dirRef = useRef({ x: 0, y: -1 });
  const lastProcessedDirRef = useRef({ x: 0, y: -1 });

  const moveSnake = useCallback(() => {
    if (gameOver || !isActive) return;

    setSnake(prev => {
      const head = prev[0];
      const newHead = { x: head.x + dirRef.current.x, y: head.y + dirRef.current.y };
      lastProcessedDirRef.current = dirRef.current;

      // Wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameOver(true);
        onGameOver(score);
        return prev;
      }

      // Self collision
      if (prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
        setGameOver(true);
        onGameOver(score);
        return prev;
      }

      const newSnake = [newHead, ...prev];

      // Food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 100);
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE)
        });
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, gameOver, isActive, score, onGameOver]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isActive || gameOver) return;
      const { x, y } = lastProcessedDirRef.current;
      switch (e.key) {
        case 'ArrowUp': if (y === 0) dirRef.current = { x: 0, y: -1 }; break;
        case 'ArrowDown': if (y === 0) dirRef.current = { x: 0, y: 1 }; break;
        case 'ArrowLeft': if (x === 0) dirRef.current = { x: -1, y: 0 }; break;
        case 'ArrowRight': if (x === 0) dirRef.current = { x: 1, y: 0 }; break;
      }
    };
    window.addEventListener('keydown', handleKey);
    const speed = Math.max(50, 150 - Math.floor(score / 200) * 10);
    const interval = setInterval(moveSnake, speed);
    return () => {
      window.removeEventListener('keydown', handleKey);
      clearInterval(interval);
    };
  }, [moveSnake, score, isActive, gameOver]);

  const reset = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    dirRef.current = { x: 0, y: -1 };
    lastProcessedDirRef.current = { x: 0, y: -1 };
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="h-full bg-black flex flex-col items-center justify-center p-4 font-mono select-none">
      <div className="flex justify-between w-full max-w-[300px] mb-4 text-green-500 font-bold text-[10px] uppercase tracking-widest">
        <div className="flex flex-col">
          <span>Score: {score.toString().padStart(6, '0')}</span>
          <span className="opacity-50">Best: {highScore.toString().padStart(6, '0')}</span>
        </div>
        <span className={isActive ? 'animate-pulse' : 'opacity-20'}>{isActive ? 'LINKED' : 'PAUSED'}</span>
      </div>

      <div 
        className={`relative bg-slate-900 border-2 transition-colors duration-500 ${isActive ? 'border-green-500/40' : 'border-white/10'} shadow-[0_0_20px_rgba(34,197,94,0.1)] overflow-hidden`}
        style={{ width: '300px', height: '300px', display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          const isHead = snake[0].x === x && snake[0].y === y;

          return (
            <div 
              key={i} 
              className={`w-full h-full ${
                isHead ? 'bg-green-400 shadow-[0_0_10px_#4ade80]' : 
                isSnake ? 'bg-green-600/60' : 
                isFood ? 'bg-red-500 animate-pulse rounded-full scale-75' : 'bg-transparent'
              }`}
            />
          );
        })}

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-red-500 font-black text-2xl mb-2 tracking-tighter uppercase">Signal Lost</h2>
            <button 
              onClick={reset}
              className="mt-4 px-6 py-2 bg-green-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-green-500 transition-all rounded active:scale-95"
            >
              Restart Simulation
            </button>
          </div>
        )}
      </div>
      <div className="mt-8 text-[8px] text-white/20 uppercase tracking-[0.3em] text-center">
        {!isActive ? 'Click window to focus' : 'Use arrow keys to navigate'}
      </div>
    </div>
  );
};
