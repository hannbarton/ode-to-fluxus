const passport = require('passport')
const router = require('express').Router()
module.exports = router

router.get('/twitter', passport.authorize('twitter', {scope: 'email'}))

router.get(
  '/twitter/callback',
  passport.authorize('twitter', {
    successRedirect: '/poem',
    failureRedirect: '/login',
    failureFlash: true
  })

)
