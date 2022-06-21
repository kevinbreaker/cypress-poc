import {Server} from 'miragejs'

const usersSeeder = (server: Server) => {
  server.createList('user', 4)
}

export default function seeds(server: Server): void {
  server.loadFixtures()
  usersSeeder(server)
}
