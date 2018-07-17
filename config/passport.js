const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models/mysql');
const User = db.User;
const Pet = db.Pet;
// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use('local-signup', new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, username, password, done) {
    const {firstname, lastname, email, pet} = req.body;
    // When a user tries to sign un this code runs
    // Check if username is taken
    checkMultipleUsername(username, function(response, err) {
      // If its taken should throw an error saying username is taken
      if (err) {
        return done('Username is taken');
      } else {
        // If not taken will now check if email is taken
        checkMultipleEmail(email, function(response, err) {
          // Same as username
          if (err) {
            return done('Email in use.');
          } else {
            // Passed both test will now create look in the user model and see hooks.
            // Hooks will hash password and create a user in mongo as well to assign to user
            User.create({
              firstname: firstname,
              lastname: lastname,
              username: username,
              email: email,
              password: password,
              balance: 10000,
            })
              .then(function(user) {
                console.log(`User has been created: ${user}`);
                console.log(`Now we create the pet with userId ${user.id}`);
                // Once user is created will now add the pet to the database
                db.Pet.create({
                  petType: pet,
                  UserId: user.id,
                })
                  .then(function(pet) {
                    console.log(`Pet has been created ${pet}.`);
                    // After pet is created find user again (i know its tedious)
                    User.findOne({
                      where: {
                        id: user.id,
                      },
                        include: {
                          model: Pet,
                          as: 'Pet',
                          where: {
                            UserId: user.id,
                          },
                        },
                    })
                    .then(function(userWithPet) {
                      return done(null, userWithPet, 'User has been added to database');
                    })
                    .catch(function(err) {
                      console.log(`ERROR: ${err}`);
                      return done(err);
                    });
                  })
                  .catch(function(err) {
                    console.log(`ERROR: ${err}`);
                    return done(err);
                  });
              })
              .catch(function(err) {
                console.log(`ERROR: ${err}`);
                return done(err);
              });
          }
        });
      }
    });
}));

/**
 * Not fully tested.
 */
passport.use('local-signin', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    console.log('User is attempting to sign in');
    console.log(req.body);
    // Check email/username match password
    User.findOne({
        where: {email: email},
        include: {
          model: Pet,
          as: 'Pet',
        },
    })
    .then(function(user) {
      if (user) {
        // Since user has been found check if password matches our hash
        if (user.validPassword(password)) {
          // since true means user put in the right credentials so log the user in!

          return done(null, user, 'User has logged in');
        }
      } else {
        return done('That email is not in our system.');
      };
    })
    .catch(function(err) {
      if (err) {
        return done(err);
      };
    });
}));


// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({where: {_id: id}}).then(function(user) {
      if (user) {
          done(null, user);
      } else {
          done(user.error, null);
      };
  });
});

// Exporting our configured passport
module.exports = passport;


/**
 * @param { string } username
 * @param {*} cb
 */
function checkMultipleUsername(username, cb) {
  console.log(`Checking for username: ${username}`);

  User.findOne({
    where: {username: username},
  })
    .then(function(user) {
      console.log(`Is there user? ${user}`);
      if (user) {
        cb(null, 'taken');
      } else {
        cb('avaiable');
      }
    });
};

/**
 * @param { string } email
 * @param {*} cb
 */
function checkMultipleEmail(email, cb) {
  console.log(email);

  User.findOne({
    where: {email: email},
  })
    .then(function(user) {
      console.log(user);
      if (user) {
        cb(null, 'taken');
      } else {
        cb('avaiable');
      }
    });
};
