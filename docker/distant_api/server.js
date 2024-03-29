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
const buildingController = require("./app/controllers/building.controller");
const buildingUsersController = require("./app/controllers/buildingUser.controller");
const roomController = require("./app/controllers/room.controller");
const sensorController = require("./app/controllers/sensor.controller");
const switchController = require("./app/controllers/switch.controller");

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
  console.log("Connexion WebSocket établie avec succès")
  ws.on('message', async message => {
    try {
      const data = JSON.parse(message);
      console.log('Message reçu :', data);
  
      switch(data.type) {
        case 'user':
          await userController.handleWebSocketMessage(data);
          break;
  
        case 'building':
          await buildingController.handleWebSocketMessageBuilding(data);
          await buildingUsersController.handleWebSocketMessageBuildingUsers(data);
          break;
  
        case 'room':
          await roomController.handleWebSocketMessage(data);
          break;
  
        case 'sensor':
          await sensorController.handleWebSocketMessage(data);
          break;
  
        case 'switch':
          await switchController.handleWebSocketMessage(data);
          break;
  
        default:
          console.warn('Type de message non reconnu:', data.type);
      }
    } catch (error) {
      console.error('Erreur lors de l"analyse du message JSON :', error);
    }
  }); 
  
  ws.on('close', () => {
    console.log('Connexion WebSocket fermée.');
  });
  
});