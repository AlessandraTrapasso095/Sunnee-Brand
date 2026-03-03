# Sunnee Bottle Configurator

Configuratore interattivo sviluppato in Vue 3 per la linea Kids di Sunnee.
L'utente personalizza una bottiglia termica scegliendo colori e nome, con anteprima live e flusso a step.

## Obiettivo del progetto

Realizzare una web app chiara e moderna che permetta di:
- scegliere il colore di `tappo`, `corpo`, `fondo`
- scegliere il colore della `scritta SUNNEE`
- inserire `nome personalizzato` e colore del nome
- vedere l'anteprima in tempo reale
- seguire una navigazione guidata a step fino all'invio

## Funzionalità implementate

- Welcome page narrativa in stile landing
- Configuratore a 5 step
- Palette con 10 colori predefiniti
- Anteprima termica live con layer colore (cap/body/base) e testi dinamici
- Modale di conferma prima dell'invio finale
- Pagina di ringraziamento (`/grazie`) dopo conferma
- Reset configurazione
- Layout responsive

## Stack

- Vue 3 (SFC, `<script setup>`)
- Vue Router 4
- Vite
- CSS custom (no librerie UI esterne)

## Requisiti

- Node.js `^20.19.0` oppure `>=22.12.0`
- npm

## Avvio progetto

Installa le dipendenze:

```bash
npm install
```

Avvio in sviluppo:

```bash
npm run dev
```

Build produzione:

```bash
npm run build
```

Preview build locale:

```bash
npm run preview
```

## Rotte

- `/` -> Welcome page
- `/configuratore` -> Configuratore bottiglia
- `/grazie` -> Pagina di ringraziamento

## Struttura principale

```text
src/
  assets/
    images/
      thermos-photo.png
      sunnee-logo.svg
    styles/
      welcome-base.css
      welcome-sections.css
      welcome-responsive.css
    main.css
  composables/
    useBottleConfigurator.js
  components/
    BottlePreview.vue
  views/
    WelcomeView.vue
    ConfiguratorView.vue
    ThankYouView.vue
  router/
    index.js
  App.vue
  main.js
```

## Architettura e scelte tecniche

- **Logica**: tutta la logica del configuratore è centralizzata in `useBottleConfigurator.js`
  - step
  - stato colori
  - nome personalizzato
  - azioni `next`, `prev`, `reset`
- **Separazione responsabilità**:
  - `ConfiguratorView.vue`: UI controlli e navigazione step
  - `BottlePreview.vue`: rendering anteprima live
  - `ThankYouView.vue`: conferma finale flusso utente
- **Routing esplicito** per separare bene le 3 fasi UX: ingresso, configurazione, conferma

## Flusso utente

1. L'utente entra in welcome (`/`)
2. Avvia il configuratore (`/configuratore`)
3. Completa i 5 step
4. Clicca `Invia configurazione`
5. Conferma nella modale `Sei sicuro?`
6. Viene reindirizzato a `/grazie`


## GitHub e Deploy

- GitHub Repository: `https://github.com/AlessandraTrapasso095/Sunnee-Brand.git`
- Netlify Deploy: `https://sunne-kids-bottle.netlify.app/`

## Autore

- Alessandra Trapasso 👩
