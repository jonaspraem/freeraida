import * as express from 'express';
import { ObjectId } from 'mongodb';
import * as post from '../models/collections/post';
import * as userProfile from '../models/collections/user-profile';
import { IUserProfile } from '../models/types/documents';

const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const sortList = (list: any[]) => {
  return list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const getFeed = async (profile: IUserProfile) => {
  const feed: any[] = [];
  if (Array.isArray(profile.following)) {
    for (const userId of profile.following) {
      const userProfileDoc = await userProfile.findOne({ username: userId });
      if (userProfileDoc) {
        const userPosts = await post.findByIds(userProfileDoc.posts || []);
        feed.push(...userPosts);
      }
    }
  }
  const ownPosts = await post.findByIds(profile.posts || []);
  feed.push(...ownPosts);
  return feed;
};

const getUserFeed = async (profile: IUserProfile | null) => {
  if (!profile || !profile.posts) return [];
  return post.findByIds(profile.posts);
};

router.get('/user-feed/:username', async (req, res) => {
  const profile = await userProfile.findOne({ username: req.params.username });
  if (!profile) {
    return res.status(404).json({
      title: 'An error occurred',
      message: 'Error looking up the user',
    });
  }
  try {
    let feed = await getUserFeed(profile);
    feed = sortList(feed);
    return res.status(200).json(feed);
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error creating the user feed',
    });
  }
});

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

router.get('/feed', async (req, res) => {
  const decoded: any = jwt.decode(req.query.token);
  if (!decoded?.id) {
    return res.status(404).json({
      title: 'Error finding user profile',
      message: 'Could not find the user profile',
    });
  }
  const profile = await userProfile.findById(new ObjectId(decoded.id));
  if (!profile) {
    return res.status(404).json({
      title: 'Error finding user profile',
      message: 'Could not find the user profile',
    });
  }
  try {
    const feed = await getFeed(profile);
    const sorted = sortList(feed);
    return res.status(200).json(sorted);
  } catch (e) {
    return res.status(404).json({
      title: 'Error creating user feed',
      message: 'Something went wrong trying to create the user feed',
      error: e,
    });
  }
});

router.post('/new', async (req, res) => {
  const decoded: any = jwt.decode(req.query.token);
  if (!decoded?.id) {
    return res.status(404).json({
      title: 'Error finding user profile',
      message: 'Could not find the user profile',
    });
  }
  const profile = await userProfile.findById(new ObjectId(decoded.id));
  if (!profile) {
    return res.status(404).json({
      title: 'Error finding user profile',
      message: 'Could not find the user profile',
    });
  }
  const postData = {
    content: req.body.content,
    username: profile.username,
    firstname: profile.firstname,
    surname: profile.surname,
    fullname: profile.fullname,
    timestamp: new Date(),
    gnarly: [],
  };
  try {
    const newPost = await post.createPost(postData);
    await userProfile.pushToArray(profile._id!, 'posts', newPost._id!);
    return res.status(201).json(newPost);
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error saving the post',
    });
  }
});

router.post('/gnarly/:id', async (req, res) => {
  const decoded: any = jwt.decode(req.query.token);
  const postId = req.params.id;
  const profile = decoded?.id ? await userProfile.findById(new ObjectId(decoded.id)) : null;
  const postDoc = await post.findById(new ObjectId(postId));

  if (!profile) return res.status(404).json({});
  if (!postDoc) return res.status(404).json({});

  const gnarly = postDoc.gnarly || [];
  if (gnarly.indexOf(profile.username) > -1) return res.status(400).json({});

  gnarly.push(profile.username);
  try {
    await post.updatePost(postDoc._id!, { gnarly });
    return res.status(201).json({ ...postDoc, gnarly });
  } catch (e) {
    return res.status(500).json({});
  }
});

router.post('/un-gnarly/:id', async (req, res) => {
  const decoded: any = jwt.decode(req.query.token);
  const postId = req.params.id;
  const profile = decoded?.id ? await userProfile.findById(new ObjectId(decoded.id)) : null;
  const postDoc = await post.findById(new ObjectId(postId));

  if (!profile) return res.status(404).json({});
  if (!postDoc) return res.status(404).json({});

  const gnarly = postDoc.gnarly || [];
  if (gnarly.indexOf(profile.username) === -1) return res.status(400).json({});

  gnarly.splice(gnarly.indexOf(profile.username), 1);
  try {
    await post.updatePost(postDoc._id!, { gnarly });
    return res.status(201).json({ ...postDoc, gnarly });
  } catch (e) {
    return res.status(500).json({});
  }
});

router.patch('/:id', async (req, res) => {
  const decoded: any = jwt.decode(req.query.token);
  const postId = req.params.id;
  const profile = decoded?.id ? await userProfile.findById(new ObjectId(decoded.id)) : null;
  const postDoc = await post.findById(new ObjectId(postId));

  if (!profile) {
    return res.status(404).json({
      title: 'Error finding user profile',
      message: 'Could not find the user profile',
    });
  }
  if (!postDoc) {
    return res.status(404).json({
      title: 'Error finding the post',
      message: 'No matching post with the provided id',
    });
  }
  if (postDoc.username !== profile.username) {
    return res.status(404).json({
      title: 'Error patching the post',
      message: 'Access to patching the post denied',
    });
  }
  try {
    const updated = await post.updatePost(postDoc._id!, { content: req.body.content });
    return res.status(200).json({
      message: 'post updated',
      obj: updated,
    });
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error patching the post',
    });
  }
});

router.delete('/:id', async (req, res) => {
  const decoded: any = jwt.decode(req.query.token);
  const postId = req.params.id;
  const profile = decoded?.id ? await userProfile.findById(new ObjectId(decoded.id)) : null;
  const postDoc = await post.findById(new ObjectId(postId));

  if (!profile) {
    return res.status(404).json({
      title: 'Error finding user profile',
      message: 'Could not find the user profile',
    });
  }
  if (!postDoc) {
    return res.status(404).json({
      title: 'Error finding the post',
      message: 'No matching post with the provided id',
    });
  }
  if (postDoc.username !== profile.username) {
    return res.status(401).json({
      title: 'Not Authenticated',
      error: { message: "Not the user's post" },
    });
  }
  try {
    await post.deletePost(postDoc._id!);
    await userProfile.pullFromArray(profile._id!, 'posts', postDoc._id!);
    return res.status(200).json({
      message: 'post deleted',
      obj: postDoc,
    });
  } catch (e) {
    return res.status(500).json({
      title: 'An error occurred',
      message: 'Error removing the post',
    });
  }
});

module.exports = router;
