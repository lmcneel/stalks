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
const achievements = require('./config/middleware/achievements/achievements');

// Configure SequilizeSessions
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
app.use(cookieParser());
app.use(session({
  secret: 'keyboard mouse',
  store: new SequelizeStore({
    db: db,
    table: 'Sessions',
    extendDefaultFields: extendDefaultFields,
  }),
  resave: false,
  saveUninitialized: false,
  proxy: true,
  unset: 'keep',
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


mongoose
.connect(process.env.MONGODB_URI || 'mongodb://localhost/stalks')
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

// seedDB();


// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
  // res.sendFile(path.join(__dirname, './client/public/index.html'));
});

// change to true to drop tables
db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, () => {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
  });
});

/**
 * @return {object}
 * @param {*} defaults uses defaults
 * @param {*} session choses what sessions
 */
function extendDefaultFields(defaults, session) {
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: session.user.id,
  };
};
