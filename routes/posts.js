var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var User = require('../models/user');
var Post = require('../models/post');
var Profile = require('../models/profile');

function getUserPosts(username, callback) {
    Profile.findOne({username: username}, function (err, user_profile) {
        if (err) {
            return null;
        }
        if (!user_profile) {
            return null;
        }
        Post.find({'_id': {$in: user_profile.posts}}, function (err, user_posts) {
            if (err) {
                return null;
            }
            if (!user_posts) {
                return null;
            }
            callback(user_posts);
        });
    });
}

function sortList(list, callback) {
    list.sort(function(a, b){
        var keyA = new Date(a.timestamp),
            keyB = new Date(b.timestamp);
        // Compare the 2 dates
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
    });
    callback(list);
}

function getTransformedList(profile, callback) {
    var transformedPosts = [];
    var counter = 0;
    profile.following.forEach(function(product, index){
        getUserPosts(product, function(user_posts) {
            counter++;
            if (user_posts) transformedPosts.push.apply(transformedPosts, user_posts);
            if (profile.following.length == counter) callback(transformedPosts);
        });
    });
}

function getUserFeed(profile, callback) {
    var postList = [];
    Post.find({'_id': {$in: profile.posts}}, function (err, user_posts) {
        if (err) return null;
        if (!user_posts) return null;
        postList.push.apply(postList, user_posts);
        callback(postList);
    });
}

// Get all user posts
router.get('/profile-feed/:username', function (req, res, next) {
    Profile.findOne({username: req.params.username}, function (err, user_profile) {
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
        getUserFeed(user_profile, function(list) {
            console.log(list);
            sortList(list, function(sortedList) {
                console.log(sortedList);
                return res.status(201).json({
                    message: 'User feed successfully generated',
                    obj: sortedList
                });
            });
        });
    });
});

// TODO: change secret variable
//Verify token
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
    console.log(jwtCheck.toString());
    next();
});

// Get user live-feed
router.get('/feed', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'Error finding user',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'An error occurred regarding user'}
            });
        }
        Profile.findOne({username: user.username}, function(profile_err, user_profile) {
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
            getTransformedList(user_profile, function(list) {
                getUserFeed(user_profile, function(user_list){
                    list.push.apply(list, user_list);
                    sortList(list, function(sortedList) {
                        return res.status(201).json({
                            message: 'User feed successfully generated',
                            obj: sortedList
                        });
                    });
                });
            });
        });
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
        if (post.username != decoded.user.username) {
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