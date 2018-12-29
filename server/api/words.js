const router = require('express').Router()
const {User, Word} = require('../db/models')
module.exports = router

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
