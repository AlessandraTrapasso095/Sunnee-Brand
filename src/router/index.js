// questo file mi serve per definire tutte le rotte dell'app e gestire la navigazione a step.
import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import ConfiguratorView from '../views/ConfiguratorView.vue'

// mi serve per tenere le rotte in un array unico, così il codice resta DRY e leggibile.
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
]

// questo apre la history del browser per avere URL puliti senza #.
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// lo uso per esportare il router e usarlo nel file main.js.
export default router
