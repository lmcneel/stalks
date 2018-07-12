const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const logger = require('morgan');
const seedDB = require('./seeds');
const db = require('./models/mysql');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const Sequelize = require('sequelize');
const passport = require('./config/passport.js');
const achievements = require('./config/middleware/achievements/achievements');
const mysql = require('mysql');

const sequelize = new Sequelize(
  'database',
  'username',
  'password', {
    'dialect': 'mysql',
    'storage': './session.mysql',
  });
// initialize passport
app.use(passport.initialize());
// store data for authenticated users
app.use(passport.session());
// test this code
// configure express
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  store: new SequelizeStore({
    db: sequelize,
  }),
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  saveUninitialized: false, // required
}));

app.use(logger('dev'));

// Bodyparser Middleware
app.use(bodyParser.json());

// Define middleware here
app.use(express.json());
app.use(achievements);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Define API routes here
app.use(routes);

// DB Config
// const db = require('./config/keys').mongoURI;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/stalks');

seedDB();


// Connect to the Mongo DB
// mongoose
// .connect(db)
// .then(() => console.log('MongoDB Connected'))
// .catch((err) => console.log(err));

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
  // res.sendFile(path.join(__dirname, './client/public/index.html'));
});


db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, () => {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
  });
});
