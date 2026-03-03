<!-- questo file mi serve per usare la base dati dello Step 2 e validare stato e step del configuratore. -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBottleConfigurator } from '../composables/useBottleConfigurator'
import BottlePreview from '../components/BottlePreview.vue'

// questo blocco mi serve per prendere tutto lo stato DRY dal composable.
const {
  colorOptions,
  currentStep,
  totalSteps,
  selectedColors,
  customName,
  activePart,
  activePartLabel,
  isColorStep,
  isNameStep,
  isLastStep,
  setColorForActivePart,
  setNameColor,
  setCustomName,
  nextStep,
  prevStep,
  resetConfigurator,
} = useBottleConfigurator()

// questo blocco mi serve per evidenziare il colore gia selezionato nello step attivo.
const isColorPicked = (hexColor) => isColorStep.value && selectedColors[activePart.value] === hexColor
const isNameColorPicked = (hexColor) => isNameStep.value && selectedColors.name === hexColor

// questo blocco mi serve per limitare il nome alla forma desiderata.
const handleNameInput = (event) => {
  setCustomName(event.target.value)
}

// questo blocco mi serve per navigare alla pagina di ringraziamento dopo l'invio finale.
const router = useRouter()
const isConfirmModalOpen = ref(false)

// questo blocco mi serve per gestire il click su Avanti o Invia in modo lineare.
const stepperLabels = ['Tappo', 'Corpo', 'Fondo', 'Scritta', 'Nome']
const handlePrimaryAction = () => {
  if (!isLastStep.value) {
    nextStep()
    return
  }
  isConfirmModalOpen.value = true
}

// questo blocco mi serve per confermare l'invio dalla modale e andare alla pagina finale.
const handleConfirmSubmit = () => {
  isConfirmModalOpen.value = false
  router.push('/grazie')
}

// questo blocco mi serve per chiudere la modale senza inviare.
const closeConfirmModal = () => {
  isConfirmModalOpen.value = false
}
</script>

