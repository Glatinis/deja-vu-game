const Kingdom = require("../classes/kingdom");
const Phases = require("../utils/phaseEnums");

class GameState {
  constructor(id) {
    this.id = id;
    this.players = [];
    this.kingdom = null;
    this.currentPhase = null;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(player) {
    this.players = this.players.filter((p) => p !== player);
  }

  startGame() {
    this.kingdom = new Kingdom();
    this.currentPhase = Phases.VOTE;
  }
}

module.exports = GameState;