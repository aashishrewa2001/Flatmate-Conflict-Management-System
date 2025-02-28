const express = require('express');
const { getFlatStats } = require('../controllers/leaderboardController');
const { authenticate } = require('../middleware/authMiddleware');
const methodNotAllowed = require('../middleware/utils');

const router = express.Router();

// This creates the endpoint: GET /api/flat/stats
router.route('/stats')
.get(authenticate, getFlatStats)
.all(methodNotAllowed);


module.exports = router;
