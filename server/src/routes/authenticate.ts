import * as express from 'express';
import { ObjectId } from 'mongodb';
import * as userCredentials from '../models/collections/user-credentials';
import * as userProfile from '../models/collections/user-profile';
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

router.post('/login', async (req, res) => {
  let creds;
  try {
    if (req.body.username) {
      creds = await userCredentials.findOne({ username: req.body.username });
    } else if (req.body.email) {
      creds = await userCredentials.findOne({ email: req.body.email });
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
  if (!creds) {
    return res.status(401).json({
      title: 'Failed to login',
      message: "Username & password didn't match",
    });
  }
  let isMatch: boolean;
  try {
    isMatch = await userCredentials.validatePassword(req.body.password, creds.password);
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error validating the password',
    });
  }
  if (!isMatch) {
    return res.status(401).json({
      title: 'Failed to login',
      message: "Username & password didn't match",
    });
  }
  let profile;
  try {
    profile = await userProfile.findOne({ username: creds.username });
  } catch (e) {
    return res.status(500).json({
      title: 'Failed to login',
      message: 'Failed to find user-profile',
    });
  }
  if (!profile || !profile._id) {
    return res.status(500).json({
      title: 'Failed to login',
      message: 'User profile not found',
    });
  }
  const token = jwt.sign({ id: profile._id.toString() }, keys.token.secret, { expiresIn: 86400 });
  return res.status(200).json({
    message: 'Successfully signed in',
    auth: true,
    token: token,
  });
});

router.post('/register', async (req, res) => {
  console.log('enlisting user..', req.body);
  if (
    !req.body.email ||
    !req.body.username ||
    !req.body.password ||
    !req.body.password_confirmation ||
    !req.body.firstname ||
    !req.body.surname ||
    !req.body.country
  ) {
    return res.status(500).json({
      title: 'Wrong body format',
      message: 'Please provide all the required body attributes',
    });
  }
  if (req.body.password !== req.body.password_confirmation) {
    return res.status(401).json({
      title: 'Failed to register',
      message: "passwords didn't match",
    });
  }
  if (req.body.username.includes('@') || req.body.username.length < 2 || req.body.username.length > 25) {
    return res.status(400).json({
      title: 'Error signing up',
      message: 'Invalid username',
    });
  }

  const email = req.body.email.toLowerCase();
  const username = req.body.username.toLowerCase();
  const firstname = req.body.firstname.charAt(0).toUpperCase() + req.body.firstname.toLowerCase().slice(1);
  const surname = req.body.surname.charAt(0).toUpperCase() + req.body.surname.toLowerCase().slice(1);

  let credsResult;
  try {
    credsResult = await userCredentials.createCredentials({
      email,
      username,
      password: req.body.password,
    });
  } catch (e: any) {
    if (e.name === 'ValidationError' && (e.errors?.email?.kind === 'unique' || e.errors?.username?.kind === 'unique')) {
      return res.status(409).json({
        title: 'Registration failed',
        message: 'Email or username already in use. Try logging in or use different credentials.',
      });
    }
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the user credentials',
      error: e,
    });
  }

  let profileResult;
  try {
    profileResult = await userProfile.createProfile({
      username,
      firstname,
      surname,
      fullname: firstname + ' ' + surname,
      country: req.body.country,
    });
  } catch (e) {
    const { getDb } = await import('../db');
    await getDb().collection('usercredentials').deleteOne({ _id: credsResult._id });
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the user profile',
      error: e,
    });
  }

  const token = jwt.sign({ id: profileResult._id!.toString() }, keys.token.secret, { expiresIn: 86400 });
  return res.status(201).json({
    message: 'User created',
    obj: profileResult,
    auth: true,
    token: token,
  });
});

module.exports = router;
