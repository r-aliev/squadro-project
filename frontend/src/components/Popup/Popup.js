import React from "react";
import "./Popup.css";

const closePopup = e => {
    document.getElementById("popup-1").classList.toggle("active");
}

const Popup = () => {
  return (
    <div className="popup" id="popup-1">
      <div className="overlay"></div>
      <div className="content">
        <div className="closeBtn" onClick={closePopup}>&times;</div>
        <div className="popup-header">
            <h2>Squadro Tuto</h2><br/>
            <p>Pour pouvoir lancer une partie vous devez <b>rentrer un pseudo</b>.</p>
            <p>Plusieurs paramètres peuvent également être modifié et changé, soit l'aspect du jeu, soit le mode de jeu.</p>
        </div>
        <p>Vous pouvez :</p>
        <ul>
            <li>Modifier la couleur du plateau de jeu en sélectionnant la couleur désiré sous la rubrique <b>Choose your board</b>. </li><br/>
            <li>Modifier le mode de jeu :
                <ul>
                    <li><b>Jeu local</b> : affrontement de deux joueurs sur le meme ordinateur</li>
                    <li><b>vs AI</b> : affrontement d'un joueur contre un ordinateur. Deux niveaux de difficulté sont présents.</li>
                </ul>
            </li><br/>
            <li>Modifier la couleur de vos pions en sélectionnant la couleur désiré sous la rubrique <b>Choose your side</b>.</li><br/>
        </ul>
        <p><i>Par défaut le plateau est noir, le mode de jeu en local, et la couleur du pion en rouge.</i></p>
      </div>
    </div>
  );
};

export default Popup;