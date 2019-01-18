const router = require('express').Router()
module.exports = router

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.post('/login', (req, res) => {
  req.logIn()
  res.redirect('/profile')
})

router.use('/google', require('./google'))
router.use('/twitter', require('./twitter'))
