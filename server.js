const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const routes = require('./routes');
const logger = require('morgan');
const seedDB = require('./seeds');

app.use(logger('dev'));

// Bodyparser Middleware
app.use(bodyParser.json());

// Define middleware here
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
