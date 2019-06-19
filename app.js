//here we will handle player concerns//////////////////////////////////////////////
function Player(name, mark, score) {
  this.name = name;
  this.mark = mark;
  this.score = score;
}
let player1 = new Player(prompt("What is your name? You're player X!"), "X", 2);
let player2 = new Player(prompt("What is your name? You're player O!"), "O", 0);
let currentPlayer = player2;

//this is where the board concerns are//////////////////////////////////////////////

let theBoard = ["", "", "", "", "", "", "", "", ""];
const winnerCheck = () => {
  if (
    //check rows horizontally
    (theBoard[0] === "X" && theBoard[1] === "X" && theBoard[2] === "X") ||
    (theBoard[0] === "O" && theBoard[1] === "O" && theBoard[2] === "O") ||
    ((theBoard[3] === "X" && theBoard[4] === "X" && theBoard[5] === "X") ||
      (theBoard[3] === "O" && theBoard[4] === "O" && theBoard[5] === "O")) ||
    ((theBoard[6] === "X" && theBoard[7] === "X" && theBoard[8] === "X") ||
      (theBoard[6] === "O" && theBoard[7] === "O" && theBoard[8] === "O"))
  ) {
    return true;
  } else if (
    //check rows vertically
    (theBoard[0] === "X" && theBoard[3] === "X" && theBoard[6] === "X") ||
    (theBoard[0] === "O" && theBoard[3] === "O" && theBoard[6] === "O") ||
    ((theBoard[1] === "X" && theBoard[4] === "X" && theBoard[7] === "X") ||
      (theBoard[1] === "O" && theBoard[4] === "O" && theBoard[7] === "O")) ||
    ((theBoard[2] === "X" && theBoard[5] === "X" && theBoard[8] === "X") ||
      (theBoard[2] === "O" && theBoard[5] === "O" && theBoard[8] === "O"))
  ) {
    return true;
  } else if (
    //check diagonals
    (theBoard[0] === "X" && theBoard[4] === "X" && theBoard[8] === "X") ||
    (theBoard[0] === "O" && theBoard[4] === "O" && theBoard[8] === "O") ||
    ((theBoard[2] === "X" && theBoard[4] === "X" && theBoard[6] === "X") ||
      (theBoard[2] === "O" && theBoard[4] === "O" && theBoard[6] === "O"))
  ) {
    return true;
  }
};
//adding event listeners to all squares//////////////////////////////////////////////
const boxes = document.getElementsByClassName("square");
const markTheBoard = () => {
  for (let box of boxes) {
    box.addEventListener("click", () => {
      if (theBoard[box.id] === "") {
        theBoard[box.id] = currentPlayer.mark;
        box.innerHTML = currentPlayer.mark;
        ticTacToe();
      } else {
        alert("this spot is taken");
      }
    });
  }
};

markTheBoard();

//main game concerns//////////////////////////////////////////////

const ticTacToe = async reset => {
  let emptySpaces = 9;
  //to check for a winner
  if (winnerCheck(theBoard)) {
    currentPlayer.score++;
    alert(`${currentPlayer.name} is the winner`);
    return;
  } else {
    //to check for a tie
    for (let space of theBoard) {
      if (space !== "") emptySpaces--;
    }

    if (emptySpaces === 0) {
      alert("the game is a tie");
      return;
    }
  }
  //if the reset button was pressed, reset the current player to Player2 which in turn will make player1 the current player
  if (reset) {
    currentPlayer = player2;
  }
  //if no winner or tie, then continue and switch player
  currentPlayer === player1
    ? (currentPlayer = player2)
    : (currentPlayer = player1);
  alert(`Round Start! ${currentPlayer.name}'s turn`);
};

//to reset the board.
const reset = document.getElementsByClassName("button")[0];
reset.addEventListener("click", () => {
  resetBoard();
});
const resetBoard = () => {
  theBoard.forEach((space, i) => {
    theBoard[i] = "";
    //reset the innerHTML for each node.
    boxes[i].innerHTML = "";
  });
  alert("new game!");
  ticTacToe("reset");
};
ticTacToe();
