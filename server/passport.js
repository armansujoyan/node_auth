const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/userModel');

const { JWT_SECRET, GOOGLE_ID, GOOGLE_SECRET } = require('./config');

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

// Google OAuth strategy

passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: GOOGLE_ID,
  clientSecret: GOOGLE_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);

    const existingUser = await User.findOne({ 'google.id': profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      method: 'google',
      google: {
        id: profile.id,
        email: profile.emails[0].value,
      },
    });

    await newUser.save();
    done(null, newUser);
  } catch (error) {
    done(error, false, error.message);
  }
}));

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => { // eslint-disable-line consistent-return
  try {
    const user = await User.findOne({ 'local.email': email });

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
