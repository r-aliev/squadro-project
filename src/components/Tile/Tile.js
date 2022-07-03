import React from "react";

import "./Tile.css";

import greenPieceVertical from "../../assets/images/green_piece_vertical.png";
import greenPieceHorizontal from "../../assets/images/green_piece_horizontal.png";
import greenPieceHorizontalReverse from "../../assets/images/green_piece_horizontal_reverse.png";
import greenPieceVerticalReverse from "../../assets/images/green_piece_vertical_reverse.png";

import redPieceHorizontal from "../../assets/images/red_piece_horizontal.png";
import redPieceHorizontalReverse from "../../assets/images/red_piece_horizontal_reverse.png";
import redPieceVertical from "../../assets/images/red_piece_vertical.png";
import redPieceVerticalReverse from "../../assets/images/red_piece_vertical_reverse.png";

const Tile = ({
  color,
  coordinates,
  onClick,
  goStraight,
  gameType,
  playerPieceColor,
}) => {
  let pieceImage = null;

  // to vertical piece -> horizontal piece
  const verticalPiece =
    playerPieceColor === "green" ? redPieceHorizontal : greenPieceHorizontal;
  const verticalPieceReverse =
    playerPieceColor === "green"
      ? redPieceHorizontalReverse
      : greenPieceHorizontalReverse;

  // player is always on horizontalAxis
  const horizontalPiece =
    playerPieceColor === "green" ? greenPieceVertical : redPieceVertical; // player piece in sigle game mode
  const horizontalPieceReverse =
    playerPieceColor === "green"
      ? greenPieceVerticalReverse
      : redPieceVerticalReverse;

  // 1 and 3 - red
  if (color === 1 || color === 3) {
    pieceImage = goStraight ? verticalPiece : verticalPieceReverse;
    // 2 and 4 - green
  } else if (color === 2 || color === 4) {
    pieceImage = goStraight ? horizontalPiece : horizontalPieceReverse;
  }

  let pieceId = "";
  if (color === 3 || color === 4) pieceId = "finished";
  let className = color === 1 ? "piece redPiece" : "piece greenPiece";
  if (gameType === "singleGame" && color === 1)
    className = className + " blockCursor";

  if (color) {
    return (
      <div className="tile" data-coordinates={coordinates} onClick={onClick}>
        <div
          style={{ backgroundImage: `url(${pieceImage})` }}
          className={className}
          id={pieceId}
        ></div>
      </div>
    );
  } else {
    return (
      <div
        className="tile"
        data-coordinates={coordinates}
        onClick={onClick}
      ></div>
    );
  }
};

export default Tile;
