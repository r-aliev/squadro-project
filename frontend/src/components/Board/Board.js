import React, { useState } from "react";
import { Alert } from "react-alert";
import "./Board.css";
import Tile from "../Tile/Tile";
import { initialBoardState } from "../../Constants";
import getAIboard from "../../aiAlgo";
import { useLocation } from "react-router";
import white_board from "../../assets/images/white_board.png";
import black_board from "../../assets/images/black_board.png";

const Board = ({pieces, handleClick, gameType, playerPieceColor, boardColor}) => {
  let board = [];
  console.log(handleClick)
  const samePosition = (p1, p2) => {
    return p1.x === p2.x && p1.y === p2.y;
  };

  for (let j = 6; j >= 0; j--) {
    for (let i = 0; i < 7; i++) {
      const piece = pieces.find((p) =>
        samePosition(p.position, { x: i, y: j })
      );

      let color = piece ? piece.color : undefined;
      let goStraight =
        piece && i !== 6 && j !== 6 ? piece.goStraight : undefined;


      board.push(
        <Tile
          key={`${j},${i}`}
          coordinates={`${j}${i}`}
          color={color}
          onClick={handleClick}
          goStraight={goStraight}
          gameType={gameType}
          playerPieceColor={playerPieceColor}
        ></Tile>
      );
    }
  }

  return <div id="board" style={{backgroundImage: `url(${boardColor})`}}>{board}</div>;
};

export default Board;
