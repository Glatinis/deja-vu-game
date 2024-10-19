const { STARTING_VALUES } = require("../../utils/constants");
const { ResourceTypes } = require("../../utils/resourceEnums");

class Player {
  constructor(name, resourceType) {
    this.name = name;
    this.resourceType = resourceType;

    this.power = STARTING_VALUES.power;
    this.influence = STARTING_VALUES.influence;
    this.tyranny = STARTING_VALUES.tyranny;

    this.resources = {
      military: STARTING_VALUES.military,
      wealth: STARTING_VALUES.wealth,
      publicRelations: STARTING_VALUES.publicRelations,
    };

    this.mainResource = resourceType;
    this.agenda = this.generateRandomAgenda();

    this.entourage = {
      managers: [],
      guards: [],
      henchmen: [],
    };

    this.domain = {};
  }

  generateRandomAgenda() {
    const max = 400;
    const min = 200;
    const resourceTypes = ["military", "wealth", "publicRelations"];
    const nonMainResources = resourceTypes.filter(
      (res) => res !== this.resourceType
    );
    const randomResource =
      nonMainResources[Math.floor(Math.random() * nonMainResources.length)];

    return {
      resource: ResourceTypes[randomResource.toUpperCase()],
      targetLevel: Math.floor(Math.random() * (max - min + 1) + min),
    };
  }
}

module.exports = Player;
