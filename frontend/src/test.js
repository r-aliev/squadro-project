
class Piece {

/**
 * @param {string} color
 * @param {Number} move
 * @param {Number} x
 * @param {Number} y
 * @param {Number} sens
 */
	constructor(color, move, x, y, sens) {
		this.color = color;
		this.move = move;
		this.x = x;
		this.y = y;
		this.sens = sens;
	}
}


class Player {

/**
 * @param {Array<Piece>} pieces
 */
	constructor(pieces) {
		this.pieces = pieces;
	}
	getPieces() {
		return this.pieces;
	}
}


class Board {

/**
 * @param {Player} player
 * @param {Player} computer
 * @param {Boolean} turn
 * @param {Plateau} plateau
 */
	constructor(player, computer, turn, plateau) {
		this.player = player;
		this.computer = computer;
		this.turn = turn;
		this.plateau = plateau;
	}
}

class Node {

/**
 * @param {Number} score
 * @param {Number} depth
 * @param {Board} board
 * @param {Array<Node>} nodes
 */
	constructor(score, depth, board, nodes) {
		this.score = score;
		this.depth = depth;
		this.board = board;
		this.nodes = nodes;
	}
}



class Plateau {

    /**
     * @param {Array<Array<Piece>>} pieces
     */
        constructor(pieces) {
            this.pieces = pieces;
        }
    }


const maxScore = 200000
const minScore = -1*200000

function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function gamenode() {
    
}


/**
 * @param {Node} node
 */

 function possibleNodes(node){
    
    if (winner(node.board)!==null) throw Error("possibleNodes");
    let childNode = []; //initialiser la variable
    for(let i=0;i<5;i++){ //On deplace noeud par noeud, on initialise les parametre de chaque noeud, on l'evalue s'il est un noeud final
        childNode[i] = new Node();
        childNode[i].board = makeMove(node.board, i);
        if (childNode[i].board == null) {
            childNode[i] = null;
        } else {
            childNode[i].depth = node.depth - 1;
            childNode[i].nodes = null;
        }
    }
    return childNode;
}


/**
 * @param {Node} node
 */

function generateTree(node) {
    if( node==null || node.depth==0 ) return ;
    else if(winner(node.board)){
        node.nodes = null;
    }
    else{
        let pp= possibleNodes(node); 
        node.nodes = [] ;
        for(let i=0;i<5;i++){
            if (pp[i] != null) {
            node.nodes[i] = new Node();
            node.nodes[i] = pp[i];
            node.nodes[i].board.turn = (!node.board.turn)
            generateTree(node.nodes[i]);
            }
        }
    }
}




/**
 * @param {Board} board
 * @param {Number} i
 */

function makeMove(board,i){ // fonction qui deplace un pion, avec clonage du board on fait makemove(board,4) ca veut dire on deplace le pion computer[4], et qui se trouve sur board.plateau.pieces[i+1][] / board.plateau.pieces[][i+1] chez player (le i=4)
    let boardClone=clone(board);
    let precedentVide= true;
    let j;
    if(boardClone.turn==true){ 
        if(board.computer.pieces[i].sens==-1 && board.computer.pieces[i].y==0) ////
            return null; 
        if(boardClone.computer.pieces[i].sens==1){ // on va verifier les cases qu'on va sauter dessus s'ils sont vides
            for(j=boardClone.computer.pieces[i].y+1;j<=6;j++){
                if(boardClone.plateau.pieces[i+1][j]!=null){ //si la case est occupé par l'adversaire
                    initialisePion(boardClone,boardClone.player.pieces[j-1]);
                    precedentVide=false;
                }
                else if( !precedentVide && boardClone.plateau.pieces[i+1][j]==null){
                    deplace(boardClone,boardClone.computer.pieces[i],j);
                    return boardClone;
                }
                else if(precedentVide && j==boardClone.computer.pieces[i].y+boardClone.computer.pieces[i].move){ //le cas ou il n'y a move de pion adversaire a initialiser
                    deplace(boardClone,boardClone.computer.pieces[i],j);//on change le turn lors du deplacement
                    return boardClone;
                }
            }
        }
        else{
            for( j=boardClone.computer.pieces[i].y-1;j>=0;j--){
                if(boardClone.plateau.pieces[i+1][j]!=null){ 
                    initialisePion(boardClone,boardClone.player.pieces[j-1]);
                    precedentVide=false;
                }
                else if(!precedentVide && boardClone.plateau.pieces[i+1][j]==null){
                    deplace(boardClone,boardClone.computer.pieces[i],j);
                    return boardClone;
                }
                else if(precedentVide && j==boardClone.computer.pieces[i].y - boardClone.computer.pieces[i].move){
                    deplace(boardClone,boardClone.computer.pieces[i],j);
                    return boardClone;
                }
            }
        }
    }
    else{ //partie joueur
        if(boardClone.player.pieces[i].sens==-1 && boardClone.player.pieces[i].x==6)
            return null; //c'est le cas ou le pion a deja fait un aller/retour
        if(boardClone.player.pieces[i].sens==1){ 
            for( j=boardClone.player.pieces[i].x-1;j>=0;j--){

                if(boardClone.plateau.pieces[j][i+1]!=null){ 
                    initialisePion(boardClone,boardClone.computer.pieces[j-1]);
                    precedentVide=false;
                }
                else if( !precedentVide && boardClone.plateau.pieces[j][i+1]==null){
                    deplace(boardClone,boardClone.player.pieces[i],j);
                    return boardClone;
                }
                else if(precedentVide && j==boardClone.player.pieces[i].x - boardClone.player.pieces[i].move){
                    deplace(boardClone,boardClone.player.pieces[i],j);
                    return boardClone;
                }
            }
        }
        else{
            for(j=boardClone.player.pieces[i].x+1;j<=6;j++){
                if(boardClone.plateau.pieces[j][i+1]!=null){ 
                    initialisePion(boardClone,boardClone.computer.pieces[j-1]);
                    precedentVide=false;
                }
                else if(!precedentVide && boardClone.plateau.pieces[j][i+1]==null){
                    deplace(boardClone,boardClone.player.pieces[i],j);
                    return boardClone;
                }
                else if(precedentVide && j==boardClone.player.pieces[i].x+boardClone.player.pieces[i].move){
                    deplace(boardClone,boardClone.player.pieces[i],j);
                    return boardClone;
                }
            }
        }    
    }
}

