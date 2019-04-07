const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const Item = require("../../models/item");

// @route   GET api/items
// @desc    Get All Items
// @access  private
router.get("/", (req, res) => {
  Item.find().

    populate('comments.postedBy', 'name')
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    postedBy: req.body.userId
  });

  newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   put api/items/:id
// @desc    edit A Item
// @access  Public
router.put("/:id", auth, (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(item => res.json(item.name))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   put api/items/like/:id
// @desc    like A Item
// @access  private
router.put("/new/like", auth, (req, res) => {



  Item.findByIdAndUpdate(req.body.itemId, { $addToSet: { likes: req.body.userId } }, { new: true })
    .

    populate('comments.postedBy', 'name')
    .then((item) => {



      res.json(item.likes);
    })
    .catch(err => res.status(404).json({ success: false }));


});
// @route   put api/items/new/unlike/
// @desc    unlike A Item
// @access  private
router.put("/new/unlike", auth, (req, res) => {



  Item.findByIdAndUpdate(req.body.itemId, { $pull: { likes: req.body.userId } }, { new: true })
    .

    populate('comments.postedBy', 'name').then((item) => {




      res.json(item.likes);
    })
    .catch(err => res.status(404).json({ success: false }));

});



// @route   put api/items/new/comment/:id
// @desc    add comment
// @access  private
router.put("/new/comment/:id", auth, (req, res) => {
  let text = req.body.comment
  let postedBy = req.body.userId
  const comment = {
    text,
    postedBy
  }


  Item.findByIdAndUpdate(req.params.id, { $push: { comments: comment } }, { new: true }).

    populate('comments.postedBy', 'name')
    .then((item) => {

      res.json(item.comments);
    }).catch(err => res.status(404).json({ success: false }));

});




module.exports = router;
