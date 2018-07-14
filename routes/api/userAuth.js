const router = require('express').Router();
require('../../config/passport.js');

router.route('/signup')
.get(function(req, res) {
  // code here
  console.log('SIGNUP get route');
});

router.route('/signup')
  .post(function(req, res) {
    // code here
    console.log('SIGNUP got here');
});

module.exports = router;
