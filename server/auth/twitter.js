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
    userAuthorizationURL:
      'https://api.twitter.com/oauth/authenticate?force_login=true',
    passReqToCallback: true
  }

  passport.use(
    new TwitterStrategy(twitterConfig, (token, tokenSecret, profile, done) => {
      console.log('this is working', profile)
      User.findOrCreate(
        {
          where: {
            twitterId: profile.id,
            token: token,
            secret: tokenSecret,
            email: profile.emails[0].value
          }
        },
        function(err, user) {
          console.log('user', user)
          if (err) {
            return done(err)
          }
          if (user) {
            console.log('user', user)
            return done(null, user)
          }
          return done(null, user)
        }
      )
    })
  )

  router.get('/', passport.authorize('twitter', {scope: 'email'}))

  router.get(
    '/callback',
    passport.authorize('twitter', {
      successRedirect: '/poem',
      failureRedirect: '/login',
      failureFlash: true
    }),
    function(req, res) {
      console.log('this is the callback req', req)
      res.redirect('/')
      console.log('req', req)
      console.log('res', res)
      // Associate the Twitter account with the logged-in user
    }
  )
}
