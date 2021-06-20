const express = require('express')
const postRouter = require('./routes/post')

const app = express()

router.get('/', (req, res) => {
  res.send('hello api')
})

router.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello' },
    { id: 1, content: 'hello' },
    { id: 1, content: 'hello' }
  ])
})

app.use('/post', postRouter)

router.listen(3065, () => {
  console.log('서버 실행 중')
})