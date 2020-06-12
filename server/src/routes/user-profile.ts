import * as express from 'express';
import UserProfile from '../models/schemas/user-profile';
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Get user profile
router.get('/user/:username', async (req, res, next) => {
    let profile;

    try {
        profile = await UserProfile.findOne({username: req.params.username});
        if (!profile) throw new Error();
        profile = profile.toObject(); // To make the line mutable
    } catch (e) {
        return res.status(404).json('Error looking up user');
    }

    return res.status(200).json(profile);
});

// Check availability of user address
router.get('/available/:id', async (req, res, next) => {
    try {
        await UserProfile.findById(req.params.id);
    } catch (e) {
        return res.status(200).json({
            message: 'User address is unused',
            obj: {isAvailable: true}
        });
    }
    return res.status(200).json({
        message: 'User address is used',
        obj: {isAvailable: false}
    });
});

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

// Get user profile with token
router.get('/user-info', async (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    let profile;
    try {
        profile = await UserProfile.findById(decoded.id);
        if (!profile) throw new Error();
    } catch (e) {
        return res.status(404).json({
            title: 'No profile found',
            message: 'No profile matching the id'
        });
    }
    return res.status(200).json(profile);
});

// Edit profile
router.patch('/edit-profile', async (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    let profile;

    try {
        profile = await UserProfile.findById(decoded.id);
    } catch (e) {
        return res.status(404).json({
            title: 'No profile found',
            message: 'No profile matching the id'
        });
    }

    // Edit variables
    profile.representation = req.body.representation;
    profile.bio = req.body.bio;
    profile.social_twitter = req.body.social_twitter;
    profile.social_instagram = req.body.social_instagram;
    profile.sports = req.body.sports;

    try {
        await profile.save();
    } catch (e) {
        return res.status(500).json({
            title: 'Error saving the profile',
            message: 'Something happened when saving the user'
        });
    }

    return res.status(201).json(profile);
});

module.exports = router;
