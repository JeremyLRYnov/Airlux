<<<<<<< HEAD
FROM node:14

WORKDIR /distant_api
COPY package.json .
RUN npm install express
RUN npm install body-parser
RUN npm install mysql2
RUN npm install cors
COPY . .

RUN apt-get update || : && apt-get install python3 -y

# Exécuter le script lorsque le conteneur démarre
CMD ["python3"]

=======
FROM node:14

WORKDIR /distant_api
COPY package.json .
RUN npm install express
RUN npm install body-parser
RUN npm install mysql2
RUN npm install cors
COPY . .

CMD node server.js
>>>>>>> 32c0ff72ca61ad0d72869e0efd0f2a492c78d536
