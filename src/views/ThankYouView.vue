<!-- questo file mi serve per mostrare la pagina finale di ringraziamento dopo l'invio del configuratore. -->
<script setup>
import thermosPhoto from '../assets/images/thermos-photo.png'

// questo blocco mi serve per elencare i prossimi passaggi in modo chiaro e riusabile.
const nextSteps = [
  'La configurazione e stata registrata correttamente.',
  'Riceverai una conferma con i dettagli della personalizzazione.',
  'Puoi tornare alla home o creare una nuova bottiglia.',
]
</script>

<template>
  <!-- questo blocco mi serve per centrare il contenuto della pagina di conferma. -->
  <main class="thankyou-page">
    <!-- questo blocco mi serve per contenere titolo, testo e azioni finali in un layout pulito. -->
    <section class="thankyou-card">
      <div class="thankyou-layout">
        <!-- questo blocco mi serve per mostrare testo, lista passaggi e pulsanti principali. -->
        <div class="thankyou-copy">
          <p class="thankyou-kicker">Grazie</p>
          <h1>Configurazione inviata con successo</h1>
          <p class="thankyou-lead">
            Abbiamo ricevuto la tua bottiglia termica personalizzata Sunnee.
          </p>

          <!-- questo blocco mi serve per riepilogare cosa succede dopo l'invio. -->
          <ul class="thankyou-list">
            <li v-for="item in nextSteps" :key="item">{{ item }}</li>
          </ul>

          <!-- questo blocco mi serve per offrire due azioni chiare all'utente. -->
          <div class="thankyou-actions">
            <RouterLink class="sunnee-button" to="/">Torna alla home</RouterLink>
            <RouterLink class="thankyou-button-secondary" to="/configuratore">
              Crea un'altra bottiglia
            </RouterLink>
          </div>
        </div>

        <!-- questo blocco mi serve per dare continuita visiva con il prodotto configurato. -->
        <aside class="thankyou-visual" aria-label="Bottiglia Sunnee">
          <span class="visual-orb visual-orb--warm"></span>
          <span class="visual-orb visual-orb--cool"></span>

          <figure class="visual-bottle">
            <img :src="thermosPhoto" alt="Bottiglia termica Sunnee" />
            <figcaption>Sunnee Kids Bottle</figcaption>
          </figure>

          <p class="visual-pill">Ordine ricevuto</p>
        </aside>
      </div>
    </section>
  </main>
</template>

<style scoped>
.thankyou-page {
  min-height: calc(100vh - 108px);
  min-height: calc(100dvh - 108px);
  padding: clamp(1.2rem, 3vw, 2.4rem);
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 84% 10%, rgba(255, 199, 109, 0.14), rgba(255, 199, 109, 0) 36%),
    radial-gradient(circle at 8% 90%, rgba(11, 136, 173, 0.12), rgba(11, 136, 173, 0) 42%),
    #f7fbfd;
}

.thankyou-card {
  width: min(1040px, 100%);
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(9, 110, 138, 0.1);
  border-radius: 24px;
  box-shadow: 0 14px 34px rgba(7, 42, 56, 0.1);
  padding: clamp(1.05rem, 2.6vw, 1.7rem);
}

.thankyou-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  align-items: stretch;
  gap: clamp(0.9rem, 2vw, 1.6rem);
}

.thankyou-kicker {
  margin: 0 0 0.32rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #0a7fa3;
  font-size: 0.72rem;
  font-weight: 800;
}

h1 {
  margin: 0;
  color: #042736;
  line-height: 1.08;
  font-size: clamp(1.45rem, 2.85vw, 2.28rem);
}

.thankyou-lead {
  margin: 0.5rem 0 0.8rem;
  color: #43606c;
  font-size: clamp(0.94rem, 1.7vw, 1.02rem);
  line-height: 1.45;
}

.thankyou-list {
  margin: 0 0 0.96rem;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.42rem;
}

.thankyou-list li {
  border: 1px solid rgba(9, 110, 138, 0.14);
  border-radius: 14px;
  background: rgba(242, 250, 253, 0.72);
  color: #18495d;
  padding: 0.55rem 0.7rem 0.55rem 2rem;
  font-size: 0.9rem;
  line-height: 1.35;
  position: relative;
}

.thankyou-list li::before {
  content: '✓';
  position: absolute;
  left: 0.72rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.04rem;
  height: 1.04rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.7rem;
  color: #ffffff;
  background: #0fa163;
}

.thankyou-actions {
  display: flex;
  align-items: center;
  gap: 0.66rem;
  flex-wrap: wrap;
}

.thankyou-button-secondary {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(8, 107, 137, 0.24);
  border-radius: 999px;
  padding: 0.78rem 1.18rem;
  color: #0a5f7b;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.92);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.thankyou-button-secondary:hover {
  transform: translateY(-1px);
  border-color: rgba(8, 107, 137, 0.42);
  box-shadow: 0 8px 16px rgba(6, 56, 75, 0.11);
}

.thankyou-visual {
  position: relative;
  border-radius: 20px;
  border: 1px solid rgba(9, 110, 138, 0.12);
  background: linear-gradient(165deg, rgba(246, 252, 255, 0.95), rgba(236, 246, 251, 0.95));
  display: grid;
  place-items: center;
  overflow: hidden;
  min-height: 340px;
}

.visual-orb {
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
}

.visual-orb--warm {
  width: 220px;
  height: 220px;
  right: -42px;
  top: -40px;
  background: radial-gradient(circle, rgba(255, 212, 126, 0.52), rgba(255, 212, 126, 0));
}

.visual-orb--cool {
  width: 230px;
  height: 230px;
  left: -50px;
  bottom: -54px;
  background: radial-gradient(circle, rgba(95, 194, 226, 0.36), rgba(95, 194, 226, 0));
}

.visual-bottle {
  margin: 0;
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 0.25rem;
}

.visual-bottle img {
  width: min(240px, 80%);
  height: auto;
  display: block;
  filter: drop-shadow(0 22px 26px rgba(3, 35, 48, 0.2));
}

.visual-bottle figcaption {
  font-size: 0.8rem;
  font-weight: 700;
  color: #0a4f67;
  letter-spacing: 0.02em;
}

.visual-pill {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  margin: 0;
  padding: 0.42rem 0.74rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(8, 107, 137, 0.2);
  color: #0a5f7b;
  font-size: 0.78rem;
  font-weight: 700;
}

@media (max-width: 940px) {
  .thankyou-layout {
    grid-template-columns: 1fr;
  }

  .thankyou-visual {
    min-height: 290px;
  }
}

@media (max-width: 720px) {
  .thankyou-page {
    padding: 0.9rem;
  }

  .thankyou-actions {
    width: 100%;
  }

  .thankyou-actions .sunnee-button {
    width: 100%;
  }

  .thankyou-actions .thankyou-button-secondary {
    width: 100%;
  }
}
</style>
