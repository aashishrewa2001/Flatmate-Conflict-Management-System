
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const methodNotAllowed = require('../middleware/utils');  // Import

const router = express.Router();

router.route('/register')
  .post(registerUser)
  .all(methodNotAllowed);  // Blocks GET, PUT, DELETE on /register

router.route('/login')
  .post(loginUser)
  .all(methodNotAllowed);

module.exports = router;
