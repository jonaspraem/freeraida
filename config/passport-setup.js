const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');
const keys = require('./keys');
const User = require('../models/schemas/user');

passport.serializeUser((user, done) => {
    done(userid, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (user) => {
        console.log('user ' + user);
        done(user, user);
    });
        
});

passport.use(
    new GoogleStrategy({
        // options for the google strat
        callbackURL: '/authentication/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, 
    (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('profile', profile);
        User.findOne({googleId: profile.id}, (user) => {
            if (!user) {
                var userObject = new User({
                    email: profile.email,
                    username: profile.displayName,
                    firstName: profile.name.givenName,
                    surName: profile.name.familyName,
                    googleId: profile.id
                });
                console.log(userObject);
    
                userObject.save((err, result) => {
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