const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const ItemSchema = new Schema({
  itemId: { type: Schema.Types.ObjectId, auto: true }
  ,

  name: {
    type: String,
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId, ref: 'User', unique: true
  }],
  date: { type: Date, default: Date.now }
});

module.exports = Item = mongoose.model("item", ItemSchema);
