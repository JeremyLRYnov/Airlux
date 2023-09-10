FROM node:14

WORKDIR /distant_api
COPY package.json .
RUN npm install cors bcryptjs jsonwebtoken mysql2 body-parser express
COPY . .

CMD node server.js
