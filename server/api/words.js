const router = require('express').Router()
const db = require('../../server/db')
const {Word, TrendingTweet, User} = require('../db/models')
var Twitter = require('twitter')
module.exports = router


const isLoggedIn = (req, res, next) => {
  if (!req.account.user) {
      // console.log(req.session)
      console.log('req', req.account.user)
      res.redirect('/login')
  }
  else {
    console.log('req acount user',req.account.user)
      next()
  }
}

let client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

router.get('/', async (req, res, next) => {
  try {
    const words = await Word.findAll()
    res.json(words)
  } catch (err) {
    next(err)
  }
})

router.get('/twitter', async (req, res, next) => {
  try {
    // await TrendingTweet.destroy()
    // await db.sync({force: true})

    await client.get('/trends/place', {id: 23424977}, function(error, tweets) {
      if (error) throw error
      let dataTweet = tweets[0].trends

      Promise.all(
        dataTweet.map(eachTweet => {
          // not all caps

          if (
            eachTweet.name[0] === '#' &&
            eachTweet.name[2] === eachTweet.name[2].toUpperCase()
          ) {
            eachTweet.name = eachTweet.name.slice(1)
          }
          if (
            eachTweet.name[0] === '#' &&
            eachTweet.name[2] === eachTweet.name[2].toLowerCase()
          ) {
            eachTweet.name = eachTweet.name
              .slice(1)
              .replace(/([a-z])([A-Z])/g, '$1 $2')
          }
          TrendingTweet.create(eachTweet)
        })
      )
      res.json(dataTweet)
    })
    // await db.sync({force: false})
  } catch (err) {
    next(err)
  }
})

router.get('/myTweets', isLoggedIn, async (req, res, next) => {
  try{
    console.log('hittin')
    console.log('userID', req.session['oauth:twitter'].oauth_token)
    // res.json(req.user)
    // console.log('twitterID', req.user.twitterId)

    let twitterUserClient = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: req.session['oauth:twitter'].oauth_token,
      access_token_secret: req.session['oauth:twitter'].oauth_token_secret,
    })

    await twitterUserClient.get('statuses/home_timeline', function(err, tweets, response) {

      // Promise.all(tweets)

      console.log('tweets', tweets)
      if(err) throw err
      console.log(response)
      // res.json(tweets)
    })
    res.json({something:"NOT WORKING"})
  }
  catch(err) {
    console.log('NOT HITTING')
    console.error(err)
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const word = await Word.create(req.body)
    res.json({
      word
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const send = {
      message: 'successfully erased',
      id: req.params.id
    }

    await Word.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(send)
  } catch (err) {
    next(err)
  }
})
