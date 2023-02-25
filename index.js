import { showGameBoard } from "./utils.js";
import prompt from "prompt";

// Show initial state of GameBoard
// Take input 1-9
// throw error if square already filled and ask for input
// show Winner
// else show Draw if all squares are filled and no winner
const boardSideLength = 3;
const gameBoard = new Array(boardSideLength ** 2)
  .fill("")
  .map((_, i) => (i + 1).toString());

const checkInput = (input) => {
  if (
    typeof input != "number" ||
    input < 1 ||
    input > boardSideLength ** 2 ||
    gameBoard[input - 1] == "X" ||
    gameBoard[input - 1] == "O"
  ) {
    return false;
  }
  return true;
};

const checkWin = (player) => {
  for (let i = 0; i < boardSideLength; i++) {
    // check along horizontal and vertical lines
    let horizontalCount = 0;
    let verticalCount = 0;
    let l2rCount = 0;
    let r2lCount = 0;
    for (let j = i * boardSideLength; j < boardSideLength * (i + 1); j++) {
      if (gameBoard[j] == player) horizontalCount++;
    }
    for (let k = i; k < boardSideLength ** 2; k = k + boardSideLength) {
      if (gameBoard[k] == player) verticalCount++;
    }
    if (
      horizontalCount == boardSideLength ||
      verticalCount == boardSideLength
    ) {
      return true;
    }
    // check along diagonals
    for (let l = 0; l < boardSideLength; l++) {
      let l2rIndex = (boardSideLength + 1) * l;
      let r2lIndex = (boardSideLength - 1) * (l + 1);
      if (gameBoard[l2rIndex] == player) l2rCount++;
      if (gameBoard[r2lIndex] == player) r2lCount++;
      if (l2rCount == boardSideLength || r2lCount == boardSideLength) {
        return true;
      }
    }
  }

  return false;
};

const checkDraw = () => {
  return gameBoard.every((element) => isNaN(+element));
};

const play = async (player) => {
  showGameBoard(gameBoard, boardSideLength);
  console.log(`\n${player}'s turn`);
  prompt.start();
  prompt.get(["input"], function (err, result) {
    const input = +result.input;
    if (checkInput(input)) {
      gameBoard[input - 1] = player;
      if (checkWin(player)) {
        console.log(`\nPlayer ${player} won!\n`);
        showGameBoard(gameBoard, boardSideLength);
        return;
      }
      if (checkDraw()) {
        console.log(`\nGame Draw!\n`);
        showGameBoard(gameBoard, boardSideLength);
        return;
      }
      if (player == "X") {
        play("O");
      } else {
        play("X");
      }
    } else {
      console.log("\nInvalid input, try again!\n");
      play(player);
    }
  });
};

const startGame = async () => {
  console.log(`\nGame Start!\n`);

  play("X");
};

startGame();
