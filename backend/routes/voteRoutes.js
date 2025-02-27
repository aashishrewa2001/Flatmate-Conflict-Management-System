

const express = require('express');
const { voteComplaint } = require('../controllers/voteController');
const { authenticate } = require('../middleware/authMiddleware');
const { getTrendingComplaints } = require('../controllers/complaintController');

const router = express.Router();

// POST /api/complaints/{id}/vote – Upvote or downvote a complaint
router.post('/:id/vote', authenticate, voteComplaint);

// GET /api/complaints/trending – Fetch most upvoted (trending) complaints
router.get('/trending', authenticate, getTrendingComplaints);

module.exports = router;
