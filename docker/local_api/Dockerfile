FROM node:14

WORKDIR /distant_api
COPY package.json .
RUN npm install express
RUN npm install body-parser
RUN npm install ioredis
RUN npm install cors
COPY . .
