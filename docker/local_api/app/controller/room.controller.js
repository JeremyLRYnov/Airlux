import { roomRepository } from '../models/room.models.js'

export const createRoom = async (req, res) => {
  const { name, buildingId } = req.body
  const existingRoom = await roomRepository.search().where('name').is.equalTo(name).return.first()
  // check if room already registered with the name
  if (existingRoom) {
    return res.status(400).json({ message: 'Une room est déjà enregistrée sous ce nom.' })
  }
  const room = await roomRepository.createAndSave({ name: `${name}`, buildingId })
  const { entityId, ...rest } = room.toJSON()
  const data = { id: room.entityId, ...rest }
  res.status(200).json({ result: data })
}

export const getRooms = async (req, res) => {
  const rooms = await roomRepository.search().return.all()
  res.status(200).json({ result: rooms })
}

export const getRoom = async (req, res) => {
  const { id } = req.params
  const room = await roomRepository.fetch(id)
  res.status(200).json({ result: room })
}

export const updateRoom = async (req, res) => {
  const { id } = req.params
  const room = await roomRepository.fetch(id)

  room.name = req.body.name ?? null
  room.buildingId = req.body.buildingId ?? null

  await roomRepository.save(room)

  res.status(200).json({ result: room })
}

export const deleteRoom = async (req, res) => {
  const { id } = req.params
  await roomRepository.remove(id)
  res.status(200).json({ message: 'Room ' + id + ' Supprimée avec succès.' })
}

// Path: docker/local_api/app/controller/room.controller.js
