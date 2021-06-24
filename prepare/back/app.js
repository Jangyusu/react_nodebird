const express = require('express')
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
const db = require('./models')
const app = express()

db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공')
  })
  .catch((err) => {
    console.error(err)
  })

app.use(express.json()) // json data 처리
app.use(express.urlencoded({ extended: true })) // form data 처리

app.get('/', (req, res) => {
  res.send('hello api')
})

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello' },
    { id: 1, content: 'hello' },
    { id: 1, content: 'hello' }
  ])
})

app.use('/post', postRouter)
app.use('/user', userRouter)

app.listen(3065, () => {
  console.log('서버 실행 중')
})