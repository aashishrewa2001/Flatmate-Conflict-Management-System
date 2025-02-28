
const express = require('express');
const { getLeaderboard, getFlatStats } = require('../controllers/leaderboardController');
const { authenticate } = require('../middleware/authMiddleware');
const methodNotAllowed = require('../middleware/utils');

const router = express.Router();

router.route('/')
.get(authenticate, getLeaderboard)
.all(methodNotAllowed);
// router.get('/flat/stats', authenticate, getFlatStats);

module.exports = router;
