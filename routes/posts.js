var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Post = require('../models/post');

// Get all posts
router.get('/', function (req, res, next) {
    Post.find()
        .populate('user', 'firstName')
        .exec(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Messages received',
                obj: messages
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
    })
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
        var post = new Post({
            content: req.body.content,
            user: user
        });
        post.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            user.messages.push(result);
            user.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                }
            });
            res.status(201).json({
                message: 'Post saved',
                obj: result
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