import mqtt from 'mqtt';

const mqttClient = mqtt.connect('mqtt://mqtt:1883');

mqttClient.on('connect', () => {
  console.log('Connecté au serveur MQTT avec succès');
  mqttClient.subscribe('temperature');
  mqttClient.subscribe('humidite');
  mqttClient.subscribe('lumiere');
});

// Gestionnaire d'événements pour les erreurs de connexion
mqttClient.on('error', (error) => {
  console.error('Erreur de connexion MQTT :', error);
});

// Gestionnaire d'événements pour la réception de messages sur les topics
mqttClient.on('message', (topic, message) => {
  console.log(`Message reçu sur le topic "${topic}": ${message.toString()}`);
});

export default mqttClient