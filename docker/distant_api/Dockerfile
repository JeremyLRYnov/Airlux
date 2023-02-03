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
