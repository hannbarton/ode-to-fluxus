const router = require('express').Router()
const {User, Word} = require('../db/models')
module.exports = router
var Twitter = require('twitter');

let client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

router.get('/', async (req, res, next) => {
  try {
    const words = await Word.findAll()
    res.json(words)
  } catch (err) {
    next(err)
  }
})

router.get('/twitter', async (req, res, next) => {

	await client.get('/trends/place',{id: 2367105}, function(error, tweets, response) {
	   if(error) throw error;
	   res.json(tweets[0].trends) // Raw response object.
   })
})

router.get('/:id', async (req, res, next) => {
	try {
		const words = await Word.findById(req.params.id, {
			include: [{
					model: User
				}]
		});
		res.json(words);
	} catch (err) {
		next(err);
	}
});

router.post('/', async(req, res, next) => {
    try{
        const word = await Word.create(req.body)
        res.json({
            word
        })
    }
    catch(err) {
        next(err)
    }
})

router.delete('/:id', async(req, res, next) => {
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
	}
	catch (err) {
		next(err)
	}
})
