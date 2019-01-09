const User = require('./user')
const Word = require('./word')
const TrendingTweet = require('./trendingTweet')

Word.belongsTo(User)
TrendingTweet.belongsTo(User)
User.hasMany(Word)
User.hasMany(TrendingTweet)

module.exports = {
  User,
  Word,
  TrendingTweet
}
