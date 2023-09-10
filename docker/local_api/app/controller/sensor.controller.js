import { sensorRepository } from '../models/sensor.models.js'

export const createSensor = async (req, res) => {
  const { name, roomId } = req.body
  const existingSensor = await sensorRepository.search().where('name').is.equalTo(name).return.first()
  // check if sensor already registered with the name
  if (existingSensor) {
    return res.status(400).json({ message: 'A sensor already registered with the name.' })
  }
  const sensor = await sensorRepository.createAndSave({ name: `${name}`, roomId })
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

  await sensorRepository.save(sensor)

  res.status(200).json({ result: sensor })
}

export const deleteSensor = async (req, res) => {
  const { id } = req.params
  await sensorRepository.remove(id)
  res.status(200).json({ message: 'Sensor ' + id + ' deleted successfully.' })
}

// Path: docker/local_api/app/controller/sensor.controller.js