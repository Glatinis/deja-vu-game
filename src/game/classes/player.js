const { STARTING_VALUES } = require("../../utils/constants");
const { generateRandomAgenda } = require("../math/playerMath");

class Player {
  constructor(name, resourceType) {
    this.name = name;
    this.mainResource = resourceType;

    this.power = STARTING_VALUES.power;
    this.influence = STARTING_VALUES.influence;
    this.tyranny = STARTING_VALUES.tyranny;

    this.resources = {
      military: STARTING_VALUES.military,
      wealth: STARTING_VALUES.wealth,
      publicRelations: STARTING_VALUES.publicRelations,
    };

    this.agenda = generateRandomAgenda();

    this.entourage = {
      managers: [],
      guards: [],
      henchmen: [],
    };

    this.domain = {};
  }
}

module.exports = Player;
