const http = require('http')
const server = http.createServer((req, res) => {
  console.log(req.url, req.method)
  res.write('<h1>Hello Node1</h1>')
  res.write('Hello Node2')
  res.write('Hello Node3')
  res.write('Hello Node4')
  res.write('Hello Node5')
  res.write('Hello Node6')
  res.end('Hello Node7')
})

server.listen(3065, () => {
  console.log('서버 실행 중')
})