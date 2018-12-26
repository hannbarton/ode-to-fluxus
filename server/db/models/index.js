
const User = require('./user')
const Word = require('./word')

Word.belongsTo(User)
User.hasMany(Word)

module.exports = {
  User,
  Word,
}
