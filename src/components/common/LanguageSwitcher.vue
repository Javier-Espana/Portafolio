<template>
  <div class="language-switcher">
    <button 
      @click="toggleLanguage" 
      class="lang-btn"
      :title="currentLocale === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'"
    >
      <span class="flag">{{ currentLocale === 'en' ? '🇺🇸' : '🇪🇸' }}</span>
      <span class="lang-code">{{ currentLocale.toUpperCase() }}</span>
      <span class="switch-indicator">
        <span class="dot"></span>
      </span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'es' : 'en'
  
  // Guardar preferencia en localStorage
  localStorage.setItem('preferredLanguage', locale.value)
  
  // Animación de feedback
  const btn = document.querySelector('.lang-btn')
  btn.classList.add('switching')
  setTimeout(() => btn.classList.remove('switching'), 300)
}

// Cargar preferencia de idioma al montar
const loadLanguagePreference = () => {
  const saved = localStorage.getItem('preferredLanguage')
  if (saved && (saved === 'en' || saved === 'es')) {
    locale.value = saved
  }
}

loadLanguagePreference()
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
  padding: 0.6rem 1.2rem;
  background: rgba(0, 247, 255, 0.05);
  border: 2px solid var(--neon-blue);
  border-radius: 50px;
  color: var(--neon-blue);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.lang-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(0, 247, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.lang-btn:hover::before {
  width: 300px;
  height: 300px;
}

.lang-btn:hover {
  background: rgba(0, 247, 255, 0.1);
  border-color: var(--neon-pink);
  color: var(--neon-pink);
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(0, 247, 255, 0.4),
              0 0 40px rgba(255, 0, 247, 0.2);
}

.lang-btn:active {
  transform: translateY(0);
}

.flag {
  font-size: 1.5rem;
  line-height: 1;
  filter: drop-shadow(0 0 5px rgba(0, 247, 255, 0.5));
  transition: transform 0.3s ease;
}

.lang-btn:hover .flag {
  transform: scale(1.2) rotate(10deg);
}

.lang-code {
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
}

.switch-indicator {
  width: 40px;
  height: 20px;
  background: rgba(0, 247, 255, 0.1);
  border: 1px solid var(--neon-blue);
  border-radius: 10px;
  position: relative;
  transition: all 0.3s ease;
}

.dot {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  background: var(--neon-blue);
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px var(--neon-blue);
}

.lang-btn:hover .switch-indicator {
  background: rgba(255, 0, 247, 0.1);
  border-color: var(--neon-pink);
}

.lang-btn:hover .dot {
  background: var(--neon-pink);
  box-shadow: 0 0 15px var(--neon-pink);
}

/* Animación al cambiar */
.lang-btn.switching {
  animation: pulse 0.3s ease;
}

.lang-btn.switching .flag {
  animation: flip 0.6s ease;
}

.lang-btn.switching .dot {
  left: 22px;
  animation: slideRight 0.3s ease;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes flip {
  0%, 100% { transform: rotateY(0deg); }
  50% { transform: rotateY(180deg); }
}

@keyframes slideRight {
  0% { left: 2px; }
  50% { left: 12px; transform: scale(1.2); }
  100% { left: 22px; }
}

/* Responsive */
@media (max-width: 768px) {
  .lang-btn {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
  
  .flag {
    font-size: 1.3rem;
  }
  
  .switch-indicator {
    width: 35px;
    height: 18px;
  }
  
  .dot {
    width: 12px;
    height: 12px;
  }
}

/* Efecto de brillo */
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 247, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(0, 247, 255, 0.6),
                0 0 50px rgba(255, 0, 247, 0.3);
  }
}

.lang-btn:focus {
  outline: none;
  animation: glow 2s infinite;
}
</style>
