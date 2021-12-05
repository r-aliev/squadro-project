import React from 'react';

import './Board.css';
import Tile from '../Tile/Tile'

const Board = () => {
  let board = [];
  let redPiece=0;
  let greenPiece=1;
  for (let i=0; i < 5; i++)
  {
    board.push(
      <div id={`redPiece${i}`}>
        <Tile piece={redPiece} />
      </div>
    )
  }
  for (let i=0; i < 5; i++)
  {
    board.push(
      <div id={`greenPiece${i}`}>
        <Tile piece={greenPiece} />
      </div>
    )
  }
  
  return (
    <div id="board">
      {board}
    </div>
  );
}

export default Board;