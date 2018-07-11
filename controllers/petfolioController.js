const db = require('../models/mysql');

module.exports = {
  getTickerText: function(req, res) {
    console.log('here-----------------'+req.body);
    // db.UserWatchlist.get(req.body);
    db.UserWatchlist.findAll({
      // where: {
      //   UserId: %user,
      // },
    }).then(function(dbUserWl) {
      res.json(dbUserWl);
      console.log("-------------------------"+res);
      console.log(dbUserWl[0].dataValues);
      // console.log(dbUserWl);
      // console.log("dbUserW1: "+dbUserWl); returns this: [object SequelizeInstance:UserWatchlist]
    });
  },
 };
