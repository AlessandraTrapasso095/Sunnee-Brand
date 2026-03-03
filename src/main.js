// questo file mi serve per avviare l'app, caricare gli stili globali e attivare il router.
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// questo blocco mi serve per agganciare il router all'app prima del mount.
app.use(router)

// questo blocco mi serve per montare l'app nel nodo #app di index.html.
app.mount('#app')
