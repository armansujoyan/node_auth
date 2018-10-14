const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/userModel');

const { JWT_SECRET } = require('./config');

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET,
}, async (payload, done) => { // eslint-disable-line consistent-return
  try {
    const user = await User.findById(payload.sub);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    done(err, false);
  }
}));

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => { // eslint-disable-line consistent-return
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false);
    }

    const isValid = await user.isValidPassword(password);

    if (!isValid) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));
