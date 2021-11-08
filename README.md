# Bot招待リンク

```
https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=bot+applications.commands
```

# 設定ファイル

src/config.json

```
{
    "token": "トークンをコピー",
    "prefix": "!bt"
}
```

# 実行

```
docker-compose run --rm node npm install
docker-compose run --rm node node index.js
```
