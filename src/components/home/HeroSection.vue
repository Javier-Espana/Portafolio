<template>
  <section class="hero">
    <div class="hero__particles" id="particles-js"></div>
    <div class="hero__grid"></div>
    <div class="hero__orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>
    
    <div class="hero__content">
      <p class="hero__greeting">{{ $t('hero.greeting') }}</p>
      
      <h1 class="hero__title glitch" :data-text="$t('hero.name')">
        {{ $t('hero.name') }}
      </h1>
      
      <div class="hero__typewriter">
        <span class="typewriter-text">{{ displayedText }}</span>
        <span class="typewriter-cursor">|</span>
      </div>
      
      <p class="hero__description">
        {{ $t('hero.subtitle') }}
      </p>
      
      <div class="hero__stats">
        <div class="stat">
          <span class="stat-number">6º</span>
          <span class="stat-label">{{ $t('about.semester') }}</span>
        </div>
        <div class="stat">
          <span class="stat-number">11+</span>
          <span class="stat-label">{{ $t('about.solar') }}</span>
        </div>
        <div class="stat">
          <span class="stat-number">∞</span>
          <span class="stat-label">Passion</span>
        </div>
      </div>
      
      <div class="hero__cta">
        <router-link to="/projects" class="btn btn-primary">
          {{ $t('hero.cta.projects') }}
        </router-link>
        <router-link to="/contact" class="btn btn-secondary">
          {{ $t('hero.cta.contact') }}
        </router-link>
      </div>
      
      <div class="hero__scroll">
        <span>{{ $t('hero.scroll') }}</span>
        <div class="hero__scroll-line"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, locale } = useI18n()

const displayedText = ref('')
let currentPhraseIndex = 0
let currentCharIndex = 0
let isDeleting = false
let typingTimeout = null

// Función para obtener las frases actuales
const getPhrases = () => {
  const titles = tm('hero.titles')
  console.log('Getting phrases:', titles, 'Locale:', locale.value)
  
  // Si tm no devuelve un array válido, usar valores por defecto
  if (!Array.isArray(titles) || titles.length === 0) {
    console.warn('Titles not loaded correctly, using fallback')
    return locale.value === 'es' 
      ? [
          'Desarrollador Full Stack',
          'Estudiante de Ciencias de la Computación',
          'Entusiasta del Backend',
          'Amante de IA y Data Science'
        ]
      : [
          'Full Stack Developer',
          'Computer Science Student',
          'Backend Enthusiast',
          'AI & Data Science Lover'
        ]
  }
  
  return titles
}

const type = () => {
  const phrases = getPhrases()
  const currentPhrase = phrases[currentPhraseIndex]
  
  if (!currentPhrase) {
    console.error('No phrase found at index', currentPhraseIndex)
    return
  }
  
  if (isDeleting) {
    currentCharIndex--
    displayedText.value = currentPhrase.substring(0, currentCharIndex)
  } else {
    currentCharIndex++
    displayedText.value = currentPhrase.substring(0, currentCharIndex)
  }
  
  let delay = isDeleting ? 50 : 100
  
  if (!isDeleting && currentCharIndex === currentPhrase.length) {
    delay = 2500 // Pausa al terminar de escribir
    isDeleting = true
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length
    delay = 500 // Pequeña pausa antes de escribir la siguiente frase
  }
  
  typingTimeout = setTimeout(type, delay)
}

// Reiniciar animación cuando cambie el idioma
watch(locale, () => {
  console.log('Locale changed to:', locale.value)
  if (typingTimeout) {
    clearTimeout(typingTimeout)
  }
  currentPhraseIndex = 0
  currentCharIndex = 0
  isDeleting = false
  displayedText.value = ''
  setTimeout(() => {
    type()
  }, 300)
})

onMounted(() => {
  console.log('HeroSection mounted')
  console.log('Initial locale:', locale.value)
  console.log('Initial phrases:', getPhrases())
  
  // Iniciar typewriter después de un pequeño delay
  setTimeout(() => {
    console.log('Starting typewriter animation')
    type()
  }, 500)
  
  // Inicializar particles.js solo si el elemento existe
  const particlesElement = document.getElementById('particles-js')
  if (window.particlesJS && particlesElement) {
    console.log('Initializing particles.js')
    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#00f7ff'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 5
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#00f7ff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    })
  }
})

