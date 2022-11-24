FROM node:14

WORKDIR /distant_api
COPY package.json .
RUN npm install
COPY . .
CMD npm start
