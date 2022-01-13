import React, { useState } from "react";
import {
  Modal,
  Row,
  Col,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import black_board_unselected from "../../assets/images/black_board_unselected.png";
import white_board_unselected from "../../assets/images/white_board_unselected.png";
import black_board_selected from "../../assets/images/black_board_selected.png";
import white_board_selected from "../../assets/images/white_board_selected.png";

import yellow_piece_selected from "../../assets/images/yellow_piece_selected.png";
import yellow_piece_unselected from "../../assets/images/yellow_piece_unselected.png";
import red_piece_selected from "../../assets/images/red_piece_selected.png";
import red_piece_unselected from "../../assets/images/red_piece_unselected.png";

const SingleGameModal = ({ isShown, handleClose }) => {
	const navigate = useNavigate();

  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const [blackBoard, setBoard] = useState(true);
  const [redPiece, setPiece] = useState(true);

  const radios = [
    { name: "Easy", value: "1" },
    { name: "Medium", value: "2" },
    { name: "Hard", value: "3" },
  ];

  const onBoardClick = (e) => {
    if (blackBoard) {
      setBoard(false);
    } else {
      setBoard(true);
    }
  };

  const onPieceClick = (e) => {
    if (redPiece) {
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
              src={redPiece ? red_piece_selected : red_piece_unselected}
              alt=""
              onClick={onPieceClick}
            ></img>
          </Col>
          <Col>
            <img
              className="choice"
              src={redPiece ? yellow_piece_unselected : yellow_piece_selected}
              alt=""
              onClick={onPieceClick}
            ></img>
          </Col>
        </Row>
        <Row className="my-3">
          <h3>Level:</h3>
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? "outline-success" : "outline-danger"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
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
								navigate("/game", { state: {
									boardColor: blackBoard ? "black" : "white",
									pieceColor: redPiece ? "red" : "green",
									level: radioValue,
									gameType: "singleGame",
								}
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
