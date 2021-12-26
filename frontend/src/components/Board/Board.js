import React, { useState } from "react";

import "./Board.css";
import Tile from "../Tile/Tile";
import { initialBoardState } from "../../Constants";

const samePosition = (p1, p2) => {
  return p1.x === p2.x && p1.y === p2.y;
};

const Board = () => {
  const [pieces, setPieces] = useState(initialBoardState);

  let board = [];


  const handleClick = (e) => {
    const pieceElement = e.target;
    const element = e.currentTarget;
    console.log(pieceElement);
    console.log(element);
    const row = element.dataset.coordinates[0];
    const column = element.dataset.coordinates[1];
    console.log("row: " + row + " column:" + column);
    let newPieces = [];

    pieces.forEach((p) => {
      // change if condition to funct
      if(samePosition(p.position, {x: parseInt(column), y: parseInt(row)})) { 
          const isRedPiece = pieceElement.classList.contains("redPiece")
          const mainAxisPosition = isRedPiece ? p.position.x : p.position.y
          
          // direction control
          if (mainAxisPosition === 6) p.goStraight = false;
          const step = p.goStraight ? p.step : p.stepOpposite;

          let pieceToJump = undefined;
          let nextMainAxisPosition = mainAxisPosition + step
           
          // limit number min value to 0 and number max to 6
          nextMainAxisPosition = Math.min(Math.max(parseInt(nextMainAxisPosition), 0), 6);

          // for samePosition to send corresponding argument depending on piece
          let positionX = p.position.x;
          let positionY = p.position.y;
          if (Math.abs(step) === 3) {
        
            let mainAxisAdj = p.goStraight ? mainAxisPosition + 1 : mainAxisPosition - 1;
            if(isRedPiece){
              positionX = mainAxisAdj
            }else{
              positionY = mainAxisAdj;
            }
          
            let hasAdjPieceX = pieces.find((jpx) =>
              samePosition(jpx.position, { x: positionX, y: positionY})
            );
            if (hasAdjPieceX)
              nextMainAxisPosition = p.goStraight ? mainAxisPosition + 2 : mainAxisPosition - 2;
          }

          // check wether there is another piece in the future place of clicked piece
          if(isRedPiece){
            positionX = nextMainAxisPosition
          }else{
            positionY = nextMainAxisPosition;
          }

          pieceToJump = pieces.find((jpx) =>
            samePosition(jpx.position, { x: positionX, y: positionY })
          );

          while (pieceToJump !== undefined) {
            nextMainAxisPosition = p.goStraight ? nextMainAxisPosition + 1 : nextMainAxisPosition - 1;

            if(isRedPiece){
              positionX = nextMainAxisPosition
            }else{
              positionY = nextMainAxisPosition;
            }

            pieceToJump = pieces.find((jpx) =>
              samePosition(jpx.position, { x: positionX, y: positionY })
            );
          }

          if(isRedPiece){
            p.position.x = nextMainAxisPosition
          }else{
            p.position.y = nextMainAxisPosition;
          }

          // direction control
          let finalMainAxisPosition = isRedPiece ? p.position.x : p.position.y;
          if (finalMainAxisPosition === 0) p.goStraight = true;

      }
      newPieces.push(p);
    });

    setPieces(newPieces);
  };

  for (let j = 6; j >= 0; j--) {
    for (let i = 0; i < 7; i++) {
      const piece = pieces.find((p) =>
        samePosition(p.position, { x: i, y: j })
      );

      let color = piece ? piece.color : undefined;
      let goStraight = piece && i != 6 && j != 6 ? piece.goStraight : undefined;

      board.push(
        <Tile
          key={`${j},${i}`}
          coordinates={`${j}${i}`}
          color={color}
          onClick={handleClick}
          goStraight={goStraight}
        ></Tile>
      );
    }
  }

  return <div id="board">{board}</div>;
};

export default Board;
