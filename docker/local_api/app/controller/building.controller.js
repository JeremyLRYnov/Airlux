import { buildingRepository } from '../models/building.models.js'

import { roomRepository } from '../models/room.models.js'
import { sensorRepository } from '../models/sensor.models.js'
import { switchRepository } from '../models/switch.models.js'

import { syncService } from '../WebSocket/ServeurWebSocket.js';

export const createBuilding = async (req, res) => {
  const { name, createdBy, users } = req.body
  const existingBuilding = await buildingRepository.search().where('name').is.equalTo(name).return.first()
  // check if building already registered with the name
  if (existingBuilding) {
    return res.status(400).json({ message: 'Un building est déjà enregistré sous ce nom.' })
  }
  const building = await buildingRepository.createAndSave({ name: `${name}`, createdBy, users })
  const { entityId, ...rest } = building.toJSON()
  const data = { id: building.entityId, ...rest }
  res.status(200).json({ result: data })

  //Data to send in the socket
  const dataToSend = {
    id: building.entityId,
    name: name,
    createdBy: createdBy,
    users: users
  };

  syncService.syncData(dataToSend, 'building', 'create');
}

export const getBuildings = async (req, res) => {
  const buildings = await buildingRepository.search().return.all()
  res.status(200).json({ result: buildings })
}

export const getBuilding = async (req, res) => {
  const { id } = req.params
  const building = await buildingRepository.fetch(id)
  res.status(200).json({ result: building })
}

export const getBuildingsByUserId = async (req, res) => {
  const { userId } = req.params
  const building = await buildingRepository.search().where('createdBy').is.equalTo(userId).return.all()
  if (!building) {
    return res.status(400).json({ message: 'Aucun building trouvé.' })
  }
  res.status(200).json({ result: building })
}

export const getBuildingsByUserEmail = async (req, res) => {
  const { email } = req.params
  const building = await buildingRepository.search().where('users').contain(email).return.all()
  if (!building) {
    return res.status(400).json({ message: 'Aucun building trouvé.' })
  }
  res.status(200).json({ result: building })
}

export const getBuildingsByUser = async (req, res) => {
  const { userId, email } = req.body
  const buildingUserId = await buildingRepository.search().where('createdBy').is.equalTo(userId).return.all()
  const buildingUserEmail = await buildingRepository.search().where('users').contain(email).return.all()
  if (!buildingUserId && !buildingUserEmail) {
    return res.status(400).json({ message: 'Aucun building trouvé.' })
  }
  res.status(200).json({ buildingByCreatedBy: buildingUserId, buildingByUserEmail: buildingUserEmail })
}

export const updateBuilding = async (req, res) => {
  const { id } = req.params
  const building = await buildingRepository.fetch(id)

  building.name = req.body.name ?? null
  building.createdBy = req.body.createdBy ?? null
  building.users = req.body.users ?? null

  await buildingRepository.save(building)

  res.status(200).json({ result: building })

  const dataToSend = {
    id: id,
    name: building.name,
    createdBy: building.createdBy,
    users: building.users
  };

  syncService.syncData(dataToSend, 'building', 'update');
}

export const deleteBuilding = async (req, res) => {
  const { id } = req.params;

  try {
    const roomsInBuilding = await roomRepository.search().where('buildingId').is.equalTo(id).return.all();

    for (const room of roomsInBuilding) {
      const roomId = room.entityId;

      const sensorsInRoom = await sensorRepository.search().where('roomId').is.equalTo(roomId).return.all();

      for (const sensor of sensorsInRoom) {
        await sensorRepository.remove(sensor.entityId);
      }

      const switchesInRoom = await switchRepository.search().where('roomId').is.equalTo(roomId).return.all();

      for (const _switch of switchesInRoom) {
        await switchRepository.remove(_switch.entityId);
      }

      await roomRepository.remove(roomId);
    }

    await buildingRepository.remove(id);
    res.status(200).json({ message: 'Building ' + id + ' Supprimé avec succès.' });

    syncService.syncData({id: id}, 'building', 'delete');
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du building.' });
  }
}


// Path: docker/local_api/app/controller/building.controller.js
