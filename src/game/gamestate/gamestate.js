const EventEmitter = require("events");
const Kingdom = require("../classes/kingdom");
const Phases = require("../utils/phaseEnums");
const VotePhase = require("./phases/votePhase");

class GameState extends EventEmitter {
  constructor() {
    super();  // Enable event-based communication
    this.players = [];
    this.kingdom = null;
    this.currentPhase = null;
    this.started = false;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(player) {
    this.players = this.players.filter((p) => p !== player);
  }

  startGame() {
    this.started = true;
    this.kingdom = new Kingdom();
    this.startPhase(Phases.VOTE);
    console.log("Game started!");
  }

  startPhase(phase) {
    if (phase === Phases.VOTE) {
      this.currentPhase = new VotePhase();

      this.currentPhase.on("update", (data) => {
        this.emit("update", data);
      })

      this.currentPhase.startPhase();
      console.log("Phase started!")
    }
  }

  handleAction(actionData, playerId) {
    if (this.currentPhase) {
      this.currentPhase.handleAction(actionData, playerId);
    }
  }
}

module.exports = GameState;
