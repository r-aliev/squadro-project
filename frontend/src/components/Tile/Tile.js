import React from 'react';

import './Tile.css';
import greenPiece from "../../assets/images/green_piece.png";
import redPiece from "../../assets/images/red_piece.png";


const Tile = ({color, coordinates, onClick}) => {
  if(color===1) {
    return (
      <div className="tile" data-coordinates={coordinates} onClick={onClick}>
        {color && <div style={{backgroundImage: `url(${redPiece})`}} className="piece redPiece"></div>}
      </div>
    );
  }else{
    return (
      <div className="tile" data-coordinates={coordinates} onClick={onClick}>
        {color && <div style={{backgroundImage: `url(${greenPiece})`}} className="piece greenPiece"></div>}
      </div>
    );
  }
}

export default Tile;