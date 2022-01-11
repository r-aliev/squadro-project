import React from "react";
import Header from "../Header/Header";
import Game from "../Game/Game";
import "./Home.css";
import { Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home">
      <Header />
      <Routes>
        <Route path="/game" element={Game}></Route>
      </Routes>
    </div>
  );
};

export default Home;
