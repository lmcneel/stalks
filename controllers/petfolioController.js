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
  getUserPic: function(req, res) {
    db.Pet.findOne({
      where: {UserId: 1},
      include: [{
        model: Accessory,
        where: {equipped: 1}, //
      }],
    }).then(function(dbUserPic) {
      res.json(dbUserPic);
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
