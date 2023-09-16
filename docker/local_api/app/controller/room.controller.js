import { roomRepository } from '../models/room.models.js'
import { syncService } from '../WebSocket/ServeurWebSocket.js';

import { sensorRepository } from '../models/sensor.models.js'
import { switchRepository } from '../models/switch.models.js'

export const createRoom = async (req, res) => {
  const { name, buildingId } = req.body
  // const existingRoom = await roomRepository.search().where('name').is.equalTo(name).return.first()
  // // check if room already registered with the name
  // if (existingRoom) {
  //   return res.status(400).json({ message: 'Une room est déjà enregistrée sous ce nom.' })
  // }
  const room = await roomRepository.createAndSave({ name: `${name}`, buildingId })
  const { entityId, ...rest } = room.toJSON()
  const data = { id: room.entityId, ...rest }
  res.status(200).json({ result: data })

  const dataToSend = {
    id: room.entityId,
    name: name,
    buildingId: buildingId
  };

  syncService.syncData(dataToSend, 'room', 'create');
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

  const dataToSend = {
    id: id,
    name: room.name,
    buildingId: room.buildingId
  };

  syncService.syncData(dataToSend, 'room', 'update');
}

export const deleteRoom = async (req, res) => {
  const { id } = req.params

  try {
    const sensorsInRoom = await sensorRepository.search().where('roomId').is.equalTo(id).return.all();

    for (const sensor of sensorsInRoom) {
      await sensorRepository.remove(sensor.entityId);
    }

    const switchesInRoom = await switchRepository.search().where('roomId').is.equalTo(id).return.all();

    for (const _switch of switchesInRoom) {
      await switchRepository.remove(_switch.entityId);
    }

    await roomRepository.remove(id)
    res.status(200).json({ message: 'Room ' + id + ' Supprimée avec succès.' })
    
    syncService.syncData({id: id}, 'room', 'delete');
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la room.' });
  }
}

export const getRoomsByBuildingId = async (req, res) => {
  const { id } = req.params
  const rooms = await roomRepository.search().where('buildingId').is.equalTo(id).return.all()
  if (!rooms) {
    return res.status(400).json({ message: 'Aucune room trouvée.' })
  }
  res.status(200).json({ result: rooms })

}

// Path: docker/local_api/app/controller/room.controller.js
