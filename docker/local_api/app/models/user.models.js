import { Entity, Schema } from 'redis-om'
import client from '../../config/client.js'

/* our entity */
class User extends Entity {};

/* create a Schema for Person */
const userSchema = new Schema(User, {
  name: { type: 'string' },
  email: { type: 'string' },
  password: { type: 'string' },
  admin: { type: 'boolean' }
},
{
  dataStructure: 'JSON'
})

/* use the client to create a Repository just for Persons */
export const userRepository = client.fetchRepository(userSchema)

/* create the index for Person for search */
await userRepository.createIndex('userIndex')

// Path: docker/local_api/app/models/building.models.js
