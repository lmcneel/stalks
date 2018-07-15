const db = require('../models/mysql');

module.exports = {
  getTickerText: function(req, res) {
    // db.UserWatchlist.get(req.body);
    db.UserWatchlist.findAll({
      // where: {
      //   UserId: %user,
      // },
    }).then(function(dbUserWl) {
      res.json(dbUserWl);
      // console.log(dbUserWl[0].dataValues);
    });
  },

  addTicker: function(req, res) {
    db.UserWatchlist.create(req.body).then(function(dbUserWl) {
      res.json(dbUserWl);
      // console.log(dbUserWl[0].dataValues);
    });
  },

  removeTicker: function(req, res) {
    db.UserWatchlist.destroy({
      where: {
        uniqueStockSymbol: req.params.uniqueStockSymbol,
        },
      }).then(function(dbUserWl) {
      res.json(dbUserWl);
      // console.log(dbUserWl[0].dataValues);
    });
  },

 };
