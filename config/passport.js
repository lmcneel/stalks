const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcryptjs');
const db = require('../models/mysql');

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use('local-signup', new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    console.log('in signup');
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email,
      },
      }).then(function(user) {
      // If there's no user with the given email
      if (user) {
        console.log('*******************************************');
        return done(true, false, 'Email already in use');
        // If there is a user with the given email, but the password the user gives us is incorrect
      } else {
        /**
         * @return { string }
         * @param {*} password users password
         */
        function generateHash(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        const hashedPassword = generateHash(password);
        const data = {
          email: email,
          password: hashedPassword,
        };
        console.log(data);
        db.User.create(data).then(function(user) {
          console.log(user);
          return done(null, user, 'Successfully added user');
        });
      }
      // If none of the above, return the user
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({_id: id}).then(function(user) {
      if (user) {
          done(null, user);
      } else {
          done(user.error, null);
      };
  });
});

// Exporting our configured passport
module.exports = passport;
