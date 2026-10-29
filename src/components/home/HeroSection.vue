<template>
  <section class="hero" ref="heroRef" @mousemove="handleMouseMove">
    <!-- Particulas Dinamicas Interactivas (particles.js) -->
    <div id="particles-js" class="hero__particles" aria-hidden="true"></div>
    
    <div class="grid-background" aria-hidden="true"></div>

    <div class="hero__content" ref="contentRef" :style="tiltStyle">
      <!-- Greeting badge -->
      <div class="hero__badge gsap-reveal">
        <span class="glow-dot"></span>
        <span>{{ $t('hero.greeting') }} {{ $t('hero.name') }}</span>
      </div>

      <!-- Titulo principal con efecto Scramble (Hacker) -->
      <h1 class="hero__title gsap-reveal" @mouseenter="scrambleName">
        <span class="title-word">{{ scrambledName }}</span>
      </h1>

      <!-- Typewriter -->
      <div class="hero__typewriter gsap-reveal" aria-live="polite">
        <span class="typewriter-prefix">// </span>
        <span class="typewriter-text">{{ displayedText }}</span>
        <span class="typewriter-cursor" aria-hidden="true">|</span>
      </div>

      <!-- Descripcion -->
      <p class="hero__description gsap-reveal">
        {{ $t('hero.subtitle') }}
      </p>

      <!-- Stats -->
      <div class="hero__stats gsap-reveal">
        <div class="stat-item magnetic" data-strength="20">
          <span class="stat-number">8°</span>
          <span class="stat-label">{{ $t('about.semester') }}</span>
        </div>
        <div class="stat-divider" aria-hidden="true"></div>
        <div class="stat-item magnetic" data-strength="20">
          <span class="stat-number">2x</span>
          <span class="stat-label">1.er Lugar BAM</span>
        </div>
        <div class="stat-divider" aria-hidden="true"></div>
        <div class="stat-item magnetic" data-strength="20">
          <span class="stat-number">11+</span>
          <span class="stat-label">{{ $t('about.solar') }}</span>
        </div>
      </div>

      <!-- CTAs -->
      <div class="hero__cta gsap-reveal">
        <router-link to="/projects" class="btn btn-primary magnetic" data-strength="50">
          {{ $t('hero.cta.projects') }}
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </router-link>
        <router-link to="/contact" class="btn btn-secondary magnetic" data-strength="30">
          {{ $t('hero.cta.contact') }}
        </router-link>
      </div>

      <!-- Full Experience Button -->
      <div class="hero__cinematic gsap-reveal">
        <button class="btn-cinematic magnetic" data-strength="20" @click="startCinematic">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          Full Experience
        </button>
        <span class="cinematic-warning">{{ $t('cinematic.warning') }}</span>
      </div>

      <!-- Scroll hint -->
      <div class="hero__scroll gsap-reveal" aria-hidden="true">
        <div class="scroll-mouse">
          <div class="scroll-wheel"></div>
        </div>
        <span>{{ $t('hero.scroll') }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { audioManager } from '../../utils/audioManager'
import { appState } from '../../store/appState'

const { t, tm, locale } = useI18n({ useScope: 'global' })

const startCinematic = () => {
  appState.isCinematicMode = true
}

// ---- Scramble Text Effect (Hacker Effect) ----
const originalName = computed(() => t('hero.name'))
const scrambledName = ref(originalName.value)
const chars = '!<>-_\\/[]{}—=+*^?#________'
let scrambleInterval = null

const scrambleName = () => {
  if (scrambleInterval) clearInterval(scrambleInterval)
  let iterations = 0
  
  audioManager.playScramble()
  
  scrambleInterval = setInterval(() => {
    scrambledName.value = originalName.value.split('').map((char, index) => {
      if (index < iterations) return originalName.value[index]
      if (char === ' ') return ' '
      return chars[Math.floor(Math.random() * chars.length)]
    }).join('')

    if (iterations >= originalName.value.length) {
      clearInterval(scrambleInterval)
      scrambledName.value = originalName.value
    }
    iterations += 1/3
  }, 30)
}

// Scramble at start or language change
watch(originalName, () => {
  scrambledName.value = originalName.value
  scrambleName()
})

// ---- Typewriter logic ----
const displayedText = ref('')
let currentPhraseIndex = 0
let currentCharIndex   = 0
let isDeleting         = false
let typingTimeout      = null

const getPhrases = () => {
  const titles = tm('hero.titles')
  if (!Array.isArray(titles) || titles.length === 0) {
    return locale.value === 'es'
      ? ['Desarrollador Full Stack & Software', 'Especialista en Datos y ML', 'Bicampeón Hackatón BAM 2026', 'Estudiante de Computación @ UVG']
      : ['Full Stack & Software Engineer', 'Data & ML Specialist', '2x BAM Hackathon Winner (2026)', 'Computer Science Student @ UVG']
  }
  return titles
}

const type = () => {
  const phrases = getPhrases()
  const currentPhrase = phrases[currentPhraseIndex]
  if (!currentPhrase) return

  if (isDeleting) {
    currentCharIndex--
    displayedText.value = currentPhrase.substring(0, currentCharIndex)
  } else {
    currentCharIndex++
    displayedText.value = currentPhrase.substring(0, currentCharIndex)
  }

  let delay = isDeleting ? 40 : 85

  if (!isDeleting && currentCharIndex === currentPhrase.length) {
    delay = 2000
    isDeleting = true
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length
    delay = 400
  }

  typingTimeout = setTimeout(type, delay)
}

watch(locale, () => {
  clearTimeout(typingTimeout)
  currentCharIndex = 0
  isDeleting = false
  currentPhraseIndex = 0
  type()
})

// ---- 3D Tilt Effect ----
const heroRef = ref(null)
const contentRef = ref(null)
const mouseX = ref(0)
const mouseY = ref(0)

const tiltStyle = computed(() => {
  const x = mouseX.value
  const y = mouseY.value
  return {
    transform: `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(30px)`,
    transition: 'transform 0.15s ease-out'
  }
})

const handleMouseMove = (e) => {
  if (!heroRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  mouseX.value = (e.clientX - rect.left) / rect.width - 0.5
  mouseY.value = (e.clientY - rect.top) / rect.height - 0.5
}

// Magnetic buttons
const initMagnetics = () => {
  const magnets = document.querySelectorAll('.magnetic')
  magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect()
      const str = parseInt(btn.dataset.strength) || 30
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width * str
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height * str
      gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' })
    })
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    })
  })
}

