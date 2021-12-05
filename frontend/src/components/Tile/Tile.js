import React from 'react';

import './Tile.css';
import greenPiece from "../../assets/images/green_piece.png";
import redPiece from "../../assets/images/red_piece.png";


const Tile = ({piece}) => {
  if(piece==0) return <img src={redPiece} alt="red piece"/>
  else return <img src={greenPiece} alt="green piece"/>
}

export default Tile;