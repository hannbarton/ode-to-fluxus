const router = require('express').Router()
const db = require('../../server/db')
const {Word, TrendingTweet, User} = require('../db/models')
const Twitter = require('twitter')
const commonWords = require('./commonWords')

module.exports = router

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login')
  } else {
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

router.get('/common', async (req, res, next) => {
  await res.json(commonWords)
})

router.get('/twitter', async (req, res, next) => {
  try {
    await TrendingTweet.sync({force: true})

    const tweets = await client.get('/trends/place', {id: 23424977})
    const dataTweet = tweets[0].trends

    await Promise.all(
      dataTweet.forEach(eachTweet => {
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

    // need to pull to db TrendingTweet and send to res.json, but promise won't resolv
    const tweetwords = await TrendingTweet.findAll()
    return res.json(tweetwords)
  } catch (err) {
    next(err)
  }
})

router.get('/myTweets', isLoggedIn, async (req, res, next) => {
  try {
    let twitterUserClient = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: req.user.accessToken,
      access_token_secret: req.user.accessTokenSecret
    })

    const tweets = await twitterUserClient.get('statuses/user_timeline', {
      tweet_mode: 'extended'
    })

    const myTweetArray = tweets.forEach(eachTweet => {
      if (eachTweet.full_text[0] === 'R' && eachTweet.full_text[1] === 'T') {
        return {
          tweet: eachTweet.retweeted_status.full_text
            .replace(/\n/g, ' ')
            .replace('[', '')
            .replace(']', '')
            .split(' ')
        }
      } else {
        return {
          tweet: eachTweet.full_text
            .replace(/\n/g, ' ')
            .replace('[', '')
            .replace(']', '')
            .split(' ')
        }
      }
    })

    const filteredArrayofTweets = myTweetArray.forEach(filteredTweet => {
      let randomIndex = Math.floor(
        Math.random() * filteredTweet.tweet.length - 1
      )
      return {tweet: filteredTweet.tweet[randomIndex]}
    })

    res.json(filteredArrayofTweets)
    // res.json(myTweetArray.concat(tweets))
  } catch (err) {
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

router.delete('/twitter/:query', async (req, res, next) => {
  try {
    await TrendingTweet.destroy({
      where: {
        query: req.params.query
      }
    })
  } catch (err) {
    console.err(err)
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
