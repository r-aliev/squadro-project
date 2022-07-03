import React, { useState, useContext } from "react";
import {
  Modal,
  Row,
  Col,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import black_board_unselected from "../../assets/images/black_board_unselected.png";
import white_board_unselected from "../../assets/images/white_board_unselected.png";
import black_board_selected from "../../assets/images/black_board_selected.png";
import white_board_selected from "../../assets/images/white_board_selected.png";

import green_piece_selected from "../../assets/images/yellow_piece_selected.png";
import green_piece_unselected from "../../assets/images/yellow_piece_unselected.png";
import red_piece_selected from "../../assets/images/red_piece_selected.png";
import red_piece_unselected from "../../assets/images/red_piece_unselected.png";

const SingleGameModal = ({ isShown, handleClose }) => {
  const navigate = useNavigate();
  
  const [blackBoard, setBoard] = useState(true);
  const [greenPiece, setPiece] = useState(true);
  const [aiLevel, setAiLevel] = useState(1);
  const [aiDepth, setAiDepth] = useState(5)

  const onBoardClick = (e) => {
    if (blackBoard) {
      setBoard(false);
    } else {
      setBoard(true);
    }
  };

  const onPieceClick = (e) => {
    if (greenPiece) {
      setPiece(false);
    } else {
      setPiece(true);
    }
  };

  return (
    <Modal size="lg" show={isShown} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Choose a board and a piece color! </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="my-3 text-center">
          <Col>
            <img
              className="choice"
              src={blackBoard ? black_board_selected : black_board_unselected}
              alt=""
              onClick={onBoardClick}
            ></img>
          </Col>
          <Col>
            <img
              className="choice"
              src={blackBoard ? white_board_unselected : white_board_selected}
              alt=""
              onClick={onBoardClick}
            ></img>
          </Col>
        </Row>
        <Row className="my-3 text-center">
          <Col>
            <img
              className="choice"
              src={greenPiece ? green_piece_selected : green_piece_unselected}
              alt=""
              onClick={onPieceClick}
            ></img>
          </Col>
          <Col>
            <img
              className="choice"
              src={greenPiece ? red_piece_unselected : red_piece_selected}
              alt=""
              onClick={onPieceClick}
            ></img>
          </Col>
        </Row>
        <Row className="my-3">
          <h3>Level:</h3>
          <ButtonGroup size="md" className="mb-2">
            <Button
              variant="outline-success"
              active={aiLevel === 1}
              onClick={() => setAiLevel(1)}
            >
              Easy
            </Button>
            <Button
              variant="outline-success"
              active={aiLevel === 2}
              onClick={() => setAiLevel(2)}
            >
              Middle
            </Button>
            <Button
              variant="outline-success"
              active={aiLevel === 3}
              onClick={() => setAiLevel(3)}
            >
              Hard
            </Button>
          </ButtonGroup>
          {aiLevel === 3 && (
            <div id="depth-choice" width={40}>
              <h5 className="mx-3">Choose a depth:</h5>
              <ButtonGroup className="me-2" aria-label="First group">
                <Button active={aiDepth === 5} variant="outline-danger" onClick={() => setAiDepth(5)}>5</Button>{" "}
                <Button active={aiDepth === 6} variant="outline-danger" onClick={() => setAiDepth(6)}>6</Button>{" "}
                <Button active={aiDepth === 7} variant="outline-danger" onClick={() => setAiDepth(7)}>7</Button>
              </ButtonGroup>
            </div>
          )}
        </Row>

        <Row className="justify-content-end my-3">
          <Col md="auto" className="p-0">
            <Button variant="light" className="mx-2" onClick={handleClose}>
              Close
            </Button>
          </Col>
          <Col md="auto" className="p-0">
            <Button
              variant="success"
              className="mx-4"
              onClick={() =>
                navigate("/game", {
                  state: {
                    boardColor: blackBoard ? "black" : "white",
                    pieceColor: greenPiece ? "green" : "red",
                    level: aiLevel,
                    depth: aiDepth,
                    gameType: "singleGame",
                  },
                })
              }
            >
              Play
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default SingleGameModal;
