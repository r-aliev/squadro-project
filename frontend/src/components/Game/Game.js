import React, { useState } from "react";
import "./Game.css";
import Board from "../Board/Board";
import TutoModal from "../Home/TutoModal";
import { Button } from "react-bootstrap";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import squadro_title from "../../assets/images/squadro_title.png";
import { Row, Col, Container } from "react-bootstrap";

const Game = () => {
  // componentWillMount(){
  //   this.fetchTasks()
  // }

  // fetchTasks(){
  //   console.log("Fetching...")

  //   fetch('http://127.0.0.1:8000/api/')
  //   .then(response => response.json())
  //   .then(data =>
  //     console.log("Data:", data)
  //     )
  // }
  const [tutoModal, setTutoModal] = useState(false);

  return (
    <div id="app">
      <div id="title">
        <img src={squadro_title} alt="title"></img>
      </div>
      <Board />
      <Button id="btn-tuto" variant="dark" onClick={() => setTutoModal(true)}>
        <FontAwesomeIcon icon={faQuestionCircle} /> TUTO
      </Button>
      <TutoModal isShown={tutoModal} handleClose={() => setTutoModal(false)} />
    </div>
  );
};

export default Game;
