<template>
  <section class="hero" ref="heroRef" @mousemove="handleMouseMove">
    <!-- Partículas Dinámicas Interactivas (particles.js) -->
    <div id="particles-js" class="hero__particles" aria-hidden="true"></div>
    
    <div class="grid-background" aria-hidden="true"></div>

    <div class="hero__content" ref="contentRef" :style="tiltStyle">
      <!-- Greeting badge -->
      <div class="hero__badge gsap-reveal">
        <span class="glow-dot"></span>
        <span>{{ $t('hero.greeting') }} Javier España</span>
      </div>

      <!-- Título principal con efecto Scramble (Hacker) -->
      <h1 class="hero__title gsap-reveal" @mouseenter="scrambleName">
        <span class="title-word">{{ scrambledName }}</span>
      </h1>

      <!-- Typewriter -->
      <div class="hero__typewriter gsap-reveal" aria-live="polite">
        <span class="typewriter-prefix">// </span>
        <span class="typewriter-text">{{ displayedText }}</span>
        <span class="typewriter-cursor" aria-hidden="true">|</span>
      </div>

      <!-- Descripción -->
      <p class="hero__description gsap-reveal">
        {{ $t('hero.subtitle') }}
      </p>

      <!-- Stats -->
      <div class="hero__stats gsap-reveal">
        <div class="stat-item magnetic" data-strength="20">
          <span class="stat-number">7°</span>
          <span class="stat-label">{{ $t('about.semester') }}</span>
        </div>
        <div class="stat-divider" aria-hidden="true"></div>
        <div class="stat-item magnetic" data-strength="20">
          <span class="stat-number">11+</span>
          <span class="stat-label">{{ $t('about.solar') }}</span>
        </div>
        <div class="stat-divider" aria-hidden="true"></div>
        <div class="stat-item magnetic" data-strength="20">
          <span class="stat-number">∞</span>
          <span class="stat-label">Passion</span>
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

const { t, tm, locale } = useI18n()

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
    iterations += 1/3 // Velocidad de resolución
  }, 30)
}

// Scramble at start
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
      ? ['Desarrollador Full Stack', 'Estudiante de Computación', 'Entusiasta del Backend', 'Amante de IA']
      : ['Full Stack Developer', 'CS Student', 'Backend Enthusiast', 'AI Lover']
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
    delay = 2200
    isDeleting = true
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length
    delay = 400
  }

  typingTimeout = setTimeout(type, delay)
}

const resetTypewriter = () => {
  if (typingTimeout) clearTimeout(typingTimeout)
  currentPhraseIndex = 0
  currentCharIndex   = 0
  isDeleting         = false
  displayedText.value = ''
  setTimeout(type, 300)
}

watch(locale, resetTypewriter)

// ---- Interactividad (3D Tilt) ----
const heroRef = ref(null)
const contentRef = ref(null)
const mouseX = ref(0)
const mouseY = ref(0)
const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)

const handleMouseMove = (e) => {
  // Coordenadas normalizadas (-1 a 1)
  mouseX.value = (e.clientX / windowWidth.value) * 2 - 1
  mouseY.value = (e.clientY / windowHeight.value) * 2 - 1
}

const tiltStyle = computed(() => ({
  transform: `perspective(1000px) rotateY(${mouseX.value * 4}deg) rotateX(${mouseY.value * -4}deg) translateZ(10px)`
}))

// ---- Inicialización ----
onMounted(() => {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  })

  setTimeout(type, 600)
  setTimeout(scrambleName, 100)

  // Iniciar Particles.js (El script global se carga en index.html)
  if (window.particlesJS) {
    window.particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: ["#6C63FF", "#00D9FF", "#E2E8F0"] },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#6C63FF",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 200, line_linked: { opacity: 0.5 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    })
  }

  // GSAP Reveal Sequence
  nextTick(() => {
    // Para asegurarnos que se vea si falla GSAP, inicializamos opacity en 1 en CSS y usamos .from
    gsap.from('.gsap-reveal', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.2
    })
  })
})

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout)
  if (scrambleInterval) clearInterval(scrambleInterval)
})
</script>

