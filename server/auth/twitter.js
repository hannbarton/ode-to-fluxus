const passport = require('passport')
const router = require('express').Router()
let TwitterStrategy = require('passport-twitter').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.TWITTER_CONSUMER_KEY || !process.env.TWITTER_CONSUMER_SECRET) {
  console.log('TWITTER client ID / secret not found. Skipping TWITTER OAuth.')
} else {
  console.log('twitter oauth init')

  // const twitterConfig = {
  //   consumerKey: process.env.TWITTER_CONSUMER_KEY,
  //   consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  //   callbackURL: process.env.TWITTER_CALLBACK,
  //   userAuthorizationURL:
  //     'https://api.twitter.com/oauth/authenticate?force_login=true',
  //   passReqToCallback: true
  // }

  let oAuthData = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessTokenKey: '',
    accessTokenSecret: ''
  };

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK,
        userAuthorizationURL:
          'https://api.twitter.com/oauth/authenticate?force_login=true',
        passReqToCallback: true
      },
      (token, tokenSecret, profile, done) => {
        process.nextTick(function() {
          console.log('this is working', profile)

          return done(null, profile)
        })
      }
    )
  )

  // router.post('/', async (req, res, next) => {
  //   try {
  //     await res.json(req)
  //   } catch (err) {
  //     next(err)
  //   }
  // })

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
      res.json(req.body)
      res.redirect('/')
      console.log('req', req)
      console.log('res', res)
      // Associate the Twitter account with the logged-in user
    }
  )
}
