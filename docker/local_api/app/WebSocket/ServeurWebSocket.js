import { WebSocket } from 'ws';

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
      this.ws.removeEventListener('message', this.onMessage.bind(this));
      this.ws.removeEventListener('error', this.onError.bind(this));
      this.ws.removeEventListener('close', this.onClose.bind(this));
    }

    this.ws = new WebSocket('ws://appmysql:8081/');

    this.ws.addEventListener('open', this.onOpen.bind(this));
    this.ws.addEventListener('message', this.onMessage.bind(this));
    this.ws.addEventListener('error', this.onError.bind(this));
    this.ws.addEventListener('close', this.onClose.bind(this));
  }

  onOpen() {
    this.isConnected = true; 
    this.retryCount = 0; 
    console.log("Connexion WebSocket établie avec succès.");
    setTimeout(() => this.checkConnection(), 60000);
  }

  onMessage(event) {
    try {
      const data = JSON.parse(event.data);
      if(data.origin === 'local') {
        return;
      }
      console.log('Message reçu :', data);
    } catch (error) {
      console.error('Erreur lors de l"analyse du message JSON :', error);
    }
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
      setTimeout(() => this.checkConnection(), 60000);
    }
  }

  syncData(data, entityType, action) {
    const sendData = {
      origin: 'local',
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

export const syncService = new SyncService();
