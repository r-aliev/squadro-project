import React, { useState, useEffect, useRef } from "react";
import { Alert } from "react-alert";
import "./Board.css";
import Tile from "../Tile/Tile";
import arrowRed from "../../assets/images/red_arrow.png"
import arrowGreen from "../../assets/images/green_arrow.png"


const Board = ({
  pieces,
  handleClick,
  gameType,
  playerPieceColor,
  boardColor,
}) => {
  let board = [];
  const [arrowColor, setArrowColor] = useState(playerPieceColor);

  const arrowRef = useRef(null);

  useEffect(() => {    
    if(arrowColor === "green"){
      arrowRef.current.src = arrowGreen
    }else{
      arrowRef.current.src= arrowRed
    }
    arrowColor === "green" ? setArrowColor("red") : setArrowColor("green")
    
  },[pieces])


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

  return (
  <>
    <div id="board" style={{ backgroundImage: `url(${boardColor})` }}>
      {board}
    </div>
    <div id="player-cursor">
        <img ref={arrowRef} src={arrowGreen} alt=""/>
    </div>
  </>
  );
};

export default Board;
