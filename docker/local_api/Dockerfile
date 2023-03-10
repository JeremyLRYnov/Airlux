FROM node:latest

WORKDIR /local_api
COPY package.json .
RUN npm install dotenv express express-validator body-parser redis-om nodemon cors core-js@3.15.2 bcryptjs jsonwebtoken jest @babel/core @babel/cli @babel/preset-env supertest

COPY . .

CMD node --trace-warnings server.js
