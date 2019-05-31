import * as express from 'express';
import UserProfile from '../models/schemas/user-profile';
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
            message: 'Token couldn\'t be identified'
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
        toFollow = await UserProfile.findOne({username: username});
    } catch (e) {
        return res.status(400).json({
            title: 'An error occurred',
            message: 'No user profile found'
        });
    }
    const isAlreadyFollowing = (self.following.indexOf(username) > -1);
    if (isAlreadyFollowing) {
        return res.status(400).json({
            title: 'User is already followed',
            message: 'You are already following this user'
        });
    }
    self.following.push(username);
    toFollow.followers.push(self.username);
    try {
        console.log("self", self);
        console.log("toFollow", toFollow);
        await self.save();
        console.log("made it here");
        toFollow = await toFollow.save();
        console.log("made it here");
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            title: 'An error occurred',
            message: 'Error saving the user profiles'
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
        toUnfollow = await UserProfile.findOne({username: username});
    } catch (e) {
        return res.status(400).json({
            title: 'An error occurred',
            message: 'No user profile found'
        });
    }
    const isAlreadyFollowing = (self.following.indexOf(username) > -1);
    if (!isAlreadyFollowing) {
        return res.status(400).json({
            title: 'User is not followed',
            message: 'You are not currently following this user'
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
            message: 'Error saving the user profiles'
        });
    }
    return res.status(200).json(toUnfollow);
});

module.exports = router;

