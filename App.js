import React, { useState, useEffect } from 'react';
import './App.css';

const ROWS = 20;
const COLS = 10;

const createBoard = () => {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
};

const App = () => {
  const [board, setBoard] = useState(createBoard());
  const [currentPiece, setCurrentPiece] = useState({ shape: [[1, 1], [1, 1]], position: { x: 0, y: 0 } });

  useEffect(() => {
    const moveDown = () => {
      setCurrentPiece(prev => ({
        ...prev,
        position: { ...prev.position, y: prev.position.y + 1 }
      }));
    };

    const interval = setInterval(moveDown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newBoard = createBoard();
    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          newBoard[y + currentPiece.position.y][x + currentPiece.position.x] = value;
        }
      });
    });
    setBoard(newBoard);
  }, [currentPiece]);

  return (
    <div className="App">
      <div className="Tetris">
        {board.map((row, y) =>
          row.map((cell, x) => <div key={`${y}-${x}`} className={`Cell ${cell ? 'filled' : ''}`}></div>)
        )}
      </div>
    </div>
  );
};

export default App;
