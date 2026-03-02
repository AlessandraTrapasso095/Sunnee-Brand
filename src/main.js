// questo file mi serve per avviare tutta l'app Vue, applicare gli stili globali e attivare il router.
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// mi serve per creare l'app una sola volta ed evitare codice duplicato in altri file.
const app = createApp(App)

// lo uso per dire a Vue di usare la navigazione tra pagine.
app.use(router)

// questo prende l'app e la monta nel nodo #app dell'index.html.
app.mount('#app')
