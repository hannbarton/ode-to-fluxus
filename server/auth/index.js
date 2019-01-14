const router = require('express').Router()
module.exports = router

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {

console.log('this is working')
console.log('cookie', req.session['oauth:twitter'])

  res.json(req.session['oauth:twitter'])
  if (req.isAuthenticated()) {
    console.log('is authenticated')
    res.json(req.body.params)
  }
  return res.json({ error: 'User is not authenticated' });
})

router.use('/google', require('./google'))
router.use('/twitter', require('./twitter'))