<style scoped>
/* ---- Sección ---- */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 7rem 2rem 4rem;
}

/* ---- Partículas Background ---- */
.hero__particles {
  position: absolute;
  inset: 0;
  z-index: 0;
}

/* ---- Contenido ---- */
.hero__content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 800px;
  width: 100%;
  transition: transform 0.1s linear;
  transform-style: preserve-3d;
}

.title-word { display: inline-block; }

/* ---- Badge greeting ---- */
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1rem;
  background: var(--accent-violet-10);
  border: 1px solid rgba(108, 99, 255, 0.25);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--accent-violet);
  margin-bottom: 1.5rem;
  transform: translateZ(30px);
}

/* ---- Título ---- */
.hero__title {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin-bottom: 1.25rem;
  background: linear-gradient(135deg, var(--text-white) 30%, var(--text-secondary) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 0.2em;
  transform: translateZ(50px);
  cursor: default;
}

/* ---- Typewriter ---- */
.hero__typewriter {
  font-family: var(--font-mono);
  font-size: clamp(1rem, 2.5vw, 1.375rem);
  color: var(--accent-cyan);
  margin-bottom: 1.5rem;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
  transform: translateZ(20px);
}

.typewriter-prefix { color: var(--text-muted); font-weight: 500; }
.typewriter-text { color: var(--accent-cyan); font-weight: 500; }
.typewriter-cursor {
  color: var(--accent-violet);
  font-weight: 300;
  animation: blink 0.9s step-end infinite;
}

@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

/* ---- Descripción ---- */
.hero__description {
  font-size: clamp(0.9rem, 1.8vw, var(--text-lg));
  color: var(--text-secondary);
  max-width: 620px;
  margin: 0 auto 2.5rem;
  line-height: 1.8;
  transform: translateZ(20px);
}

/* ---- Stats ---- */
.hero__stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  transform: translateZ(30px);
}

.stat-item { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 0.25rem;
  padding: 1rem;
  border-radius: var(--radius-md);
  transition: background 0.3s ease;
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.03);
}

.stat-number {
  font-size: var(--text-3xl);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, var(--accent-violet), var(--accent-cyan));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}
.stat-label { font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase; font-weight: 600; }
.stat-divider { width: 1px; height: 40px; background: var(--border-default); }

/* ---- CTAs ---- */
.hero__cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  transform: translateZ(40px);
}

/* ---- Cinematic ---- */
.hero__cinematic {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 4rem;
  transform: translateZ(30px);
}

.btn-cinematic {
  background: linear-gradient(135deg, rgba(255, 95, 86, 0.1), rgba(255, 95, 86, 0.2));
  border: 1px solid rgba(255, 95, 86, 0.5);
  color: #FF5F56;
  padding: 0.75rem 2rem;
  border-radius: var(--radius-full);
  font-size: var(--text-base);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 95, 86, 0.2);
}

.btn-cinematic:hover {
  background: linear-gradient(135deg, rgba(255, 95, 86, 0.2), rgba(255, 95, 86, 0.4));
  box-shadow: 0 0 30px rgba(255, 95, 86, 0.4);
  transform: scale(1.05);
}

.cinematic-warning {
  font-size: var(--text-xs);
  color: var(--text-muted);
  font-family: var(--font-mono);
}

/* ---- Scroll indicator ---- */
.hero__scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-muted);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  animation: floatY 3s ease-in-out infinite;
}

.scroll-mouse {
  width: 22px;
  height: 36px;
  border: 2px solid var(--border-default);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}
.scroll-wheel {
  width: 3px;
  height: 8px;
  background: var(--accent-violet);
  border-radius: 2px;
  animation: scrollWheel 1.8s ease-in-out infinite;
}

@keyframes scrollWheel { 0% { transform: translateY(0); opacity: 1; } 80% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 0; } }

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .hero { padding: 6rem 1rem 3rem; }
  .hero__stats { gap: 1.5rem; }
  .stat-divider { display: none; }
  .hero__cta { flex-direction: column; align-items: center; }
  .hero__cta .btn { width: 100%; max-width: 280px; justify-content: center; }
  .hero__content { transform: none !important; }
}
</style>
