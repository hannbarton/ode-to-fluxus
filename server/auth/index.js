const router = require('express').Router()
let TwitterStrategy = require('passport-twitter').Strategy
const passport = require('passport')
module.exports = router

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

// router.get('/me', (req, res) => {

// console.log('this is working', req.query)
// console.log('cookie', req.session)

//   res.json(req.session)
//   if (req.isAuthenticated()) {
//     console.log('is authenticated')

//   }
//   return res.json({ error: 'User is not authenticated' });
// })

router.use('/google', require('./google'))
router.use('/twitter', require('./twitter'))
