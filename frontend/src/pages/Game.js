import React from 'react';
import '../App.css';
import Board from "../components/Board/Board";

function Game() {

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

 
    return(
        <React.Fragment>
            <div id="app">
                <Board />
            </div>
        </React.Fragment>
    )

}

export default Game;
