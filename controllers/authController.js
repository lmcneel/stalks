const db = require('../models/mysql');

module.exports = {
  findAll: function(req, res) {
    db.Session
      .findAll(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Session
      .findOne({id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Session
      .create(req.body)
      .then(newSession => res.json(newSession))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Session
      .update(req.body, {where: {id: req.params.id}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Session
      .destory({where: {id: req.params.id}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};


