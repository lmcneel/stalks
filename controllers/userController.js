const db = require('../models/mysql');
const User = db.User;
const bCrypt = require('bcryptjs');
module.exports = {
    // Complete
    getInfo: function(req, res ) {
        console.log('We connected');
        console.log(`Checking if user is in session`);
        console.log(req.session.user);
        if (req.session.user) {
            // assumsing sessions works
            res.json(req.session.user);
        } else {
           res.json('User not logged in');
        };
    },
    // In Progress
    checkPassword: function(req, res ) {
       console.log(req.body);
       User.findOne({
           where: {
               email: req.body.current_email,
           },
       })
       .then(function(dbUser) {
           if (dbUser.validPassword(req.body.passwordInput)) {
               res.json({
                   message: 'Match',
               });
           } else {
               res.json({
                   message: 'Inputed password does not match our database',
               });
           };
       })
       .catch(function(err) {
           res.json({
               message: 'There has been an error processing your request please try agian later.',
           });
       });
    },
    // Not sure i need this anymore but will go the process
    updateEmail: function(req, res ) {
        console.log(req.body);
        console.log('This how it may look ');
        User.update({
            email: req.body.new_email,
        }, {
            email: req.body.current_email,
        })
        .then((dbUser) => {
            console.log(dbUser);
            res.json('Email Successfully Changed');
        })
        .catch((err) => {
            console.log(err);
            res.json({Error: err});
        });
        const fakeData = {
            current_email: 'email@gmail.com',
            new_email: 'email@gmail.com',
        };
        console.log(fakeData);
        console.log('Update User Email');
        res.json('Update Email Route');
    },
    // In progress
    updatePassword: function(req, res ) {
        console.log('Updating password');
        console.log(req.body);
        User.findOne({
            where: {
                email: req.body.current_email,
            },
        })
        .then(function(dbUser) {
            bCrypt.hash(req.body.new_password, 8).then(function(hash) {
                // Store hash in your password DB.
                User.update({
                    password: hash,
                }, {
                    where: {
                        email: req.body.current_email,
                    },
                })
                .then(function(dbUser) {
                    res.json({
                        message: 'Password Changed',
                    });
                })
                .catch(function(err) {
                    res.json({
                        message: 'There was an error with you request. Please try again later',
                    });
                });
            });
        })
        .catch(function(err) {
            res.json({
                message: 'There was an error with you request. Please try again later',
            });
        });
    },
    // In progress
    updateUsername: function(req, res ) {
        console.log('Changing username');
        console.log(req.body);
        User.update({
            username: req.body.new_username,
        }, {
            where: {
                email: current_email,
            },
        })
        .then(function(dbUser) {
            res.json({
                message: 'Changed Username',
            });
        })
        .catch(function(err) {
            res.json({
                message: 'There was an error with you request. Please try again later',
            });
        });
    },
    // In progress
    toggleTips: function(req, res ) {
        console.log(req.body);
        console.log('toggle tips');
        res.json('toggle tips route');
    },
};
