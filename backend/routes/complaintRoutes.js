

const express = require('express');
const {
  fileComplaint,
  getComplaints,
  resolveComplaint,
  voteComplaint,
  getTrendingComplaints
} = require('../controllers/complaintController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// File a new complaint
router.post('/', authenticate, fileComplaint);

// Get active complaints for the flat
router.get('/', authenticate, getComplaints);

// Resolve a complaint
router.put('/:id/resolve', authenticate, resolveComplaint);

// Vote on a complaint (POST /api/complaints/{id}/vote)
router.post('/:id/vote', authenticate, voteComplaint);

// Trending complaints (GET /api/complaints/trending)
router.get('/trending', authenticate, getTrendingComplaints);


module.exports = router;
