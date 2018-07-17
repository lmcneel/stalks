  // This is test to see if the user has logged in 5 days in a row
  const userLoginTest = function(req, res, next) {
  console.log('This is just a test for logins');
  next();
  };

  module.exports = userLoginTest;
