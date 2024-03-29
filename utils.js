// import rl from "readline";

export function showGameBoard(gameBoard, boardSideLength) {
  for (let i = 0; i < boardSideLength ** 2; i += boardSideLength) {
    console.log(gameBoard.slice(i, i + boardSideLength));
  }
}

// export function askQuestion(query) {
//   const readline = rl.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   return new Promise((resolve) =>
//     readline.question(query, (ans) => {
//       readline.close();
//       resolve(ans);
//     })
//   );
// }

// export function acceptInput(query) {
//   const readline = rl.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   return new Promise((resolve) =>
//     readline.question(query, (ans) => {
//       if (typeof +ans != "number" || +ans < 1 || +ans > 9) {
//         console.log("input should be a number between 1 and 9");
//         return acceptInput(query);
//       } else {
//         readline.close();
//         resolve(ans);
//       }
//     })
//   );
// }
