import { createApp } from 'vue'
import { girassol } from './plugins/girassol'
import router from './router/index'

import { makeServer } from '../server'
import { Server, Response } from "miragejs"

import App from './App.vue'
import 'virtual:windi.css'

if (window.Cypress) {
  new Server({
    environment: "test",
    routes() {
      const methods = ["get", "put", "patch", "post", "delete"]
      methods.forEach((method) => {
        this[method]("http://localhost:3000/*", async (schema, request) => {
          let [status, headers, body] = await window.handleFromCypress(request)
          return new Response(status, headers, body)
        })
      })
    },
  })
} else {
  // mirage dev server
  makeServer({ environment: 'development'});
}

createApp(App)
  .use(girassol)
  .use(router)
  .mount('#app')
