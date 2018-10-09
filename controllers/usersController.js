const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { JWT_SECRET } = require('../config');

const signToken = (user) => {
  return jwt.sign({
    iss: 'CodeWorker',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1),
  }, JWT_SECRET);
};

module.exports = {
  signUp: async (req, res) => {
    const { email, password } = req.value.body;

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(403).send({ error: 'Email is already in use.' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    const token = signToken(newUser);

    return res.status(200).json({ token });
  },
  signIn: async (req, res, next) => {
    
  },
  secret: async (req, res, next) => {
    console.log('I manage to get here!');
    return res.json({ secret: 'resource' });
  },
};
