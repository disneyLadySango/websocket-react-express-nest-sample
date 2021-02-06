# 環境構築

単体でのソケット通信サンプルのみを利用する場合は、<br>

- websocket-backend & websocket-frontend
- websocket-backend-express & websocket-frontend

のどちらでもプロジェクトを起動できます。<br>
<br>
チャットルームを利用する場合は

- websocket-backend & websocket-frontend

を起動してください

# リポジトリについて

- websocket-backend は、Nest.js を利用し REST API と WebSocket での通信を行っています

- websocket-backend-express は、express を利用し REST API と WebSocket での通信を行っています

- websocket-frontend は、React を利用し、上記のプログラムを基にデータを表示します
