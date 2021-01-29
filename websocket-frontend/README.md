# 環境構築
`yarn or npm install`<br />

# 実行方法
`yarn start or npm run start`<br />
サーバ側も立ち上げてください！<br />

## コードの見方
急ぎ作ったので汚いです（土下座）<br />
`SimpleSocketPage`を見ていただけると大体ここに詰まってます<br />
（チャット形式も作ろうと思ったんですが時間がなく）<br />
`hooks.ts`にWebSocketの処理を入れているのでこちらを見ていただければ大丈夫かと思います！<br />

## socket.io使い方
ライブラリ：socket.io-client<br />
```
// インスタンスの生成
import { io } from "socket.io-client"
const socket = io('リクエスト先のURL')

// 受信用のイベントリスナーを登録する
socket.on('通信イベント名', (args) => {
  // 引数にはサーバ側から送られてきた値が渡ってくる
  // 何か処理させる
})

// クライアント側からWebSocketのコネクションを使って値を送る
socket.emit('通信イベント名', 値)

// コネクションを切断する
socket.disconnect()

// コネクションを手動で接続する
socket.connect()
```

### 通信イベント名について
通信イベント名についてはサーバ側と調整が必要になります<br />
また、Socket.io固有のイベント名があるのでこちらは使用できません<br />

`connect: コネクションが接続された時に発火する`<br />
`disconnect: コネクションが切断された時に発火する`<br />
`connect_error: コネクション接続しようとした際、してる際にエラーが出たら発火する`<br />
``

## その他
カスタムフックでSocket関連の処理は切り出すのが良いかと思います。<br />
また、useRefを使ってインスタンスを保持しておくのがベターかなと思います！<br />
useEffectで初回実行時にコネクションを張っています<br />
returnでアンマウント時の処理を実行しています、ここでコネクション切断は必要そうです！<br />
