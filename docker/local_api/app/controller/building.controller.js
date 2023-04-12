import { buildingRepository } from '../models/building.models.js'

export const createBuilding = async (req, res) => {
  const { name, createdBy, users } = req.body
  const existingBuilding = await buildingRepository.search().where('name').is.equalTo(name).return.first()
  // check if building already registered with the name
  if (existingBuilding) {
    return res.status(400).json({ message: 'A building already registered with the name.' })
  }
  const building = await buildingRepository.createAndSave({ name: `${name}`, createdBy, users })
  const { entityId, ...rest } = building.toJSON()
  const data = { id: building.entityId, ...rest }
  res.status(200).json({ result: data })
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

export const updateBuilding = async (req, res) => {
  const { id } = req.params
  const building = await buildingRepository.fetch(id)

  building.name = req.body.name ?? null
  building.createdBy = req.body.createdBy ?? null
  building.users = req.body.users ?? null

  await buildingRepository.save(building)

  res.status(200).json({ result: building })
}

export const deleteBuilding = async (req, res) => {
  const { id } = req.params
  await buildingRepository.remove(id)
  res.status(200).json({ message: 'Building ' + id + ' deleted successfully.' })
}

// Path: docker/local_api/app/controller/building.controller.js
