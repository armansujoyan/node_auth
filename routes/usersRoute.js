const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport'); // eslint-disable-line

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/usersController');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

router.route('/secret')
  .get(passportJWT, UsersController.secret);

module.exports = router;
