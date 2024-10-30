class Effect {
  constructor(targets, targetResource, isFlat, value) {
    this.targets = targets;
    this.targetResource = targetResource;
    this.isFlat = isFlat;
    this.value = value;
  }
}

module.exports = Effect;