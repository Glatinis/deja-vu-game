const EventEmitter = require("events");
const PolicyManager = require("../managers/policyManager");

class VotePhase extends EventEmitter {
  constructor() {
    super(); // Enable event-based communication
    this.options = [];
    this.policyManager = new PolicyManager();
  }

  startPhase() {
    this.policies = this.policyManager.getRandomPolicies(3);
    this.emit("update", { type: "policiesUpdate", policies: this.policies, influencesSpent: null })
  }

  handleAction(actionData, playerId) {
    this.emit("phaseUpdate", { playerId, action: "voteCast", data: actionData });
  }
}

module.exports = VotePhase;
