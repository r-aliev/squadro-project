import React from 'react';

import './Tile.css';
import greenPiece from "../../assets/images/green_piece.png";
import greenPieceReverse from "../../assets/images/green_piece_reverse.png";
import redPiece from "../../assets/images/red_piece.png";
import redPieceReverse from "../../assets/images/red_piece_reverse.png";



const Tile = ({color, coordinates, onClick, goStraight}) => {
  let pieceImage = null;
  if (color === 1 || color === 3){
    pieceImage = goStraight ? redPiece : redPieceReverse;
  }else if(color === 2 || color === 4){
    pieceImage = goStraight ? greenPiece : greenPieceReverse;
  }

  let pieceId = ""
  if (color === 3 || color === 4) pieceId = "finished"

  if(color) {
    return (
      <div className="tile" disabled={true} data-coordinates={coordinates} onClick={onClick}>
        <div style={{backgroundImage: `url(${pieceImage})`}} className={color===1 ? "piece redPiece" : "piece greenPiece"} id={pieceId} ></div>
      </div>
    );
  }else{
    return (
      <div className="tile" data-coordinates={coordinates} onClick={onClick}>
      </div>
    );
  }
}

export default Tile;