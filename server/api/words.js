const router = require('express').Router()
const {User, Word} = require('../db/models')
module.exports = router
var Twitter = require('twitter');

// var client = new Twitter({
//     consumer_key: process.env.TWITTER_CONSUMER_KEY,
//     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//     access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//     access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
//   });


router.get('/', async (req, res, next) => {
  try {
    const words = await Word.findAll()
    res.json(words)
  } catch (err) {
    next(err)
  }
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

// app.get('/search', async (req, res, next) => {
// 	try {
// 		let client = new Twitter({
// 			consumer_key: process.env.TWITTER_CONSUMER_KEY,
// 			consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
// 			access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
// 			access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// 		  });
// 		  let tweet = await client.get('/search?q=javascript')
// 		  res.json(tweet.data)
// 	}
// 	catch (err) {
// 		next(err)
// 	}
// })

let client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

client.get('favorites/list', function(error, tweets, response) {
	if(error) throw error;
	console.log(tweets);  // The favorites.
	// console.log(response);  // Raw response object.
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
