const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost:27017/APIAuthenticationTest', { useNewUrlParser: true });
} else {
  mongoose.connect('mongodb://localhost:27017/APIAuthentication', { useNewUrlParser: true });
}

const app = express();

// Middleware
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/usersRoute'));

module.exports = app;
