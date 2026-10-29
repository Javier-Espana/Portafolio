<template>
  <div class="language-switcher">
    <button 
      @click="toggleLanguage" 
      class="lang-btn"
      :class="{ switching: isSwitching }"
      :title="currentLocale === 'en' ? 'Cambiar a Español' : 'Switch to English'"
      :aria-label="currentLocale === 'en' ? 'Cambiar a Español' : 'Switch to English'"
      type="button"
    >
      <span class="flag" aria-hidden="true">{{ currentLocale === 'en' ? '🇺🇸' : '🇬🇹' }}</span>
      <span class="lang-code">{{ currentLocale.toUpperCase() }}</span>
      <span class="switch-indicator" aria-hidden="true">
        <span class="dot"></span>
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import i18n from '../../i18n'

const { locale } = useI18n({ useScope: 'global' })
const isSwitching = ref(false)

const currentLocale = computed(() => locale.value)

const toggleLanguage = () => {
  const newLocale = locale.value === 'en' ? 'es' : 'en'
  
  // Actualizar reactividad global
  locale.value = newLocale
  if (i18n.global && i18n.global.locale) {
    if (typeof i18n.global.locale === 'object') {
      i18n.global.locale.value = newLocale
    } else {
      i18n.global.locale = newLocale
    }
  }
  
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('preferredLanguage', newLocale)
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = newLocale
  }
  
  isSwitching.value = true
  setTimeout(() => {
    isSwitching.value = false
  }, 300)
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.9rem;
  background: rgba(108, 99, 255, 0.12);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  color: var(--text-primary);
  font-family: var(--font-mono, monospace);
  font-size: var(--text-xs);
  cursor: pointer;
  transition: all var(--transition-fast);
  user-select: none;
}

.lang-btn:hover {
  background: var(--accent-violet-20);
  border-color: var(--accent-violet);
  transform: translateY(-1px);
}

.lang-btn.switching {
  transform: scale(0.95);
  background: var(--accent-cyan-20);
  border-color: var(--accent-cyan);
}

.flag {
  font-size: 1rem;
}

.lang-code {
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-white);
}

.switch-indicator {
  display: flex;
  align-items: center;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-cyan);
  box-shadow: 0 0 6px var(--accent-cyan);
}
</style>
