import React from 'react';

import './Tile.css';
import greenPiece from "../../assets/images/green_piece.png";
import greenPieceReverse from "../../assets/images/green_piece_reverse.png";
import redPiece from "../../assets/images/red_piece.png";
import redPieceReverse from "../../assets/images/red_piece_reverse.png";



const Tile = ({color, coordinates, onClick, goStraight}) => {
  let pieceImage = null;
  if (color === 1){
    pieceImage = goStraight ? redPiece : redPieceReverse;
  }else if(color === 2){
    pieceImage = goStraight ? greenPiece : greenPieceReverse;
  }


  if(color) {
    return (
      <div className="tile" disabled={true} data-coordinates={coordinates} onClick={onClick}>
        {<div style={{backgroundImage: `url(${pieceImage})`}} className={color===1 ? "piece redPiece" : "piece greenPiece"}></div>}
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