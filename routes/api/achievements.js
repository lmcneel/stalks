const router = require('express').Router();
const request = require('request');

router.route('/achievements')
.get(function(req, res) {
    // code here
    console.log('hello');
    res.send('hello');
  });
  module.exports = router;
