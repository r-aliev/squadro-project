import React from "react";
import "./Header.css";

import logo from "../../assets/images/logo.jpg";

const Header = () => {
  return (
    <div className="header">
      <img className="logo" src={logo} alt=""></img>
      <b className="title">Squadro Game</b>
    </div>
  );
};

export default Header;
