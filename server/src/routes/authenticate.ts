import * as express from 'express';
import UserCredentials from '../models/schemas/user-credentials';
import UserProfile from '../models/schemas/user-profile';
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

router.post('/login', async (req, res, done) => {
  let user;
  let userProfile;
  let isMatch;
  try {
    if (req.body.username) {
      user = await UserCredentials.findOne({ username: req.body.username });
    } else if (req.body.email) {
      user = await UserCredentials.findOne({ email: req.body.email });
    } else {
      return res.status(400).json({
        title: 'Incorrect request format',
        message: 'please provide an email or username',
      });
    }
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error looking up user',
    });
  }
  try {
    isMatch = await user.validPassword(req.body.password);
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error validation the password',
    });
  }
  if (!isMatch) {
    return res.status(401).json({
      title: 'Failed to login',
      message: "Username & password didn't match",
    });
  }
  try {
    userProfile = await UserProfile.findOne({ username: user.username });
  } catch (e) {
    return res.status(500).json({
      title: 'Failed to login',
      message: 'Failed to find user-profile',
    });
  }
  const token = jwt.sign({ id: userProfile._id }, keys.token.secret, { expiresIn: 86400 });
  return res.status(200).json({
    message: 'Successfully signed in',
    auth: true,
    token: token,
  });
});

router.post('/register', async (req, res, next) => {
  console.log('enlisting user..', req.body.username);
  // Required properties
  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.password_confirmation &&
    req.body.firstname &&
    req.body.surname &&
    req.body.country
  ) {
    if (req.body.password === req.body.password_confirmation) {
      if (req.body.username.includes('@') || req.body.username.length < 2 || req.body.username.length > 25) {
        // @ is not allowed in username property - will be impossible to login via the landing page
        // Length of username needs to be between 2 and 25
        return res.status(400).json({
          title: 'Error signing up',
          message: 'Invalid username',
        });
      }
      const user_credentials = new UserCredentials({
        email: req.body.email.toLowerCase(),
        username: req.body.username.toLowerCase(),
        password: req.body.password,
      });
      const firstname = req.body.firstname.charAt(0).toUpperCase() + req.body.firstname.toLowerCase().slice(1);
      const surname = req.body.surname.charAt(0).toUpperCase() + req.body.surname.toLowerCase().slice(1);
      const user_profile = new UserProfile({
        username: req.body.username.toLowerCase(),
        firstname: firstname,
        surname: surname,
        fullname: firstname + ' ' + surname,
        country: req.body.country,
      });

      let user_profile_result;
      try {
        await user_credentials.save();
      } catch (e) {
        return res.status(500).json({
          title: 'An error occurred',
          message: 'Error saving the user credentials',
        });
      }
      try {
        user_profile_result = await user_profile.save();
      } catch (e) {
        return res.status(500).json({
          title: 'An error occurred',
          message: 'Error saving the user profile',
        });
      }
      const token = jwt.sign({ id: user_profile_result._id }, keys.token.secret, { expiresIn: 86400 });
      return res.status(201).json({
        message: 'User created',
        obj: user_profile_result,
        auth: true,
        token: token,
      });
    } else {
      return res.status(401).json({
        title: 'Failed to register',
        message: "passwords didn't match",
      });
    }
  } else {
    return res.status(500).json({
      title: 'Wrong body format',
      message: 'Please provide all the required body attributes',
    });
  }
});

module.exports = router;
