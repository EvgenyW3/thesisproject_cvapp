var passport = require('passport');
var User = require('../models/user.js');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);
            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('error', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('error', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashd
            return done(null, user);
        });

    }));

