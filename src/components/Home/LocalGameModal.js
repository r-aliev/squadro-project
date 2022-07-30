import React, { useState } from "react";
import {
  Modal,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import black_board_unselected from "../../assets/images/black_board_unselected.png";
import white_board_unselected from "../../assets/images/white_board_unselected.png";
import black_board_selected from "../../assets/images/black_board_selected.png";
import white_board_selected from "../../assets/images/white_board_selected.png";

const LocalGameModal = ({ isShown, handleClose }) => {
  const navigate = useNavigate();

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const [blackBoard, setBoard] = useState(true);

  const onBoardClick = (e) => {
    if (blackBoard) {
      setBoard(false);
    } else {
      setBoard(true);
    }
  };

  return (
    <Modal size="lg" show={isShown} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Choose a board!</Modal.Title>
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
              onClick={() => {
                navigate("/game", {
                  state: {
                    boardColor: blackBoard ? "black" : "white",
                    gameType: "localGame",
                  },
                })
                sleep(1000);
                window.location.reload()
              }}
            >
              Play
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default LocalGameModal;
