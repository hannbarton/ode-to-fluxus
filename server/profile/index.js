const router = require('express').Router()
module.exports = router

router.get('/', (req, res) => {
    res.send('YOU ARE loggin in' + req.user.id)
})
