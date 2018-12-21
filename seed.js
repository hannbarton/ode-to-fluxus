const {User, Word, db} = require('./server/db')

const words = [
  {
    words: 'new',
    userId: '1'
  },
  {
    words: 'library',
    userId: '1'
  },
  {
    words: 'or',
    userId: '1'
  },
  {
    words: 'glorious',
    userId: '1'
  },
  {
    words: 'homeless',
    userId: '1'
  },
  {
    words: 'shelter',
    userId: '1'
  },
  {
    words: 'the',
    userId: '1'
  },
  {
    words: 'future',
    userId: '1'
  },
  {
    words: 'is',
    userId: '1'
  },
  {
    words: 'now',
    userId: '1'
  }
]

const users = [
  {
    email: 'tb@tb.com',
    password: '123'
  },

  {
    email: 'ms@ms.com',
    password: '456'
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})
    await Promise.all(users.map(user => User.create(user)))
    await Promise.all(words.map(word => Word.create(word)))

    console.log('Done!')
    db.close()
  } catch (err) {
    console.error('Something went wrong!', err.message)
    db.close()
  }
}

seed()
