const { validationResult } = require('express-validator');

const MyCounter = require('../models/myCounter');
const TeamCounter = require('../models/teamCounter');


exports.postTeamCounter = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'validation Fail',
      errors: errors.array(),
    });
  } else {
    const team = new TeamCounter(req.body.team);
    team.postTeam();
    res.status(201).json({
      message: `Counter for Team - ${req.body.team} created succesfully`,
    });
  }
  next();
};

exports.getTeamsCounter = (req, res, next) => {
  const teamsStepCounter = TeamCounter.getTeamsCounter();
  if (teamsStepCounter.length > 0) {
    res.status(200).json({
      teamsStepCounter,
    });
  } else {
    res.status(404).send('Empty Counters!');
  }
  next();
};

exports.postMyCounter = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'validation Fail',
      errors: errors.array(),
    });
  } else {
    const myCounter = new MyCounter(req.body);
    myCounter.postMyCounter();
    res.status(201).json({
      message: 'Counter created succesfully',
    });
  }
  next();
};

exports.getMyCounter = (req, res, next) => {
  const myCounter = MyCounter.getMyCounter(req.params.name);
  if (myCounter) {
    res.status(200).json({
      myCounter,
    });
  } else {
    res.status(404).send('Counter not found');
  }
  next();
};

exports.updateStepsCount = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'validation Fail',
      errors: errors.array(),
    });
  } else {
    const updatedMemberCounter = MyCounter.updateStepsCount(req.params.name, req.body.steps);
    TeamCounter.updateTeamStepsCount(updatedMemberCounter.team, req.body.steps);
    res.status(201).json({
      message: 'Steps updated successfully',
    });
  }
  next();
};

exports.isTeamPresent = (team) => TeamCounter.isTeamPresent(team);

exports.isMemberPresent = (name) => MyCounter.isMemberPresent(name);
