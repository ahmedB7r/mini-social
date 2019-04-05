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

// @route   put api/items/:id
// @desc    like A Item
// @access  private
// router
//   .put("/like", auth, (req, res) => {
//     Item.findByIdAndUpdate(
//       req.body.ids.postId,
//       { $push: { likes: req.body.ids.userId } },
//       { new: true }
//     ).exec((err, result) => {
//       if (err) {
//         return res.status(400);
//       }
//       res.json(result);
//     });
//   })
//   .then(response => {
//     return response.json();
//   })
//   .catch(err => {
//     console.log(err);
//   });

// const like = (params, credentials, postId) => {
//   return fetch("/api/posts/like/", {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + credentials.t
//     },
//     body: JSON.stringify({ userId: params.userId, postId: postId })
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// const unlike = (params, credentials, postId) => {
//   return fetch("/api/posts/unlike/", {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + credentials.t
//     },
//     body: JSON.stringify({ userId: params.userId, postId: postId })
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// const comment = (params, credentials, postId, comment) => {
//   return fetch("/api/posts/comment/", {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + credentials.t
//     },
//     body: JSON.stringify({
//       userId: params.userId,
//       postId: postId,
//       comment: comment
//     })
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// const uncomment = (params, credentials, postId, comment) => {
//   return fetch("/api/posts/uncomment/", {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + credentials.t
//     },
//     body: JSON.stringify({
//       userId: params.userId,
//       postId: postId,
//       comment: comment
//     })
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

module.exports = router;
