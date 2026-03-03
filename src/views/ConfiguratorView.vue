<!-- usa la base dati dello Step 2 e valida stato e step del configuratore -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBottleConfigurator } from '../composables/useBottleConfigurator'
import BottlePreview from '../components/BottlePreview.vue'

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

// evidenzia il colore gia selezionato nello step attivo
const isColorPicked = (hexColor) => isColorStep.value && selectedColors[activePart.value] === hexColor
const isNameColorPicked = (hexColor) => isNameStep.value && selectedColors.name === hexColor

// limita il nome alla forma desiderata
const handleNameInput = (event) => {
  setCustomName(event.target.value)
}

// naviga alla pagina di ringraziamento dopo l'invio finale
const router = useRouter()
const isConfirmModalOpen = ref(false)

// gestisce il click su Avanti o Invia
const stepperLabels = ['Tappo', 'Corpo', 'Fondo', 'Scritta', 'Nome']
const handlePrimaryAction = () => {
  if (!isLastStep.value) {
    nextStep()
    return
  }
  isConfirmModalOpen.value = true
}

// serve per confermare l'invio e andare alla pagina finale
const handleConfirmSubmit = () => {
  isConfirmModalOpen.value = false
  router.push('/grazie')
}

// chiude senza inviare
const closeConfirmModal = () => {
  isConfirmModalOpen.value = false
}
</script>

<template>
  <!-- apre il contenitore pagina con layout due colonne -->
  <main class="configurator-page">
    <!-- contiene i controlli utente -->
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
        <!-- prende lo stato attivo e guida l'utente nella selezione corretta -->
        <p class="active-part">Stai modificando:</p>
        <p class="active-part active-part--value">
          <strong>{{ activePartLabel }}</strong>
        </p>
        <p class="section-kicker">{{ isColorStep ? 'Seleziona un colore' : 'Testo' }}</p>

        <!-- apre la palette colori -->
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

        <!-- per inserire il nome quando arrivo allo step personalizzazione -->
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

      <!-- riporta il configuratore alla condizione iniziale -->
      <button class="reset-btn" type="button" @click="resetConfigurator">
        Reset configuratore
      </button>
    </section>

    <!-- apre l'anteprima live a destra e la tiene sempre visibile in desktop -->
    <BottlePreview
      :selected-colors="selectedColors"
      :custom-name="customName"
      :active-part-label="activePartLabel"
      :current-step="currentStep"
      :total-steps="totalSteps"
    />

    <!-- conferma grafica prima dell'invio finale -->
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

<style scoped src="../assets/styles/configurator-view.css"></style>
