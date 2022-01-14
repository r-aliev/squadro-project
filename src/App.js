import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home";
import Game from "./components/Game/Game";

import "./App.css";

function App() {
  return (
    <Router>
			<div className="app">
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/game" element={<Game />} />
				</Routes>
			</div>
		</Router>

  );
}

export default App;
