const router = require('express').Router()
module.exports = router

const authCheck = (req, res, next) => {
    if (!req.user) {
        console.log('auth check not passing')
        res.send('YOU MUST LOG IN')
    }
    else {
        next()
    }
}

router.get('/', authCheck, (req, res) => {
    res.send('YOU ARE lOGGED in')
})
