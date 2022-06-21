import { Response } from 'miragejs'
import { Routes } from '../@types/mirage.types'


import users from './users'

import signin from '../fixtures/signin.json'

const routes: Routes = function () {
  this.namespace = 'api/v1'
  this.timing = 500
  
  users.call(this)

  this.post('/auth', (_, { requestBody }) => {
    const { username, password } = JSON.parse(requestBody)

    if (username == 'admin@email.com' && password == '123456') {
      return signin
    }

    return new Response(401, { }, {
      errors: {
        messages: 'Credenciais inválidas'
      }
    })
  })

  /*
  // ** AUTH **
  this.post('/customer/auth/sign_in', (schema, { requestBody }) => {
    const { document, password } = JSON.parse(requestBody)

    if (document === '19508748001' && password === '123123123') {
      return schema.db.signin[0]
    }
    return new Response(
      401,
      {},
      {
        errors: {
          message: 'Credenciais inválidas',
        },
      },
    )
  })

  this.post('/customer/auth/forgot_password', (schema, { requestBody }) => {
    return new Response(200)
    // }
    // return new Response(
    //   401,
    //   {},
    //   {
    //     errors: 'Credenciais inválidas',
    //   },
    // )
  })

  // ** Home **
  this.get('/customer/units', schema => {
    const immobiles = schema.db.immobiles.map((immobile, index) => ({
      ...immobile,
      thumbnail: require(`../assets/images/thumbnail-immobile-${index % 2}.jpg`),
    }))

    return immobiles
      ? immobiles
      : new Response(
          401,
          {},
          {
            errors: {
              message: 'Credenciais inválidas',
            },
          },
        )
  })

  this.get('customer/units/:id', (schema, { params }) => {
    const immobile = schema.db.immobiles.find(params.id)
    return (
      immobile ?? {
        name: '',
        towers: '',
        address: '',
        thumbnail: '',
        residential_type: '',
        infos: '',
        status: '',
        id: '',
        description: '',
        banner: '',
        logo: '',
        pictures: [{ path: '' }],
      }
    )
  })

  this.get('blueprint', schema => schema.db.blueprint)
  this.get('personalization/:planta', schema => schema.db.personalization)

  // ** Personalization **
  this.get('/customer/plants/:id', (schema, { params }) => {
    if (params.id !== '1') {
      return new Response(
        404,
        { status: '404' },
        {
          errors: {
            message: 'Registro não encontrado.',
          },
        },
      )
    }

    return new Response(200, { status: '200' }, plants)
  })

  this.get('/customer/group_rooms/:id', (schema, { params }) => {
    if (params.id !== '1') {
      return new Response(
        404,
        { status: '404' },
        {
          errors: {
            message: 'Registro não encontrado.',
          },
        },
      )
    }

    return new Response(200, { status: '200' }, room)
  })

  this.get('/customer/group_kitchens/:id', (schema, { params }) => {
    if (params.id !== '1') {
      return new Response(
        404,
        { status: '404' },
        {
          errors: {
            message: 'Registro não encontrado.',
          },
        },
      )
    }

    return new Response(200, { status: '200' }, kitchen)
  })
  */
}


export default routes
// export {
//   routes,
//   users
// } 