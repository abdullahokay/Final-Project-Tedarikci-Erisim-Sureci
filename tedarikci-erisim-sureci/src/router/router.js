import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Director from '@/views/DirectorView.vue'
import It from '@/views/ItDirectorView.vue'
import InfoSec from '@/views/InfoSecView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/director-approval',
    name: 'director',
    component: Director
  },
  
  {
    path: '/info-sec-approval',
    name: 'infosec',
    component: InfoSec
  },
  
  {
    path: '/it-director-approval',
    name: 'itdirector',
    component: It,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router