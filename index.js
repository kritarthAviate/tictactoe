import { showGameBoard } from "./utils.js";
import prompt from "prompt";

// Show initial state of GameBoard
// Take input 1-9
// throw error if square already filled and ask for input
// show Winner
// else show Draw if all squares are filled and no winner

const gameBoard = new Array(9).fill("").map((_, i) => (i + 1).toString());

const checkInput = (input) => {
  if (
    typeof input != "number" ||
    input < 1 ||
    input > 9 ||
    gameBoard[input - 1] == "X" ||
    gameBoard[input - 1] == "O"
  ) {
    return false;
  }
  return true;
};

const checkWin = (player) => {
  for (let i = 0; i < 3; i++) {
    // check along horizontal and vertical lines
    let horizontalCount = 0;
    let verticalCount = 0;
    let l2rCount = 0;
    let r2lCount = 0;
    for (let j = i * 3; j < 3 * (i + 1); j++) {
      if (gameBoard[j] == player) horizontalCount++;
    }
    for (let k = i; k < 9; k = k + 3) {
      if (gameBoard[k] == player) verticalCount++;
    }
    if (horizontalCount == 3 || verticalCount == 3) {
      return true;
    }
    // check along diagonals
    for (let l = 0; l < 3; l++) {
      let l2rIndex = 4 * l;
      let r2lIndex = 2 * (l + 1);
      if (gameBoard[l2rIndex] == player) l2rCount++;
      if (gameBoard[r2lIndex] == player) r2lCount++;
      if (l2rCount == 3 || r2lCount == 3) {
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
  showGameBoard(gameBoard);
  console.log(`\n${player}'s turn`);
  prompt.start();
  prompt.get(["input"], function (err, result) {
    const input = +result.input;
    if (checkInput(input)) {
      gameBoard[input - 1] = player;
      if (checkWin(player)) {
        console.log(`\nPlayer ${player} won!\n`);
        showGameBoard(gameBoard);
        return;
      }
      if (checkDraw()) {
        console.log(`\nGame Draw!\n`);
        showGameBoard(gameBoard);
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
