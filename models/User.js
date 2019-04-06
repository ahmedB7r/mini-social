const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  userId: { type: ObjectId, auto: true }
  ,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
