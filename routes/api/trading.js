// This file files goes in the server side routes folder

const router = require('express').Router();
const request = require('request');

// Portfolio Model
const Portfolio = require('../../models/mongo/portfolio');

router.route('/quote')
.get(function(req, res) {
    request(
      `https://api.iextrading.com/1.0/stock/${req.body.ticker}/batch?types=quote,news,chart&range=1m&last=1`,
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const found = JSON.parse(body);
            res.json(found);
            console.log(found);
        } else {
            console.log(error);
            found = {};
        };
      }
    );
});

// // @route GET api/trading
// // @desc  Get all Portfolio
// // @access Public
// // Fetch all the items from the Portfolio Collection in the database
// // To test it put the following route in Postman http://localhost:3000/api/trading
// router.get('/', (req,res) => {
//     Portfolio.find()
//     .sort({user_id:1 })
//     .then(portfolio => res.json(portfolio));

// });

// // @route POST api/trading
// // @desc  Create A Post
// // @access Public
// // Post a new item into the Databse
// // To test it put the following route in Postman http://localhost:3000/api/trading
// router.post('/', (req,res) => {
    
//     const newPortfolio = new Portfolio({
//         // user_id: req.body.user_id,
//         name: req.body.name,
//         cash: req.body.cash,
//         currentValue: req.body.currentValue,
              
//     });

//     // newPortfolio.trades.push({
//     //     transaction_id: Number,
//     //     date: Date,
//     //     type: String,
//     //     ticker:String,
//     //     sharePrice:Number,
//     //     shares:Number
//     // });
//     newPortfolio.save().then(portfolio => res.json(portfolio));

// });

module.exports = router;
