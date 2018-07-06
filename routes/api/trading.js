// This file files goes in the server side routes folder

const router = require('express').Router();
const request = require('request');
const tradingController = require('../../controllers/tradingController');

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

router.route('/buy/:id')
.post(tradingController.buy);

router.route('/sell/:id')
.post(tradingController.sell);

module.exports = router;
