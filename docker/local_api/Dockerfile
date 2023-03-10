FROM node:latest

WORKDIR /local_api
COPY package.json .
RUN npm install dotenv express express-validator body-parser redis-om nodemon cors bcryptjs jsonwebtoken
RUN npm install --save-dev jest axios
COPY . .

CMD node --trace-warnings server.js
