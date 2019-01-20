const User = require('./user')
const Word = require('./word')
const TrendingTweet = require('./trendingTweet')
const MyTweets = require('./myTweets')

Word.belongsTo(User)
MyTweets.belongsTo(User)
User.hasMany(Word)
User.hasMany(MyTweets)

module.exports = {
  User,
  Word,
  TrendingTweet,
  MyTweets
}
