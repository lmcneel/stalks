const router = require('express').Router();
const passport = require('../../config/passport.js');

router.post('/signup', function(req, res, next) {
    console.log(req.body);
    passport.authenticate('local-signup', function(err, user, info) {
        if (err) {
            res.json(err);
        } else {
            req.session.user = user;
            console.log(user);
            console.log(info);
            console.log('Finished');
            res.redirect('/home');
        }
    })(req, res, next);
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
        if (err) {
            res.json(err);
        } else {
            req.session.user = user;
            res.redirect('/home');
        }
    });
});
module.exports = router;
