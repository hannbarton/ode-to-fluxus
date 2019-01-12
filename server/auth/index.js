const router = require('express').Router()
module.exports = router

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

// router.get('/me', (req, res) => {
//   console.log('this is the account', req.session)
//   res.json(req.session)
// })

router.use('/google', require('./google'))
router.use('/twitter', require('./twitter'))
