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
    let row = element.dataset.coordinates[0];
    let column = element.dataset.coordinates[1];
    console.log("row: " + row + " column:" + column);
    let newPieces = [];

    pieces.forEach((p) => {
      // change if condition to funct
      if (p.position.x === parseInt(column) && p.position.y === parseInt(row)) {
        if (pieceElement.classList.contains("redPiece")) {
          // direction control
          if (p.position.x === 6) p.goStraight = false;

          let pieceToJumpX = undefined;
          let xNext = p.goStraight
            ? p.position.x + p.step
            : p.position.x + p.stepOpposite;
          // limit number min value to 0 and number max to 6
          xNext = Math.min(Math.max(parseInt(xNext), 0), 6);

          let step = p.goStraight ? p.step : p.stepOpposite;

          if (Math.abs(step) === 3) {
            let xAdj = p.goStraight ? p.position.x + 1 : p.position.x - 1;
            let adjPieceX = pieces.find((jpx) =>
              samePosition(jpx.position, { x: xAdj, y: p.position.y })
            );
            if (adjPieceX)
              xNext = p.goStraight ? p.position.x + 2 : p.position.x - 2;
          }

          // check wether there is another piece in the future place of clicked piece
          pieceToJumpX = pieces.find((jpx) =>
            samePosition(jpx.position, { x: xNext, y: p.position.y })
          );

          while (pieceToJumpX !== undefined) {
            xNext = p.goStraight ? xNext + 1 : xNext - 1;
            pieceToJumpX = pieces.find((jpx) =>
              samePosition(jpx.position, { x: xNext, y: p.position.y })
            );
          }

          p.position.x = xNext;

          // direction control
          if (p.position.x === 0) p.goStraight = true;
        } else {
          // direction control
          if (p.position.y === 6) p.goStraight = false;

          let pieceToJumpY = undefined;
          let yNext = p.goStraight
            ? p.position.y + p.step
            : p.position.y + p.stepOpposite;
          // limit number min value to 0 and number max to 6
          yNext = Math.min(Math.max(parseInt(yNext), 0), 6);

          let step = p.goStraight ? p.step : p.stepOpposite;

          if (Math.abs(step) === 3) {
            let yAdj = p.goStraight ? p.position.y + 1 : p.position.y - 1;
            let adjPieceY = pieces.find((jpy) =>
              samePosition(jpy.position, { x: p.position.x, y: yAdj })
            );
            if (adjPieceY)
              yNext = p.goStraight ? p.position.y + 2 : p.position.y - 2;
          }

          // check wether there is another piece in the future place of clicked piece
          pieceToJumpY = pieces.find((jpy) =>
            samePosition(jpy.position, { x: p.position.x, y: yNext })
          );
          console.log("piecrToJumpY " + pieceToJumpY);
          while (pieceToJumpY !== undefined) {
            yNext = p.goStraight ? yNext + 1 : yNext - 1;
            pieceToJumpY = pieces.find((jpy) =>
              samePosition(jpy.position, { x: p.position.x, y: yNext })
            );
          }

          p.position.y = yNext;

          // direction control
          if (p.position.y === 0) p.goStraight = true;
        }
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
