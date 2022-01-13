import React from "react";
import "./Header.css";
import Popup from "../Popup/Popup";

import logo from "../../assets/images/logo.jpg";
import helpBtn from "../../assets/images/help_button.png";

const onHelpClick = e => {
  document.getElementById("popup-1").classList.toggle("active");
}

const Header = () => {
  return (
    <div>
      <div className="header">
        <img className="logo" src={logo} alt=""/>
        <b className="title">Squadro Game</b>
        <img className="helpBtn" src={helpBtn} alt="" onClick={onHelpClick}/>
      </div>
      <Popup />
    </div>
  );
};

export default Header;
