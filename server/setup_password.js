var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({
    domain: process.env['app25772746.auth0.com'],
    clientID: process.env['kJk7T528ulbkoiEHXt8GbM15DgegseXq'],
    clientSecret: process.env['HePR4GIGZp2R3gmnfSbjtaVgRqtn-nTY4T4XbDBPcEww-oyZKeB1wR5suHeBToda'],
    callbackURL: process.env['http://collarbone.herokuapp.com/callback',
                             'https://collarbone.herokuapp.com/callback',
                             'http://www.philippeguay.com/callback',
                             'https://www.philippeguay.com/callback',
                             'http://philippeguay.com/callback',
                             'https://philippeguay.com/callback',
                             'http://localhost:2000/callback']
  }, function(accessToken, refreshToken, profile, done) {
    //Some tracing info
    console.log('profile is', profile);
    //save the profile
    return done(null, profile);
  });

passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = strategy;