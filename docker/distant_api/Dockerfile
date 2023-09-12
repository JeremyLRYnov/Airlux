FROM node:14

WORKDIR /distant_api
COPY package.json .
RUN npm install
RUN npm install uuid
COPY . .

CMD node server.js
