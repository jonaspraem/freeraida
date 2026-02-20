import * as express from 'express';
import { ObjectId } from 'mongodb';
import * as userProfile from '../models/collections/user-profile';
import { IUserProfile } from '../models/types/documents';

const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

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

router.post('/follow/:username', async (req, res) => {
  const decoded: any = jwt.decode(req.query.token);
  const username = req.params.username;

  const self = decoded?.id ? await userProfile.findById(new ObjectId(decoded.id)) : null;
  const toFollow = await userProfile.findOne({ username });

  if (!self || !toFollow) {
    return res.status(400).json({
      title: 'An error occurred',
      message: 'No user profile found',
    });
  }

  const following = self.following || [];
  if (following.indexOf(username) > -1) {
    return res.status(400).json({
      title: 'User is already followed',
      message: 'You are already following this user',
    });
  }

  const newSelfFollowing = [...following, username];
  const newToFollowFollowers = [...(toFollow.followers || []), self.username];

  try {
    await userProfile.updateProfile(self._id!, { following: newSelfFollowing });
    await userProfile.updateProfile(toFollow._id!, { followers: newToFollowFollowers });
    const updated = await userProfile.findById(toFollow._id!);
    return res.status(200).json(updated);
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the user profiles',
    });
  }
});

router.post('/unfollow/:username', async (req, res) => {
  const decoded: any = jwt.decode(req.query.token);
  const username = req.params.username;

  const self = decoded?.id ? await userProfile.findById(new ObjectId(decoded.id)) : null;
  const toUnfollow = await userProfile.findOne({ username });

  if (!self || !toUnfollow) {
    return res.status(400).json({
      title: 'An error occurred',
      message: 'No user profile found',
    });
  }

  const following = self.following || [];
  if (following.indexOf(username) === -1) {
    return res.status(400).json({
      title: 'User is not followed',
      message: 'You are not currently following this user',
    });
  }

  const newSelfFollowing = following.filter((u) => u !== username);
  const newToUnfollowFollowers = (toUnfollow.followers || []).filter((u) => u !== self.username);

  try {
    await userProfile.updateProfile(self._id!, { following: newSelfFollowing });
    await userProfile.updateProfile(toUnfollow._id!, { followers: newToUnfollowFollowers });
    const updated = await userProfile.findById(toUnfollow._id!);
    return res.status(200).json(updated);
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the user profiles',
    });
  }
});

router.get('/followers/:username', async (req, res) => {
  const user = await userProfile.findOne({ username: req.params.username });
  if (!user) return res.status(404).json('No user found');

  const followers: IUserProfile[] = [];
  for (const followerUsername of user.followers || []) {
    const follower = await userProfile.findOne({ username: followerUsername });
    if (follower) followers.push(follower);
  }
  return res.status(200).json(followers);
});

router.get('/following/:username', async (req, res) => {
  const user = await userProfile.findOne({ username: req.params.username });
  if (!user) return res.status(404).json('No user found');

  const followingUsers: IUserProfile[] = [];
  for (const followingUsername of user.following || []) {
    const following = await userProfile.findOne({ username: followingUsername });
    if (following) followingUsers.push(following);
  }
  return res.status(200).json(followingUsers);
});

module.exports = router;
