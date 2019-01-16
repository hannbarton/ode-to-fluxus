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
        passReqToCallback: true
      },
       (req, token, tokenSecret, profile, done) => {
          // process.nextTick(function() {
            // console.log('ACCOUNT', profile.account)
            console.log('PROFILE USERNAME', profile._json)
            // console.log('done', done)

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
            .then(([user]) => done(null, user))
            .catch(done)
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
      res.redirect('/poem')
      // Associate the Twitter account with the logged-in user
    }
  )
}
