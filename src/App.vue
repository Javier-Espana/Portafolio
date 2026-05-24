<template>
  <div id="app">
    <!-- Custom Cursor -->
    <div class="custom-cursor" ref="cursorRef"></div>
    <div class="custom-cursor-follower" ref="cursorFollowerRef"></div>

    <Navbar />
    
    <router-view v-slot="{ Component, route }">
      <transition 
        name="page-fade" 
        mode="out-in"
        @enter="onPageEnter"
      >
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>

    <Footer />

    <!-- Terminal Interactiva -->
    <InteractiveTerminal :isOpen="isTerminalOpen" @close="isTerminalOpen = false" />

    <!-- Cinematic Full Experience -->
    <CinematicMode :isActive="appState.isCinematicMode" @end="handleCinematicEnd" />
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
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
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
  const hoverElements = document.querySelectorAll('a, button, .magnetic, .card')
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)
    el.addEventListener('click', handleMouseClick)
  })
}

const detachHoverListeners = () => {
  const hoverElements = document.querySelectorAll('a, button, .magnetic, .card')
  
  hoverElements.forEach(el => {
    el.removeEventListener('mouseenter', handleMouseEnter)
    el.removeEventListener('mouseleave', handleMouseLeave)
    el.removeEventListener('click', handleMouseClick)
  })
}

const handleMouseEnter = (e) => {
  // Play subtle hover sound
  audioManager.playHover()

  const target = e.currentTarget
  if (cursorFollowerRef.value) {
    gsap.to(cursorFollowerRef.value, {
      scale: target.classList.contains('card') ? 1.5 : 2,
      backgroundColor: 'rgba(108, 99, 255, 0.1)',
      borderColor: 'rgba(108, 99, 255, 0.5)',
      duration: 0.3
    })
  }
  if (cursorRef.value) {
    gsap.to(cursorRef.value, { scale: 0, duration: 0.2 })
  }
}

const handleMouseLeave = () => {
  if (cursorFollowerRef.value) {
    gsap.to(cursorFollowerRef.value, {
      scale: 1,
      backgroundColor: 'transparent',
      borderColor: 'rgba(0, 217, 255, 0.5)',
      duration: 0.3
    })
  }
  if (cursorRef.value) {
    gsap.to(cursorRef.value, { scale: 1, duration: 0.2 })
  }
}

const handleMouseClick = () => {
  audioManager.playClick()
}

const handleGlobalKeydown = (e) => {
  // Abrir terminal con ~ o ` (backtick)
  if (e.key === '`' || e.key === '~') {
    e.preventDefault()
    isTerminalOpen.value = !isTerminalOpen.value
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
  // Inicializar motor de audio
  audioManager.init()

  initCursor()
  window.addEventListener('keydown', handleGlobalKeydown)
  
  router.afterEach(() => {
    onPageEnter()
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('keydown', handleGlobalKeydown)
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
  z-index: 9999;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
}

.custom-cursor-follower {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(0, 217, 255, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
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
  transition: opacity 0.4s var(--ease-smooth), transform 0.4s var(--ease-smooth);
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
