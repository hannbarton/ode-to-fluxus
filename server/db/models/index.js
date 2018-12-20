const User = require('./user')
const Word = require('./word')

 User.hasMany(Word)
 Word.belongsTo(User)

module.exports = {
  User,
  Word
}
