import { mqttClient } from "../config/mqtt.js";
import { client } from "../config/client.js";

mqttClient.on('message', (topic, message) => {
    const donnees = JSON.parse(message.toString());

    if (!donnees.id || !donnees.name) {
        console.error('Données MQTT incomplètes :', donnees);
        return;
    }

    if (donnees.type === 'sensor') {
        const key = `donnees_capteur:${donnees.id}`;

        // Ajoutez les données du capteur à Redis dans le hash
        client.hmset(key, {
            name: donnees.name,
            value: donnees.value,
            unit: donnees.unit,
        }, (err) => {
            if (err) {
                console.error(`Erreur lors de l'ajout des données du capteur ${donnees.id} à Redis :`, err);
            } else {
                console.log(`Données du capteur ${donnees.id} ajoutées à Redis avec succès`);
            }
        });
    } else if (donnees.type === 'switch') {
        const key = `donnees_switch:${donnees.id}`;

        // Ajoutez les données du switch à Redis dans le hash
        client.hmset(key, {
            name: donnees.name,
            status: donnees.status,
        }, (err) => {
            if (err) {
                console.error(`Erreur lors de l'ajout des données du switch ${donnees.id} à Redis :`, err);
            } else {
                console.log(`Données du switch ${donnees.id} ajoutées à Redis avec succès`);
            }
        });
    } else {
        console.error('Type de dispositif non pris en charge :', donnees.type);
    }
});