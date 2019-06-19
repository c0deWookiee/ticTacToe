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

let theBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
let row1 = theBoard[0];
let row2 = theBoard[1];
let row3 = theBoard[2];
const winnerCheck = () => {
  if (
    //check rows horizontally
    (row1[0] === "X" && row1[1] === "X" && row1[2] === "X") ||
    (row1[0] === "O" && row1[1] === "O" && row1[2] === "O") ||
    ((row2[0] === "X" && row2[1] === "X" && row2[2] === "X") ||
      (row2[0] === "O" && row2[1] === "O" && row2[2] === "O")) ||
    ((row3[0] === "X" && row3[1] === "X" && row3[2] === "X") ||
      (row3[0] === "O" && row3[1] === "O" && row3[2] === "O"))
  ) {
    return true;
  } else if (
    //check rows vertically
    (row1[0] === "X" && row2[0] === "X" && row3[0] === "X") ||
    (row1[0] === "O" && row2[0] === "O" && row3[0] === "O") ||
    ((row1[1] === "X" && row2[1] === "X" && row3[1] === "X") ||
      (row1[1] === "O" && row2[1] === "O" && row3[1] === "O")) ||
    ((row1[2] === "X" && row2[2] === "X" && row3[2] === "X") ||
      (row1[2] === "O" && row2[2] === "O" && row3[2] === "O"))
  ) {
    return true;
  } else if (
    //check diagonals
    (row1[0] === "X" && row2[1] === "X" && row3[3] === "X") ||
    (row1[0] === "O" && row2[1] === "O" && row3[3] === "O") ||
    ((row1[2] === "X" && row2[1] === "X" && row3[0] === "X") ||
      (row1[2] === "O" && row2[1] === "O" && row3[0] === "O"))
  ) {
    return true;
  }
};
//adding event listeners to all squares//////////////////////////////////////////////
const boxes = document.getElementsByClassName("square");
const markTheBoard = () => {
  for (let box of boxes) {
    box.addEventListener("click", () => {
      //if id is smaller than 3 use row 1
      if (box.id < 3) {
        console.log(row1);
        row1[box.id] === ""
          ? ((row1[box.id] = currentPlayer.mark),
            (box.innerHTML = currentPlayer.mark),
            ticTacToe())
          : alert("spot is taken");
        console.log(theBoard);
      }
      //if id is larger than 2 and smaller than 6 use row 2
      else if (box.id > 2 && box.id < 6) {
        //subtract 3 to allow for the respective slots in row 2

        row2[box.id - 3] === ""
          ? ((row2[box.id - 3] = currentPlayer.mark), ticTacToe())
          : alert("spot is taken");
        console.log(theBoard);
      }

      //if id is larger than 5 use row 3
      else if (box.id > 5) {
        //subtract 3 ro allow for the respetive slots in row 3

        // row3[box.id - 6] = currentPlayer.mark;
        row3[box.id - 6] === ""
          ? ((row3[box.id - 6] = currentPlayer.mark), ticTacToe())
          : alert("spot is taken");
        console.log(theBoard);
      }

      // ticTacToe();
    });
  }
};

markTheBoard();

//main game concerns//////////////////////////////////////////////

const ticTacToe = async reset => {
  let emptySpaces = 9;
  //to check for a winner
  if (winnerCheck(theBoard)) {
    alert(`${currentPlayer.name} is the winner`);
    return;
  } else {
    //to check for a tie
    for (let row of theBoard) {
      for (let box of row) {
        if (box !== "") emptySpaces--;
      }
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
console.log(reset);
reset.addEventListener("click", () => {
  resetBoard();
  // ticTacToe();
});
const resetBoard = () => {
  theBoard.forEach(row => {
    row.forEach((col, i) => {
      row[i] = "";
      //reset the innerHTML for each node.
      boxes[i].innerHTML = "";
    });
  });
  alert("new game!");
  ticTacToe("reset");
};

ticTacToe();
