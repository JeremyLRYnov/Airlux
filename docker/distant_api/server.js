const express = require("express");
const cors = require("cors");
const WebSocket = require('ws')


const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});



require("./app/routes/sensor.routes")(app);
require("./app/routes/building.routes")(app);
require("./app/routes/buildingUser.routes")(app);
require("./app/routes/room.routes")(app);
require("./app/routes/switch.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const { createTables } = require('./app/models/db');
setTimeout(() => {
  createTables();
}, 30000); 


const userController = require("./app/controllers/user.controller");

const wss = new WebSocket.Server({ port: 8081 });

console.log('Création serveur Websocket.');

wss.on('connection', (ws) => {
  console.log('Nouvelle connexion WebSocket établie.');

  ws.on('message', async message => {
    try {
      const data = JSON.parse(message);
      console.log('Message reçu :', data);

      // Envois du message au bon contrôleur en fonction du type de de données (user, building, sensor, room, switch)
      if (data.type === 'user') {
        await userController.handleWebSocketMessage(data);
        console.log("message envoyé au controller user");
      } else if (data.type == 'sensor') {
        console.log("message envoyé au controller sensor");
      }

    } catch (error) {
      console.error('Erreur lors de l"analyse du message JSON :', error);
    }
  });

  ws.on('close', () => {
    console.log('Connexion WebSocket fermée.');
  });
});