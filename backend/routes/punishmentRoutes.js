

const express = require('express');
const { assignPunishment } = require('../controllers/punishmentController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:id/punish', authenticate, assignPunishment);

module.exports = router;
