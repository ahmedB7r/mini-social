const express = require('express');
const router = express.Router();

const userCtrl = require('../../controllers/user.controller')

// @route   POST api/users
// @desc    Register new user
// @access  Public

router.route('/')
  .post(userCtrl.signUp);

module.exports = router;