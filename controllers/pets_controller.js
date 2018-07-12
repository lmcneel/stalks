const db = require("../models/mysql");

module.exports = {
  findAll: function(req, res) {
    db.Pet
      .findAll(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Pet
      .findOne({id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Pet
      .create(req.body)
      .then(newPet => res.json(newPet))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Pet
      .update(req.body, {where: {id: req.params.id}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Pet
      .destory({where: {id: req.params.id}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}

