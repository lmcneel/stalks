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
      console.log(dbUserWl[0].dataValues);
    });
  },
  getPetInfo: (req, res) => {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    db.Pet.findById(req.params.id).then((data) => {
      res.json(data);
    });
  }
 };
