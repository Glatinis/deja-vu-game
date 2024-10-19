const GameState = require("./gamestate");

class Game {
  constructor(id, host) {
    this.id = id;
    this.host = host;
    this.playerIds = [];
    this.started = false;
    this.gameState = new GameState();
  }

  addPlayer(playerId) {
    this.playerIds.push(playerId);
  }
}

module.exports = Game;