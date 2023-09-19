const WebSocket = require('ws');

const userController = require("../controllers/user.controller");
const buildingController = require("../controllers/building.controller");
const buildingUsersController = require("../controllers/buildingUser.controller");
const roomController = require("../controllers/room.controller");
const sensorController = require("../controllers/sensor.controller");
const switchController = require("../controllers/switch.controller");

class WebSocketService {
    constructor() {
        this.wss = new WebSocket.Server({ port: 8081 });
        this.ws = null;  
        this.wss.on('connection', (ws) => {
            console.log("Connexion WebSocket établie avec succès");

            this.ws = ws;  

            ws.on('message', async message => {
                console.log(message);
                this.handleMessage(message);
            });

            ws.on('close', () => {
                console.log('Connexion WebSocket fermée.');
                this.ws = null;  
            });
        });
    }
  
    async handleMessage(message) {
        try {
          const data = JSON.parse(message);
          if(data.origin === 'distant') {
            return;
          }
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
          console.error('Erreur lors de l\'analyse du message JSON :', error);
        }
      }
  
      syncDataToRedis(data, entityType, action) {
        const sendData = {
            origin: 'distant',
            type: entityType,
            action: action,
            data: data,
        };

        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(sendData));
            console.log('Message envoyé');
        } else {
            console.error('Connexion WebSocket non disponible');
        }
    }
}
 
const webSocketServiceInstance = new WebSocketService();
module.exports = webSocketServiceInstance;