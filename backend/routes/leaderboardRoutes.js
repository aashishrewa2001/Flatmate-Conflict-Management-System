
const express = require('express');
const { getLeaderboard, getFlatStats } = require('../controllers/leaderboardController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, getLeaderboard);
// router.get('/flat/stats', authenticate, getFlatStats);

module.exports = router;