/**
 * @param {Board} boardClone
 * @param {Piece} pion
 * @param {Number} j
 */

function deplace(boardClone,pion,j) {

    if(boardClone.turn){ //Si c'est le role de l'ordinateur
        boardClone.plateau.pieces[pion.x][pion.y]=null;
        pion.y=j;
        boardClone.plateau.pieces[pion.x][j]=pion;
        if(pion.y==6){
            pion.sens=-1;
            if (pion.move == 3) {
                pion.move = 1;
            }
            if (pion.move == 1) {
                pion.move = 3;
            }
        }
    }
    else{
        boardClone.plateau.pieces[pion.x][pion.y]=null;
        pion.x=j;
        boardClone.plateau.pieces[j][pion.y]=pion;
        if(pion.x==0){
            pion.sens=-1;
            if (pion.move == 3) {
                pion.move = 1;
            }
            if (pion.move == 1) {
                pion.move = 3;
            }
        }
    } 
}



/**
 * @param {Board} boardClone
 * @param {Piece} pion
 */

function initialisePion(boardClone,pion){
    if(!boardClone.turn){ //Si c'est le role du joueur donc on va initialiser l'ordinateur
        boardClone.plateau.pieces[pion.x][pion.y]=null;
        if(pion.sens==1){
            pion.y=0;
        }
        else{
            pion.y=6;
        }
        boardClone.plateau.pieces[pion.x][pion.y]=pion;
    }
    else{ //Si c'est le role de l'ordinateur
        boardClone.plateau.pieces[pion.x][pion.y]=null;
        if(pion.sens==1){
            pion.x=6;
        }
        else{
            pion.x=0;
        }
        boardClone.plateau.pieces[pion.x][pion.y]=pion;
    }
}


/**
 * @param {Node} node
 */

function evaluationScore(node){
    if(isFinal(node)){
        return analysePlateau(node) ;
    }
    else{
        if(node.board.turn==false){ //donc si c'etait l'ordi qui avait jouer
            node.score=maxScore*10;
        }
        else{
            node.score= minScore*10;
        }
        for(let i=0;i<5;i++){
            if(node.nodes[i]!=null){
                evaluationScore(node.nodes[i]);
            }
        }
    }
}

/**
 * @param {Board} board
 */

function winner(board) {
	let cptAI = 0;
	let cptJoueur = 0;

	for (let i = 0; i < 5; i++) {
		if (board.computer.pieces[i].y === 0 && board.computer.pieces[i].sens === -1) {
			cptAI++;
			if (cptAI === 4) {
				return true;
			}
		}

		if (board.player.pieces[i].x === 6 && board.player.pieces[i].sens === -1) {
			cptJoueur++;
			if (cptJoueur === 4) {
				return false;
			}
		}
	}
    return null;
}

/**
 * @param {Node} node
 */

function getNewBoard(node) {
    let newBoard=null;
    let maxValue = minScore*30;
	for (let i = 0; i < 5; i++) {
        if (node.nodes[i] != null) {
            if (node.nodes[i].score > maxValue) {
                maxValue = node.nodes[i].score;
                newBoard = node.nodes[i].board;
            }
        }
	}
    return newBoard;
}

/**
 * @param {Node} node
 */

function isFinal(node) {
	return node.nodes == null ? true : false;
}

/**
 * @param {Node} node 
 * @param {Number} alpha 
 * @param {Number} beta 
 */

function alphabeta(node, alpha, beta) {
	if (isFinal(node)) return ;

	if (node.board.turn === true) {
		for (let i = 0; i < 5; i++) {
			if (node.nodes[i] != null) {
				alphabeta(node.nodes[i], alpha, beta);
				node.score = Math.max(node.score, node.nodes[i].score);
			}
			alpha = Math.max(alpha, node.score);
		}
	} else {
		for (let i = 0; i < 5; i++) {
			if (node.nodes[i] != null) {
				alphabeta(node.nodes[i], alpha, beta);
				node.score = Math.min(node.score, node.nodes[i].score);
			}
			beta = Math.min(beta, node.score);
		}
	}
}

