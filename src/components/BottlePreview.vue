<!-- questo file mi serve per mostrare l'anteprima live della borraccia con i 3 colori selezionati. -->
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
// questo blocco mi serve per riusare la stessa maschera bottiglia su tutti i layer colorati.
const buildColorLayerStyle = (hexColor) => ({
  '--part-color': hexColor,
  WebkitMaskImage: `url(${thermosPhoto})`,
  maskImage: `url(${thermosPhoto})`,
})

// questo blocco lo uso per i layer luce/ombra che devono restare dentro la sagoma reale della bottiglia.
const bottleMaskStyle = {
  WebkitMaskImage: `url(${thermosPhoto})`,
  maskImage: `url(${thermosPhoto})`,
}

// questo blocco mi serve per rispettare automaticamente le proporzioni reali dell'immagine caricata.
const bottleAspect = ref('1 / 1')
const handleImageLoad = (event) => {
  const { naturalWidth, naturalHeight } = event.target
  if (naturalWidth > 0 && naturalHeight > 0) {
    bottleAspect.value = `${naturalWidth} / ${naturalHeight}`
  }
}
</script>

<template>
  <!-- questo blocco mi serve per tenere sempre visibile l'anteprima durante la configurazione. -->
  <aside class="preview-panel">
    <p class="preview-label">Anteprima in tempo reale</p>
    <h3>Bottiglia Termica Sunnee</h3>
    <p class="preview-description">
      Step {{ currentStep }} di {{ totalSteps }}: stai configurando {{ activePartLabel }}
    </p>

    <div class="preview-content">
      <!-- questo contenitore lo uso per mostrare una bottiglia reale con colorazione a layer. -->
      <div class="bottle-stage" aria-label="Anteprima bottiglia">
        <div class="floor-shadow"></div>

        <!-- questo blocco mi serve per sovrapporre layer colore e mantenere le texture della foto reale. -->
        <div class="bottle-render" :style="{ aspectRatio: bottleAspect }">
          <!-- questo layer mi serve per avere una base neutra che non altera il colore selezionato. -->
          <div class="base-shell" :style="bottleMaskStyle"></div>

          <!-- questo prende il colore del tappo e lo applica solo sulla fascia alta della bottiglia. -->
          <div class="color-layer color-layer--cap" :style="buildColorLayerStyle(props.selectedColors.cap)"></div>

          <!-- questo prende il colore del corpo e lo applica sulla parte centrale con sfumature. -->
          <div class="color-layer color-layer--body" :style="buildColorLayerStyle(props.selectedColors.body)"></div>

          <!-- questo prende il colore del fondo e lo applica sulla parte bassa della bottiglia. -->
          <div class="color-layer color-layer--base" :style="buildColorLayerStyle(props.selectedColors.base)"></div>

          <!-- questo layer lo uso per dare volume uniforme senza cambiare la tinta scelta. -->
          <div class="volume-shading" :style="bottleMaskStyle"></div>

          <!-- questo layer lo uso per riportare luce e riflessi realistici sopra i colori. -->
          <div class="glass-gloss" :style="bottleMaskStyle"></div>

          <!-- questo layer mi serve per creare profondita' sul lato destro della bottiglia. -->
          <div class="depth-shadow" :style="bottleMaskStyle"></div>

          <!-- questo layer lo uso per dare una luce speculare verticale 3d. -->
          <div class="specular-highlight" :style="bottleMaskStyle"></div>

          <!-- questo layer chiude il compositing con i dettagli reali della foto. -->
          <img class="bottle-layer bottle-layer--detail" :src="thermosPhoto" alt="" @load="handleImageLoad" />

          <p class="brand-mark" :style="{ color: props.selectedColors.brand }">SUNNEE</p>
          <p class="name-mark" :style="{ color: props.selectedColors.name }">{{ props.customName }}</p>
        </div>
      </div>

      <!-- questo blocco mi serve per avere un riepilogo rapido sempre visibile. -->
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

