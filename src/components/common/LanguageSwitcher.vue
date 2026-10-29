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
      <span class="lang-pill" :class="{ 'is-active': currentLocale === 'es' }">
        <span class="flag" aria-hidden="true">🇬🇹</span>
        <span class="code">ES</span>
      </span>
      <span class="lang-pill" :class="{ 'is-active': currentLocale === 'en' }">
        <span class="flag" aria-hidden="true">🇺🇸</span>
        <span class="code">EN</span>
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
  }, 250)
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lang-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 2px;
  background: rgba(8, 11, 20, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
  user-select: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
}

.lang-btn:hover {
  border-color: rgba(0, 217, 255, 0.4);
  box-shadow: 0 2px 14px rgba(0, 217, 255, 0.15);
}

.lang-btn.switching {
  transform: scale(0.96);
}

.lang-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.25rem 0.55rem;
  border-radius: var(--radius-full);
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  line-height: 1;
  color: var(--text-muted);
  opacity: 0.55;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.lang-pill.is-active {
  opacity: 1;
  color: #ffffff;
  background: linear-gradient(135deg, rgba(108, 99, 255, 0.35), rgba(0, 217, 255, 0.25));
  border-color: rgba(0, 217, 255, 0.5);
  box-shadow: 0 0 10px rgba(0, 217, 255, 0.2);
  font-weight: 700;
}

.flag {
  font-size: 0.85rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.code {
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1;
  display: inline-flex;
  align-items: center;
}
</style>
