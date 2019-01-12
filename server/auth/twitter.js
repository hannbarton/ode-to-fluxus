const passport = require('passport')
const router = require('express').Router()
let TwitterStrategy = require('passport-twitter').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.TWITTER_CONSUMER_KEY || !process.env.TWITTER_CONSUMER_SECRET) {
  console.log('TWITTER client ID / secret not found. Skipping TWITTER OAuth.')
} else {
  console.log('twitter oauth init')

  const twitterConfig = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK,
    passReqToCallback: true,
  }

passport.use(new TwitterStrategy(
    twitterConfig,
    (token, tokenSecret, profile, done) => {
      console.log('this is working')
      User.findOrCreate(
        {
          twitterId: profile.id,
          // email: profile.email,
          token: token,
          tokenSecret: tokenSecret,
          email: profile.emails[0].value
        },
        function(err, user) {
          console.log('user', user)
          if(err) {
            return done(err)
          }
          if (user) {
            return done(null, user)
          }
          let account = new User()
          account.id = profile.id
          account.token = profile.token
          account.tokenSecret = profile.tokenSecret

          return done(null, user)
        })
    }
  )
)

//   passport.use('twitter-authz', new TwitterStrategy({
//     consumerKey: TWITTER_CONSUMER_KEY,
//     consumerSecret: TWITTER_CONSUMER_SECRET,
//     callbackURL: "http://www.example.com/connect/twitter/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     Account.findOne({
//       domain: 'twitter.com', uid: profile.id
//     }, function(err, account) {
//       if (err) { return done(err); }
//       if (account) { return done(null, account); }

//       var account = new Account();
//       account.domain = 'twitter.com';
//       account.uid = profile.id;
//       var t = { kind: 'oauth', token: token, attributes: { tokenSecret: tokenSecret } };
//       account.tokens.push(t);
//       return done(null, account);
//     });
//   }
// ));

  router.get('/', passport.authorize('twitter', { scope: 'email' }))

  router.get(
    '/callback',
    passport.authorize('twitter', {
      successRedirect: '/poem',
      failureRedirect: '/login',
      failureFlash: true,
    }),
    function(req, res) {
      res.redirect('/')
      console.log('req', req)
      console.log('res', res)
      // Associate the Twitter account with the logged-in user
    }
  )
}
