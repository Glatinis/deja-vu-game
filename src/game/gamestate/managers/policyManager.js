const Policy = require("../../classes/policy");
const Effect = require("../../classes/effect");

class PolicyManager {
  constructor() {
    this.policies = this.createPolicies();
    this.activePolicies = [];
  }

  // Returns specified number of policies, excluding active policies
  getRandomPolicies(numToDraw) {
    const availablePolicies = this.policies.filter(policy => !this.activePolicies.includes(policy));
    let policies = availablePolicies.sort(() => Math.random() - 0.5).slice(0, numToDraw);
    
    this.activePolicies = [...this.activePolicies, ...policies];
    return policies;
  }

  createPolicies() {
    let policies = [];

    policies.push(
      new Policy(
        "Martial Law",
        "Set the kingdom to be ruled by the military",
        [
          new Effect(["military"], "military", false, 1.3),
          new Effect(["publicRelations"], "publicRelations", false, 0.8),
        ]
      )
    )

    policies.push(
      new Policy(
        "Wealth Redistribution",
        "Redistribute wealth among the kingdom, slightly reducing fiscal power but improving public relations.",
        [
          new Effect(["all"], "wealth", true, -10),
          new Effect(["kingdom", "publicRelations"], "publicRelations", true, 15),
          new Effect(["wealth"], "wealth", true, -5),
        ]
      )
    );
    
    policies.push(
      new Policy(
        "Military Parade",
        "Organize a grand military parade, boosting PR and military power but costing wealth.",
        [
          new Effect(["military"], "military", false, 1.2),
          new Effect(["kingdom", "publicRelations"], "publicRelations", false, 1.1),
          new Effect(["all"], "wealth", true, -15),
        ]
      )
    );
    
    policies.push(
      new Policy(
        "Tax Relief",
        "Provide temporary tax relief, improving public relations but reducing the kingdom's wealth.",
        [
          new Effect(["kingdom", "wealth"], "wealth", true, -20),
          new Effect(["publicRelations"], "publicRelations", false, 1.15),
        ]
      )
    );
    
    policies.push(
      new Policy(
        "Build Infrastructure",
        "Invest in infrastructure to boost the economy but costs military influence.",
        [
          new Effect(["kingdom", "wealth"], "wealth", true, 25),
          new Effect(["military"], "military", true, -10),
        ]
      )
    );
    
    policies.push(
      new Policy(
        "Propaganda Campaign",
        "Run a campaign to gain more public support, boosting PR but reducing wealth.",
        [
          new Effect(["publicRelations"], "publicRelations", false, 1.3),
          new Effect(["wealth"], "wealth", true, -10),
        ]
      )
    );
    
    policies.push(
      new Policy(
        "Defense Budget Increase",
        "Increase the defense budget, improving military power but reducing PR.",
        [
          new Effect(["military"], "military", false, 1.25),
          new Effect(["kingdom", "publicRelations"], "publicRelations", false, 0.9),
        ]
      )
    );
    
    policies.push(
      new Policy(
        "Cultural Festival",
        "Host a grand cultural festival to boost PR across the kingdom, but at a cost to wealth.",
        [
          new Effect(["kingdom", "publicRelations"], "publicRelations", false, 1.15),
          new Effect(["all"], "wealth", true, -12),
        ]
      )
    );
    
    policies.push(
      new Policy(
        "Mercenary Recruitment",
        "Recruit mercenaries to bolster the military, improving military at a cost to wealth and PR.",
        [
          new Effect(["military"], "military", false, 1.3),
          new Effect(["all"], "wealth", true, -15),
          new Effect(["publicRelations"], "publicRelations", false, 0.85),
        ]
      )
    );
    
    policies.push(
      new Policy(
        "Charity Drive",
        "Launch a charity drive to help the needy, increasing public relations but at a cost to wealth.",
        [
          new Effect(["kingdom", "publicRelations"], "publicRelations", false, 1.2),
          new Effect(["all"], "wealth", true, -10),
        ]
      )
    );
    
    policies.push(
      new Policy(
        "Martial Oversight",
        "Assign military officers to oversee public areas, boosting military influence but lowering PR.",
        [
          new Effect(["military"], "military", false, 1.15),
          new Effect(["publicRelations"], "publicRelations", false, 0.9),
        ]
      )
    );

    return policies;
  }
}

module.exports = PolicyManager;