const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/APIAuthentication', { useNewUrlParser: true });

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/usersRoute'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is listening on: ${port}`));
