import Game from "./Game.js";

const moves = process.argv.slice(2);

const game = new Game(moves);
game.play()
