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
    const [details, setDetails] = useState({pseudo: "", boardColor: "Black", level: "Easy", side: "Red"});

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }

    const onBoardClick = e => {
        if(e.target.id === "blackBoard"){
            e.target.src=black_board_selected;
            document.getElementById("whiteBoard").src=white_board_unselected;
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

    

    return (
        <form className="customForm" onSubmit={submitHandler}>
            <div className="mainContainer">
                <div className="leftPack">
                    <h2>Choose your board</h2>
                    <img id="blackBoard" src={black_board_selected} alt="" onClick={onBoardClick}></img>
                    <img id="whiteBoard" src={white_board_unselected} alt="" onClick={onBoardClick}></img>
                </div>

                <div className="midPack">
                    <div className="pinkLabel">
                        <label >Pseudo :</label>
                        <input type="text" name="pseudoInput" id="pseudoInput" onChange={e => setDetails({...details, pseudo: e.target.value})} value={details.pseudo}/>
                    </div>
                    <div className="difficulty">
                        <button className="pinkLabel" id="easyBtn" onClick={e => setDetails({...details, level: "Easy"})}>Easy</button>
                        <button className="pinkLabel" id="hardBtn" onClick={e => setDetails({...details, level: "Hard"})}>Hard</button>
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

            <input className="pinkLabel" type="submit"  name="playBtn" id="playBtn" value="JOUER" />
        </form>
    );

};

export default HomeForm;