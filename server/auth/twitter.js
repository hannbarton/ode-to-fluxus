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
      function(req, token, tokenSecret, profile, done) {
        process.nextTick(function() {
          console.log('session/cookie', req.session)
          // console.log(tokenSecret)
          // console.log('token', token)
          // console.log('this is working', profile)

          // profile.oauth_token = token
          // profile.oauth_verifier = tokenSecret

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
      // res.send(req.account)
      console.log('query', req.query)
      console.log('acount', req.account)
      res.redirect('/poem')
      // Associate the Twitter account with the logged-in user
    }
  )
}
