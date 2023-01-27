FROM node:14

WORKDIR /distant_api
COPY package.json .
RUN npm install express
RUN npm install body-parser
RUN npm install mysql2
RUN npm install cors
COPY . .

RUN apt-get update && apt-get install -y python3-pip
RUN pip3 install pymysql
COPY script.py .

# Exécuter le script lorsque le conteneur démarre
CMD ["python3", "script.py"]
