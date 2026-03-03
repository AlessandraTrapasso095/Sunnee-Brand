<!-- welcome page che racconta la storia Sunnee -->
<script setup>
import thermosPhoto from '../assets/images/thermos-photo.png'

// per riusare la stessa immagine bottiglia in piu versioni colore nella hero
const showcaseBottles = [
  {
    id: 'ocean',
    name: 'Ocean Drive',
    filter: 'hue-rotate(35deg) saturate(1.15) brightness(0.96)',
  },
  {
    id: 'sunset',
    name: 'Sunset Coral',
    filter: 'hue-rotate(-70deg) saturate(1.28) brightness(1.03)',
  },
  {
    id: 'mint',
    name: 'Mint Tide',
    filter: 'hue-rotate(140deg) saturate(1.14) brightness(1.01)',
  },
]

// mosrtra i punti chiave della proposta Sunnee
const highlights = [
  {
    id: 'waste',
    title: 'Plastica marina rigenerata',
    text: 'Filati brevettati ottenuti da reti da pesca dismesse e rifiuti recuperati dal mare.',
  },
  {
    id: 'chain',
    title: 'Filiera etica',
    text: 'Produzione controllata in ogni fase per ridurre sprechi, emissioni e impatto ambientale.',
  },
  {
    id: 'design',
    title: 'Design sportivo',
    text: 'Collezioni beachwear e accessori pensati per comfort, performance e lunga durata.',
  },
]

// racconta la storia Sunnee 
const timeline = [
  {
    year: '2018',
    text: 'La fondatrice lancia Sunnee dopo anni passati tra surf e attivismo ambientale.',
  },
  {
    year: '2021',
    text: 'Il team cresce e struttura una produzione stabile dedicata al beachwear sostenibile.',
  },
  {
    year: '2026',
    text: 'Parte la linea Kids con bottiglia termica personalizzabile inclusa nel primo ordine.',
  },
]
</script>

<template>
  <!-- contiene tutta la landing page in sezioni -->
  <main class="welcome-page">
    <!-- headline, CTA e bottiglie in evidenza -->
    <section class="hero">
      <div class="hero-copy">
        <p class="hero-kicker">Beachwear sostenibile made for ocean lovers</p>
        <h1>Sunnee trasforma rifiuti marini in nuovi prodotti da vivere ogni giorno.</h1>
        <p class="hero-text">
          Con la nuova linea Kids regaliamo una bottiglia termica personalizzabile per insegnare il
          riciclo in modo concreto, creativo e divertente.
        </p>

        <div class="hero-actions">
          <RouterLink class="sunnee-button" to="/configuratore">Configura ora</RouterLink>
          <a class="hero-link" href="#storia">Scopri la storia Sunnee</a>
        </div>

        <ul class="hero-tags">
          <li>Filati da plastica riciclata</li>
          <li>Impatto ridotto</li>
          <li>Produzione etica</li>
        </ul>
      </div>

      <!-- mostra 3 varianti bottiglia con luci/ombre in stile prodotto -->
      <div class="hero-visual" aria-label="Varianti bottiglia Sunnee">
        <span class="hero-orb hero-orb--warm"></span>
        <span class="hero-orb hero-orb--cool"></span>

        <figure
          v-for="item in showcaseBottles"
          :key="item.id"
          :class="['hero-bottle', `hero-bottle--${item.id}`]"
        >
          <img :src="thermosPhoto" :alt="`Bottiglia ${item.name}`" :style="{ filter: item.filter }" />
          <figcaption>{{ item.name }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- espone i benefit principali -->
    <section class="benefits" id="benefici">
      <p class="section-kicker">Perche Sunnee</p>
      <h2>Una visione chiara: innovare il beachwear partendo dal recupero del mare.</h2>

      <ol class="benefit-track">
        <li v-for="(item, index) in highlights" :key="item.id">
          <p class="benefit-index">0{{ index + 1 }}</p>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </li>
      </ol>
    </section>

    <!-- racconta la storia del brand -->
    <section class="story" id="storia">
      <div class="story-media">
        <img :src="thermosPhoto" alt="Bottiglia termica Sunnee" />
      </div>

      <div class="story-copy">
        <p class="section-kicker">Chi siamo</p>
        <h2>Dal surf alla filiera rigenerativa: la crescita di Sunnee.</h2>
        <p>
          Sunnee nasce dall'esigenza reale di ridurre le microplastiche e costruire un'alternativa
          concreta nel mondo beachwear. Oggi il progetto e un team operativo con obiettivi
          misurabili su sostenibilita, trasparenza e qualita.
        </p>

        <ul class="timeline">
          <li v-for="item in timeline" :key="item.year">
            <span>{{ item.year }}</span>
            <p>{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- chiude la landing con la CTA verso il configuratore kids -->
    <section class="kids-launch">
      <p class="section-kicker">Nuova linea Kids</p>
      <h2>Con il primo ordine, ogni bambina e bambino riceve una bottiglia termica custom Sunnee.</h2>
      <p>
        Configura tappo, corpo, fondo, colore logo e nome personalizzato. L'anteprima si aggiorna
        in tempo reale in ogni step.
      </p>

      <div class="kids-actions">
        <RouterLink class="sunnee-button" to="/configuratore">Configura ora</RouterLink>
        <a class="hero-link hero-link--light" href="#benefici">Rivedi i benefit</a>
      </div>
    </section>
  </main>
</template>

<style scoped src="../assets/styles/welcome-base.css"></style>
<style scoped src="../assets/styles/welcome-sections.css"></style>
<style scoped src="../assets/styles/welcome-responsive.css"></style>
