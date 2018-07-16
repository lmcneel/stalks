const router = require('express').Router();
// const User = require('../../models/mysql/user')
router.route('/achievements')
.get(function(req, res) {
  // code here
  console.log('Testing for achievements');
  res.send('Hello');
});

module.exports = router;
