const teamsCounter = [];

module.exports = class teamCounter {
  constructor(team) {
    this.team = team;
    this.stepsCount = 0;
  }

  postTeam() {
    teamsCounter.push(this);
  }

  static getTeamsCounter() {
    return teamsCounter;
  }

  static isTeamPresent(team) {
    return teamsCounter.find((counter) => counter.team === team);
  }

  static updateTeamStepsCount(team, steps) {
    const matchedCounter = this.isTeamPresent(team);
    if (matchedCounter) {
      matchedCounter.stepsCount += Number(steps);
    }
  }
};
