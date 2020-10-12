import Vue from 'vue'
import VueRouter from 'vue-router'
import FrontPage from '../components/FrontPage'
import Forecast from '../components/Forecast.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'FrontPage',
      component: FrontPage
    },
    {
      path: '/forecast',
      name: 'Forecast',
      component: Forecast
    },
  ]
})

export default router
