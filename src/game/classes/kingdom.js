const { STARTINGVALUES: STARTINGVALUES } = require("../utils/constants");


class Kingdom {
  constructor() {
    this.resources = {
      military: STARTINGVALUES.military,
      wealth: STARTINGVALUES.wealth,
      publicRelations: STARTINGVALUES.publicRelations,
    };
  }
}

module.exports = Kingdom;