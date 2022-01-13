import React, { useState } from "react";
import "./Home.css";
import black_board_unselected from "../../assets/images/black_board_unselected.png";
import white_board_unselected from "../../assets/images/white_board_unselected.png";
import black_board_selected from "../../assets/images/black_board_selected.png";
import white_board_selected from "../../assets/images/white_board_selected.png";

import yellow_piece_selected from "../../assets/images/yellow_piece_selected.png";
import yellow_piece_unselected from "../../assets/images/yellow_piece_unselected.png";
import red_piece_selected from "../../assets/images/red_piece_selected.png";
import red_piece_unselected from "../../assets/images/red_piece_unselected.png";

function HomeForm({Login}) {
    const [details, setDetails] = useState({pseudo: "", boardColor: "Black", mode: "Local", level: "Easy", side: "Red"});

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
        //TODO : if(pseudo != "")  Open Game page 
        //       else Error message
        if(details.pseudo !== "") window.open("../Game/Game");
    }

    const onBoardClick = e => {
        if(e.target.id === "blackBoard"){
            e.target.src = black_board_selected;
            document.getElementById("whiteBoard").src = white_board_unselected;
            setDetails({...details, boardColor: "Black"});
        }
        else{
            e.target.src=white_board_selected;
            document.getElementById("blackBoard").src=black_board_unselected;
            setDetails({...details, boardColor: "White"})
        }
    }

    const onPieceClick = e => {
        if(e.target.id === "yellowPiece"){
            e.target.src=yellow_piece_selected;
            document.getElementById("redPiece").src=red_piece_unselected;
            setDetails({...details, side: "Yellow"});
        }
        else{
            e.target.src=red_piece_selected;
            document.getElementById("yellowPiece").src=yellow_piece_unselected;
            setDetails({...details, side: "Red"})
        }
    }

    const onLevelClick = e => {
        if(e.target.id === "easyBtn"){
            document.getElementById("easyBtn").style.backgroundColor = "#ffffff"
            document.getElementById("easyBtn").style.color = "#FB5BCE"
            document.getElementById("hardBtn").style.backgroundColor = "#b9b9b9"
            document.getElementById("hardBtn").style.color = "#6d6d6d"
            setDetails({...details, level: "Easy"})
        }
        else{
            document.getElementById("hardBtn").style.backgroundColor = "#ffffff"
            document.getElementById("hardBtn").style.color = "#FB5BCE"
            document.getElementById("easyBtn").style.backgroundColor = "#b9b9b9"
            document.getElementById("easyBtn").style.color = "#6d6d6d"
            setDetails({...details, level: "Hard"})
        }
    }

    const onModeClick = e => {
        if(e.target.id === "localBtn"){
            document.getElementById("localBtn").style.backgroundColor = "#ffffff"
            document.getElementById("localBtn").style.color = "#FB5BCE"
            document.getElementById("aiBtn").style.backgroundColor = "#b9b9b9"
            document.getElementById("aiBtn").style.color = "#6d6d6d"
            setDetails({...details, mode: "Local"})
        }
        else{
            document.getElementById("aiBtn").style.backgroundColor = "#ffffff"
            document.getElementById("aiBtn").style.color = "#FB5BCE"
            document.getElementById("localBtn").style.backgroundColor = "#b9b9b9"
            document.getElementById("localBtn").style.color = "#6d6d6d"
            setDetails({...details, mode: "AI"})
        }

        var state = document.getElementById("difficulty").style.display;
        if (state === 'flex' && e.target.id === "localBtn") {
            document.getElementById("difficulty").style.display = 'none';
            document.getElementById("midPack").style.marginBottom = "50px";
        } else if (state !== 'flex' && e.target.id === "aiBtn") {
            document.getElementById("difficulty").style.display = 'flex';
            document.getElementById("midPack").style.marginBottom = "0px";
        }

        
    }

    return (
        <form className="customForm" onSubmit={submitHandler}>
            <div className="mainContainer">
                <div className="leftPack">
                    <h2>Choose your board</h2>
                    <img id="blackBoard" src={black_board_selected} alt="" onClick={onBoardClick}></img>
                    <img id="whiteBoard" src={white_board_unselected} alt="" onClick={onBoardClick}></img>
                </div>

                <div className="midPack" id="midPack">
                    <div className="pinkLabel" id="pseudoArea">
                        <label >Pseudo :</label>
                        <input type="text" name="pseudoInput" id="pseudoInput" onChange={e => setDetails({...details, pseudo: e.target.value})} value={details.pseudo}/>
                    </div>
                    <div className="gameMode">
                        <button type="button" className="buttonStandard" id="localBtn" onClick={onModeClick}>Jeu local</button>
                        <button type="button" className="buttonStandard" id="aiBtn" onClick={onModeClick}>vs AI</button>
                    </div>
                    <div className="difficulty" id="difficulty">
                        <button type="button" className="buttonStandard" id="easyBtn" onClick={onLevelClick}>Easy</button>
                        <button type="button" className="buttonStandard" id="hardBtn" onClick={onLevelClick}>Hard</button>
                    </div>
                </div>

                <div className="rightPack">
                    <h2>Choose your side</h2>
                    <div id="pieceContainer">
                        <img id="redPiece" src={red_piece_selected} alt="" onClick={onPieceClick}></img>
                        <img id="yellowPiece" src={yellow_piece_unselected} alt="" onClick={onPieceClick}></img>
                    </div>
                </div>
            </div>

            <input className="buttonStandard" type="submit"  name="playBtn" id="playBtn" value="JOUER"/>
        </form>
    );

};

export default HomeForm;