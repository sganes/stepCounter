const express = require('express');
const { body } = require('express-validator');

const counterController = require('../controllers/counter');

const router = express.Router();

// Team steps Accumulator Routes

// POST a step accumulator for a team
router.post('/teamCounters', [
  body('team').trim().isLength({ min: 1 }),
], counterController.postTeamCounter);

// GET the team acccumulated steps
router.get('/teamCounters', counterController.getTeamsCounter);

// MyCounter Routes

// POST a counter for a member
router.post('/myCounters', [
  body('name').trim().isLength({ min: 1 }),
  body('password').trim(),
  body('team').trim().isLength({ min: 1 }),
], counterController.postMyCounter);

// GET a member counter
router.get('/myCounters/:username', counterController.getMyCounter);

// PUT - accumulate steps to myCounter and teamcounter
router.patch('/myCounters/:username', [
  body('steps').trim().isInt({ min: 1 })], counterController.updateStepsCount);

module.exports = router;
