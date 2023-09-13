import { mqttClient } from "../config/mqtt.js";
import { updateSensorValue } from '../controller/sensor.controller.js'; // Importez le contrôleur pour mettre à jour un capteur
import { updateSwitchBoolean } from '../controller/switch.controller.js'; // Importez le contrôleur pour mettre à jour un commutateur

mqttClient.on('message', (topic, message) => {
    const donnees = JSON.parse(message.toString());
  
    if (!donnees.id || !donnees.name) {
      console.error('Données MQTT incomplètes :', donnees);
      return;
    }
  
    // En fonction du topic, appelez la fonction appropriée
    switch (topic) {
      case 'temperature':
      case 'humidite':
        // Pour les topics "temperature" et "humidite", appelez la fonction updateSensorValue
        updateSensorValue(donnees.id, donnees.value);
        break;
      case 'lumiere':
        // Pour le topic "lumiere", appelez la fonction updateSwitchBoolean
        updateSwitchBoolean(donnees.id, donnees.status);
        break;
      default:
        console.error('Topic MQTT non pris en charge :', topic);
    }
  });