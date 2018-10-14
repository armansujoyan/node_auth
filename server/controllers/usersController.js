const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { JWT_SECRET } = require('../config');

const signToken = user => jwt.sign({
  iss: 'CodeWorker',
  sub: user.id,
  iat: new Date().getTime(),
  exp: new Date().setDate(new Date().getDate() + 1),
}, JWT_SECRET);

module.exports = {
  signUp: async (req, res) => {
    const { email, password } = req.value.body;

    const foundUser = await User.findOne({ 'local.email': email });

    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    const newUser = new User({
      method: 'local',
      local: {
        email,
        password,
      },
    });
    await newUser.save();

    const token = signToken(newUser);

    return res.status(200).json({ token });
  },

  signIn: async (req, res) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res) => {
    console.log('I manage to get here!');
    return res.json({ secret: 'resource' });
  },
};
