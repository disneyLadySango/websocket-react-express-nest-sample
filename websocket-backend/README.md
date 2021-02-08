# 環境設定

```
  yarn
  or
  npm install
```

# サーバサイド実行方法

```
  yarn start:dev　or yarn start
  or
  npm run start:dev or npm run start
```

# サーバサイドポート番号

9000

# コードの見方

こちらのプロジェクトでは DB を利用しません。<br>
そのため、コード内にインクリメント処理などがありますがその辺りはご容赦ください<br>

## フォルダ構成

### app

初回作成時に生成されたファイル群<br>
`app.module.ts`に import は集約している<br>

### domain

現在はモデルのみを持っている<br>
ドメインごとにフォルダを切っているがエンティティとなるモデルにはドメイン固有の処理が不要なので一旦ここに全てのファイルを持たせている<br>
DB があったらまた違う構成にすべきかと検討中<br>

### exception

例外クラス<br>
バリデーションの例外クラスが現在はあります<br>

### room

チャット（RoomListPage, RoomPage）に関連する処理をしています<br>
若干 DTO 適当です<br>
http://localhost:9000/room

- REST
  - GET 一覧取得
  - POST 部屋作成
  - PUT 退出（使っていない、編集に変更予定）
  - DELETE 部屋削除（予定）
- WebSocket
  - handler
    - join 入室
    - leave 退出
    - send メッセージ送信
  - emit
    - join 入室ユーザへのデータレスポンス
    - otherJoin 別ユーザ入室通知
    - send メッセージ送信通知
    - leave 退出によるデータ変更通知

### simple

SimpleSocketPage に関する処理しています<br>
http://localhost:9000/simple<br>

- REST
  - GET メッセージ送信
- WebSocket
  - handler
    - send メッセージ送信
    - leave 退出
    - send メッセージ送信
  - emit
    - send メッセージ送信（送信者のみ）通知
    - message API コール後にサーバからクライアントへ一斉メッセージ送信（３回実行）

### utils

便利関数群

## ファイル構成

### controller

REST API のコントローラー

### geteway

WebSocket の通信クラス

### model

データ、エンティティ（DB 使うなら entity）

### dto

リクエスト、レスポンスの形式

### module

モジュール（公式読んでください土下座）

### repository

今回はここに自前 DB 機能を持たせています

### service

なんか便利なクラス化しています

## その他

### app.adapters.ts

[github nest.js issue](https://github.com/nestjs/nest/issues/5676)<br>
上記から引用しています<br>
Nest.js の Socket.io は現在 v2.3 に依存しており、<br>
クライアント側の Socket.io3 系と通信できない問題があります<br>
そのため、issue と公式に従い Adapter の実装を付与しています<br>

<br>
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
