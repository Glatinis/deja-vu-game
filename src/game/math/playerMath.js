const { ResourceTypes } = require("../../utils/resourceEnums");

module.exports = function generateRandomAgenda() {
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