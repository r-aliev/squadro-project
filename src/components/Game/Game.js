import React, { useEffect, useState } from "react";
import "./Game.css";
import Board from "../Board/Board";
import TutoModal from "../Home/TutoModal";
import { Button } from "react-bootstrap";
import {
  faQuestionCircle,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import squadro_title from "../../assets/images/squadro_title.png";
import pannelGreen from "../../assets/images/pannel_green.png";
import pannelRed from "../../assets/images/pannel_red.png";
import { initialBoardState } from "../../Constants";
import getAIboard from "../../aiAlgo";
import { Navigate, useLocation } from "react-router";
import white_board from "../../assets/images/white_board.png";
import black_board from "../../assets/images/black_board.png";
import redPieceVertical from "../../assets/images/red_piece_vertical.png";
import greenPieceVertical from "../../assets/images/green_piece_vertical.png";
import { LinkContainer } from "react-router-bootstrap";

const Game = () => {
  const [tutoModal, setTutoModal] = useState(false);

  const [pieces, setPieces] = useState(initialBoardState);
  useEffect(() => {
    setPieces(pieces);
  }, [pieces]);

  const [turn, setTurn] = useState(2); // may be better just use js syntax ?
  const location = useLocation();

  // FOR ILLIAS
  const depth = location.state ? location.state.depth : 5;
  const gameType = location.state ? location.state.gameType : undefined;
  const boardColor =
    location.state && location.state.boardColor === "black"
      ? black_board
      : white_board;

  let playerPieceColor = "green";
  if (gameType === "singleGame") {
    playerPieceColor = location.state.pieceColor;
  }

  const samePosition = (p1, p2) => {
    return p1.x === p2.x && p1.y === p2.y;
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const checkForWinner = async (pieces) => {
    let numberRed = 0;
    let numberYellow = 0;
    for (let p of pieces) {
      if (p.color === 1) {
        numberRed++;
      } else if (p.color === 2) {
        numberYellow++;
      }
    }

    if (numberRed === 1 && playerPieceColor === "green") {
      alert("Red Won!");
      window.location.reload();
    } else if (numberRed === 1 && playerPieceColor === "red") {
      alert("Yellow Won!");
      window.location.reload();
    } else if (numberYellow === 1 && playerPieceColor === "green") {
      alert("Yellow Won!");
      window.location.reload(); 
    } else if (numberYellow === 1 && playerPieceColor === "red") {
      alert("Red Won!");
      window.location.reload();
    }
  };
  

  const handleClick = async (e) => {
    const pieceElement = e.target;
    const element = e.currentTarget;
    console.log(pieceElement);
    console.log(element);
    const row = element.dataset.coordinates[0];
    const column = element.dataset.coordinates[1];

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
        if (location.state && location.state.gameType === "localGame") {
          turn === 1 ? setTurn(2) : setTurn(1);
        } else {
          // if play with ai
          turn === 2 && setTurn(-1); //cuz no color -1 (but there are colors: 1, 2, 3, 4)
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

      if (location.state && location.state.gameType === "singleGame") {
        await sleep(2000);
        let aiPieces = getAIboard(pieces, parseInt(location.state.level), depth);
        setPieces(aiPieces);
        checkForWinner(aiPieces);
        setTurn(2); // to allow yellows to move again
      }
    }
  };

  let nbLeftPieces = 0;
  let nbRighPieces = 0;
  for (let p of pieces) {
    if (p.color === 3) {
      nbLeftPieces++;
    } else if (p.color === 4) {
      nbRighPieces++;
    }
  }

  let leftPiece = redPieceVertical;
  let rightPiece = greenPieceVertical;
  let pannelLeft = pannelRed;
  let pannelRight = pannelGreen;
  if (gameType === "singleGame" && playerPieceColor === "red") {
    leftPiece = greenPieceVertical;
    rightPiece = redPieceVertical;
    pannelLeft = pannelGreen;
    pannelRight = pannelRed;
  }
  let leftPieces = [];
  for (let i = 0; i < nbLeftPieces; i++) {
    leftPieces.push(
      <img key={i} className="piecesImage" src={leftPiece} width={40}></img>
    );
  }
  let rightPieces = [];
  for (let i = 0; i < nbRighPieces; i++) {
    rightPieces.push(
      <img key={i} className="piecesImage" src={rightPiece} width={40}></img>
    );
  }

  return (
    <div id="app">
      <div id="title">
        <img src={squadro_title} alt="title"></img>
      </div>
      <div id="leftPanel" style={{ backgroundImage: `url(${pannelLeft})` }}>
        <div className="piecesPannel">{leftPieces}</div>
      </div>
      <Board
        pieces={pieces}
        handleClick={handleClick}
        gameType={gameType}
        playerPieceColor={playerPieceColor}
        boardColor={boardColor}
      />
      <div id="rightPanel" style={{ backgroundImage: `url(${pannelRight})` }}>
        <div className="piecesPannel">{rightPieces}</div>
      </div>
      <LinkContainer exact={true} to="/">
        <Button id="btn-back-home" variant="dark">
          <FontAwesomeIcon icon={faArrowCircleRight} /> Back To Home
        </Button>
      </LinkContainer>
      <Button id="btn-tuto" variant="dark" onClick={() => setTutoModal(true)}>
        <FontAwesomeIcon icon={faQuestionCircle} /> TUTO
      </Button>
      <TutoModal isShown={tutoModal} handleClose={() => setTutoModal(false)} />
    </div>
  );
};

export default Game;
