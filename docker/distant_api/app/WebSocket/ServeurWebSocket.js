import { WebSocketServer } from 'ws';

console.log('Début Websocket.');

const wss = new WebSocketServer({ port: 8080 });

console.log('Création serveur Websocket.');

ws.on('error', console.error);

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

module.exports = WebSocket;