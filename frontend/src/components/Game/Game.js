import React from "react";
import "./Game.css";
import Header from "../Header/Header";
import Board from "../Board/Board";

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

  return (
    <div>
      <Header />
      <div className="mainContent">
        <div className="box" id="adversaireBox">
        </div>

        <div id="app">
          <Board />
        </div>

        <div className="box" id="playerBox">
        </div>
      </div>
    </div>
    
  );
};

export default Game;
