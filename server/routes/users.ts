import { Response } from 'miragejs'
import { Routes } from '../@types/mirage.types'

const users: Routes = function() {

  this.get('/users', schema => {
    return schema.db.users
  })

  this.post('/users', (schema, {requestBody}) => {
    const user = JSON.parse(requestBody)

    schema.db.users.insert(user)

    return new Response(201)
  })

}


export default users 