const router = require('express').Router();

const passport = require('../../config/passport.js');

router.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
        console.log(`err: ${err} data: ${user} info: ${info}`);
        if (err) {
            res.json(err);
        } else {
            console.log(user);
            // Creating data for put into session
            req.session.user = user;
            res.json(req.session.user);
        }
    })(req, res, next);
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
        if (err) {
            res.json(err);
        } else {
            req.session.user = user;
            res.json(req.session.user);
        }
    })(req, res, next);
});
module.exports = router;

