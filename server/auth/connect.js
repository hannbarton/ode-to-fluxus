const passport = require('passport')
const router = require('express').Router()
let TwitterStrategy = require('passport-twitter').Strategy
module.exports = router

const twitterConfig = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    // access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK,
    passReqToCallback: true,
  }

  const strategy = new TwitterStrategy(
    twitterConfig,
    (token, tokenSecret, profile, cb) => {
        profile.session.token = token
        profile.session.tokenSecret = tokenSecret
    //   profile.token = token;
    //   profile.tokenSecret = tokenSecret;
    //   console.log('req', req.session)
    //   console.log('token', token)
    //   console.log('tokensecret', tokenSecret)
      console.log('profile', profile)
    //   console.log('cb', cb)

      return cb(null, profile)
    }
  )

  passport.use(strategy)

router.get('/twitter', passport.authorize('twitter', {scope: 'email'}))

router.get(
  '/twitter/callback',
  passport.authorize('twitter', {
    successRedirect: '/poem',
    failureRedirect: '/login',
    failureFlash: true
  }),
  function(req, res) {
      console.log('re and res,', res, req.user, req.session)
  }
)
