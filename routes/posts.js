var express = require('express');
var router = express.Router();
var request = require('request');

var Post = require('../models/post');
var Profile = require('../models/profile');

function getUserPosts(username, callback) {
    Profile.findOne({user_address: username}, function (err, user_profile) {
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

// TODO
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
    var transformedPosts = profile.posts;
    var counter = 0;
    transformedPosts.push.apply(transformedPosts, profile.posts);
    if (profile.following != null && profile.following.length !== 0) {
        profile.following.forEach(function(product, index){
            getUserPosts(product, function(user_posts) {
                counter++;
                if (user_posts) transformedPosts.push.apply(transformedPosts, user_posts);
                if (profile.following.length === counter) callback(transformedPosts);
            });
        });
    } else callback(transformedPosts);
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

function getPosts(post_list, callback) {
    var postList = [];
    Post.find({'_id': {$in: post_list}}, function (err, user_posts) {
        if (err) return null;
        if (!user_posts) return null;
        postList.push.apply(postList, user_posts);
        callback(postList);
    });
}

// Get all user posts
router.get('/profile-feed/:user_address', function (req, res, next) {
    Profile.findOne({user_address: req.params.user_address}, function (err, user_profile) {
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
            sortList(list, function(sortedList) {
                return res.status(201).json({
                    message: 'User feed successfully generated',
                    obj: sortedList
                });
            });
        });
    });
});

//Verify token
router.use('/', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                next();
            } else {
                console.log(response);
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error: {message: 'Not a valid token'}
                });
            }
        }
    );
});

// Get user live-feed
router.get('/feed', function (req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error) {
                Profile.findOne({user_id: body.user_id}, function(profile_err, user_profile) {
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
                    getTransformedList(user_profile, function(post_ids) {
                        getPosts(post_ids, function(post_list){
                            sortList(post_list, function(sortedList) {
                                return res.status(201).json({
                                    message: 'User feed received',
                                    obj: sortedList
                                });
                            });
                        });
                    });
                });
            }
        });
});

// Post new post
router.post('/', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            Profile.findOne({user_id: body.user_id}, function(profile_err, user_profile) {
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
                var post = new Post({
                    content: req.body.content,
                    user_address: user_profile.user_address,
                    display_name: user_profile.firstName + ' ' + user_profile.lastName,
                    timestamp: new Date(),
                    gnarly: []
                });
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

// gnarly post
router.post('/gnarly/:post_id', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        { json: { id_token: req.query.token } },
        function (error, response, body) {
            if (!error) {
                Profile.findOne({user_id: body.user_id}, function(profile_err, user_profile) {
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
                    Post.findOne({_id: req.params.post_id}, function(post_err, post) {
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
                        post.gnarly.push(user_profile.user_address);
                        post.save(function (err, result) {
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
            }
        });
});

//un-gnarly post
router.post('/un-gnarly/:post_id', function(req, res, next) {
    request.post(
        'https://freeraida.eu.auth0.com/tokeninfo',
        {json: {id_token: req.query.token}},
        function (error, response, body) {
            if (!error) {
                Profile.findOne({user_id: body.user_id}, function(profile_err, user_profile) {
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
                    Post.findOne({_id: req.params.post_id}, function(post_err, post) {
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
                        if (!post.gnarly.contains(user_profile.user_address)) {
                            return res.status(500).json({
                                title: 'Post is not gnarly by the user',
                                error: {message: 'The user is not in the list of gnarly'}
                            });
                        }
                        post.gnarly.slice(post.gnarly.indexOf(user_profile.user_address), 1);
                        post.save(function (err, result) {
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
            }
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