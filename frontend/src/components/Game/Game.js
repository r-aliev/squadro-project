import React from "react";
import "./Game.css";
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
    <div id="app">
      <Board />
    </div>
  );
};

export default Game;
