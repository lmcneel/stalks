const router = require('express').Router();
const request = require('request');

router.route('/achievements')
.get(function(req, res) {
  //code here
  console.log('Testing for achievements')
  res.send('Hello')

});


module.exports = router;