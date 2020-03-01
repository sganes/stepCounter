const { validationResult } = require('express-validator');

const MyCounter = require('../models/myCounter');
const TeamCounter = require('../models/teamCounter');

const isTeamPresent = (team) => TeamCounter.isTeamPresent(team);

const isMemberPresent = (name) => MyCounter.isMemberPresent(name);

exports.postTeamCounter = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'validation Fail',
      errors: errors.array(),
    });
  } else if (!isTeamPresent(req.body.team)) {
    const team = new TeamCounter(req.body.team);
    team.postTeam();
    res.status(201).json({
      message: `Counter for Team - ${req.body.team} created succesfully`,
    });
  }
  res.status(409).send();
};

exports.getTeamsCounter = (req, res) => {
  const teamsStepCounter = TeamCounter.getTeamsCounter();
  if (teamsStepCounter) {
    res.status(200).json(teamsStepCounter);
  } else {
    res.status(404).send();
  }
};

exports.postMyCounter = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'validation Fail',
      errors: errors.array(),
    });
  } else if (!isMemberPresent(req.body.name) && isTeamPresent(req.body.team)) {
    const myCounter = new MyCounter(req.body);
    myCounter.postMyCounter();
    res.status(201).json({
      message: 'Counter created succesfully',
    });
  }
  res.status(409).send();
};

exports.getMyCounter = (req, res) => {
  const myCounter = MyCounter.getMyCounter(req.params.username);
  if (myCounter) {
    res.status(200).json({
      myCounter,
    });
  } else {
    res.status(404).send();
  }
};

exports.updateStepsCount = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'validation Fail',
      errors: errors.array(),
    });
  } else if (isMemberPresent(req.params.username)) {
    const updatedMemberCounter = MyCounter.updateStepsCount(req.params.username, req.body.steps);
    TeamCounter.updateTeamStepsCount(updatedMemberCounter.team, req.body.steps);
    res.status(201).json({
      message: 'Steps updated successfully',
    });
  }
  res.status(404).send();
};
