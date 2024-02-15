import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DriversView from '@/views/DriversView.vue'
import EntryListView from '@/views/EntryListView.vue'
import EventRulesView from '@/views/EventRulesView.vue'
import SettingsView from '@/views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/drivers',
      name: 'drivers',
      component: DriversView
    },
    {
      path: '/entrylist',
      name: 'entrylist',
      component: EntryListView
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
      component: SettingsView
    }
  ]
})

export default router
