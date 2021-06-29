const express = require('express')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const dotenv = require('dotenv')

const postRouter = require('./routes/post')
const postsRouter = require('./routes/posts')
const userRouter = require('./routes/user')
const db = require('./models')
const passportConfig = require('./passport')

dotenv.config()

const app = express()

passportConfig()

db.sequelize.sync()
  .then(() => {
    console.log('데이터베이스 연결 성공')
  })
  .catch((err) => {
    console.error(err)
  })

app.use(cors({
  origin: true,
  credentials: true // browser에 쿠키를  전달하기 위해 credentials = true
}))
app.use(express.json()) // json data 처리
app.use(express.urlencoded({ extended: true })) // form data 처리
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/post', postRouter)
app.use('/posts', postsRouter)
app.use('/user', userRouter)

app.listen(3065, () => {
  console.log('서버 실행 중')
})