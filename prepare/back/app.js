const express = require('express')
const postRouter = require('./routes/post')
const db = require('./models')
const app = express()

db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공')
  })
  .catch((err) => {
    console.error(err)
  })

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

app.listen(3065, () => {
  console.log('서버 실행 중')
})