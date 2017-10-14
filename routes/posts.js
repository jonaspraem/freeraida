var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Post = require('../models/post');
var Profile = require('../models/profile');

// Get all user posts
router.get('/:username', function (req, res, next) {
    Profile.findOne({username: req.params.username}, function (err, user_profile) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if (!user_profile) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        Post.find({'_id': {$in: user_profile.posts}}, function (err, user_posts) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            if (!user_posts) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            return res.status(200).json({
                message: 'User post found',
                obj: user_posts
            });
        });
    });
});

// TODO: change secret variable
// Verify token
    router.use('/', function(req, res, next) {
        jwt.verify(req.query.token, 'secret', function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error: err
                });
            }
            next();
        });
    });

// Post post
    router.post('/', function(req, res, next) {
        var decoded = jwt.decode(req.query.token);
        User.findById(decoded.user._id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            if (!user) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            var post = new Post({
                content: req.body.content,
                username: user.username,
                timestamp: new Date()
            });

            Profile.findOne({username: user.username}, function(profile_err, user_profile) {
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
                post.save(function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occured',
                            error: err
                        });
                    }
                    user_profile.posts.push(result);
                    user_profile.save(function (err, result) {
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occured',
                                error: err
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
    });

// Edit post
    router.patch('/:id', function(req, res, next) {
        var decoded = jwt.decode(req.query.token);
        Post.findById(req.params.id, function(err, post) {
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
            if (post.user != decoded.user._id) {
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error: {message: 'Not the user\'s post'}
                });
            }
            post.content = req.body.content;
            post.save(function(err, result) {
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
    router.delete('/:id', function(req, res, next) {
        var decoded = jwt.decode(req.query.token);
        Post.findById(req.params.id, function(err, post) {
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
            if (post.user != decoded.user._id) {
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error: {message: 'Not the user\'s post'}
                });
            }
            post.remove(function(err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'post deleted',
                    obj: result
                });
            });
        });
    });

    module.exports = router;