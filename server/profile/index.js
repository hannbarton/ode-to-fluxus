const router = require('express').Router()
module.exports = router

const authCheck = (req, res, next) => {
    if (!req.session['oauth:twitter']) {
        console.log(req.session)
        res.redirect('/login')
    }
    else {
        next()
    }
}

router.get('/', authCheck, (req, res) => {
    console.log('REQ SESIASNDSID', req.session)
    res.send('YOU ARE loggED in')
})
