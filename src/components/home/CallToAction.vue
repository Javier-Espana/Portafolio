<template>
  <section class="cta section">
    <div class="cta__content">
      <h2 class="cta__title glitch" :data-text="$t('cta.title')">
        {{ $t('cta.title') }}
      </h2>
      <p class="cta__description">
        {{ $t('cta.subtitle') }}
      </p>
      <div class="cta__buttons">
        <router-link to="/contact" class="btn btn-primary btn-lg">
          {{ $t('cta.buttons.contact') }}
        </router-link>
        <a 
          href="https://github.com/Javier-Espana" 
          target="_blank" 
          rel="noopener noreferrer"
          class="btn btn-secondary btn-lg"
        >
          {{ $t('cta.buttons.github') }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  background: radial-gradient(circle at center, var(--dark-bg-tertiary) 0%, var(--dark-bg) 70%);
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(0, 247, 255, 0.1) 0%, transparent 70%);
  animation: rotate 30s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.cta__content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.cta__title {
  font-family: var(--font-title);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: 2rem;
  text-shadow: 0 0 30px var(--neon-blue);
}

.cta__description {
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
}

.cta__buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-lg {
  padding: 1.25rem 2.5rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .cta__buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-lg {
    width: 100%;
    max-width: 300px;
  }
}
</style>
