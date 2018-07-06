const mongoose = require('mongoose');
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
const tradeSchema = new Schema({
    date: Date,
    type: String,
    ticker: String,
    sharePrice: Number,
    shares: Number,
});

// This creates our model from the above schema, using mongoose's model method
const Trade = mongoose.model('Trade', tradeSchema);

// Export the Portfolio model
module.exports = Trade;
