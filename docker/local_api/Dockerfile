FROM node:14

WORKDIR /distant_api
COPY package.json .
RUN npm install express body-parser redis nodemon cors
COPY . .

CMD node server.js