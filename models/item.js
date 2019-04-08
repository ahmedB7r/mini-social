const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const ItemSchema = new Schema({


  name: {
    type: String,
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  comments: [{
    text: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
  }],
  postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },

  date: { type: Date, default: Date.now }
});

module.exports = Item = mongoose.model("item", ItemSchema);
