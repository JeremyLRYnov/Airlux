import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8091 });

wss.on('connection', (ws) => {
  console.log('Nouvelle connexion WebSocket établie.');

  ws.on('message', (message) => {
    console.log(`Message reçu : ${message}`);
    // Traitez le message ici et envoyez une réponse si nécessaire.
  });

  ws.on('close', () => {
    console.log('Connexion WebSocket fermée.');
  });
});


export { WebSocket };