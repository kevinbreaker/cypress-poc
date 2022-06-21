import { Registry, Response,  Server} from 'miragejs'
import { AnyFactories, AnyModels } from 'miragejs/-types'

import type factories from './factories'
import type models from './models'

type Config<F, M> = {
  enviromnent: any
  factories: F
  models: M
  routes: () => void
  seeds: (server: any) => void
}

export type ServerMirage = Server<Config<typeof factories, typeof models>>


export type Routes =  (this: Server<Registry<AnyModels, AnyFactories>>) => void
