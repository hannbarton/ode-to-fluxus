const router = require('express').Router()
module.exports = router

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

// router.get('/me', (req, res) => {

// // console.log('this is working', req.account)
// console.log('cookie', req.session)

//   res.json(req.session)
//   if (req.isAuthenticated()) {
//     console.log('is authenticated')

//   }
//   return res.json({ error: 'User is not authenticated' });
// })

router.get('/me', (req, res) => {
// console.log('pasport', req)
  res.json(req._passport)
})

router.use('/google', require('./google'))
router.use('/twitter', require('./twitter'))
