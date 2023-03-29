import { Entity, Schema } from 'redis-om'
import client from '../config/client.js'

/* our entity */
class Room extends Entity {};

/* create a Schema for Room */
const roomSchema = new Schema(Room, {
  name: { type: 'string' },
  buildingId: { type: 'string' }
},
{
  dataStructure: 'JSON'
})

/* use the client to create a Repository just for Rooms */
export const roomRepository = client.fetchRepository(roomSchema)

/* create the index for Room for search */
await roomRepository.createIndex('roomIndex')

// Path: docker/local_api/app/models/room.models.js