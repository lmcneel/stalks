const db = require('../models/mysql');

// Defining methods for the userWatchlistsController
module.exports = {
  findAll: function(req, res) {
    db.userWatchlist
      .find(req.query)
      .sort({date: -1})
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.userWatchlist
      .findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function(req, res) {
    db.userWatchlist
      .create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function(req, res) {
    db.userWatchlist
    .update(req.body, {where: {id: req.params.id}})
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.userWatchlist
    .destory({where: {id: req.params.id}})
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
  },
};
