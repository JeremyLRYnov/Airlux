import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Nouvelle connexion WebSocket établie.');

  // Traitez le message ici et envoyez une réponse si nécessaire.
  ws.on('message', (message) => {
    console.log(`Message reçu : ${message}`);

  try {
    const data = JSON.parse(message);
    console.log('Message reçu :', data);
  } 
  catch (error) {
    console.error('Erreur lors de l analyse du message JSON :', error);
}

  ws.on('close', () => {
    console.log('Connexion WebSocket fermée.');
    clients.delete(ws);
    });
  });
});


export { WebSocket };