import WebSocket from 'ws';

class SyncService {
  constructor() {
    this.ws = new WebSocket('ws://appmysql:8082/');
    console.log('Début websocket');
    this.ws.on('open', () => console.log('Connexion WebSocket établie avec succès.'));
    this.ws.on('error', error => console.error('Erreur de connexion WebSocket :', error));
  }

  //Envoit des données avec la WebSocket
  syncData(data, entityType, action) {
    //Informations sur la donnée à envoyer : type(ex: user, sensor,...), action(ex: create, delete, ...) et data(req.body)
    const sendData = {
      type: entityType,
      action: action,
      data: data,
    };
    console.log("Web Socket ouverte");
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(sendData));
      console.log('Message envoyé');
    } else {
      console.error('Connexion WebSocket non disponible');
    }
  }
}

export const syncService = new SyncService();
