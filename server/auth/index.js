const router = require('express').Router()
module.exports = router

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

// router.get('/me', (req, res) => {

//   console.log('this is the account', req.user)
//   res.json(req.user)
// })

router.use('/google', require('./google'))
router.use('/twitter', require('./twitter'))
