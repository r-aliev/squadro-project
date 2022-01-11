import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {Route, Routes} from 'react-router-dom'

// Pages

import Home from "./pages/Home" 
import Game from "./pages/Game" 



import "./App.css";

function App()  {
	return (
		<Router>
		<Routes>

			
		<Route exact path="/"  element={<Home/>}/>
    <Route exact path="/game"  element={<Game/>}/>
		
		
		</Routes>
		</Router>
	)
}

export default App;
