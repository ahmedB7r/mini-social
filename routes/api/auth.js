const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const authCtrl = require("../../controllers/auth.controller");
// User Model

// @route   POST api/auth
// @desc    Auth user
// @access  Public


router.route('/')
  .post(authCtrl.signin);


// @route   GET api/auth/user
// @desc    Get user data
// @access  Private


router.route('/user')
  .get(auth, authCtrl.userLoad);



module.exports = router;