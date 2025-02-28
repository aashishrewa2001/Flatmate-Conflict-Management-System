

const express = require('express');
const { assignPunishment } = require('../controllers/punishmentController');
const { authenticate } = require('../middleware/authMiddleware');
const methodNotAllowed = require('../middleware/utils');

const router = express.Router();

router.route('/:id/punish')
.post(authenticate, assignPunishment)
.all(methodNotAllowed);

module.exports = router;
