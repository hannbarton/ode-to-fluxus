const User = require('./user')
const Word = require('./word')
const TrendingTweet = require('./trendingTweet')
const MyTweet = require('./myTweets')

Word.belongsTo(User)
MyTweet.belongsTo(User)
User.hasMany(Word)
User.hasMany(MyTweet)

module.exports = {
  User,
  Word,
  TrendingTweet,
  MyTweet
}
