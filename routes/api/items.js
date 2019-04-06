const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const Item = require("../../models/item");

// @route   GET api/items
// @desc    Get All Items
// @access  private
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
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
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(() =>
    Item.find()
      .sort({ date: -1 })
      .then(items => res.json(items))
  );
});

// @route   put api/items/like/:id
// @desc    like A Item
// @access  private
router.put("/new/like", auth, (req, res) => {



  Item.findByIdAndUpdate(req.body.itemId, { $addToSet: { likes: req.body.userId } }, { new: true })
    .then((item) => {
      console.log(req.body);


      console.log(item.likes);

      res.json(item);
    })

});
// @route   put api/items/new/unlike/
// @desc    unlike A Item
// @access  private
router.put("/new/unlike", auth, async (req, res) => {



  await Item.findByIdAndUpdate(req.body.itemId, { $pull: { likes: req.body.userId } }, { new: true })
    .then((item) => {
      console.log(req.body);


      console.log(item.likes);

      res.json(item);
    });
});

module.exports = router;
