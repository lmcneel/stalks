const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  username: { type: String, required: true },
  email: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
