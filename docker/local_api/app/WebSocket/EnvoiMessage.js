import WebSocket from 'ws';
import { WebSocket } from './ServeurWebSocket';


const socket = new WebSocket('ws://localhost:8091'); // Remplacez l'URL par celle de votre serveur WebSocket.

// Événement déclenché lorsque la connexion WebSocket est ouverte.
socket.addEventListener('open', (event) => {
    console.log('Connexion WebSocket établie avec succès.');
    
    // Vous pouvez envoyer des messages après la connexion.
    socket.send('Bonjour, message de API B !');
  });
  
  // Événement déclenché lorsque vous recevez un message du serveur WebSocket.
  socket.addEventListener('message', (event) => {
    const message = event.data;
    console.log(`Message reçu du serveur WebSocket : ${message}`);
    
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
  