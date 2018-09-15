const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2');
const keys = require('./keys');
const User = require('../models/schemas/user');

passport.serializeUser((user, done) => {
    console.log('mace');
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (user) => {
        console.log('user ' + user);
        done(null, user);
    });
        
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                console.log('no user with that username');
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.use(
    new GoogleStrategy({
        // options for the google strat
        callbackURL: '/authentication/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, 
    (accessToken, refreshToken, profile, done) => {
        // passport callback function
        User.findOne({googleId: profile.id}, (user) => {
            console.log(user);
            if (!user) {
                var userObject = new User({
                    email: profile.email,
                    username: profile.displayName,
                    firstname: profile.name.givenName,
                    surName: profile.name.familyName,
                    googleId: profile.id
                });
                console.log('new user', userObject);
    
                userObject.save((err, result) => {
                    console.log('saved user');
                    done(null, result);
                });
            }
            else {
                console.log('user logged in with google+: ', user);
                done(null, user);
            }
        });
    })
)