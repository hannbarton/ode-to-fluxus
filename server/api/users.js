const router = require('express').Router()
const {User, Word, MyTweet, TrendingTweet} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try{
    const user = await User.findById(req.params.id, {
      include: [
        {model: Word},
        {model: MyTweet},
        {model: TrendingTweet}
      ]
    })
    res.json(user)
  }
  catch(err) {
    res.sendStatus(err.httpStatusCode).redirect('/')
  }
})
