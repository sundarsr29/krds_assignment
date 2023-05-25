import { createRouter, createWebHashHistory } from 'vue-router'
import DesktopDesign from '../views/desktop_design.vue';

const routes = [
  {
    path: '/',
    name: 'DesktopDesign',
    component: DesktopDesign
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
