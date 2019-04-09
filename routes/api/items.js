const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const itemCtrl = require("../../controllers/post.controller")

// @route   GET api/items
// @desc    Get All Items
// @access  private

router.route('/')
  .get(itemCtrl.getItems);


// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.route('/')
  .post(auth, itemCtrl.createItem);


// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  private
router.route('/:id')
  .delete(auth, itemCtrl.isPoster, itemCtrl.deleteItem);



// @route   put api/items/:id
// @desc    edit A Item
// @access  Public

router.route('/:id')
  .put(auth, itemCtrl.isPoster, itemCtrl.editItem);



// @route   put api/items/like/:id
// @desc    like A Item
// @access  private
router.route("/new/like/:id")
  .put(auth, itemCtrl.like);


// @route   put api/items/new/unlike/
// @desc    unlike A Item
// @access  private
router.route("/new/unlike")
  .put(auth, itemCtrl.unLike);






// @route   put api/items/new/comment/:id
// @desc    add comment
// @access  private
router.route("/new/comment/:id")
  .put(auth, itemCtrl.comment);

router.param('id', itemCtrl.postByID)



module.exports = router;
