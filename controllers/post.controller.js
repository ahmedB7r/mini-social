
// Item Model
const Item = require("../models/item");

const getItems = (req, res) => {
  Item.find({}, { comments: { $slice: -2 } }).

    populate('comments.postedBy', 'name')
    .sort({ date: -1 }).limit(10)
    .then(items => res.json(items));
}
const createItem = (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    postedBy: req.body.userId
  });

  newItem.save().then(item => res.json(item));
}
const deleteItem = (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
}
const editItem = (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(item => res.json(item.name))
    .catch(err => res.status(404).json({ success: false }));
}
const like = (req, res) => {


  Item.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.body.userId } }, { new: true })

    .then((item) => {



      res.json(item.likes);
    })
    .catch(err => res.status(404).json({ success: false }));


}
const unLike = (req, res) => {



  Item.findByIdAndUpdate(req.body.itemId, { $pull: { likes: req.body.userId } }, { new: true })
    .then((item) => {




      res.json(item.likes);
    })
    .catch(err => res.status(404).json({ success: false }));

}
const comment = (req, res) => {
  let text = req.body.comment
  let postedBy = req.body.userId
  const comment = {
    text,
    postedBy
  }


  Item.findByIdAndUpdate(req.params.id, { $push: { comments: comment } }, { new: true })

    .populate('comments.postedBy', 'name _id')
    .then((item) => {
      res.json(item.comments.slice(-2));

    }).catch(err => res.status(404).json({ success: false }));

}
module.exports = { getItems, createItem, deleteItem, editItem, like, unLike, comment };
