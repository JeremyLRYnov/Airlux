import WebSocket from 'ws';
import fs from 'fs';

class SyncService {
  constructor() {
    this.ws = null;
    this.retryCount = 0;
    this.maxRetries = 30; // Maximum number of retries
    this.isConnected = false;
    this.connect();
    this.messageQueue = [];
    //this.logFilePath = 'sync_log.json';
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

    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      this.ws.send(JSON.stringify(message));
      console.log('Send 2');
      console.log('Message de la file d"attente envoyé');
    }

    // if (fs.existsSync(this.logFilePath)) {
    //   // Lire et envoyer les données du fichier journal
    //   this.sendLogData();
    // }
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
      this.messageQueue.push(sendData);
      //this.logMessage(sendData);
      console.error('Dans le fichier log');
      console.error('Connexion WebSocket non disponible');

    }
  }

  
// logMessage(message) {
//   fs.appendFile(this.logFilePath, JSON.stringify(message) + '\n', (err) => {
//     if (err) {
//       console.error('Erreur lors de l"enregistrement dans le fichier log :', err);
//     }
//   });
// }

//   // Lire et envoyer les données du fichier journal
//   sendLogData() {
//     fs.readFile(this.logFilePath, 'utf8', (err, data) => {
//       if (err) {
//         console.error('Erreur lors de la lecture du fichier journal :', err);
//         return;
//       }
//       const lines = data.trim().split('\n');
//       lines.forEach((line) => {
//         try {
//           const message = JSON.parse(line);
//           this.ws.send(JSON.stringify(message));
//           console.log('Message du fichier log envoyé');
//         } catch (parseError) {
//           console.error('Erreur lors de l"analyse du message JSON du fichier log :', parseError);
//         }
//       });
      
//       // Une fois que toutes les données du fichier journal ont été envoyées, supprimez le fichier
//       fs.unlink(this.logFilePath, (err) => {
//         if (err) {
//           console.error('Erreur lors de la suppression du fichier log :', err);
//         } else {
//           console.log('Fichier log supprimé avec succès.');
//         }
//       });
//     });
//   }


}


export const syncService = new SyncService();
