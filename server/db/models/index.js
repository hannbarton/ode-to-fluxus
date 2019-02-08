const User = require('./user')
const Word = require('./word')
const TrendingTweet = require('./trendingTweet')
const MyTweet = require('./myTweet')

Word.belongsTo(User)
User.MyTweet = MyTweet.belongsTo(User)
TrendingTweet.belongsTo(User)
User.hasMany(Word)
User.hasMany(MyTweet)
User.hasMany(TrendingTweet)

module.exports = {
  User,
  Word,
  TrendingTweet,
  MyTweet,
}
