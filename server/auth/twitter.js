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

  const strategy = new TwitterStrategy(
    twitterConfig,
    async (token, tokenSecret, profile, cb) => {
      profile.token = token
      profile.tokenSecret = tokenSecret
      console.log(profile)
      await User.findOrCreate(
        {
          twitterId: profile.id,
          email: profile.email,
          // email: profile.emails[0].value
        },
        function(err, user) {
          user.token = token
          user.tokenSecret = tokenSecret
          console.log(user)
          return cb(err, user)
        }
      )
      return cb(null, profile)
    }
  )

  passport.use(strategy)

  router.get('/', passport.authorize('twitter', { failureRedirect: '/account' }))

  router.get(
    '/callback',
    passport.authorize('twitter', {
      successRedirect: '/poem',
      failureRedirect: '/login',
      failureFlash: true,
    }),
    function(req, res) {
      res.send(req.session)
      // res.redirect('/poem')
      console.log('re and res,', res, req.user, req.session)
    }
  )
}
