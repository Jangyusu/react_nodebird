const passport = require('passport')

const local = require('./local')
const { User } = require('../models')

module.exports = () => {
  // userId만 따로 저장
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // 복원을 위해 userId 찾기
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } })
      done(null, user) // req.user
    } catch (err) {
      console.error(err)
      done(err)
    }
    
  })

  local()
}