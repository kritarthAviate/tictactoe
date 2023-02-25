import { showGameBoard } from "./utils.js";
import prompt from "prompt";

// Show initial state of GameBoard
// Take input 1-9
// throw error if square already filled and ask for input
// show Winner
// else show Draw if all squares are filled and no winner

const gameBoard = new Array(9).fill("").map((_, i) => (i + 1).toString());
const winPatterns = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

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
  for (let i = 0; i < winPatterns.length; i++) {
    let playCount = 0;
    for (let j = 0; j < 3; j++) {
      if (gameBoard[winPatterns[i][j] - 1] == player) {
        playCount++;
      }
    }
    if (playCount == 3) {
      return true;
    }
  }
  return false;
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
