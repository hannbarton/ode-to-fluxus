const Sequelize = require('sequelize')
const db = require('../db')

const Word = db.define('word', {
    wordList: {
        type: Sequelize.STRING,
        unique: true,
      },
    userWordList: {
        type: Sequelize.STRING,
        unique: true,
    }
})

module.exports = Word
