const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const MODEL_PATH = '../models/schemas/';
const User = require(MODEL_PATH + 'user');

router.post('/login', (req, res, done) => {
    if (req.body.username) {
        console.log('logging in with username', req.body.username);
        User.findOne({username: req.body.username}, (err, user) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    message: 'Error looking up user'
                });
            }
            user.validPassword(req.body.password, (err, isMatch) => {
                console.log('isMatch', isMatch);
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        message: 'Error validation the password'
                    });
                }
                if (!isMatch) {
                    return res.status(401).json({
                        title: 'Failed to login',
                        message: 'Username & password didn\'t match'
                    });
                }
                console.log('valid password');
                const token = jwt.sign({ id: user._id }, keys.token.secret, { expiresIn: 86400 });
                res.status(200).json({
                    message: 'Successfully signed in',
                    auth: true,
                    token: token,
                });
            });
        });
    }
    else if (req.body.email) {
        console.log('logging in with email', req.body.email);
        User.findOne({email: req.body.email}, (err, user) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    message: 'Error looking up user'
                });
            }
            user.validPassword(req.body.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        message: 'Error validation the password'
                    });
                }
                if (!isMatch) {
                    return res.status(401).json({
                        title: 'Failed to login',
                        message: 'Username & password didn\'t match'
                    });
                }
                console.log('valid password');
                const token = jwt.sign({ id: user._id }, keys.token.secret, { expiresIn: 86400 });
                res.status(200).json({
                    message: 'Successfully signed in',
                    auth: true,
                    token: token,
                });
            });
        });
    } else {
        return res.status(400).json({
            title: 'Incorrect request format',
            message: 'please provide an email or username'
        });
    }
});

router.post('/signup', (req, res, next) => {
    console.log('enlisting user..', req.body.username);
    // Required properties
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.password_confirmation &&
        req.body.firstname &&
        req.body.surname &&
        req.body.country
    ) {
        if (req.body.password === req.body.password_confirmation) {
            if (req.body.username.includes('@') || req.body.username.length < 3 || req.body.username.length > 25) {
                // @ is not allowed in username property - will be impossible to login via the landing page
                // Length of username needs to be between 3 and 25
                return res.status(400).json({
                    title: 'Error signing up',
                    message: 'Invalid username'
                });
            }

            const user = new User({
                email: req.body.email.toLowerCase(),
                username: req.body.username.toLowerCase(),
                firstname: req.body.firstname.charAt(0).toUpperCase() + req.body.firstname.toLowerCase().slice(1),
                surname: req.body.surname.charAt(0).toUpperCase() + req.body.surname.toLowerCase().slice(1),
                password: req.body.password,
                country: req.body.country
            });

            user.save((err, result) => {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        message: 'Error saving the user'
                    });
                }
                // create a token
                const token = jwt.sign({ id: result._id }, keys.token.secret, { expiresIn: 86400 });
                return res.status(201).json({
                    message: 'User created',
                    obj: result,
                    auth: true,
                    token: token
                });
            });
        } else {
            return res.status(401).json({
                title: 'Failed to signup',
                message: 'passwords didn\'t match'
            });
        } 
    } else {
        return res.status(500).json({
            title: 'Wrong body format',
            message: 'Please provide all the required body attributes'
        });
    }
});

module.exports = router;