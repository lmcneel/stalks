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
// const bcrypt = require('bcrypt-nodejs');

app.use(cookieParser());



app.use(logger('dev'));

// Bodyparser Middleware
app.use(bodyParser.json());

// Define middleware here
app.use(express.json());
// app.use(acheivements);

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


// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
  // res.sendFile(path.join(__dirname, './client/public/index.html'));
});

// sessions
app.use(session({
  secret: 'seceiha',
  store: new SequelizeStore({
    db: db.sequelize,
  }),
  resave: false,
  proxy: true,
}));

// change to true to drop tables
db.sequelize.sync({force: false}).then(function() {
  app.listen(PORT, () => {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
  });
});

