import React, { useState } from "react";
import { Alert } from "react-alert";
import "./Board.css";
import Tile from "../Tile/Tile";
import { initialBoardState } from "../../Constants";
import getAIboard from "../../aiAlgo";
import { useLocation } from "react-router";

const Board = () => {
  const [pieces, setPieces] = useState(initialBoardState);
  const [turn, setTurn] = useState(2); // may be better just use js syntax ?
  const location = useLocation();
  console.log(location.state.gameType);
  // gameType
  // boardColor
  // pieceColor
  // level

  let board = [];

  const samePosition = (p1, p2) => {
    return p1.x === p2.x && p1.y === p2.y;
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const checkForWinner = (pieces) => {
    let numberRed = 0;
    let numberYellow = 0;
    for (let p of pieces) {
      if (p.color === 1) {
        numberRed++;
      } else if (p.color === 2) {
        numberYellow++;
      }
    }

    if (numberRed === 1) {
      alert("Red Won!");
      window.location.reload(); // change in the future
      // rendering doesn't work for now
      //setPieces(initialBoardState);
    } else if (numberYellow === 1) {
      alert("Yellow Won!");
      window.location.reload(); // change in the future
      // rendering doesn't work for now
      //setPieces(initialBoardState);
    }
  };

  const handleClick = async (e) => {
    const pieceElement = e.target;
    const element = e.currentTarget;
    console.log(pieceElement);
    console.log(element);
    const row = element.dataset.coordinates[0];
    const column = element.dataset.coordinates[1];
    console.log("row: " + row + " column:" + column);

    let newPieces = [];
    let jumpedPieces = [];

    console.log("pieces length: " + pieces.length);

    let movedAnyPiece = false;

    pieces.forEach((p) => {
      if (
        samePosition(p.position, { x: parseInt(column), y: parseInt(row) }) &&
        turn === p.color
      ) {
        movedAnyPiece = true;
        if (location.state.gameType === "localGame") {
          turn === 1 ? setTurn(2) : setTurn(1);
        }else{
          // if play with ai  
          turn === 2 && setTurn(-1) //cuz no color -1 (but there are colors: 1, 2, 3, 4)
        }
        const isRedPiece = pieceElement.classList.contains("redPiece");
        const mainAxisPosition = isRedPiece ? p.position.x : p.position.y;

        // direction control
        if (mainAxisPosition === 6) p.goStraight = false;
        const step = p.goStraight ? p.step : p.stepOpposite;

        let pieceToJump = undefined;
        let nextMainAxisPosition = mainAxisPosition + step;

        // limit number min value to 0 and number max to 6
        nextMainAxisPosition = Math.min(
          Math.max(parseInt(nextMainAxisPosition), 0),
          6
        );

        // for samePosition to send corresponding argument depending on piece
        let positionX = p.position.x;
        let positionY = p.position.y;
        if (Math.abs(step) === 3) {
          // check wether there is an adjacent piece to clicked piece
          let mainAxisAdj = p.goStraight
            ? mainAxisPosition + 1
            : mainAxisPosition - 1;
          if (isRedPiece) {
            positionX = mainAxisAdj;
          } else {
            positionY = mainAxisAdj;
          }

          let hasAdjPieceX = pieces.find((jpx) =>
            samePosition(jpx.position, { x: positionX, y: positionY })
          );
          if (hasAdjPieceX)
            nextMainAxisPosition = p.goStraight
              ? mainAxisPosition + 2
              : mainAxisPosition - 2;
        }

        // check wether there is another piece in the future place of clicked piece
        if (isRedPiece) {
          positionX = nextMainAxisPosition;
        } else {
          positionY = nextMainAxisPosition;
        }

        pieceToJump = pieces.find((jpx) =>
          samePosition(jpx.position, { x: positionX, y: positionY })
        );

        while (pieceToJump !== undefined) {
          nextMainAxisPosition = p.goStraight
            ? nextMainAxisPosition + 1
            : nextMainAxisPosition - 1;

          if (isRedPiece) {
            positionX = nextMainAxisPosition;
          } else {
            positionY = nextMainAxisPosition;
          }

          pieceToJump = pieces.find((jpx) =>
            samePosition(jpx.position, { x: positionX, y: positionY })
          );
        }

        let jumpedPiece = null;
        if (isRedPiece) {
          console.log("in isRedPiece");
          for (let i = p.position.x + 1; i < nextMainAxisPosition; i++) {
            console.log("in for loop");
            jumpedPiece = pieces.find((jpx) =>
              samePosition(jpx.position, { x: i, y: p.position.y })
            );
            if (jumpedPiece != null) {
              jumpedPieces.push(jumpedPiece);
            }
          }

          let iter = p.goStraight ? p.position.x + 1 : p.position.x - 1;
          while (iter !== nextMainAxisPosition) {
            jumpedPiece = pieces.find((jpx) =>
              samePosition(jpx.position, { x: iter, y: p.position.y })
            );
            if (jumpedPiece != null) {
              jumpedPieces.push(jumpedPiece);
            }
            iter = p.goStraight ? iter + 1 : iter - 1;
          }
          p.position.x = nextMainAxisPosition;
        } else {
          let iter = p.goStraight ? p.position.y + 1 : p.position.y - 1;
          while (iter !== nextMainAxisPosition) {
            jumpedPiece = pieces.find((jpx) =>
              samePosition(jpx.position, { x: p.position.x, y: iter })
            );
            if (jumpedPiece != null) {
              jumpedPieces.push(jumpedPiece);
            }
            iter = p.goStraight ? iter + 1 : iter - 1;
          }
          p.position.y = nextMainAxisPosition;
        }

        // just for piece direction control
        let finalMainAxisPosition = isRedPiece ? p.position.x : p.position.y;
        if (finalMainAxisPosition === 0) {
          p.color = isRedPiece ? 3 : 4;
        }
      }
      // all pieces push
      newPieces.push(p);
    });

    if (movedAnyPiece) {
      // move back pieces that were jumped over
      newPieces.some((jp) => {
        if (jumpedPieces.includes(jp)) {
          if (jp.color === 1) {
            jp.position.x = jp.goStraight ? 0 : 6;
          } else {
            jp.position.y = jp.goStraight ? 0 : 6;
          }
        }
      });

      setPieces(newPieces);
      checkForWinner(newPieces);

      if (location.state.gameType === "singleGame") {
        await sleep(2000);
        let aiPieces = getAIboard(pieces, parseInt(location.state.level));
        setPieces(aiPieces);
        checkForWinner(aiPieces);
        setTurn(2); // to allow yellows to move again
      }
    }
  };

  for (let j = 6; j >= 0; j--) {
    for (let i = 0; i < 7; i++) {
      const piece = pieces.find((p) =>
        samePosition(p.position, { x: i, y: j })
      );

      let color = piece ? piece.color : undefined;
      let goStraight =
        piece && i !== 6 && j !== 6 ? piece.goStraight : undefined;

      let gameType = location.state ? location.state.gameType : undefined;

      board.push(
        <Tile
          key={`${j},${i}`}
          coordinates={`${j}${i}`}
          color={color}
          onClick={handleClick}
          goStraight={goStraight}
          gameType={gameType}
        ></Tile>
      );
    }
  }

  return <div id="board">{board}</div>;
};

export default Board;
