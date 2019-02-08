const router = require('express').Router()
module.exports = router

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.send('YOU MUST LOG IN')
    }
    else {
        next()
    }
}

router.get('/', authCheck, (req, res) => {
    res.send('YOU ARE lOGGED IN')
})
