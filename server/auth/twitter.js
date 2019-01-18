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
        const name = profile._json.name
        const accessToken = token
        const accessTokenSecret = tokenSecret

        // console.log('PROFILE',profile)

        User.findOrCreate({
          where: {twitterId},
          defaults: {
            displayName,
            userName,
            name,
            accessToken,
            accessTokenSecret
          }
        }).then(([user]) => {
          // console.log('this is hit here', user)
          done(null, user)
        })

        // User.findOne({
        //   where: { twitterId: profile.id }
        //   }).then((currentUser) => {
        //   if (currentUser) {
        //     console.log('we have the current user' + currentUser)
        //     done(null, currentUser)
        //   }
        //   else {
        //     User.create({
        //       where: {twitterId},
        //       defaults: {
        //         displayName,
        //         userName,
        //         name,
        //         accessToken,
        //         accessTokenSecret
        //       }
        //     }).then((newUser) => {
        //       console.log('new user was created' + newUser)
        //       done(null, newUser)
        //     })
        //   }
        // })
      }
    )
  )

  router.get('/', passport.authorize('twitter'))

  router.get(
    '/callback',
    passport.authorize('twitter', {
      successRedirect: '/tweet',
      failureRedirect: '/login',
      failureFlash: true
    }),
    (req, res) => {
      req.session.save(() => {
        req.logIn(req.account, function(err) {
          if (err) {
            console.error(err)
          }
          console.log('USER AND SESSSION',req.account, req.session)
          return res.redirect('/profile')
        });
       })
    }
  )
}
