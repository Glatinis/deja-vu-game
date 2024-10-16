const { STARTING_VALUES } = require("../../utils/constants");


class Kingdom {
  constructor() {
    this.resources = {
      military: STARTING_VALUES.military,
      wealth: STARTING_VALUES.wealth,
      publicRelations: STARTING_VALUES.publicRelations,
    };
  }
}
