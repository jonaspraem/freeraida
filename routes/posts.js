const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const Post = require('../models/schemas/post');
const Profile = require('../models/schemas/profile');

getUserPosts = (username, callback) => {
    Profile.findOne({user_address: username}, (err, user_profile) => {
        if (err) {
            return null;
        }
        if (!user_profile) {
            return null;
        }
        Post.find({'_id': {$in: user_profile.posts}}, (err, user_posts) => {
            if (err) {
                return null;
            }
            if (!user_posts) {
                return null;
            }
            callback(user_posts);
        });
    });
};

sortList = (list, callback) => {
    list.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
    });
    callback(list);
};

getTransformedList = (profile, callback) => {
    const transformedPosts = profile.posts;
    let counter = 0;
    transformedPosts.push.apply(transformedPosts, profile.posts);
    if (profile.following != null && profile.following.length !== 0) {
        profile.following.forEach((product, index) => {
            getUserPosts(product, (user_posts) => {
                counter++;
                if (user_posts) transformedPosts.push.apply(transformedPosts, user_posts);
                if (profile.following.length === counter) callback(transformedPosts);
            });
        });
    } else callback(transformedPosts);
};

getUserFeed = (profile, callback) => {
    const postList = [];
    Post.find({'_id': {$in: profile.posts}}, (err, user_posts) => {
        if (err) return null;
        if (!user_posts) return null;
        postList.push.apply(postList, user_posts);
        callback(postList);
    });
};

getPosts = (post_list, callback) => {
    const postList = [];
    Post.find({'_id': {$in: post_list}}, (err, user_posts) => {
        if (err) return null;
        if (!user_posts) return null;
        postList.push.apply(postList, user_posts);
        callback(postList);
    });
};

// Get all user posts
router.get('/profile-feed/:user_address', (req, res, next) => {
    Profile.findOne({user_address: req.params.user_address}, (err, user_profile) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user_profile) {
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'An error occurred 1'}
            });
        }
        getUserFeed(user_profile, (list) => {
            sortList(list, (sortedList) => {
                return res.status(201).json({
                    message: 'User feed successfully generated',
                    obj: sortedList
                });
            });
        });
    });
});

//Verify token
router.use('/', (req, res, next) => {
    jwt.verify(req.query.token, keys.token.secret, function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                message: 'Token couldn\'t be identified'
            });
        }
        next();
    });
});

// Get user live-feed
router.get('/feed', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Profile.findOne({user_id: decoded.user._id}, (profile_err, user_profile) => {
        if (profile_err) {
            return res.status(500).json({
                title: 'Error finding user profile',
                error: profile_err
            });
        }
        if (!user_profile) {
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'An error occurred regarding profile'}
            });
        }
        getTransformedList(user_profile, (post_ids) => {
            getPosts(post_ids, (post_list) => {
                sortList(post_list, (sortedList) => {
                    return res.status(201).json({
                        message: 'User feed received',
                        obj: sortedList
                    });
                });
            });
        });
    });
});

// Post new post
router.post('/', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Profile.findOne({user_id: decoded.user._id}, (profile_err, user_profile) => {
        if (profile_err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'An error occured'}
            });
        }
        if (!user_profile) {
            return res.status(500).json({
                title: 'No user found',
                error: {message: 'No user found'}
            });
        }
        const post = new Post({
            content: req.body.content,
            user_address: user_profile.user_address,
            display_name: user_profile.firstname + ' ' + user_profile.surname,
            timestamp: new Date(),
            gnarly: []
        });
        post.save((err, result) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    message: 'Error saving the post'
                });
            }
            user_profile.posts.push(result);
            user_profile.save((err, result) => {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        message: 'Error saving the user'
                    });
                }
                return res.status(201).json({
                    message: 'Post saved',
                    obj: post
                });
            });
        });
    });
});

// gnarly post
router.post('/gnarly/:post_id', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Profile.findOne({user_id: decoded.user._id}, (profile_err, user_profile) => {
        if (profile_err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'An error occured'}
            });
        }
        if (!user_profile) {
            return res.status(500).json({
                title: 'No user found',
                error: {message: 'No user found'}
            });
        }
        Post.findOne({_id: req.params.post_id}, (post_err, post) => {
            if (profile_err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'An error occured'}
                });
            }
            if (!post) {
                return res.status(500).json({
                    title: 'No post found',
                    error: {message: 'No post found matching the id'}
                });
            }
            // If user already gnarly post
            if (post.gnarly.indexOf(user_profile.user_address) > -1) {
                return res.status(500).json({
                    title: 'User already gnarly post',
                    error: {message: 'user can\'t gnarly post more than once'}
                });
            }
            post.gnarly.push(user_profile.user_address);
            post.save((err, result) => {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                }
                return res.status(201).json({
                    message: 'Successfully gnarly post '+req.params.post_id,
                    obj: result
                });
            });
        });
    });
});

//un-gnarly post
router.post('/un-gnarly/:post_id', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Profile.findOne({user_id: decoded.user._id}, (profile_err, user_profile) => {
        if (profile_err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'An error occured'}
            });
        }
        if (!user_profile) {
            return res.status(500).json({
                title: 'No user found',
                error: {message: 'No user found'}
            });
        }
        Post.findOne({_id: req.params.post_id}, (post_err, post) => {
            if (profile_err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'An error occured'}
                });
            }
            if (!post) {
                return res.status(500).json({
                    title: 'No post found',
                    error: {message: 'No post found matching the id'}
                });
            }
            if (!(post.gnarly.indexOf(user_profile.user_address) > -1)) {
                return res.status(500).json({
                    title: 'Post is not gnarly by the user',
                    error: {message: 'The user is not in the list of gnarly'}
                });
            }
            post.gnarly.splice(post.gnarly.indexOf(user_profile.user_address), 1);
            post.save((err, result) => {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                }
                return res.status(201).json({
                    message: 'Successfully un-gnarly post '+req.params.post_id,
                    obj: result
                });
            });
        });
    });
});

// Edit post
router.patch('/:id', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if (!post) {
            return res.status(500).json({
                title: 'No post found',
                error: { message: 'Post not found'}
            });
        }
        if (post.user !== decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Not the user\'s post'}
            });
        }
        post.content = req.body.content;
        post.save((err, result) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'post updated',
                obj: result
            });
        });
    });
});

// Delete post
router.delete('/:id', (req, res, next) => {
    const decoded = jwt.decode(req.query.token);
    Profile.findOne({user_id: decoded.user._id}, (profile_err, user_profile) => {
        if (profile_err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'An error occured'}
            });
        }
        if (!user_profile) {
            return res.status(500).json({
                title: 'No user found',
                error: {message: 'No user found'}
            });
        }
        Post.findById(req.params.id, (err, post) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            if (!post) {
                return res.status(500).json({
                    title: 'No post found',
                    error: { message: 'Post not found'}
                });
            }
            if (post.user_address !== user_profile.user_address) {
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error: {message: 'Not the user\'s post'}
                });
            }
            post.remove((err, result) => {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        message: 'Error removing the post'
                    });
                }
                res.status(200).json({
                    message: 'post deleted',
                    obj: result
                });
            });
        });
    });
});

module.exports = router;