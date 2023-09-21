import * as express from 'express';
import UserProfile, { IUserProfile } from '../models/schemas/user-profile';
import { ILine } from '../models/schemas/line';
import Location from '../models/schemas/location';
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Verify token
router.use('/', async (req, res, next) => {
  try {
    await jwt.verify(req.query.token, keys.token.secret);
  } catch (e) {
    return res.status(401).json({
      title: 'Not Authenticated',
      message: "Token couldn't be identified",
    });
  }
  next();
});

// Follow another user
router.post('/follow/:username', async (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  const username = req.params.username;
  let self;
  let toFollow;

  try {
    self = await UserProfile.findById(decoded.id);
    toFollow = await UserProfile.findOne({ username: username });
  } catch (e) {
    return res.status(400).json({
      title: 'An error occurred',
      message: 'No user profile found',
    });
  }
  const isAlreadyFollowing = self.following.indexOf(username) > -1;
  if (isAlreadyFollowing) {
    return res.status(400).json({
      title: 'User is already followed',
      message: 'You are already following this user',
    });
  }
  self.following.push(username);
  toFollow.followers.push(self.username);
  try {
    await self.save();
    toFollow = await toFollow.save();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the user profiles',
    });
  }
  return res.status(200).json(toFollow);
});

// Un-follow user
router.post('/unfollow/:username', async (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  const username = req.params.username;
  let self;
  let toUnfollow;

  try {
    self = await UserProfile.findById(decoded.id);
    toUnfollow = await UserProfile.findOne({ username: username });
  } catch (e) {
    return res.status(400).json({
      title: 'An error occurred',
      message: 'No user profile found',
    });
  }
  const isAlreadyFollowing = self.following.indexOf(username) > -1;
  if (!isAlreadyFollowing) {
    return res.status(400).json({
      title: 'User is not followed',
      message: 'You are not currently following this user',
    });
  }
  try {
    self.following.splice(self.following.indexOf(username), 1);
    toUnfollow.followers.splice(toUnfollow.followers.indexOf(self.username), 1);
    await self.save();
    toUnfollow = await toUnfollow.save();
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the user profiles',
    });
  }
  return res.status(200).json(toUnfollow);
});

router.get('/followers/:username', async (req, res, next) => {
  const username = req.params.username;
  let user: IUserProfile;
  let followers: IUserProfile[] = [];

  try {
    user = await UserProfile.findOne({ username: username });
  } catch (e) {
    return res.status(404).json('No user found');
  }

  const promises = await user.followers.map(async (followerUsername) => {
    let follower;

    try {
      follower = await UserProfile.findOne({ username: followerUsername });
      follower = follower.toObject(); // To make the line mutable
      followers.push(follower);
    } catch (e) {}
  });

  await Promise.all(promises);

  return res.status(200).json(followers);
});

router.get('/following/:username', async (req, res, next) => {
  const username = req.params.username;
  let user: IUserProfile;
  let followingUsers: IUserProfile[] = [];

  try {
    user = await UserProfile.findOne({ username: username });
  } catch (e) {
    return res.status(404).json('No user found');
  }

  const promises = await user.following.map(async (followingUsername) => {
    let following;

    try {
      following = await UserProfile.findOne({ username: followingUsername });
      following = following.toObject(); // To make the line mutable
      followingUsers.push(following);
    } catch (e) {}
  });

  await Promise.all(promises);

  return res.status(200).json(followingUsers);
});

module.exports = router;
