import { switchRepository } from '../models/switch.models.js'

export const createSwitch = async (req, res) => {
  const { name, roomId, status } = req.body
  const existingSwitch = await switchRepository.search().where('name').is.equalTo(name).return.first()
  // check if switch already registered with the name
  if (existingSwitch) {
    return res.status(400).json({ message: 'Un switch est déjà enregistré sous ce nom.' })
  }
  const switchSensor = await switchRepository.createAndSave({ name: `${name}`, roomId, status })
  const { entityId, ...rest } = switchSensor.toJSON()
  const data = { id: switchSensor.entityId, ...rest }
  res.status(200).json({ result: data })
}

export const getSwitches = async (req, res) => {
  const switches = await switchRepository.search().return.all()
  res.status(200).json({ result: switches })
}

export const getSwitch = async (req, res) => {
  const { id } = req.params
  const switchSensor = await switchRepository.fetch(id)
  res.status(200).json({ result: switchSensor })
}

export const updateSwitch = async (req, res) => {
  const { id } = req.params
  const switchSensor = await switchRepository.fetch(id)

  switchSensor.name = req.body.name ?? null
  switchSensor.roomId = req.body.roomId ?? null
  switchSensor.status = req.body.status ?? null

  await switchRepository.save(switchSensor)

  res.status(200).json({ result: switchSensor })

}

export const deleteSwitch = async (req, res) => {
  const { id } = req.params
  await switchRepository.remove(id)
  res.status(200).json({ message: 'Switch ' + id + ' Supprimé avec succès.' })
}

// Path: docker/local_api/app/controller/switch.controller.js
