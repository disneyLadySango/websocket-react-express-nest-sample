# 環境構築

`yarn or npm install`<br />

# 実行方法

`yarn start or npm run start`<br />
サーバ側も立ち上げてください！<br />

# コードの見方

ちょっと汚いですが、基本はこちらの構造をベースにしています
https://note.com/gota_disney/n/ne5f998f360c4

## container

各ページのディレクトリを用意しています<br>

- http://localhost:3000 TopPage
- http://localhost:3000/simple SimpleSocketPage
- http://localhost:3000/room/list RoomListPage
- http://localhost:3000/room/:uid RoomPage

### TopPage

何の変哲もない TopPage です<br>

### SimpleSocketPage

REST API + WebSocket の簡易的な実装のページです<br>
（使い方はページを見ていただけると）<br>

### RoomListPage

REST API を利用して以下のことができます<br>

- 現在存在するチャットルームの一覧を表示
- 新規にチャットルームを作成する

### RoomPage

WebSocket を利用して以下のことができます<br />
なお、同一ユーザ名の入室を許可していないので、入室できない場合は名前を変更してください。（エラー処理実装前）<br>
リロードすると退出処理が実行されません（白目、未実装）<br>

- 入室
- 別のユーザ入室
- メッセージの送受信
- 退出

## component

各コンポーネントになります

## hooks

共通のカスタムフック

### useWebSocket

URL を受け取りコネクション接続、エラー時のコネクション再接続、コネクション切断を実行します<br>
上記のパターンで追加で実行したい処理があれば引数でイベントを受け取れるので渡してください。<br>
通常ディスコネクトは useEffect で実行していますが、実行したくない（コネクションを保持したい、固有の処理後切断したいなど）場合は、引数に boolean を受け取るので渡してください<br>

## types

型定義です

## utils

その他便利関数です

### Logger

コンストラクタにはファイル名などのコンテキスト情報を渡してください。<br>
内部の値を変えることで出力レベルを変更できます（本当は env でやるのが良い）<br>

# socket.io 使い方

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

// コネクションの状態確認
socket.connect
socket.disconnect

// コネクションのIDを確認
socket.id
```

## 通信イベント名について

通信イベント名についてはサーバ側と調整が必要になります<br />
また、WebSocket 固有のイベント名があるのでこちらは使用できません<br />

`connect: コネクションが接続された時に発火する`<br />
`disconnect: コネクションが切断された時に発火する`<br />
`connect_error: コネクション接続しようとした際、してる際にエラーが出たら発火する`<br />
``

# その他
