const router = require('express').Router()
module.exports = router

const authCheck = (req, res, next) => {
    if (!req.user) {
        console.log('hittigh auth check not passing')
        res.redirect('/login')
    }
    else {
        next()
    }
}

router.get('/', authCheck, (req, res) => {
    console.log('REQ SESIASNDSID')
    res.send('YOU ARE lOGGED in')
})
