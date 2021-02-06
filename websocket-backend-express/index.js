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

const PORT = 9000

// SimpleSocket
const simpleIo = io.of('/simple')
const messageEmit = (msg, sec) => {
  setTimeout(() => {
    simpleIo.emit('message', `WebSocketからの通知をもらいました。${msg}`)
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
simpleIo.on('connection', (socket) => {
  console.log('simple________connected');
  // 通信イベント　sendを登録
  socket.on('send', (msg) => {
    console.log('simple________message: ' + msg);
    simpleIo.emit('send', `WebSocket SEND_____ ${msg}`)
  });
});

// /chat
const membarToken = []
// { sessionToken: string, name: string }
const chatSocket = io.of('/chat')

chatSocket.on('connection', (socket) => {
  console.log()
})

http.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})