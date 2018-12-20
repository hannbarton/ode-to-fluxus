const Sequelize = require('sequelize')
const db = require('../db')

const Word = db.define('word', {
    words: {
        type: Sequelize.STRING,
        unique: true,
      },
})

module.exports = Word
