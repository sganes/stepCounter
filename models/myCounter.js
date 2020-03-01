const counters = [];

module.exports = class myCounter {
  constructor(member) {
    this.name = member.name;
    this.password = member.password;
    this.team = member.team;
    this.stepsCount = 0;
  }

  postMyCounter() {
    counters.push(this);
  }

  static getMyCounter(name) {
    console.log(name);
    console.log(counters);
    return counters.find((counter) => counter.name === name);
  }

  static isMemberPresent(name) {
    return counters.find((counter) => counter.name === name);
  }

  static updateStepsCount(name, steps) {
    const matchedCounter = this.getMyCounter(name);
    if (matchedCounter) {
      matchedCounter.stepsCount += Number(steps);
    }
    return matchedCounter;
  }
};
