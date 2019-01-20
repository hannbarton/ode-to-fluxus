const Sequelize = require('sequelize')
const db = require('../db')

const MyTweet = db.define('myTweet', {
    tweet: {
        type: Sequelize.STRING,
    }
})

module.exports = MyTweet
