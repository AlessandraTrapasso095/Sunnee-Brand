// avvia l'app, caricare gli stili globali e attiva il router
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// aggancio il router all'app
app.use(router)

// monto l'app nel nodo #app di index.html.
app.mount('#app')
