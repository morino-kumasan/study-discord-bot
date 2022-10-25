FROM node:lts-alpine

WORKDIR /discord-bot
COPY ./*.json /discord-bot/
COPY ./src/*.js /discord-bot/
RUN npm install

CMD ["node", "index.js"]
