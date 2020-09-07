import * as express from 'express';
import Post from '../models/schemas/post';
import UserProfile, { IUserProfile } from '../models/schemas/user-profile';
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const sortList = async (list) => {
  try {
    return await list.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
  } catch (e) {
    throw new e();
  }
};

const getFeed = async (profile: IUserProfile) => {
  const feed = [];
  // Loop followers
  if (Array.isArray(profile.following)) {
    for (const userId of profile.following) {
      try {
        const userProfile = await UserProfile.findOne({ username: userId });
        const userPosts = await getUserFeed(userProfile);
        feed.push.apply(feed, userPosts);
      } catch (e) {
        throw new e();
      }
    }
  }
  // Get own posts
  try {
    const ownPosts = await getUserFeed(profile);
    feed.push.apply(feed, ownPosts);
  } catch (e) {
    throw new e();
  }
  return feed;
};

const getUserFeed = async (profile) => {
  try {
    return await Post.find({ _id: { $in: profile.posts } });
  } catch (e) {
    throw new e();
  }
};

// Get user feed
router.get('/user-feed/:username', async (req, res, next) => {
  let profile;
  let feed;
  try {
    profile = await UserProfile.findOne({ username: req.params.username });
  } catch (e) {
    return res.status(404).json({
      title: 'An error occurred',
      message: 'Error looking up the user',
    });
  }
  try {
    feed = await getUserFeed(profile);
    feed = await sortList(feed);
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error creating the user feed',
    });
  }
  return res.status(200).json(feed);
});

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

// Get user live-feed
router.get('/feed', async (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  let profile;
  let feed;
  try {
    profile = await UserProfile.findById(decoded.id);
  } catch (e) {
    return res.status(404).json({
      title: 'Error finding user profile',
      message: 'Could find the user profile',
    });
  }
  try {
    feed = await getFeed(profile);
    feed = await sortList(feed);
  } catch (e) {
    return res.status(404).json({
      title: 'Error creating user feed',
      message: 'Something went wrong trying to create the user feed',
      error: e,
    });
  }
  return res.status(200).json(feed);
});

// Post new post
router.post('/new', async (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  let profile;
  try {
    profile = await UserProfile.findById(decoded.id);
  } catch (e) {
    return res.status(404).json({
      title: 'Error finding user profile',
      message: 'Could find the user profile',
    });
  }
  let post = new Post({
    content: req.body.content,
    username: profile.username,
    firstname: profile.firstname,
    surname: profile.surname,
    fullname: profile.fullname,
    timestamp: new Date(),
    gnarly: [],
  });
  try {
    post = await post.save();
    profile.posts.push(post);
    await profile.save();
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the post',
    });
  }
  return res.status(201).json(post);
});

// gnarly post
router.post('/gnarly/:id', async (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  let profile;
  let post;
  try {
    profile = await UserProfile.findById(decoded.id);
  } catch (e) {
    return res.status(404).json({
      title: 'Error finding user profile',
      message: 'Could find the user profile',
    });
  }
  try {
    post = await Post.findById(req.params.id);
  } catch (e) {
    return res.status(404).json({
      title: 'Error finding the post',
      message: 'No matching post with the provided id',
    });
  }
  // If user already gnarly post
  if (post.gnarly.indexOf(profile.username) > -1) {
    return res.status(400).json({
      title: 'Error gnarly the post',
      message: 'The user is already on gnarly list',
    });
  }
  post.gnarly.push(profile.username);
  try {
    await post.save();
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      error: 'Error saving the post',
    });
  }
  return res.status(201).json({
    message: 'Successfully gnarly post ' + req.params.id,
    obj: post,
  });
});

//un-gnarly post
router.post('/un-gnarly/:id', async (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  let profile;
  let post;
  try {
    profile = await UserProfile.findById(decoded.id);
  } catch (e) {
    return res.status(404).json({
      title: 'Error finding user profile',
      message: 'Could find the user profile',
    });
  }
  try {
    post = await Post.findById(req.params.id);
  } catch (e) {
    return res.status(404).json({
      title: 'Error finding the post',
      message: 'No matching post with the provided id',
    });
  }
  if (!(post.gnarly.indexOf(profile.username) > -1)) {
    return res.status(400).json({
      title: 'Error un-gnarly the post',
      message: 'The user is not on gnarly list',
    });
  }
  post.gnarly.splice(post.gnarly.indexOf(profile.username), 1);
  try {
    await post.save();
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      error: 'Error saving the post',
    });
  }
  return res.status(201).json({
    message: 'Successfully un-gnarly post ' + req.params.id,
    obj: post,
  });
});

// Edit post
router.patch('/:id', async (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  let profile;
  let post;
  try {
    profile = await UserProfile.findById(decoded.id);
  } catch (e) {
    return res.status(404).json({
      title: 'Error finding user profile',
      message: 'Could find the user profile',
    });
  }
  try {
    post = await Post.findById(req.params.id);
  } catch (e) {
    return res.status(404).json({
      title: 'Error finding the post',
      message: 'No matching post with the provided id',
    });
  }
  if (post.username !== profile.username) {
    return res.status(404).json({
      title: 'Error patching the post',
      message: 'Access to the patching the post denied',
    });
  }
  post.content = req.body.content;
  try {
    await post.save();
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error patching the post',
    });
  }
  return res.status(200).json({
    message: 'post updated',
    obj: post,
  });
});

// Delete post
router.delete('/:id', async (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  let profile;
  let post;
  try {
    profile = await UserProfile.findById(decoded.id);
  } catch (e) {
    return res.status(404).json({
      title: 'Error finding user profile',
      message: 'Could find the user profile',
    });
  }
  try {
    post = await Post.findById(req.params.id);
  } catch (e) {
    return res.status(404).json({
      title: 'Error finding the post',
      message: 'No matching post with the provided id',
    });
  }
  if (post.username !== profile.username) {
    return res.status(401).json({
      title: 'Not Authenticated',
      error: { message: "Not the user's post" },
    });
  }
  try {
    await post.remove();
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error removing the post',
    });
  }
  return res.status(200).json({
    message: 'post deleted',
    obj: post,
  });
});

module.exports = router;