onUnmounted(() => {
  if (typingTimeout) {
    clearTimeout(typingTimeout)
  }
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 6rem 2rem 2rem;
}

.hero__particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero__grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(var(--neon-blue) 1px, transparent 1px),
    linear-gradient(90deg, var(--neon-blue) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.1;
  animation: grid-move 20s linear infinite;
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 1100px;
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero__greeting {
  font-family: var(--font-text);
  font-size: var(--text-2xl);
  color: var(--neon-green);
  margin-bottom: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 3px;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.hero__title {
  font-family: var(--font-title);
  font-size: clamp(4rem, 10vw, var(--text-7xl));
  font-weight: 900;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, var(--neon-blue), var(--neon-pink), var(--neon-blue));
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 6px;
  animation: shine 4s ease-in-out infinite;
  text-shadow: 0 0 80px rgba(0, 247, 255, 0.5);
  filter: drop-shadow(0 0 30px rgba(0, 247, 255, 0.6));
}

@keyframes shine {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

.hero__typewriter {
  font-family: 'Courier New', monospace;
  font-size: clamp(1.8rem, 5vw, var(--text-4xl));
  color: var(--neon-pink);
  margin-bottom: 2.5rem;
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  font-weight: 600;
  text-shadow: 0 0 20px rgba(255, 0, 247, 0.8);
}

.typewriter-cursor {
  animation: blink 0.8s infinite;
  color: var(--neon-blue);
  font-weight: bold;
  font-size: 1.2em;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero__description {
  font-size: clamp(1.2rem, 2.5vw, var(--text-xl));
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  line-height: 1.8;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.hero__stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 2rem;
  background: rgba(0, 247, 255, 0.05);
  border: 2px solid var(--neon-blue);
  border-radius: 15px;
  transition: all 0.4s ease;
  animation: statFadeIn 1s ease-out backwards;
}

.stat:nth-child(1) { animation-delay: 0.2s; }
.stat:nth-child(2) { animation-delay: 0.4s; }
.stat:nth-child(3) { animation-delay: 0.6s; }

@keyframes statFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.stat:hover {
  transform: translateY(-5px) scale(1.05);
  background: rgba(0, 247, 255, 0.1);
  box-shadow: 0 0 30px rgba(0, 247, 255, 0.5);
  border-color: var(--neon-pink);
}

.stat-number {
  font-family: var(--font-title);
  font-size: var(--text-4xl);
  font-weight: 900;
  color: var(--neon-blue);
  text-shadow: 0 0 20px var(--neon-blue);
}

.stat:hover .stat-number {
  color: var(--neon-pink);
  text-shadow: 0 0 25px var(--neon-pink);
}

.stat-label {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
}

.hero__cta {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 5rem;
  animation: ctaSlideIn 1.2s ease-out backwards;
  animation-delay: 0.8s;
}

@keyframes ctaSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero__scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--text-base);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 600;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero__scroll-line {
  width: 3px;
  height: 50px;
  background: linear-gradient(180deg, var(--neon-blue), transparent);
  animation: scroll-line 2s ease-in-out infinite;
  border-radius: 2px;
  box-shadow: 0 0 10px var(--neon-blue);
}

@keyframes scroll-line {
  0%, 100% {
    transform: translateY(0);
    opacity: 0;
  }
  50% {
    transform: translateY(25px);
    opacity: 1;
  }
}

/* Orbs flotantes de fondo */
.hero__orbs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
  animation: orbFloat 20s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--neon-blue), transparent);
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, var(--neon-pink), transparent);
  bottom: 20%;
  right: 15%;
  animation-delay: 5s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--neon-green), transparent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 10s;
}

@keyframes orbFloat {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(50px, -50px);
  }
  50% {
    transform: translate(-30px, 30px);
  }
  75% {
    transform: translate(30px, 50px);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 5rem 1rem 2rem;
  }
  
  .hero__stats {
    gap: 1.5rem;
  }
  
  .stat {
    padding: 1rem 1.5rem;
  }
  
  .stat-number {
    font-size: var(--text-3xl);
  }
  
  .orb {
    filter: blur(40px);
  }
  
  .orb-1, .orb-2, .orb-3 {
    width: 200px;
    height: 200px;
  }
  
  .hero__title {
    margin-bottom: 1.5rem;
  }
  
  .hero__description {
    margin-bottom: 2rem;
  }
  
  .hero__cta {
    flex-direction: column;
    gap: 1rem;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
