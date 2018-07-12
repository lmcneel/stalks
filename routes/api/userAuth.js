const router = require('express').Router();
require('./config/passport.js');

router.route('/signup')
.get(function(req, res) {
  // code here
});

router.route('/login')
.post(function(req, res) {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'});
 });

module.exports = router;
