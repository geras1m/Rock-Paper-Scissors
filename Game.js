import readline from "readline";
import Hmac from "./Hmac.js";
import Winner from "./Winner.js";
import HelpTable from "./HelpTable.js";

class Game {
  constructor(moves) {
    this.moves = moves;
  }

  checkInputMoves(moves) {
    if (moves.length < 3 || moves.length % 2 === 0 || new Set(moves).size !== moves.length) {
      console.log('You have entered an even number of parameters or they are repeated!');
      console.log('Example: node game.js Rock Scissors Paper');
      process.exit();
    }
  }

  getPcMove() {
    return this.moves[Math.floor(Math.random() * this.moves.length)];
  }

  drawMenu(hmac, moves) {
    console.log(`HMAC: ${hmac}`);
    console.log('Available moves:');
    moves.forEach((move, index) => {
      console.log(`${index + 1} - ${move}`)
    });
    console.log('0 - exit');
    console.log('? - help');
    this.getUserMove();
  }

  getUserMove() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("Enter your move: ", (symbolOfMove) => {
      if (symbolOfMove === '?') {
        HelpTable.createTable(this.moves)
        rl.close();
        this.getUserMove();
      } else if (symbolOfMove === '0') {
        console.log('You are out of the game');
        rl.close();
      } else if (symbolOfMove >= 1 && symbolOfMove <= this.moves.length) {
        const pcMove = this.getPcMove();
        const key = Hmac.createRandomKey();
        const hmacPcMove = Hmac.createHmac(key, pcMove).toUpperCase();
        const userMove = this.moves[+symbolOfMove - 1];

        console.log(`Your move: ${userMove}`);
        console.log(`Computer move: ${pcMove}`);

        Winner.consoleResultOfMoves(this.moves, pcMove, userMove);

        console.log(`HMAC: ${hmacPcMove}`);
        rl.close();
      } else {
        console.log('Incorrect input, please repeat the input again!');
        rl.close();
        this.getUserMove();
      }
    });
  }

  play() {
    this.checkInputMoves(this.moves);

    const pcMove = this.getPcMove();
    const key = Hmac.createRandomKey();
    const hmacPcMove = Hmac.createHmac(key, pcMove).toUpperCase();

    this.drawMenu(hmacPcMove, this.moves);
  }
}

export default Game;
