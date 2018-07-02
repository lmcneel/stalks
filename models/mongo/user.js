const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
const userSchema = new Schema({
  // `user_id` not sure where this gets assgined or how we are liking to passport and MySQL
  user_id: Schema.Types.ObjectId,
   // `username` is from passport set up
  username: { type: String, required: true },
   // `email` is from passport set up
  email: { type: String, required: true },
   // `created` is generated at time of creation
  created: { type: Date, default: Date.now }
});

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
