//This is a test to see if the user is logging in and we are able to grab the login and add to achievements
  const userLogin1 = function (req, res, next) {
      req.userLogin1 = 1
      next()
  }

//This is test to see if the user has logged in 5 days in a row
  const userLoginTest = function (req, res, next) {
    console.log('This is just a test for logins');
    next()
}

module.exports = achievements;