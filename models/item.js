const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  date: { type: Date, default: Date.now }
});

module.exports = Item = mongoose.model("item", ItemSchema);
