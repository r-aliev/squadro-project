import React from "react";
import Header from "../Header/Header";
import Game from "../Game/Game";
import "./Home.css";
import HomeForm from "./HomeForm";
import { Routes, Route } from "react-router-dom";

const Login = details => {
  console.log(details);
}

const Home = () => {
  return (
    <div className="Home">
      <Header />
      <p id="gameExplanation">Squadro est un jeu de déplacement et de stratégie en un contre un. Chaque joueur possède 5 pièces et doit ramener 4 de ses pièces à son emplacement d’origine pour remporter la partie.</p>
      <HomeForm Login={Login}/>
      
      <Routes>
        <Route path="/game" element={Game}></Route>
      </Routes>
    </div>
  );
};

export default Home;
