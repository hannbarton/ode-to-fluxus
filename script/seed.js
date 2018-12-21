'use strict'

const db = require('../server/db')
const {User, Word} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const words = [
    {
      words: 'new',
      userId: 1
    },
    {
      words: 'library',
      userId: 1
    },
    {
      words: 'or',
      userId: 1
    },
    {
      words: 'glorious',
      userId: 1
    },
    {
      words: 'homeless',
      userId: 1
    },
    {
      words: 'shelter',
      userId: 1
    },
    {
      words: 'the',
      userId: 1
    },
    {
      words: 'future',
      userId: 1
    },
    {
      words: 'is',
      userId: 1
    },
    {
      words: 'now',
      userId: 1
    }
  ]

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  await Promise.all(words.map(word => Word.create(word)))

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
