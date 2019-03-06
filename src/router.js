import Vue from 'vue'
import Router from 'vue-router'
import User from './pages/User.vue'
import Person from './pages/Person.vue'
import Logs from './pages/Logs.vue'

Vue.use(Router)

export default new Router({
 
  base: process.env.BASE_URL,
  routes: [
      {
        path: '/',
        name: 'user',
        component: User
      },
      {
        path: '/logs',
        name: 'logs',
        component: Logs
      },
      {
        path: '/user',
        name: 'user',
        component: User
      },
      {
        path: '/person',
        name: 'person',
        component: Person
      }
    
  ]
})
