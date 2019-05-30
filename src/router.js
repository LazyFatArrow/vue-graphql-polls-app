import Vue from 'vue'
import Router from 'vue-router'

import Polls from './views/Polls.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'polls',
      component: Polls
    },
  ]
})
