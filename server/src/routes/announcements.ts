import * as express from 'express';
import Announcement from '../models/schemas/announcement';
import UserProfile from '../models/schemas/user-profile';
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const sortList = async (list) => {
    try {
        return await list.sort((a, b) => {
            return b.timestamp - a.timestamp;
        });
    } catch (e) {
        throw new e;
    }
};

const getFeed = async (profile) => {
    const feed = [];
    if (profile.following !== null && profile.following.length !== 0) {
        for (const user_id of profile.following) {
            try {
                const user_profile = await UserProfile.findById(user_id);
                const user_posts = await getUserFeed(user_profile);
                feed.push.apply(feed, user_posts);
            } catch (e) {
                throw new e;
            }
        }
    }
    return feed;
};

const getUserFeed = async (profile) => {
    try {
        return await Announcement.find({'_id': {$in: profile.announcements}});
    } catch (e) {
        throw new e;
    }
};

// Get user feed
router.get('/user-feed/:username', async (req, res, next) => {
    let profile;
    let feed;
    try {
        profile = await UserProfile.findOne({username: req.params.username});
    } catch (e) {
        return res.status(404).json({
            title: 'An error occurred',
            message: 'Error looking up the user'
        });
    }
    try {
        feed = await getUserFeed(profile);
        feed = await sortList(feed);
    } catch (e) {
        return res.status(500).json({
            title: 'An error occurred',
            message: 'Error creating the user feed'
        });
    }
    return res.status(200).json({
        message: 'User feed successfully generated',
        obj: feed
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
            message: 'Could find the user profile'
        });
    }
    try {
        feed = await getFeed(profile);
        feed = await sortList(feed);
    } catch (e) {
        return res.status(404).json({
            title: 'Error creating user feed',
            message: 'Something went wrong trying to create the user feed'
        });
    }
    return res.status(200).json({
        message: 'User feed received',
        obj: feed
    });
});

// Post new post
router.post('/', async (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    let profile;
    try {
        profile = await UserProfile.findById(decoded.id);
    } catch (e) {
        return res.status(404).json({
            title: 'Error finding user profile',
            message: 'Could find the user profile'
        });
    }
    let announcement = new Announcement({
        content: req.body.content,
        username: profile.username,
        firstname: profile.firstname,
        surname: profile.surname,
        fullname: profile.fullname,
        timestamp: new Date(),
        gnarly: []
    });
    try {
        announcement = await announcement.save();
        profile.announcements.push(announcement);
        await profile.save();
    } catch (e) {
        return res.status(500).json({
            title: 'An error occurred',
            message: 'Error saving the announcement'
        });
    }
    return res.status(201).json({
        message: 'Announcement saved',
        obj: announcement
    });
});

// gnarly post
router.post('/gnarly/:id', async (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    let profile;
    let announcement;
    try {
        profile = await UserProfile.findById(decoded.id);
    } catch (e) {
        return res.status(404).json({
            title: 'Error finding user profile',
            message: 'Could find the user profile'
        });
    }
    try {
        announcement = await Announcement.findById(req.params.id);
    } catch (e) {
        return res.status(404).json({
            title: 'Error finding the announcement',
            message: 'No matching announcement with the provided id'
        });
    }
    // If user already gnarly post
    if (announcement.gnarly.indexOf(profile.username) > -1) {
        return res.status(400).json({
            title: 'Error gnarly the announcement',
            message: 'The user is already on gnarly list'
        });
    }
    announcement.gnarly.push(profile.username);
    try {
        await announcement.save();
    } catch (e) {
        return res.status(500).json({
            title: 'An error occurred',
            error: 'Error saving the announcement'
        });
    }
    return res.status(201).json({
        message: 'Successfully gnarly announcement '+req.params.id,
        obj: announcement
    });
});

//un-gnarly post
router.post('/un-gnarly/:id', async (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    let profile;
    let announcement;
    try {
        profile = await UserProfile.findById(decoded.id);
    } catch (e) {
        return res.status(404).json({
            title: 'Error finding user profile',
            message: 'Could find the user profile'
        });
    }
    try {
        announcement = await Announcement.findById(req.params.id);
    } catch (e) {
        return res.status(404).json({
            title: 'Error finding the announcement',
            message: 'No matching announcement with the provided id'
        });
    }
    if (!(announcement.gnarly.indexOf(profile.username) > -1)) {
        return res.status(400).json({
            title: 'Error un-gnarly the announcement',
            message: 'The user is not on gnarly list'
        });
    }
    announcement.gnarly.splice(announcement.gnarly.indexOf(profile.username), 1);
    try {
        await announcement.save();
    } catch (e) {
        return res.status(500).json({
            title: 'An error occurred',
            error: 'Error saving the announcement'
        });
    }
    return res.status(201).json({
        message: 'Successfully un-gnarly announcement '+req.params.id,
        obj: announcement
    });
});

// Edit post
router.patch('/:id', async (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    let profile;
    let announcement;
    try {
        profile = await UserProfile.findById(decoded.id);
    } catch (e) {
        return res.status(404).json({
            title: 'Error finding user profile',
            message: 'Could find the user profile'
        });
    }
    try {
        announcement = await Announcement.findById(req.params.id);
    } catch (e) {
        return res.status(404).json({
            title: 'Error finding the announcement',
            message: 'No matching announcement with the provided id'
        });
    }
    if (announcement.username !== profile.username) {
        return res.status(404).json({
            title: 'Error patching the announcement',
            message: 'Access to the patching the announcement denied'
        });
    }
    announcement.content = req.body.content;
    try {
        await announcement.save();
    } catch (e) {
        return res.status(500).json({
            title: 'An error occurred',
            message: 'Error patching the post'
        });
    }
    return res.status(200).json({
        message: 'post updated',
        obj: announcement
    });
});

// Delete post
router.delete('/:id', async (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    let profile;
    let announcement;
    try {
        profile = await UserProfile.findById(decoded.id);
    } catch (e) {
        return res.status(404).json({
            title: 'Error finding user profile',
            message: 'Could find the user profile'
        });
    }
    try {
        announcement = await Announcement.findById(req.params.id);
    } catch (e) {
        return res.status(404).json({
            title: 'Error finding the announcement',
            message: 'No matching announcement with the provided id'
        });
    }
    if (announcement.username !== profile.username) {
        return res.status(401).json({
            title: 'Not Authenticated',
            error: {message: 'Not the user\'s post'}
        });
    }
    try {
        await announcement.remove();
    } catch (e) {
        return res.status(500).json({
            title: 'An error occurred',
            message: 'Error removing the post'
        });
    }
    return res.status(200).json({
        message: 'post deleted',
        obj: announcement
    });
});

module.exports = router;