<template>
  <!-- questo apre il contenitore pagina con layout due colonne. -->
  <main class="configurator-page">
    <!-- questo blocco mi serve per contenere i controlli utente. -->
    <section class="controls-flow">
      <p class="step-label">Step {{ currentStep }} di {{ totalSteps }}</p>
      <ol class="stepper-track" aria-label="Progressione configuratore">
        <li
          v-for="(label, index) in stepperLabels"
          :key="label"
          :class="['step-chip', currentStep > index + 1 ? 'step-chip--completed' : currentStep === index + 1 ? 'step-chip--active' : 'step-chip--upcoming']"
        >
          <span>{{ index + 1 }}</span>
          <small>{{ label }}</small>
        </li>
      </ol>
      <h2>Configura la bottiglia termica</h2>
      <p class="description">
        Seleziona i colori e personalizza il nome.
      </p>

      <div class="editing-zone">
        <!-- questo prende lo stato attivo e guida l'utente nella selezione corretta. -->
        <p class="active-part">Stai modificando:</p>
        <p class="active-part active-part--value">
          <strong>{{ activePartLabel }}</strong>
        </p>
        <p class="section-kicker">{{ isColorStep ? 'Seleziona un colore' : 'Testo' }}</p>

        <!-- questo apre la palette colori comune: un solo blocco riusato per tutti gli step. -->
        <div v-if="isColorStep" class="palette-grid">
          <button
            v-for="color in colorOptions"
            :key="color.id"
            :class="['color-chip', { 'color-chip--active': isColorPicked(color.hex) }]"
            type="button"
            :style="{ backgroundColor: color.hex, '--swatch-color': color.hex }"
            :aria-label="`Seleziona ${color.label}`"
            :title="color.label"
            @click="setColorForActivePart(color.hex)"
          >
            <span class="sr-only">{{ color.label }}</span>
          </button>
        </div>

        <!-- questo blocco lo uso per inserire il nome quando arrivo allo step personalizzazione. -->
        <div v-if="isNameStep" class="name-editor">
          <label class="name-label" for="custom-name">Nome da stampare</label>
          <input
            id="custom-name"
            class="name-input"
            type="text"
            :value="customName"
            maxlength="18"
            placeholder="Inserisci il nome"
            @input="handleNameInput"
          />

          <p class="name-color-label">Colore nome</p>
          <div class="palette-grid palette-grid--name">
            <button
              v-for="color in colorOptions"
              :key="`name-${color.id}`"
              :class="['color-chip', { 'color-chip--active': isNameColorPicked(color.hex) }]"
              type="button"
              :style="{ backgroundColor: color.hex, '--swatch-color': color.hex }"
              :aria-label="`Seleziona colore nome ${color.label}`"
              :title="color.label"
              @click="setNameColor(color.hex)"
            >
              <span class="sr-only">{{ color.label }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- questo prende la navigazione step del composable in modo pulito. -->
      <div class="actions-row">
        <button class="action-btn action-btn--ghost" type="button" @click="prevStep">Indietro</button>
        <button
          :class="['action-btn', { 'action-btn--submit-corner': isLastStep }]"
          type="button"
          @click="handlePrimaryAction"
        >
          {{ isLastStep ? 'Invia configurazione' : 'Avanti' }}
        </button>
      </div>

      <!-- questo chiude il test stato e riporta il configuratore alla condizione iniziale. -->
      <button class="reset-btn" type="button" @click="resetConfigurator">
        Reset configuratore
      </button>
    </section>

    <!-- questo apre l'anteprima live a destra e la tiene sempre visibile in desktop. -->
    <BottlePreview
      :selected-colors="selectedColors"
      :custom-name="customName"
      :active-part-label="activePartLabel"
      :current-step="currentStep"
      :total-steps="totalSteps"
    />

    <!-- questo blocco mi serve per aprire una conferma grafica prima dell'invio finale. -->
    <div
      v-if="isConfirmModalOpen"
      class="confirm-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      @click.self="closeConfirmModal"
    >
      <section class="confirm-dialog">
        <p class="confirm-kicker">Conferma invio</p>
        <h3 id="confirm-title" class="confirm-title">Sei sicuro di voler inviare?</h3>
        <p class="confirm-text">
          Dopo la conferma, la tua configurazione verrà salvata e verrai reindirizzata alla pagina di ringraziamento.
        </p>
        <div class="confirm-actions">
          <button type="button" class="action-btn action-btn--ghost" @click="closeConfirmModal">
            Annulla
          </button>
          <button type="button" class="action-btn confirm-btn" @click="handleConfirmSubmit">
            Conferma invio
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.configurator-page { height: 100%; min-height: 0; display: grid; grid-template-columns: minmax(0, 1.04fr) minmax(330px, 0.96fr); align-items: stretch; gap: clamp(0.75rem, 1.65vw, 1.2rem); padding: clamp(0.55rem, 1.45vw, 0.9rem) clamp(0.8rem, 1.9vw, 1.2rem); width: 100%; margin: 0; overflow: hidden; background: radial-gradient(circle at 90% 8%, rgba(255, 199, 109, 0.1), rgba(255, 199, 109, 0) 36%), radial-gradient(circle at 6% 92%, rgba(11, 136, 173, 0.08), rgba(11, 136, 173, 0) 42%), #f7fbfd; }
.controls-flow { width: min(700px, 100%); justify-self: center; min-height: 0; height: 100%; display: flex; flex-direction: column; background: rgba(255, 255, 255, 0.96); border: 1px solid rgba(9, 110, 138, 0.1); border-radius: 24px; box-shadow: 0 14px 34px rgba(7, 42, 56, 0.1); padding: clamp(0.85rem, 1.9vw, 1.35rem) clamp(0.9rem, 2vw, 1.35rem); }
.step-label { margin: 0 0 0.22rem; text-transform: uppercase; letter-spacing: 0.17em; font-size: 0.7rem; color: #0a7fa3; font-weight: 800; }
.stepper-track { list-style: none; margin: 0 0 0.52rem; padding: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0.26rem; position: relative; }
.stepper-track::before { content: ''; position: absolute; left: 8%; right: 8%; top: 0.5rem; height: 1px; background: rgba(9, 104, 132, 0.2); }
.step-chip { position: relative; z-index: 1; display: grid; justify-items: center; gap: 0.12rem; color: #607a86; }
.step-chip span { width: 1.04rem; height: 1.04rem; border-radius: 999px; border: 1px solid rgba(9, 104, 132, 0.28); background: #f7fbfd; display: inline-flex; align-items: center; justify-content: center; font-size: 0; transition: all 180ms ease; }
.step-chip small { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.01em; }
.step-chip--active { color: #045c77; }
.step-chip--active span { border-color: rgba(11, 136, 173, 0.8); background: #0b88ad; box-shadow: 0 0 0 2px rgba(11, 136, 173, 0.16); }
.step-chip--active small { font-weight: 800; }
.step-chip--completed span { border-color: #10a160; background: #10a160; }
.step-chip--completed span::before { content: '✓'; font-size: 0.65rem; color: #ffffff; font-weight: 800; }
.step-chip--upcoming span { background: #ffffff; }
h2 { margin: 0 0 0.2rem; color: #042736; line-height: 1.04; font-size: clamp(1.22rem, 2.2vw, 1.9rem); white-space: nowrap; }
.description { margin: 0 0 0.46rem; color: #54707c; line-height: 1.28; max-width: 40ch; font-size: 0.9rem; font-weight: 500; }
.editing-zone { width: 100%; margin-top: auto; margin-bottom: auto; }
.active-part { margin: 0; color: #4f6c77; font-size: 0.95rem; }
.active-part--value { margin: 0.04rem 0 0.44rem; color: #07384a; font-size: clamp(1rem, 1.4vw, 1.14rem); }
.section-kicker { margin: 0 0 0.33rem; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.16em; color: #0a7fa3; font-weight: 800; }
.palette-grid { display: flex; flex-wrap: wrap; gap: 0.48rem; margin-bottom: 0.46rem; }
.color-chip { width: 48px; height: 48px; border: 2px solid rgba(255, 255, 255, 0.95); border-radius: 999px; cursor: pointer; box-shadow: 0 2px 7px rgba(8, 57, 74, 0.12); transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease, outline 180ms ease; }
.color-chip:hover { transform: translateY(-1px); box-shadow: 0 5px 11px rgba(4, 43, 58, 0.16); }
.color-chip:focus-visible { outline: 2px solid rgba(8, 107, 137, 0.5); outline-offset: 2px; }
.color-chip--active { transform: scale(1.06); box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px var(--swatch-color); }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0; }
.name-editor { margin-bottom: 0.4rem; }
.name-label { display: block; margin-bottom: 0.18rem; color: var(--sn-text); font-weight: 700; font-size: 0.9rem; }
.name-input { width: min(400px, 100%); border: 1px solid rgba(9, 104, 132, 0.23); border-radius: 0.8rem; padding: 0.5rem 0.72rem; font-size: 0.9rem; color: #08384a; background: #ffffff; }
.name-input:focus { outline: 2px solid rgba(8, 107, 137, 0.34); }
.name-color-label { margin: 0.28rem 0 0.2rem; color: var(--sn-text); font-weight: 700; font-size: 0.9rem; }
.palette-grid--name { margin-bottom: 0; }
.actions-row { display: flex; align-items: center; justify-content: flex-start; gap: 0.8rem; flex-wrap: nowrap; margin-top: auto; margin-bottom: 0.26rem; }
.action-btn { border: 0; border-radius: 999px; min-width: 130px; padding: 0.64rem 1.12rem; cursor: pointer; font-weight: 700; font-size: 0.93rem; text-align: center; color: #ffffff; background: linear-gradient(130deg, #0b88ad, #086b89); box-shadow: 0 10px 20px rgba(11, 136, 173, 0.28); transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease; }
.action-btn:hover { transform: translateY(-1px); filter: saturate(1.05); box-shadow: 0 13px 23px rgba(11, 136, 173, 0.33); }
.action-btn--ghost { border: 1px solid rgba(8, 107, 137, 0.26); color: #08475d; background: rgba(255, 255, 255, 0.9); box-shadow: none; }
.action-btn--ghost:hover { box-shadow: 0 5px 11px rgba(6, 56, 75, 0.11); }
.action-btn--submit-corner { position: fixed; right: 1rem; bottom: calc(44px + 0.5rem); z-index: 60; min-width: 214px; padding: 0.8rem 1.26rem; font-size: 0.96rem; letter-spacing: 0.01em; background: linear-gradient(135deg, #23bf77, #0d9e5b); box-shadow: 0 14px 25px rgba(11, 140, 83, 0.35); }
.action-btn--submit-corner:hover { box-shadow: 0 18px 30px rgba(11, 140, 83, 0.42); }
.confirm-overlay { position: fixed; inset: 0; z-index: 140; background: rgba(5, 35, 47, 0.42); backdrop-filter: blur(4px); display: grid; place-items: center; padding: 1rem; }
.confirm-dialog { width: min(520px, 100%); border-radius: 24px; border: 1px solid rgba(9, 110, 138, 0.14); background: rgba(255, 255, 255, 0.98); box-shadow: 0 20px 44px rgba(7, 42, 56, 0.22); padding: clamp(1rem, 2.5vw, 1.4rem); }
.confirm-kicker { margin: 0 0 0.28rem; text-transform: uppercase; letter-spacing: 0.16em; font-size: 0.7rem; font-weight: 800; color: #0a7fa3; }
.confirm-title { margin: 0; color: #042736; font-size: clamp(1.16rem, 2.4vw, 1.5rem); line-height: 1.1; }
.confirm-text { margin: 0.42rem 0 0.82rem; color: #4c6773; font-size: 0.93rem; line-height: 1.45; }
.confirm-actions { display: flex; gap: 0.58rem; justify-content: flex-end; flex-wrap: wrap; }
.confirm-btn { background: linear-gradient(135deg, #23bf77, #0d9e5b); box-shadow: 0 12px 22px rgba(11, 140, 83, 0.34); }
.confirm-btn:hover { box-shadow: 0 15px 27px rgba(11, 140, 83, 0.4); }
.reset-btn { border: 0; border-radius: 999px; min-width: 170px; padding: 0.64rem 1.02rem; cursor: pointer; font-weight: 700; font-size: 0.9rem; text-align: center; color: #ffffff; background: linear-gradient(130deg, #e94d5f, #c92438); box-shadow: 0 10px 20px rgba(201, 36, 56, 0.28); transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease; align-self: flex-start; margin-top: 0.38rem; }
.reset-btn:hover { transform: translateY(-1px); filter: saturate(1.04); box-shadow: 0 13px 24px rgba(201, 36, 56, 0.34); }
@media (max-width: 1160px) { .configurator-page { grid-template-columns: 1fr; overflow: auto; } .controls-flow { width: 100%; justify-self: stretch; border-radius: 20px; } .editing-zone { margin-top: 0.35rem; margin-bottom: 0.35rem; } .actions-row { flex-wrap: wrap; gap: 0.62rem; } .action-btn, .action-btn--ghost, .reset-btn { width: 100%; min-width: 100%; } .action-btn--submit-corner { position: static; width: 100%; min-width: 100%; padding: 0.72rem 1.05rem; font-size: 0.95rem; } .confirm-actions { width: 100%; } .confirm-actions .action-btn { width: 100%; min-width: 100%; } h2 { white-space: normal; } }
</style>
