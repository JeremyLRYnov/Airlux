import { sensorRepository } from '../models/sensor.models.js'

export const createSensor = async (req, res) => {
  const { name, roomId, value, unit } = req.body
  const existingSensor = await sensorRepository.search().where('name').is.equalTo(name).return.first()
  // check if sensor already registered with the name
  if (existingSensor) {
    return res.status(400).json({ message: 'Un sensor est déjà enregistré sous ce nom.' })
  }
  const sensor = await sensorRepository.createAndSave({ name: `${name}`, roomId, value, unit })
  const { entityId, ...rest } = sensor.toJSON()
  const data = { id: sensor.entityId, ...rest }
  res.status(200).json({ result: data })
}

export const getSensors = async (req, res) => {
  const sensors = await sensorRepository.search().return.all()
  res.status(200).json({ result: sensors })
}

export const getSensor = async (req, res) => {
  const { id } = req.params
  const sensor = await sensorRepository.fetch(id)
  res.status(200).json({ result: sensor })
}

export const updateSensor = async (req, res) => {
  const { id } = req.params
  const sensor = await sensorRepository.fetch(id)

  sensor.name = req.body.name ?? null
  sensor.roomId = req.body.roomId ?? null
  sensor.value = req.body.value ?? null
  sensor.unit = req.body.unit ?? null

  await sensorRepository.save(sensor)

  res.status(200).json({ result: sensor })
}

export const updateSensorValue = async (sensorId, newValue) => {
  try {
    // Récupérez le sensor à partir de la base de données en utilisant son ID
    const sensor = await sensorRepository.search().where('sensorId').is.equalTo(sensorId).return.first();

    // Mettez à jour la valeur du sensor
    sensor.value = newValue;

    // Enregistrez les modifications dans Redis
    await sensorRepository.save(sensor);

    console.log(`Sensor ${sensorId} mis à jour avec succès avec la nouvelle valeur ${newValue}`);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du sensor ${sensorId} :`, error);
  }
};

export const deleteSensor = async (req, res) => {
  const { id } = req.params
  await sensorRepository.remove(id)
  res.status(200).json({ message: 'Sensor ' + id + ' Supprimé avec succès.' })
}

// Path: docker/local_api/app/controller/sensor.controller.js
