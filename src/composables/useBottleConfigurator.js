// questo file mi serve per centralizzare dati e logica del configuratore in modo DRY.
import { computed, reactive, ref } from 'vue'

// questo blocco mi serve per avere una sola sorgente dei 10 colori predefiniti.
const COLOR_OPTIONS = [
  { id: 'ocean', label: 'Ocean Blue', hex: '#0A6FB5' },
  { id: 'coral', label: 'Coral', hex: '#FF6F61' },
  { id: 'sun', label: 'Sun Yellow', hex: '#FFC857' },
  { id: 'mint', label: 'Mint Green', hex: '#3EB489' },
  { id: 'sand', label: 'Sand Beige', hex: '#D9C5A1' },
  { id: 'seaweed', label: 'Seaweed', hex: '#2E6B57' },
  { id: 'berry', label: 'Berry', hex: '#A23B72' },
  { id: 'lavender', label: 'Lavender', hex: '#8E7DBE' },
  { id: 'storm', label: 'Storm Gray', hex: '#5F6B7A' },
  { id: 'pearl', label: 'Pearl White', hex: '#F3F5F7' },
]

// questo blocco lo uso per gestire tutti gli step in un unico posto.
const CONFIG_STEPS = [
  { id: 'cap', label: 'Tappo', kind: 'color' },
  { id: 'body', label: 'Corpo', kind: 'color' },
  { id: 'base', label: 'Fondo', kind: 'color' },
  { id: 'brand', label: 'Scritta SUNNEE', kind: 'color' },
  { id: 'name', label: 'Nome personalizzato', kind: 'text' },
]

// questo chiude il setup dello stato condiviso e restituisce strumenti riusabili.
export function useBottleConfigurator() {
  // questo blocco mi serve per tracciare lo step corrente.
  const currentStep = ref(1)

  // questo apre lo stato colori in un unico oggetto, così è più pulito e DRY.
  const selectedColors = reactive({
    cap: COLOR_OPTIONS[0].hex,
    body: COLOR_OPTIONS[1].hex,
    base: COLOR_OPTIONS[2].hex,
    brand: COLOR_OPTIONS[9].hex,
    name: COLOR_OPTIONS[9].hex,
  })

  // questo blocco mi serve per tracciare il nome personalizzato da stampare.
  const customName = ref('SUNNEE KID')

  // questo prende lo step attivo completo.
  const activeStep = computed(() => CONFIG_STEPS[currentStep.value - 1])

  // questo prende la parte attiva in base allo step corrente.
  const activePart = computed(() => activeStep.value.id)

  // questo prende il nome leggibile della parte attiva per mostrarlo in pagina.
  const activePartLabel = computed(() => activeStep.value.label)

  // questo mi serve per capire quanti step ci sono in totale.
  const totalSteps = computed(() => CONFIG_STEPS.length)

  // questo blocco mi serve per distinguere gli step colore dallo step nome.
  const isColorStep = computed(() => activeStep.value.kind === 'color')
  const isNameStep = computed(() => activeStep.value.kind === 'text')

  // questo mi serve per sapere se sono all'ultimo step.
  const isLastStep = computed(() => currentStep.value === CONFIG_STEPS.length)

  // questo apre la modifica colore della parte corrente.
  const setColorForActivePart = (hexColor) => {
    if (isColorStep.value) {
      selectedColors[activePart.value] = hexColor
    }
  }

  // questo mi serve per aggiornare il nome personalizzato con una stringa pulita.
  const setCustomName = (value) => {
    customName.value = value.replace(/\s+/g, ' ').slice(0, 18)
  }

  // questo blocco mi serve per aggiornare il colore del nome nello step personalizzazione.
  const setNameColor = (hexColor) => {
    selectedColors.name = hexColor
  }

  // questo prende lo step successivo senza uscire dai limiti.
  const nextStep = () => {
    if (currentStep.value < CONFIG_STEPS.length) {
      currentStep.value += 1
    }
  }

  // questo chiude lo step corrente tornando indietro senza andare sotto 1.
  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value -= 1
    }
  }

  // questo mi serve per ripristinare configurazione e step iniziali.
  const resetConfigurator = () => {
    currentStep.value = 1
    selectedColors.cap = COLOR_OPTIONS[0].hex
    selectedColors.body = COLOR_OPTIONS[1].hex
    selectedColors.base = COLOR_OPTIONS[2].hex
    selectedColors.brand = COLOR_OPTIONS[9].hex
    selectedColors.name = COLOR_OPTIONS[9].hex
    customName.value = 'SUNNEE KID'
  }

  // questo restituisce i dati necessari alla view senza duplicare logica altrove.
  return {
    colorOptions: COLOR_OPTIONS,
    configSteps: CONFIG_STEPS,
    currentStep,
    totalSteps,
    selectedColors,
    customName,
    activeStep,
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
  }
}
