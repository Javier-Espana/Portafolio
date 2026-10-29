<template>
  <div class="global-audio-widget">
    <button
      @click="toggleMute"
      class="audio-toggle-btn"
      :class="{ 'is-muted': isMuted }"
      :title="isMuted ? 'Activar sonido / Unmute audio' : 'Silenciar todo el audio / Mute all audio'"
      :aria-label="isMuted ? 'Activar sonido / Unmute audio' : 'Silenciar todo el audio / Mute all audio'"
      type="button"
    >
      <!-- Icono de sonido activo -->
      <svg v-if="!isMuted" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
      </svg>

      <!-- Icono de sonido silenciado (Mute) -->
      <svg v-else width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H2V9h3.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 14l4-4m0 4l-4-4" />
      </svg>

      <span class="audio-label">{{ isMuted ? 'Muted' : 'Audio' }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { audioManager } from '../../utils/audioManager'

const isMuted = ref(audioManager.isGloballyMuted)

let unsubscribe = null

onMounted(() => {
  unsubscribe = audioManager.subscribe((mutedState) => {
    isMuted.value = mutedState
  })
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})

const toggleMute = () => {
  audioManager.toggleGlobalMute()
}
</script>

<style scoped>
.global-audio-widget {
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  z-index: 9999;
  pointer-events: auto;
}

.audio-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.85rem;
  background: rgba(8, 11, 20, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  user-select: none;
}

.audio-toggle-btn:hover {
  background: rgba(13, 17, 23, 0.95);
  border-color: var(--accent-cyan);
  color: var(--text-white);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 217, 255, 0.25);
}

.audio-toggle-btn.is-muted {
  border-color: rgba(239, 68, 68, 0.4);
  color: #ef4444;
  background: rgba(239, 68, 68, 0.08);
}

.audio-toggle-btn.is-muted:hover {
  border-color: #ef4444;
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
}

.audio-label {
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .global-audio-widget {
    bottom: 1rem;
    left: 1rem;
  }
  
  .audio-label {
    display: none;
  }
  
  .audio-toggle-btn {
    padding: 0.5rem;
    border-radius: 50%;
  }
}
</style>
