const router = require('express').Router()
const {Word, TrendingTweet, MyTweet, User} = require('../db/models')
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

const hasPassport = (req, next) => {
  if (req.session.passport) {
    return req.session.passport.user
  } else {
    return req.session.user.userId
  }
}

let client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

router.get('/words', async (req, res, next) => {
  try {
    const userId = req.session.passport
      ? req.session.passport.user
      : req.session.user.userId

    const words = await Word.findAll({
      where: {
        userId: userId
      }
    })
    res.json(words)
  } catch (err) {
    next(err)
  }
})

router.get('/words/:id', async (req, res, next) => {
  try {
    const word = await Word.findById(req.params.id)
    res.json(word)
  } catch (err) {
    console.error(err)
  }
})

router.get('/common', async (req, res, next) => {
  try {
    await res.json(commonWords)
  } catch (err) {
    next(err)
  }
})

router.get('/twitter', async (req, res, next) => {
  try {
    // if you are completely new, create a user
    if (!req.session.passport && !req.session.user.userId) {
      const user = await User.create({
        email: 'anonymous'
      })
      req.session.user = await {
        userId: user.id
      }
    } else if (req.session.user) {
      // else, if you have a passport, refresh your tweets from passport.user.id

      await TrendingTweet.destroy({
        where: {
          userId: req.session.user.userId
        }
      })
    } else if (req.session.passport) {
      await TrendingTweet.destroy({
        where: {
          userId: req.session.passport.user
        }
      })
    }

    const tweets = await client.get('/trends/place', {id: 23424977})
    const dataTweet = tweets[0].trends

    await Promise.all(
      dataTweet.map(eachTweet => {
        // id the trending hash starts with # and has numbers
        if (eachTweet.name[0] === '#' && /\d/.test(eachTweet.name)) {
          eachTweet.name.slice(1)
        } else if (
          // if the trending hash is ALL CAPS, just take off #
          eachTweet.name[0] === '#' &&
          eachTweet.name[1] === eachTweet.name[1].toUpperCase() &&
          eachTweet.name[2] === eachTweet.name[2].toUpperCase() &&
          eachTweet.name[3] === eachTweet.name[3].toUpperCase()
        ) {
          eachTweet.name = eachTweet.name.slice(1)
        } else if (eachTweet.name[0] === '#') {
          eachTweet.name = eachTweet.name
            .slice(1)
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/([A-Z])([A-Z])/g, '$1 $2')
        }

        const userId = +hasPassport(req, next)
        eachTweet.userId = userId
        return TrendingTweet.create(eachTweet)
      })
    )

    const tweetwords = await User.findById(+hasPassport(req, next), {
      include: TrendingTweet
    })

    const arrayToObject = array =>
      array.reduce((obj, item) => {
        obj[item.id] = item
        return obj
      }, {})

    const tweetObject = arrayToObject(tweetwords.trendingTweets)

    res.json(tweetObject)
  } catch (err) {
    next(err)
  }
})

router.get('/myTweets', isLoggedIn, async (req, res, next) => {
  try {
    let twitterUserClient = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: req.user.token,
      access_token_secret: req.user.secret
    })

    await MyTweet.sync({force: true})

    const tweets = await twitterUserClient.get('statuses/user_timeline', {
      tweet_mode: 'extended'
    })

    await Promise.all(
      tweets.map(eachTweet => {
        if (eachTweet.full_text[0] === 'R' && eachTweet.full_text[1] === 'T') {
          const tweet = {
            tweet: eachTweet.retweeted_status.full_text
              .replace(/[\n\r]/g, ' ')
              .replace('[', '')
              .replace(']', '')
              .replace(/["]r/g, '')
              .split(' '),
            userId: req.user.id
          }

          let randomIndex = Math.floor(
            Math.random() * Math.floor(tweet.tweet.length - 1)
          )

          tweet.tweet = tweet.tweet[randomIndex]

          return MyTweet.create(tweet)
        } else {
          const realTweet = {
            tweet: eachTweet.full_text
              .replace(/[\n\r]/g, ' ')
              .replace('[', '')
              .replace(']', '')
              .replace(/["]r/g, '')
              .split(' '),
            userId: req.user.id
          }

          let randomized = Math.floor(
            Math.random() * Math.floor(realTweet.tweet.length - 1)
          )

          realTweet.tweet = realTweet.tweet[randomized]
          MyTweet.create(realTweet)
        }
      })
    )

    const tweetWords = await MyTweet.findAll()

    res.json(tweetWords)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/myTweets/:id', async (req, res, next) => {
  try {
    const word = await MyTweet.findById(req.params.id)
    res.json(word)
  } catch (err) {
    next(err)
  }
})

router.get('/common', async (req, res, next) => {
  try {
    await res.json(commonWords)
  } catch (err) {
    next(err)
  }
})

router.post('/words', async (req, res, next) => {
  try {
    let userId = req.session.user.passport
      ? req.session.passport.user
      : req.session.user.userId

    const word = await Word.create({
      words: req.body.words,
      userId: userId
    })

    res.json({
      word
    })
  } catch (err) {
    next(err)
  }
})

router.get('/twitter/:id', async (req, res, next) => {
  try {
    const tweet = await TrendingTweet.findById(req.params.id)
    res.json(tweet)
  } catch (err) {
    console.error(err)
  }
})

router.delete('/twitter/:id', async (req, res, next) => {
  try {
    const send = {
      message: 'successfully erased',
      id: req.params.id
    }

    await TrendingTweet.destroy({
      where: {
        id: req.params.id
      }
    })

    res.json(send)
  } catch (err) {
    console.error(err)
  }
})

router.delete('/words/:id', async (req, res, next) => {
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

router.delete('/myTweets/:id', async (req, res, next) => {
  try {
    const send = {
      message: 'successfully erased',
      id: req.params.id
    }

    await MyTweet.destroy({
      where: {
        id: req.params.id
      }
    })

    res.json(send)
  } catch (err) {
    next(err)
  }
})
