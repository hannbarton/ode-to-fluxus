const passport = require('passport')
const router = require('express').Router()
let TwitterStrategy = require('passport-twitter').Strategy
module.exports = router

if (!process.env.TWITTER_CONSUMER_KEY || !process.env.TWITTER_CONSUMER_SECRET) {
  console.log('TWITTER client ID / secret not found. Skipping TWITTER OAuth.')
} else {
  console.log('twitter oauth init')

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK,
        userAuthorizationURL:
          'http://api.twitter.com/oauth/authenticate?force_login=true',
        passReqToCallback: true
      },
      function(token, tokenSecret, profile, done) {
        process.nextTick(function() {

          console.log(tokenSecret)
          console.log('token', token)
          console.log('this is working', profile)

          return done(null, profile)
        })
      }
    )
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
      console.log('this is the callback req', res)
      res.json(req.account)
      res.redirect('/')
      console.log('req', req)
      console.log('res', res)
      // Associate the Twitter account with the logged-in user
    }
  )
}
