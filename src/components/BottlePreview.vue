<!-- mostra l'anteprima live della borraccia con i 3 colori selezionati -->
<script setup>
import { ref } from 'vue'
import thermosPhoto from '../assets/images/thermos-photo.png'
const props = defineProps({
  selectedColors: {
    type: Object,
    required: true,
  },
  customName: {
    type: String,
    required: true,
  },
  activePartLabel: {
    type: String,
    required: true,
  },
  currentStep: {
    type: Number,
    required: true,
  },
  totalSteps: {
    type: Number,
    required: true,
  },
})
// riusa la stessa maschera bottiglia su tutti i layer colorati
const buildColorLayerStyle = (hexColor) => ({
  '--part-color': hexColor,
  WebkitMaskImage: `url(${thermosPhoto})`,
  maskImage: `url(${thermosPhoto})`,
})

// layer luce/ombra 
const bottleMaskStyle = {
  WebkitMaskImage: `url(${thermosPhoto})`,
  maskImage: `url(${thermosPhoto})`,
}

// proporzioni reali dell'immagine caricata
const bottleAspect = ref('1 / 1')
const handleImageLoad = (event) => {
  const { naturalWidth, naturalHeight } = event.target
  if (naturalWidth > 0 && naturalHeight > 0) {
    bottleAspect.value = `${naturalWidth} / ${naturalHeight}`
  }
}
</script>

<template>
  <!-- per tenere sempre visibile l'anteprima durante la configurazione -->
  <aside class="preview-panel">
    <p class="preview-label">Anteprima in tempo reale</p>
    <h3>Bottiglia Termica Sunnee</h3>
    <p class="preview-description">
      Step {{ currentStep }} di {{ totalSteps }}: stai configurando {{ activePartLabel }}
    </p>

    <div class="preview-content">
      <!-- mostra la bottiglia con colorazione a layer -->
      <div class="bottle-stage" aria-label="Anteprima bottiglia">
        <div class="floor-shadow"></div>

        <!-- sovrappongo layer colore e mantengo le texture della foto  -->
        <div class="bottle-render" :style="{ aspectRatio: bottleAspect }">
          <!-- base neutra che non altera il colore selezionato -->
          <div class="base-shell" :style="bottleMaskStyle"></div>

          <!-- prende il colore del tappo e lo applica solo sulla fascia alta della bottiglia -->
          <div class="color-layer color-layer--cap" :style="buildColorLayerStyle(props.selectedColors.cap)"></div>

          <!-- prende il colore del corpo e lo applica sulla parte centrale con sfumature -->
          <div class="color-layer color-layer--body" :style="buildColorLayerStyle(props.selectedColors.body)"></div>

          <!-- prende il colore del fondo e lo applica sulla parte bassa della bottiglia -->
          <div class="color-layer color-layer--base" :style="buildColorLayerStyle(props.selectedColors.base)"></div>

          <!-- lo uso per dare volume uniforme senza cambiare la tinta scelta -->
          <div class="volume-shading" :style="bottleMaskStyle"></div>

          <!-- lo uso per riportare luce e riflessi realistici sopra i colori -->
          <div class="glass-gloss" :style="bottleMaskStyle"></div>

          <!-- serve per creare profondità sul lato destro della bottiglia -->
          <div class="depth-shadow" :style="bottleMaskStyle"></div>

          <!-- luce 3D -->
          <div class="specular-highlight" :style="bottleMaskStyle"></div>

          <img class="bottle-layer bottle-layer--detail" :src="thermosPhoto" alt="" @load="handleImageLoad" />

          <p class="brand-mark" :style="{ color: props.selectedColors.brand }">SUNNEE</p>
          <p class="name-mark" :style="{ color: props.selectedColors.name }">{{ props.customName }}</p>
        </div>
      </div>

      <!-- riepilogo rapido -->
      <ul class="preview-legend">
        <li>
          <span class="legend-dot" :style="{ backgroundColor: props.selectedColors.cap }"></span>
          Tappo
        </li>
        <li>
          <span class="legend-dot" :style="{ backgroundColor: props.selectedColors.body }"></span>
          Corpo
        </li>
        <li>
          <span class="legend-dot" :style="{ backgroundColor: props.selectedColors.base }"></span>
          Fondo
        </li>
        <li>
          <span class="legend-dot" :style="{ backgroundColor: props.selectedColors.brand }"></span>
          Scritta Sunnee
        </li>
        <li>
          <span class="legend-dot" :style="{ backgroundColor: props.selectedColors.name }"></span>
          Nome personalizzato
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped src="../assets/styles/bottle-preview.css"></style>
