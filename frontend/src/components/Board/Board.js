import React, { useState } from 'react';

import './Board.css';
import Tile from '../Tile/Tile'
import {
  initialBoardState,
} from "../../Constants";


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
          // direction control
          if(p.position.x === 6) p.goStraight = false;

          let xNoJump = p.goStraight ? p.position.x + p.step : p.position.x + p.stepOpposite;
          // limit number min value to 0 and number max to 6
          xNoJump = Math.min(Math.max(parseInt(xNoJump), 0), 6);

          let pieceToJumpX = pieces.find((jpx) =>
            samePosition(jpx.position, { x: xNoJump, y: p.position.y})
          );
          
          if(pieceToJumpX === undefined && p.step === 3){
            let xAdjacent = p.goStraight ? p.position.x + 1 : p.position.x - 1;
            pieceToJumpX =  pieces.find((jpx) =>
              samePosition(jpx.position, { x: xAdjacent, y: p.position.y})
            );
          }

          if(pieceToJumpX !== undefined){
            p.position.x = p.goStraight ? pieceToJumpX.position.x + 1 : pieceToJumpX.position.x - 1;
          }else{
            p.position.x = xNoJump;
          }
        
          // direction control
          if(p.position.x === 0) p.goStraight = true;

        }else{

          // direction control
          if(p.position.y === 6) p.goStraight = false;
          
          // step control
          let yNoJump = p.goStraight ? p.position.y + p.step : p.position.y + p.stepOpposite;
          // limit number min value to 0 and number max to 6
          yNoJump = Math.min(Math.max(parseInt(yNoJump), 0), 6);


          let pieceToJumpY = pieces.find((jpy) =>
            samePosition(jpy.position, { x: p.position.x, y: yNoJump})
          );
          
          if(pieceToJumpY === undefined && p.step === 3){
            let yAdjacent = p.goStraight ? p.position.y + 1 : p.position.y - 1;
            pieceToJumpY =  pieces.find((jpy) =>
              samePosition(jpy.position, { x: p.position.x, y: yAdjacent})
            );
          }

          if(pieceToJumpY !== undefined){
            p.position.y = p.goStraight ? pieceToJumpY.position.y + 1 : pieceToJumpY.position.y - 1;
          }else{
            p.position.y = yNoJump;
          }

          // direction control
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

  for (let j = 6; j >= 0; j--)
  {
    for (let i = 0; i < 7; i++)
    {

      const piece = pieces.find((p) =>
        samePosition(p.position, { x: i, y: j })
      );

      let color = piece ? piece.color : undefined;
      let goStraight = piece && i !=6 && j!=6 ? piece.goStraight : undefined;

      board.push(
        <Tile 
          key={`${j},${i}`} 
          coordinates={`${j}${i}`}
          color={color}
          onClick={handleClick}
          goStraight={goStraight}
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