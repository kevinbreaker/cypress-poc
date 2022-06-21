import { Server } from 'miragejs'

import factories from './factories'
import fixtures from './fixtures'
import routes from './routes'
import models from './models'
import seeds from './seeds'

const config = (environment: string) => {
  const config = {
    environment,
    factories,
    models,
    routes,
    seeds,
    fixtures
  }

  return config
}

export function makeServer({ environment = 'development' } = {}) {
  return new Server({...config(environment)})
}

