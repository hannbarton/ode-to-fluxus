const Sequelize = require('sequelize')
const db = require('../db')

const TrendingTweet = db.define('trendingTweet', {
    name: {
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.INTEGER
    },
    url: {
        type: Sequelize.TEXT
    },
    promoted_content: {
        type: Sequelize.STRING
    },
    query: {
        type: Sequelize.STRING
    },
    tweet_volume: {
        type: Sequelize.INTEGER
    }
})

module.exports = TrendingTweet
