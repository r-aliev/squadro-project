import React from 'react';
import { render } from 'react-dom';
import './App.css';

class App extends React.Component {

  componentWillMount(){
    this.fetchTasks()
  }

fetchTasks(){
  console.log("Fetching...")

  fetch('http://127.0.0.1/api/')
  .then(response => response.json())
  .then(data =>
    console.log("Data:", data)
    )
}

  render(){

    return(
      <div className="container">
             
      </div>
    )
  }
}

export default App;