// Inicializacion de particles.js
const initParticles = () => {
  if (typeof window.particlesJS !== 'undefined') {
    window.particlesJS('particles-js', {
      particles: {
        number: { value: 45, density: { enable: true, value_area: 900 } },
        color: { value: ['#6C63FF', '#00D9FF'] },
        shape: { type: 'circle' },
        opacity: { value: 0.35, random: true },
        size: { value: 2.5, random: true },
        line_linked: {
          enable: true,
          distance: 140,
          color: '#6C63FF',
          opacity: 0.18,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 160, line_linked: { opacity: 0.45 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    })
  }
}

onMounted(() => {
  scrambleName()
  type()
  initMagnetics()
  
  setTimeout(() => {
    initParticles()
  }, 200)

  nextTick(() => {
    gsap.fromTo('.gsap-reveal',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    )
  })
})

onUnmounted(() => {
  if (scrambleInterval) clearInterval(scrambleInterval)
  if (typingTimeout) clearTimeout(typingTimeout)
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 6rem 1.5rem 4rem;
}

.hero__particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 860px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform-style: preserve-3d;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  backdrop-filter: blur(8px);
}

.hero__title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  cursor: default;
  user-select: none;
}

.title-word {
  background: linear-gradient(135deg, #ffffff 40%, var(--accent-cyan) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.hero__typewriter {
  font-family: var(--font-mono);
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  color: var(--accent-cyan);
  margin-bottom: 1.5rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.typewriter-prefix {
  color: var(--text-muted);
  margin-right: 0.25rem;
}

.typewriter-cursor {
  animation: blink 1s step-end infinite;
  color: var(--accent-violet);
  margin-left: 2px;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}

.hero__description {
  font-size: var(--text-base);
  color: var(--text-secondary);
  max-width: 650px;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.hero__stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
  padding: 1rem 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  backdrop-filter: blur(8px);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: var(--text-2xl);
  font-weight: 800;
  color: var(--text-white);
  font-family: var(--font-mono);
}

.stat-label {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.stat-divider {
  width: 1px;
  height: 35px;
  background: var(--border-default);
}

.hero__cta {
  display: flex;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.hero__cinematic {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.btn-cinematic {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.75rem;
  background: linear-gradient(135deg, rgba(108, 99, 255, 0.2), rgba(0, 217, 255, 0.2));
  border: 1px solid var(--accent-cyan);
  border-radius: var(--radius-full);
  color: var(--text-white);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 217, 255, 0.2);
}

.btn-cinematic:hover {
  background: linear-gradient(135deg, var(--accent-violet), var(--accent-cyan));
  box-shadow: 0 0 30px rgba(0, 217, 255, 0.5);
  transform: translateY(-2px);
}

.cinematic-warning {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.hero__scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: var(--text-xs);
}

.scroll-mouse {
  width: 20px;
  height: 32px;
  border: 2px solid var(--text-muted);
  border-radius: var(--radius-full);
  position: relative;
}

.scroll-wheel {
  width: 3px;
  height: 6px;
  background: var(--accent-cyan);
  border-radius: var(--radius-full);
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll-anim 2s infinite;
}

@keyframes scroll-anim {
  0% { transform: translate(-50%, 0); opacity: 1; }
  100% { transform: translate(-50%, 12px); opacity: 0; }
}

@media (max-width: 640px) {
  .hero__stats {
    gap: 1.25rem;
    padding: 0.75rem 1.25rem;
  }
  .stat-number {
    font-size: var(--text-xl);
  }
}
</style>
