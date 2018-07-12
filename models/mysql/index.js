'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];
const db = {};
let seq;

let sequelize; 

if (config.use_env_variable) {
<<<<<<< HEAD
<<<<<<< HEAD
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
=======
  seq = new Sequelize(process.env[config.use_env_variable], config);
} else {
  seq  = new Sequelize(config.database, config.username, config.password, config);
>>>>>>> 8bed74f11cb863fe1ff3966a951ae281e29ccfc7
=======
  seq = new Sequelize(process.env[config.use_env_variable], config);
} else {
  seq  = new Sequelize(config.database, config.username, config.password, config);
>>>>>>> d94b7091b6d76985f0aba4322696018283e0d444
}

const sequelize = seq;


fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;


module.exports = db;
