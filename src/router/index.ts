import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import { USER } from '../store'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../views/Dashboard.vue'), name: 'Dashboard', meta: { auth: true } },
  { path: '/login', component: () => import('../views/Login.vue'), name: 'Login' }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

router.beforeEach((to, from, next) => {
  const user = USER()

  if (to.meta.hasOwnProperty('auth') && !user.value.token) next({ name: 'Login' })
  else next()

})

export default router