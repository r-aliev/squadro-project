import React from "react";
import "./Popup.css";

const closePopup = e => {
    document.getElementById("popup-2").classList.toggle("active");
}

const EndGamePopup = () => {
  return (
    <div className="popup" id="popup-2">
      <div className="overlay"></div>
      <div className="content">
        <div className="popup-header">
            <h1>YOU WON ! CONGRATS !</h1>
        </div>
        <div className="navigationChoice">
            <button type="button" className="buttonStandard">Recommencer</button>
            <button type="button" className="buttonStandard">Revenir au menu</button>
        </div>
      </div>
    </div>
  );
};

export default EndGamePopup;