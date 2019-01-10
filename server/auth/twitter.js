const passport = require('passport')
const router = require('express').Router()
let TwitterStrategy = require('passport-twitter').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.TWITTER_CONSUMER_KEY || !process.env.TWITTER_CONSUMER_SECRET) {
  console.log('TWITTER client ID / secret not found. Skipping TWITTER OAuth.')
} else {
  const twitterConfig = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK
  }

  const strategy = new TwitterStrategy(
    twitterConfig,
    (token, tokenSecret, profile, cb) => {
      User.findOrCreate(
        {
          twitterId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        },
        function(err, user) {
          return cb(err, user)
        }
      )
    }
  )

  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('twitter', {
      scope: 'email'
    })
  )

  router.get(
    '/callback',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }),
    function(req, res) {
      res.redirect('/')
    }
  )
}
