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
  getPetInfo: (req, res) => {
    db.Pet.findById(req.params.id).then((data) => {
      res.json(data);
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
