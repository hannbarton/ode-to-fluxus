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
    // access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK,
    passReqToCallback: true
  }

  const strategy = new TwitterStrategy(
    twitterConfig,
    (token, tokenSecret, profile, cb) => {
      profile.token = token
      profile.tokenSecret = tokenSecret
      console.log(profile)
      User.findOrCreate(
        {
          twitterId: profile.id,
          name: profile.displayName,
          // email: profile.email
          email: profile.emails[0].value
        },
        function(err, user) {
          return cb(err, user)
        }
      )
    }
  )

  passport.use(strategy)

  router.get('/', passport.authorize('twitter', {scope: 'email'}))

  router.get(
    '/callback',
    passport.authorize('twitter', {
      successRedirect: '/poem',
      failureRedirect: '/login',
      failureFlash: true,
    }),
    function(req, res) {
      res.redirect('/poem')
      console.log('re and res,', res, req.user, req.session)
    }
  )
}
