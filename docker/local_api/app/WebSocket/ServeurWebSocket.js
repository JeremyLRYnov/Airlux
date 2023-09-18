import WebSocket from 'ws';

class SyncService {
  constructor() {
    this.ws = null;
    this.retryCount = 0;
    this.maxRetries = 30; // Maximum number of retries
    this.isConnected = false; 
    this.connect();
  }

  connect() {
    if (this.retryCount >= this.maxRetries || this.isConnected) {
      return;
    }

    if (this.ws) {
      this.ws.removeEventListener('open', this.onOpen.bind(this));
      this.ws.removeEventListener('error', this.onError.bind(this));
      this.ws.removeEventListener('close', this.onClose.bind(this));
    }

    this.ws = new WebSocket('ws://appmysql:8081/');

    this.ws.addEventListener('open', this.onOpen.bind(this));
    this.ws.addEventListener('error', this.onError.bind(this));
    this.ws.addEventListener('close', this.onClose.bind(this));
  }

  onOpen() {
    this.isConnected = true; // Indicateur lorsque la connexion est établie
    this.retryCount = 0; 
    console.log("Connexion WebSocket établie avec succès.");
    setTimeout(() => this.checkConnection(), 60000);
  }

  onError() {
    this.isConnected = false; 
    this.retryCount += 1;
    console.log("Échec de la connexion WebSocket")
    setTimeout(() => this.connect(), 5000 * this.retryCount); 
  }

  onClose() {
    this.isConnected = false; 
    this.retryCount += 1;
    setTimeout(() => this.connect(), 5000 * this.retryCount); 
  }

  checkConnection() {
    if (this.ws.readyState !== WebSocket.OPEN) {
      this.isConnected = false; 
      this.retryCount += 1;
      console.log("Tentative de connexion...")
      this.connect();
    } else {
      // Prochaine vérification de la connexion
      setTimeout(() => this.checkConnection(), 60000);
    }
  }

  //Envoit des données avec la WebSocket
  syncData(data, entityType, action) {
    //Informations sur la donnée à envoyer : type(ex: user, sensor,...), action(ex: create, delete, ...) et data(req.body)
    const sendData = {
      type: entityType,
      action: action,
      data: data,
    };
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(sendData));
      console.log('Message envoyé');
    } else {
      console.error('Connexion WebSocket non disponible');
    }
  }
}

const wss = new WebSocket.Server({ port: 8081 });  

wss.on('connection', (ws) => {
  console.log("Connexion WebSocket établie avec succès")
  ws.on('message', async message => {
    try {
      const data = JSON.parse(message);
      console.log('Message reçu :', data);
    } catch (error) {
      console.error('Erreur lors de l"analyse du message JSON :', error);
    }
  });
  
  ws.on('close', () => {
    console.log('Connexion WebSocket fermée.');
  });
});

export const syncService = new SyncService();
