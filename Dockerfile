FROM node:lts-alpine

WORKDIR /discord-bot
COPY ./*.json /discord-bot/
COPY ./src/ /discord-bot/
RUN npm install

CMD ["node", "index.js"]
