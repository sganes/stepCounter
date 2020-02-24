const express = require('express');
const { body } = require('express-validator');

const counterController = require('../controllers/counter');

const router = express.Router();

// Team steps Accumulator Routes

// POST a step accumulator for a team
router.post('/teamCounter', [
  body('team').trim().isLength({ min: 1 }).custom((val, { req }) => {
    if (counterController.isTeamPresent(req.body.team)) {
      throw new Error('Counter for the Team is available!');
    } else {
      return val;
    }
  }),
], counterController.postTeamCounter);

// GET the team acccumulated steps
router.get('/teamCounters', counterController.getTeamsCounter);

// MyCounter Routes

// POST a counter for a member
router.post('/myCounter', [
  body('name').trim().isLength({ min: 1 }).custom((val, { req }) => {
    if (counterController.isMemberPresent(req.body.name)) {
      throw new Error('Counter for the Member is available!');
    } else {
      return val;
    }
  }),
  body('password').trim().isLength({ min: 5 }),
  body('team').trim().isLength({ min: 1 }).custom((val) => {
    if (!counterController.isTeamPresent(val)) {
      throw new Error('Not a valid Team!');
    } else {
      return val;
    }
  }),
], counterController.postMyCounter);

// GET a member counter
router.get('/myCounters/:name', counterController.getMyCounter);

// PUT - accumulate steps to myCounter and teamcounter
router.put('/myCounter/:name/steps', [
  body('steps').trim().isInt({ min: 1 }).custom((val, { req }) => {
    if (counterController.isMemberPresent(req.params.name)) {
      return val;
    }
    throw new Error('Counter for the member not available!');
  })], counterController.updateStepsCount);

module.exports = router;
