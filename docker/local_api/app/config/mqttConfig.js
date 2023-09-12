import mqtt from 'mqtt';

const mqttClient = mqtt.connect('mqtt://votre_broker_mqtt');

mqttClient.on('connect', () => {
  mqttClient.subscribe('topic_des_capteurs');
});

export default mqttClient;