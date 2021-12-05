import React from 'react';

import './Board.css';
import Tile from '../Tile/Tile'

const Board = () => {
  let redPiece=0;
  let greenPiece=1;

  let i;
  const handleClick = (e) => {
    const element = e.target;

    let i = 1;
    //let s = 1 + parseInt(i);
    console.log(element.className);
    
    let s = parseInt(element.style.gridColumnStart) + i
    console.log(s)
    //let f = 2 + parseInt(i);
    let f = parseInt(element.style.gridColumnEnd) + i
    console.log(f)
    element.style.gridColumnStart = s.toString();
    element.style.gridColumnEnd = f.toString();
  
  }

  for (let i=0; i < 5; i++)
  {
    board.push(
      <div onClick={handleClick} class={`redPiece${i}`}>
        <Tile piece={redPiece} />
      </div>
    )
  }
  for (let i=0; i < 5; i++)
  {
    board.push(
      <div class={`greenPiece${i}`}>
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