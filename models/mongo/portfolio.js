const mongoose = require("mongoose");
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
const portfolioSchema = new Schema({
  // `user_id` is from user schema should be assinged not generated
  user_id:  { type: Schema.Types.ObjectId, ref: 'Users'},
  // `name` is required and of type String
  name:     { type: String, required: true },
  // `cash` is required and of type Number, will be updated after each buy/sell transaction
  cash:     { type: Number, required: true },   // db.portfolio.update({user_id: "XXXXXX"}, {$set: {cash:3000000}})
  
  // `currentValue` is type Number, this is the most recent calculation of portfolio value
  currentValue: { type: Number},  // db.portfolio.update({user_id: "XXXXXX"}, {$set: {currentValue:150000000}})
  
     // `trades` is an array each time a new transaction is completed it will be pushed to this array
  trades: [ {
    transaction_id: { type: Number},
    date:           { type: Date},
    type:           { type: String},
    ticker:         { type: String},
    sharePrice:     { type: Number},
    shares:         { type: Number}
  }]  //db.portfolio.update({user_id: "XXXXXX"}, {$push: trades: [ {transaction_id: XXXXXX, date: timestamp, type: buy, ticker: AAPL, sharePrice: 1865300, shares: 20]
});

// This creates our model from the above schema, using mongoose's model method
const Portfolio = mongoose.model("Portfolio", portfolioSchema);

// Export the Portfolio model
module.exports = Portfolio;
