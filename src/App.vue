<template>
  <div id="app">
    <!-- Accesibilidad: Saltar al contenido -->
    <a href="#main-content" class="skip-link">Saltar al contenido principal</a>

    <!-- Custom Cursor (decorativo, sin interferir con el ratón del sistema) -->
    <div class="custom-cursor" ref="cursorRef" aria-hidden="true"></div>
    <div class="custom-cursor-follower" ref="cursorFollowerRef" aria-hidden="true"></div>

    <Navbar />
    
    <main id="main-content" role="main">
      <router-view v-slot="{ Component, route }">
        <transition 
          name="page-fade" 
          mode="out-in"
          @enter="onPageEnter"
        >
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <Footer />

    <!-- Terminal Interactiva -->
    <InteractiveTerminal :isOpen="isTerminalOpen" @close="isTerminalOpen = false" />

    <!-- Cinematic Full Experience -->
    <CinematicMode :isActive="appState.isCinematicMode" @end="handleCinematicEnd" />

    <!-- Control de Audio Global (Visible en todo momento, sutil) -->
    <GlobalAudioControl />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import InteractiveTerminal from './components/ui/InteractiveTerminal.vue'
import CinematicMode from './components/ui/CinematicMode.vue'
import GlobalAudioControl from './components/common/GlobalAudioControl.vue'
import { audioManager } from './utils/audioManager'
import { appState } from './store/appState'

gsap.registerPlugin(ScrollTrigger)

const cursorRef = ref(null)
const cursorFollowerRef = ref(null)
const router = useRouter()

const isTerminalOpen = ref(false)

let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0
let reqFrame = null

const initCursor = () => {
  if (typeof window !== 'undefined' && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    window.addEventListener('mousemove', onMouseMove)
    renderCursor()
    attachHoverListeners()
  } else {
    if (cursorRef.value) cursorRef.value.style.display = 'none'
    if (cursorFollowerRef.value) cursorFollowerRef.value.style.display = 'none'
  }
}

const onMouseMove = (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
  
  if (cursorRef.value) {
    gsap.set(cursorRef.value, { x: mouseX, y: mouseY })
  }
}

const renderCursor = () => {
  cursorX += (mouseX - cursorX) * 0.15
  cursorY += (mouseY - cursorY) * 0.15
  
  if (cursorFollowerRef.value) {
    gsap.set(cursorFollowerRef.value, { x: cursorX, y: cursorY })
  }
  
  reqFrame = requestAnimationFrame(renderCursor)
}

const attachHoverListeners = () => {
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .card, .lang-btn, .project-card')
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', handleElementHover)
    el.addEventListener('mouseleave', handleElementLeave)
  })
}

const detachHoverListeners = () => {
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .card, .lang-btn, .project-card')
  interactiveElements.forEach(el => {
    el.removeEventListener('mouseenter', handleElementHover)
    el.removeEventListener('mouseleave', handleElementLeave)
  })
}

const handleElementHover = () => {
  audioManager.playHover()
  if (cursorFollowerRef.value) {
    gsap.to(cursorFollowerRef.value, {
      scale: 1.5,
      borderColor: 'rgba(108, 99, 255, 0.8)',
      backgroundColor: 'rgba(108, 99, 255, 0.1)',
      duration: 0.3
    })
  }
}

const handleElementLeave = () => {
  if (cursorFollowerRef.value) {
    gsap.to(cursorFollowerRef.value, {
      scale: 1,
      borderColor: 'rgba(0, 217, 255, 0.5)',
      backgroundColor: 'transparent',
      duration: 0.3
    })
  }
}

const handleGlobalKeydown = (e) => {
  // Abrir terminal con Ctrl + ` o Alt + T
  if ((e.ctrlKey && e.key === '`') || (e.altKey && e.key.toLowerCase() === 't')) {
    e.preventDefault()
    isTerminalOpen.value = !isTerminalOpen.value
    if (isTerminalOpen.value) audioManager.playTerminalOpen()
  }
}

const onPageEnter = () => {
  nextTick(() => {
    detachHoverListeners()
    attachHoverListeners()
    ScrollTrigger.refresh()
  })
}

const handleCinematicEnd = () => {
  appState.isCinematicMode = false
}

onMounted(() => {
  audioManager.init()
  initCursor()
  window.addEventListener('keydown', handleGlobalKeydown)
  
  router.afterEach(() => {
    onPageEnter()
  })
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('keydown', handleGlobalKeydown)
  }
  cancelAnimationFrame(reqFrame)
  detachHoverListeners()
})
</script>

<style>
/* ---- Custom Cursor Styles ---- */
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  background-color: var(--accent-cyan);
  border-radius: 50%;
  pointer-events: none;
  z-index: 100002;
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
}

.custom-cursor-follower {
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(0, 217, 255, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 100001;
  transform: translate(-50%, -50%);
  transition: background-color 0.3s, border-color 0.3s;
}

@media (max-width: 768px) {
  .custom-cursor, .custom-cursor-follower {
    display: none !important;
  }
}

/* ---- Page Transitions ---- */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.35s var(--ease-smooth), transform 0.35s var(--ease-smooth);
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
