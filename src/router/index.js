import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import ConfiguratorView from '../views/ConfiguratorView.vue'
import ThankYouView from '../views/ThankYouView.vue'

// questo file mi serve per definire tutte le rotte dell'app e gestire la navigazione a step.
const routes = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView,
  },
  {
    path: '/configuratore',
    name: 'configuratore',
    component: ConfiguratorView,
  },
  {
    path: '/grazie',
    name: 'grazie',
    component: ThankYouView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
