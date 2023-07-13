import { Entity, Schema } from 'redis-om'
import client from '../config/client.js'

/* our entity */
class Switch extends Entity {};

/* create a Schema for Switch */
const switchSchema = new Schema(Switch, {
  name: { type: 'string' },
  roomId: { type: 'string' },
  status: { type: 'boolean' }
},
{
  dataStructure: 'JSON'
})

/* use the client to create a Repository just for Switchs */
export const switchRepository = client.fetchRepository(switchSchema)

/* create the index for Switch for search */
await switchRepository.createIndex('switchIndex')

// Path: docker/local_api/app/models/switch.models.js
