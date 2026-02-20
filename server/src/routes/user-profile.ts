import * as express from 'express';
import { ObjectId } from 'mongodb';
import * as userProfile from '../models/collections/user-profile';
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

router.get('/user/:username', async (req, res) => {
  try {
    const profile = await userProfile.findOne({ username: req.params.username });
    if (!profile) return res.status(404).json('Error looking up user');
    return res.status(200).json(profile);
  } catch (e) {
    return res.status(404).json('Error looking up user');
  }
});

router.get('/available/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(200).json({
        message: 'User address is unused',
        obj: { isAvailable: true },
      });
    }
    const profile = await userProfile.findById(new ObjectId(id));
    if (profile) {
      return res.status(200).json({
        message: 'User address is used',
        obj: { isAvailable: false },
      });
    }
  } catch (e) {}
  return res.status(200).json({
    message: 'User address is unused',
    obj: { isAvailable: true },
  });
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

router.get('/user-info', async (req, res) => {
  const decoded: any = jwt.decode(req.query.token);
  if (!decoded?.id) {
    return res.status(404).json({
      title: 'No profile found',
      message: 'No profile matching the id',
    });
  }
  try {
    const profile = await userProfile.findById(new ObjectId(decoded.id));
    if (!profile) throw new Error();
    return res.status(200).json(profile);
  } catch (e) {
    return res.status(404).json({
      title: 'No profile found',
      message: 'No profile matching the id',
    });
  }
});

router.patch('/edit-profile', async (req, res) => {
  const decoded: any = jwt.decode(req.query.token);
  if (!decoded?.id) {
    return res.status(404).json({
      title: 'No profile found',
      message: 'No profile matching the id',
    });
  }
  const profile = await userProfile.findById(new ObjectId(decoded.id));
  if (!profile) {
    return res.status(404).json({
      title: 'No profile found',
      message: 'No profile matching the id',
    });
  }
  const update: any = {};
  if (req.body.representation !== undefined) update.representation = req.body.representation;
  if (req.body.bio !== undefined) update.bio = req.body.bio;
  if (req.body.social_twitter !== undefined) update.social_twitter = req.body.social_twitter;
  if (req.body.social_instagram !== undefined) update.social_instagram = req.body.social_instagram;
  if (req.body.sports !== undefined) update.sports = req.body.sports;

  try {
    const updated = await userProfile.updateProfile(profile._id!, update);
    return res.status(201).json(updated);
  } catch (e) {
    return res.status(500).json({
      title: 'Error saving the profile',
      message: 'Something happened when saving the user',
    });
  }
});

module.exports = router;
