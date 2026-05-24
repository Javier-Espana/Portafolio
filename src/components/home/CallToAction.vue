<template>
  <section class="cta section">
    <div class="cta__background"></div>
    <div class="container">
      <div class="cta__content card">
        <h2 class="cta__title text-gradient-violet">
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
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            {{ $t('cta.buttons.github') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  background: var(--bg-primary);
  padding: 8rem 0;
}

.cta__background {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, var(--accent-violet-10) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.cta__content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  border-color: rgba(108, 99, 255, 0.2);
  background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
}

.cta__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.cta__description {
  font-size: var(--text-lg);
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-inline: auto;
}

.cta__buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: var(--text-base);
}

@media (max-width: 768px) {
  .cta {
    padding: 6rem 0;
  }

  .cta__content {
    padding: 3rem 1.5rem;
  }

  .cta__buttons {
    flex-direction: column;
    align-items: stretch;
  }
  
  .btn-lg {
    justify-content: center;
  }
}
</style>
