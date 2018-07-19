const db = require('../models/mysql');
const User = db.User;
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
        console.log('checking password');
        console.log('look for user in database given info...');
        const fakeData = {
            current_email: 'email@gmail.com',
            password_input: 'somepassword',
        };
        console.log(fakeData);
        console.log('if password match return data');
        let data = {
            message: 'Match',
        };
        console.log(data);
        console.log('If not match');
        data = {
            message: 'Not Matching',
        };
        console.log(data);
        res.json(data);
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
        console.log(req.body);
        console.log('This how it may look ');
        const fakeData = {
            current_email: 'email@gmail.com',
            current_password: 'password in database',
            new_password: 'new password',
        };
        console.log(fakeData);
        console.log('double check password again');
        console.log('Update user password');
        res.json('update password route');
    },
    // In progress
    updateUsername: function(req, res ) {
        console.log(req.body);
        console.log('This how it may look ');
        const fakeData = {
            current_email: 'email@gmail.com',
            current_password: 'password in database',
            new_username: 'new username',
        };
        console.log(fakeData);
        console.log('double check password again');
        console.log('Update user username');
        res.json('update username route');
    },
    // In progress
    toggleTips: function(req, res ) {
        console.log(req.body);
        console.log('toggle tips');
        res.json('toggle tips route');
    },
};
