import WebSocket from 'ws';
import { WebSocket } from './ServeurWebSocket/Se';


const socket = new WebSocket('ws://localhost:8080'); // Remplacez l'URL par celle de votre serveur WebSocket.

// Événement déclenché lorsque la connexion WebSocket est ouverte.
socket.addEventListener('open', (connection) => {
    console.log('Connexion WebSocket établie avec succès.');

  });
  
  // Événement déclenché lorsque vous recevez un message du serveur WebSocket.
  socket.addEventListener('message', (message) => {
    const mes = message.data;
    console.log(`Message reçu de API local : ${mes}`);
    
    // Traitez le message reçu ici si nécessaire.
  });
  
  // Événement déclenché lorsque la connexion WebSocket est fermée.
  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('Connexion WebSocket fermée proprement.');
    } else {
      console.error('Connexion WebSocket fermée de manière inattendue.');
    }
    console.log(`Code de fermeture : ${event.code}, Raison : ${event.reason}`);
  });
  