

const express = require('express');
const { voteComplaint } = require('../controllers/voteController');
const { authenticate } = require('../middleware/authMiddleware');
const { getTrendingComplaints } = require('../controllers/complaintController');
const methodNotAllowed = require('../middleware/utils');

const router = express.Router();

// POST /api/complaints/{id}/vote – Upvote or downvote a complaint
router.route('/:id/vote')
.post(authenticate, voteComplaint)
.all(methodNotAllowed);

// GET /api/complaints/trending – Fetch most upvoted (trending) complaints
router.route('/trending')
.get(authenticate, getTrendingComplaints)
.all(methodNotAllowed);

module.exports = router;
