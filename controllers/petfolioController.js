const db = require('../models/mysql');

module.exports = {
  getTickerText: function(req, res) {
    console.log('-----------------'+req.body);
    // db.UserWatchlist.get(req.body);
  },
};
