const router = require('express').Router()
const db = require('../../server/db')
const {Word, TrendingTweet} = require('../db/models')
var Twitter = require('twitter')
module.exports = router

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
    await db.sync({force: true})

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
    await db.sync({force: false})
  } catch (err) {
    next(err)
  }
})

router.get('/twitter/:id', async (req, res, next) => {
  try{
    console.log(req.user.id)

    let client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    })

    await client.get('statuses/user_timeline', function(err, tweets) {
      if(err) throw err
      console.log(tweets)
    })
  }
  catch(err) {
    next(err)
  }
})

// router.get('/:id', async (req, res, next) => {
//   try {
//     const words = await Word.findById(req.params.id, {
//       include: [
//         {
//           model: User
//         }
//       ]
//     })
//     res.json(words)
//   } catch (err) {
//     next(err)
//   }
// })

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

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const send = {
//       message: 'successfully erased',
//       id: req.params.id
//     }

//     await Word.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//     res.json(send)
//   } catch (err) {
//     next(err)
//   }
// })