function AI(node){
    alphabeta(node,maxScore*20,minScore*20);
}

/**
 * @param {Node} node 
 */
function analysePlateau(node) {
    let score = 0;
    if (winner(node.board) !== null && winner(node.board)===true) {//si computer gagne
        score = maxScore + node.depth * 100; //on note meme pour la profondeur, plus depth est grande plus c'est mieux
    } else if (winner(node.board) !== null && winner(node.board)===false) {
        score = minScore + node.depth * 100; //dans ce cas c'est mieux d'avoir une profodeur min
    } else {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                //On peut avoir la possibilité de sauter en dessus du pion adversaire
                if (node.board.player.pieces[j].x === node.board.computer.pieces[i].x) {
                    if (!(node.board.computer.pieces[i].sens === -1 && node.board.player.pieces[j].y > node.board.computer.pieces[i].y)) {
                        score += 7 - Math.abs(node.board.player.pieces[j].y - node.board.computer.pieces[i].y);
                        score += 4 - node.board.player.pieces[j].move;
                        if (node.board.computer.pieces[i].sens === 1 && node.board.computer.pieces[i].y + node.board.computer.pieces[i].move >= node.board.player.pieces[j].y)
                            score += 14;
                        if (node.board.computer.pieces[i].sens === -1 && node.board.computer.pieces[i].y - node.board.computer.pieces[i].move <= node.board.player.pieces[j].y)
                            score += 14;
                    }
                }
                //il peut avoir la possibilité de sauter en dessus de notre pion
                if (node.board.player.pieces[j].y === node.board.computer.pieces[i].y) {

                    if (!(node.board.player.pieces[j].sens === -1 && node.board.player.pieces[j].x < node.board.computer.pieces[i].x)) {

                        score -= 7 - Math.abs(node.board.player.pieces[j].x - node.board.computer.pieces[i].y);
                        score -= 4 - node.board.computer.pieces[i].move;
                        if (node.board.player.pieces[j].sens === 1 && node.board.player.pieces[j].x - node.board.player.pieces[j].move <= node.board.computer.pieces[i].x) {
                            score -= 14;
                        }
                        if (node.board.player.pieces[j].sens === -1 && node.board.player.pieces[j].x + node.board.player.pieces[j].move >= node.board.computer.pieces[i].x)
                            score -= 14;
                    }
                }
            }
            if (node.board.computer.pieces[i].sens === 1) {
                score += 6 + node.board.computer.pieces[i].y;
            } else {
                score += Math.abs(12 - node.board.computer.pieces[i].y) * 2;
            }
        }
        for (let i = 0; i < 5; i++) {
            if (node.board.player.pieces[i].sens === 1) {
                score -= Math.abs(12 - node.board.player.pieces[i].x);
            } else {
                score -= (6 + node.board.player.pieces[i].x) * 2;
            }
        }
    }
    node.score = score;
}


function toString(board) {
    let s = "" ;
    let k;
    for (let i = 0; i<7; i++) {
        for (let j=0 ; j<7; j++) {
            k="";
            for(let l=0;l<5;l++){
                if(board.computer.pieces[l].x==i && board.computer.pieces[l].y==j){
                    k+= "| C" + l + "     |" ;
                }
                else if(board.player.pieces[l].x==i && board.player.pieces[l].y==j){
                    k+= "| J" + l + "     |" ;
                }
            }
            if(k==""){
                s+= "|  null  |" ;
            }
            else
                s+=k;
        }
        s+= "\n" ;
    }
    console.log(s);
}


function AIMove(node) {
    generateTree(node) ;
    evaluationScore(node);
    AI(node);
    return getNewBoard(node);
} 


let P0= new Piece("YELLOW", 3, 6, 1, 1);
let P1= new Piece("YELLOW", 1, 6, 2, 1);
let P2= new Piece("YELLOW", 2, 6, 3, 1);
let P3= new Piece("YELLOW", 1, 6, 4, 1);
let P4= new Piece("YELLOW", 3, 6, 5, 1);
let C0= new Piece("RED", 3, 1, 0, 1);
let C1= new Piece("RED", 1, 2, 0, 1);
let C2= new Piece("RED", 2, 3, 0, 1);
let C3= new Piece("RED", 1, 4, 0, 1);
let C4= new Piece("RED", 3, 5, 0, 1);


let playerPieces = [P0,P1,P2,P3,P4] ;
let joueur = new Player(playerPieces);

let computerPieces = [C0,C1,C2,C3,C4] 
let computer = new Player(computerPieces);


let pieces = [P0, P1, P2, P3, P4, C0, C1, C2, C3, C4];
let plateau= new Plateau(pieces);

let board = new Board(joueur,computer,true, plateau);

let node=new Node(0,2,board ,null);

toString(node.board) ;

let node2 = AIMove(node) ;
//console.log(node2)

toString(node2) ;