<!-- gestione layout globale con header, vista corrente e footer -->
<script setup>
import sunneeLogo from './assets/images/sunnee-logo.svg'

// mostra l'anno corrente nel footer senza aggiornarlo a mano
const currentYear = new Date().getFullYear()
</script>

<template>
  <!-- contiene tutta l'app -->
  <div class="app-shell">
    <!-- per avere il brand sempre visibile e con link alla home -->
    <header class="site-header">
      <RouterLink class="site-brand" to="/">
        <img class="site-brand__logo" :src="sunneeLogo" alt="" aria-hidden="true" />
        <span>Sunnee</span>
      </RouterLink>
      <RouterLink class="site-home-link" to="/">Home</RouterLink>
    </header>

    <div class="app-content">
      <RouterView />
    </div>

    <!-- chiude ogni pagina con il footer -->
    <footer class="site-footer">
      <div class="site-footer__content">
        <p>Sunnee {{ currentYear }}. Beachwear e accessori sostenibili.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.site-header {
  height: 64px;
  padding: 0 clamp(1rem, 2.6vw, 2rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(7, 81, 105, 0.13);
  background: rgba(249, 253, 255, 0.88);
  backdrop-filter: blur(8px);
}

.site-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #06344a;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.2rem;
  letter-spacing: 0.02em;
}

.site-brand__logo {
  width: 42px;
  height: 42px;
  object-fit: contain;
  display: block;
}

.site-home-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  padding: 0 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(8, 107, 137, 0.25);
  color: #0a5f7b;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.86rem;
  background: rgba(255, 255, 255, 0.75);
  transition: background-color 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.site-home-link:hover {
  background: #ffffff;
  border-color: rgba(8, 107, 137, 0.42);
  transform: translateY(-1px);
}

.app-content {
  flex: 1;
  min-height: 0;
}

.site-footer {
  min-height: calc(44px + env(safe-area-inset-bottom));
  border-top: 1px solid rgba(7, 81, 105, 0.1);
  background: rgba(250, 253, 255, 0.92);
  color: #40606d;
  display: flex;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);
}

.site-footer__content {
  width: 100%;
  margin: 0 auto;
  padding: 0 clamp(1rem, 2.6vw, 2rem);
}

.site-footer__content p {
  margin: 0;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

@media (max-width: 760px) {
  .site-header {
    height: 58px;
    padding: 0 0.78rem;
  }

  .site-brand {
    font-size: 1.04rem;
    gap: 0.4rem;
  }

  .site-brand__logo {
    width: 34px;
    height: 34px;
  }

  .site-home-link {
    height: 1.9rem;
    padding: 0 0.76rem;
    font-size: 0.81rem;
  }

  .site-footer {
    min-height: calc(40px + env(safe-area-inset-bottom));
  }

  .site-footer__content {
    padding: 0 0.78rem;
  }

  .site-footer__content p {
    font-size: 0.7rem;
  }
}
</style>