<style scoped>
.preview-panel { height: 100%; min-height: 0; padding: clamp(0.86rem, 1.8vw, 1.26rem); background: rgba(255, 255, 255, 0.95); border: 1px solid rgba(9, 110, 138, 0.1); border-radius: 24px; box-shadow: 0 14px 34px rgba(7, 42, 56, 0.1); display: flex; flex-direction: column; }
.preview-label { margin: 0 0 0.22rem; text-transform: uppercase; letter-spacing: 0.16em; color: #0a7fa3; font-size: 0.68rem; font-weight: 800; }
h3 { margin: 0; color: #042736; font-size: clamp(1.25rem, 2.2vw, 1.56rem); line-height: 1.05; }
.preview-description { margin: 0.2rem 0 0.38rem; color: #2f5563; font-size: 0.88rem; line-height: 1.3; }
.preview-content { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; gap: clamp(1.1rem, 2.2vw, 1.8rem); }
.bottle-stage { position: relative; width: min(430px, 100%); margin: 0; padding: 0 0 0.86rem; transform: translateX(-4px); flex: 0 1 430px; }
.bottle-stage::before { content: ''; position: absolute; inset: 8% 14% 16%; border-radius: 999px; background: radial-gradient(circle at 50% 38%, rgba(255, 238, 198, 0.5), rgba(255, 238, 198, 0) 66%), radial-gradient(circle at 34% 58%, rgba(171, 226, 244, 0.22), rgba(171, 226, 244, 0) 72%); filter: blur(11px); }
.floor-shadow { position: absolute; left: 50%; bottom: 0.04rem; transform: translateX(-50%); width: 72%; height: 1.05rem; border-radius: 999px; background: radial-gradient(circle, rgba(3, 38, 51, 0.34) 0%, rgba(0, 0, 0, 0) 74%); filter: blur(4.2px); }
.bottle-render { position: relative; width: 100%; aspect-ratio: 1 / 1; --text-center-x: 44.5%; transform: perspective(760px) rotateX(1.5deg); transform-origin: center bottom; filter: drop-shadow(0 16px 16px rgba(5, 36, 48, 0.19)); }
.bottle-layer, .base-shell, .color-layer, .volume-shading, .glass-gloss, .depth-shadow, .specular-highlight { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
.base-shell { background: #f9fbfd; -webkit-mask-repeat: no-repeat; -webkit-mask-size: contain; -webkit-mask-position: center; mask-repeat: no-repeat; mask-size: contain; mask-position: center; }
.color-layer { opacity: 1; mix-blend-mode: normal; background-color: var(--part-color); transition: background 200ms ease, opacity 200ms ease, transform 200ms ease; -webkit-mask-repeat: no-repeat; -webkit-mask-size: contain; -webkit-mask-position: center; mask-repeat: no-repeat; mask-size: contain; mask-position: center; }
.color-layer--cap { background: linear-gradient(to bottom, var(--part-color) 0%, var(--part-color) 17%, rgba(0, 0, 0, 0) 24%); }
.color-layer--body { background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 19%, var(--part-color) 28%, var(--part-color) 81%, rgba(0, 0, 0, 0) 89%); }
.color-layer--base { background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 81%, var(--part-color) 88%, var(--part-color) 100%); }
.volume-shading { opacity: 0.34; mix-blend-mode: multiply; background: linear-gradient(92deg, rgba(0, 0, 0, 0.21) 0%, rgba(0, 0, 0, 0.06) 22%, rgba(0, 0, 0, 0) 42%, rgba(0, 0, 0, 0.12) 78%, rgba(0, 0, 0, 0.24) 100%); -webkit-mask-repeat: no-repeat; -webkit-mask-size: contain; -webkit-mask-position: center; mask-repeat: no-repeat; mask-size: contain; mask-position: center; }
.glass-gloss { opacity: 0.46; mix-blend-mode: screen; background: linear-gradient(98deg, rgba(255, 255, 255, 0.72) 4%, rgba(255, 255, 255, 0.24) 26%, rgba(255, 255, 255, 0) 58%); -webkit-mask-repeat: no-repeat; -webkit-mask-size: contain; -webkit-mask-position: center; mask-repeat: no-repeat; mask-size: contain; mask-position: center; }
.depth-shadow { opacity: 0.22; mix-blend-mode: multiply; background: linear-gradient(92deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.1) 58%, rgba(0, 0, 0, 0.2) 100%); -webkit-mask-repeat: no-repeat; -webkit-mask-size: contain; -webkit-mask-position: center; mask-repeat: no-repeat; mask-size: contain; mask-position: center; }
.specular-highlight { opacity: 0.43; mix-blend-mode: screen; background: radial-gradient(42% 64% at 22% 28%, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0) 78%), linear-gradient(95deg, rgba(255, 255, 255, 0.42) 8%, rgba(255, 255, 255, 0.12) 21%, rgba(255, 255, 255, 0) 34%); -webkit-mask-repeat: no-repeat; -webkit-mask-size: contain; -webkit-mask-position: center; mask-repeat: no-repeat; mask-size: contain; mask-position: center; }
.bottle-layer--detail { opacity: 0.39; mix-blend-mode: multiply; filter: grayscale(1) contrast(1.25) brightness(0.86); transition: opacity 200ms ease; }
.brand-mark { position: absolute; left: var(--text-center-x); top: 39%; transform: translate(-50%, -50%); margin: 0; width: 48%; text-align: center; font-size: 0.74rem; font-weight: 800; letter-spacing: 0.22em; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.28), 0 0 1px rgba(255, 255, 255, 0.5); transition: color 200ms ease, transform 200ms ease; }
.name-mark { position: absolute; left: var(--text-center-x); top: 70%; transform: translateX(-50%); margin: 0; width: 54%; max-width: 54%; text-align: center; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.06em; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35), 0 0 1px rgba(0, 0, 0, 0.3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color 200ms ease, transform 200ms ease; }
.preview-legend { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; align-items: flex-start; gap: 0.42rem; min-width: 150px; }
.preview-legend li { display: inline-flex; align-items: center; gap: 0.24rem; color: #275462; font-weight: 700; font-size: 0.76rem; letter-spacing: 0.01em; white-space: nowrap; }
.legend-dot { width: 10px; height: 10px; border-radius: 999px; border: 1px solid rgba(0, 0, 0, 0.18); }
@media (max-width: 1160px) { .preview-panel { height: auto; } .preview-content { flex-direction: column; gap: 0.7rem; } .bottle-stage { margin: 0 auto; transform: none; width: min(430px, 96%); } .preview-legend { flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 0.2rem 0.7rem; min-width: 0; } }
</style>
