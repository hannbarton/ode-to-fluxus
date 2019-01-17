const passport = require('passport')
const router = require('express').Router()
let TwitterStrategy = require('passport-twitter').Strategy
const LocalStrategy = require('passport-local').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.TWITTER_CONSUMER_KEY || !process.env.TWITTER_CONSUMER_SECRET) {
  console.log('TWITTER client ID / secret not found. Skipping TWITTER OAuth.')
} else {
  console.log('twitter oauth init')

  passport.use(
    'twitter',
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK,
        userAuthorizationURL:
          'http://api.twitter.com/oauth/authenticate?force_login=true',
        passReqToCallback: true
        // includeEmail: true
      },
      (req, token, tokenSecret, profile, done) => {
        // process.nextTick(function() {
        // console.log('ACCOUNT', profile.account)
        // console.log('PROFILE USERNAME', profile._json)
        // console.log('done', done)
        // console.log('THIS IS THE REq', req)

        const twitterId = profile._json.id_str
        // const twitterId = 123
        const displayName = profile.displayName
        const userName = profile._json.screen_name
        const name = profile._json.name
        const accessToken = token
        const accessTokenSecret = tokenSecret

        User.findOrCreate({
          where: {twitterId},
          defaults: {
            displayName,
            userName,
            name,
            accessToken,
            accessTokenSecret
          }
        })

        // console.log('REQQQQ', req.user)

        return done(null, profile)
      }
    )
  )

  // passport.use(
  //   'login',
  //   new LocalStrategy(
  //     {
  //       passReqToCallback: true
  //     },
  //     function(req, username, password, done) {
  //       // check in mongo if a user with username exists or not
  //       User.findOne({twitterId: req.id}, function(err, user) {
  //         // In case of any error, return using the done method
  //         if (err) return done(err)
  //         // Username does not exist, log the error and redirect back
  //         if (!user) {
  //           console.log('User Not Found with username ')
  //           return done(null, false, req.flash('message', 'User Not found.'));
  //         }
  //         return done(null, req)
  //       })
  //     }
  //   )
  // )

  router.get('/me', (req, res) => {
    // console.log('pasport', req)
      res.json(req.user)
    })


  router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/poem');
  });

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
          console.log('THJIS IS THE SENSSION', req.session)
          return res.redirect('/tweet')
        })
      })
      // Associate the Twitter account with the logged-in user
    }
  )
}
