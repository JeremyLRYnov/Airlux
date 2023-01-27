FROM node:14

WORKDIR /distant_api
COPY package.json .
RUN npm install express body-parser ioredis nodemon cors bluebird
COPY . .

CMD node server.js