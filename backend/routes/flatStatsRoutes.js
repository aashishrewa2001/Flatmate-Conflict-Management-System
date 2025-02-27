const express = require('express');
const { getFlatStats } = require('../controllers/leaderboardController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// This creates the endpoint: GET /api/flat/stats
router.get('/stats', authenticate, getFlatStats);

module.exports = router;
