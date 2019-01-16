const passport = require('passport')
const router = require('express').Router()
let TwitterStrategy = require('passport-twitter').Strategy
const {User} = require('../db/models')
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
        passReqToCallback: true,
        // includeEmail: true
      },
       (req, token, tokenSecret, profile, done) => {
          // process.nextTick(function() {
            // console.log('ACCOUNT', profile.account)
            // console.log('PROFILE USERNAME', profile._json)
            // console.log('done', done)
            // console.log('THIS IS THE REq', req)

            const twitterId = profile._json.id
            const displayName = profile.displayName
            const userName = profile._json.screen_name
            const name = profile._json.name
            const accessToken = token
            const accessTokenSecret = tokenSecret

            User.findOrCreate({
              where: {twitterId},
              defaults: {displayName, userName, name, accessToken, accessTokenSecret}
            })

            // console.log('REQQQQ', profile)

            return done(null, profile)
        }
    )
  )

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/tweets',
    failureRedirect: '/login',
    failureFlash: true
}))

  router.get('/', passport.authorize('twitter'))

  router.get(
    '/callback',
    passport.authorize('twitter', {
      successRedirect: '/tweet',
      failureRedirect: '/login',
      failureFlash: true
    }),
    function(req, res) {
      req.session.save(() => {
        req.logIn(req.account, function(err) {
          if (err) {
            console.error(err)
          }
          // console.log("THJIS IS THE SENSSION", req.account)
          return res.redirect('/tweet')
        });

      })
      // Associate the Twitter account with the logged-in user
    }
  )
}
