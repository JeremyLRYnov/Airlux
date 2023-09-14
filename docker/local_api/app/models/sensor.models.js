import { Entity, Schema } from 'redis-om'
import client from '../config/client.js'

/* our entity */
class Sensor extends Entity {};

/* create a Schema for Sensor */
const sensorSchema = new Schema(Sensor, {
  name: { type: 'string' },
  sensorId: { type: 'string' },
  roomId: { type: 'string' },
  value: { type: 'number' },
  unit: { type: 'string' }
},
{
  dataStructure: 'JSON'
})

/* use the client to create a Repository just for Sensors */
export const sensorRepository = client.fetchRepository(sensorSchema)

/* create the index for Sensor for search */
await sensorRepository.createIndex('sensorIndex')

// Path: docker/local_api/app/models/sensor.models.js
