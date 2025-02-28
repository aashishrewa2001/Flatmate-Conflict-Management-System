
const express = require('express');
const {
  fileComplaint,
  getComplaints,
  resolveComplaint,
  voteComplaint,
  getTrendingComplaints
} = require('../controllers/complaintController');

const { authenticate } = require('../middleware/authMiddleware');
const methodNotAllowed = require('../middleware/utils');


const router = express.Router();

// File a new complaint and get active complaints for the flat
router.route('/')
  .post(authenticate, fileComplaint)
  .get(authenticate, getComplaints)
  .all(methodNotAllowed);           // Blocks PUT, DELETE on /complaints


// Resolve a complaint

router.route('/:id/resolve')
  .put(authenticate, resolveComplaint)
  .all(methodNotAllowed);  // Blocks GET, POST, DELETE

// Vote on a complaint (POST /api/complaints/{id}/vote)
router.route('/:id/vote')
  .post(authenticate, voteComplaint)
  .all(methodNotAllowed);

// Trending complaints (GET /api/complaints/trending)
router.route('/trending')
  .get(authenticate, getTrendingComplaints)
  .all(methodNotAllowed);


module.exports = router;

