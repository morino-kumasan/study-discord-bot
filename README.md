# 作成ガイド

https://discordjs.guide/#before-you-begin

# Bot招待リンク

```
https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&permissions=2048&scope=applications.commands%20bot
```

# 設定ファイル

secrets.env

```
TOKEN=トークン
CLIENT_ID=クライアントID
GUILD_ID=ギルドID
```

# ビルド

```
docker-compose build
```

# コマンド定義のデプロイ

コマンドの定義が変わったら実行必要

```
docker-compose run --rm deploy
```

# 実行

```
docker-compose run --rm bot
```
