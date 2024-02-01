import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import EventRulesView from '@/views/EventRulesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/entrylist',
      name: 'entrylist',
      component: HomeView
    },
    {
      path: '/bop',
      name: 'bop',
      component: HomeView
    },
    {
      path: '/event',
      name: 'event',
      component: HomeView
    },
    {
      path: '/rules',
      name: 'rules',
      component: EventRulesView
    },
    {
      path: '/settings',
      name: 'settings',
      component: HomeView
    }
  ]
})

export default router
