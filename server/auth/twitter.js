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
        const twitterId = profile.id
        const displayName = profile.displayName
        const userName = profile.userName
        // const name = profile.name
        // const email = profile.email
        const accessToken = token
        const accessTokenSecret = tokenSecret

        User.findOrCreate({
          where: {twitterId},
          defaults: {
            displayName,
            userName,
            // name,
            // email,
            accessToken,
            accessTokenSecret
          }
        }).then((user) => {
          console.log('created', user[0].dataValues)
          done(null, user)
        })
      }
    )
  )

  router.get('/', passport.authorize('twitter', {scope: ['profile']}))

  router.get(
    '/callback',
    passport.authorize('twitter', {
      failureRedirect: '/login',
      failureFlash: true
    }),
    (req, res) => {
      console.log('USERRRR')
      res.send(req.user)
      return res.redirect('/profile')
    }
  )
}
