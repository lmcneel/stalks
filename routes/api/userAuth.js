// Requiring our models and passport as we've configured it
const express = require('express');
const router = express.Router();
const User = require('../models/mysql/user.js');
const passport = require('../config/passport');

module.exports = function(app) {

// Login route
router.route('/api/login')
.post(function(req, res) {
    passport.authenticate('local', {
     successRedirect: '/',
     failureRedirect: '/login'});
 });
 // Signup route
  router.rpute('/api/signup')
  .post(function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    }).then(function() {
      res.redirect(307, '/api/login');
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });
  // Route for logging user out
  router.route('/api/logout')
  .get(function(req, res) {
    req.logout();
    res.redirect('/');
  });
//
  // Route for getting some data about our user to be used client side
  router.route('/api/user_data')
  .get(function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

};
