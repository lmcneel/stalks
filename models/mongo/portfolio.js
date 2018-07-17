
const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
const portfolioSchema = new Schema({

  // Good to include mongo since we're using 2 databases if we ever need to update
  // through user modal we know where to start
  MongoUser_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  // `cash` is required and of type Number, will be updated after each buy/sell transaction
  cash: {
    type: Number,
    required: true,
    default: 300000,
  }, // db.portfolio.update({user_id: "XXXXXX"}, {$set: {cash:3000000}})

  // `currentValue` is type Number, this is the most recent calculation of portfolio value
  currentValue: {
    type: Number,
  }, // db.portfolio.update({user_id: "XXXXXX"}, {$set: {currentValue:150000000}})
  // `trades` is an array each time a new transaction is completed it will be pushed to this array
  trades: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trade',
  }],

// db.portfolio.update({user_id: "XXXXXX"}, {$push: trades:
// [ {transaction_id: XXXXXX, date: timestamp, type: buy, ticker: AAPL, sharePrice: 1865300, shares: 20]

});

// This creates our model from the above schema, using mongoose's model method
const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// Export the Portfolio model
module.exports = Portfolio;
