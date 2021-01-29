const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
var http = require('http').Server(app);

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const port = 9000

const messageEmit = (msg, sec) => {
  setTimeout(() => {
    io.emit('message', `WebSocketからの通知をもらいました。${msg}`)
  }, sec)
}
// API
app.get('/', (req, res) => {
  res.send({
    message: `REST API Hello ${req.query.message}!`
  })
  // WebSocketのイベント設定
  messageEmit('1回目の通知、あと2回通知を受信します', 3000)
  messageEmit('2回目の通知、あと1回通知を受信します', 6000)
  messageEmit('3回目の通知、サーバからの通知を終了します', 9000)
})

// WebSokcetコネクションイベント
io.on('connection', (socket) => {
  console.log('connected');
  // 通信イベント　sendを登録
  socket.on('send', (msg) => {
    console.log('message: ' + msg);
    io.emit('send', `WebSocket SEND_____ ${msg}`)
  });
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
