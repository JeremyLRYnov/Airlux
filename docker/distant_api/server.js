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


const wss = new WebSocket.Server({ port: 8081 });

console.log('Création serveur Websocket.');


wss.on('connection', (ws) => {
  console.log('Nouvelle connexion WebSocket établie.');

  ws.on('error', console.error);

  // Traitez le message ici et envoyez une réponse si nécessaire.
  ws.on('message', (mes) => {
    console.log(`Message reçu : ${mes}`);

  try {
    const data = JSON.parse(mes);
    console.log('Message reçu :', data);

  } 
  catch (error) {
    console.error('Erreur lors de l"analyse du message JSON :', error);
}

  ws.on('close', () => {
    console.log('Connexion WebSocket fermée.');
    clients.delete(ws);
    });
  });
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
