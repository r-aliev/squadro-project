import React, { useState } from 'react';

import './Board.css';
import Tile from '../Tile/Tile'
import {
  initialBoardState,
} from "../../Constants";


const xAxis = ['1', '2', '3', '4', '5', '6', '7']; // columns
const yAxis = ['1', '2', '3', '4', '5', '6', '7']; // rows

const yLeftAndXtopValues = ['1', '3', '2', '3', '1'];
const yRightAndXbottomValues = ['3', '1', '2', '1', '3'];

const samePosition = (p1, p2) => {
  return p1.x === p2.x && p1.y === p2.y;
}


const Board = () => {
  const [pieces, setPieces] = useState(initialBoardState);

  let board = [];


  const handleClick = (e) => {
    const pieceElement = e.target;
    const element = e.currentTarget;
    console.log(pieceElement);
    console.log(element);
    let row = element.dataset.coordinates[0];
    let column = element.dataset.coordinates[1];
    console.log("row: " + row + " column:" + column);
    let newPieces = [];

    pieces.forEach((p) => {
      if(p.position.x === parseInt(column) && p.position.y === parseInt(row) ){
        if(pieceElement.classList.contains("redPiece")){
          console.log(p.position.x);
          if(p.position.x === 6) p.goStraight = false;
          if(p.goStraight) p.position.x = parseInt(p.position.x) + p.step;
          else p.position.x = parseInt(p.position.x) + p.stepOpposite
          
          if(p.position.x === 0) p.goStraight = true;
        }else{
          if(p.position.y === 6) p.goStraight = false;
          if(p.goStraight) p.position.y =  parseInt(p.position.y) + p.step;
          else p.position.y = parseInt(p.position.y) + p.stepOpposite;

          if(p.position.y === 0) p.goStraight = true;

        }
      }
      
      newPieces.push(p);
    })
    
    setPieces(newPieces);

    if(column === '0'){
      console.log(pieces)
      console.log('hey')
    }  
  }

  for (let j = xAxis.length - 1; j >= 0; j--)
  {
    for (let i = 0; i < yAxis.length; i++)
    {

      const piece = pieces.find((p) =>
        samePosition(p.position, { x: i, y: j })
      );

      let color = piece ? piece.color : undefined;

      board.push(
        <Tile 
          key={`${j},${i}`} 
          coordinates={`${j}${i}`}
          color={color}
          onClick={handleClick}
        >
        </Tile>
      )
    }
  }
  
  return (
    <div id="board">
      {board}
    </div>
  );
}

export default Board;