import { Entity, Schema } from 'redis-om'
import client from '../config/client.js'

/* our entity */
class Building extends Entity {};

/* create a Schema for Building */
const buildingSchema = new Schema(Building, {
  name: { type: 'string' },
  createdBy: { type: 'string' },
  users: { type: 'string[]' }
},
{
  dataStructure: 'JSON'
})

/* use the client to create a Repository just for Buildings */
export const buildingRepository = client.fetchRepository(buildingSchema)

/* create the index for Building for search */
await buildingRepository.createIndex('buildingIndex')

// Path: docker/local_api/app/models/user.models.js
