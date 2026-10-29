<template>
  <transition name="cinematic-fade">
    <div v-if="isActive" class="cinematic-root" role="dialog" aria-modal="true">
      <!-- Canvas de estrellas y partículas warp speed -->
      <canvas ref="particleCanvas" class="particle-canvas"></canvas>

      <!-- Overlay de resplandor ambiental y grid 3D -->
      <div class="cinema-ambient-glow"></div>
      <div class="cinema-perspective-grid"></div>

      <!-- Barra superior estilo película con HUD -->
      <div class="cinema-bar cinema-bar-top" ref="barTop">
        <div class="cinema-hud-left">
          <span class="hud-tag">MISSION // JAVIER_ESPAÑA_PORTFOLIO</span>
          <span class="hud-coords">8° CICLO · UVG · BAM BICAMPEÓN</span>
        </div>
        <div class="cinema-hud-right">
          <span class="hud-fps">60 FPS // ULTRA HD</span>
        </div>
      </div>

      <!-- Barra inferior con controles y timeline -->
      <div class="cinema-bar cinema-bar-bottom" ref="barBottom">
        <div class="cinema-controls">
          <span class="cinema-status">
            <span class="recording-dot"></span>
            {{ t('cinematic.statusLabel') }}
          </span>
          <div class="cinema-progress-wrap">
            <div class="cinema-progress-bar">
              <div class="cinema-progress-fill" ref="progressFill"></div>
            </div>
            <span class="cinema-timer" ref="timerEl">0:00</span>
          </div>
          <button class="btn-skip" @click="endCinematicEarly">
            {{ t('cinematic.skipBtn') }}
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <!-- CONTENEDOR DE ESCENAS -->
      <div class="scenes-container">

        <!-- ESCENA 0: Intro Épico -->
        <div class="scene" ref="scene0">
          <div class="scene-scanlines"></div>
          <div class="intro-content">
            <div class="intro-tagline-glow">// SOFTWARE ENGINEER & DATA SCIENTIST</div>
            <div class="intro-label" ref="introLabel">{{ t('hero.name') }}</div>
            <div class="intro-subtitle" ref="introSubtitle">{{ t('cinematic.scene0.subtitle') }}</div>
            <div class="intro-university" ref="introUniversity">{{ t('cinematic.scene0.university') }}</div>
            <div class="intro-badges">
              <span class="badge-epic">🏆 1.er Lugar Hackatón BAM Oct 2026</span>
              <span class="badge-epic">🏆 1.er Lugar Hackatón BAM Abr 2026</span>
            </div>
          </div>
          <div class="corner corner-tl"></div>
          <div class="corner corner-tr"></div>
          <div class="corner corner-bl"></div>
          <div class="corner corner-br"></div>
        </div>

        <!-- ESCENA 1: Metricas y Logros Clave -->
        <div class="scene" ref="scene1">
          <div class="scene-bg-text">UVG</div>
          <div class="stats-hero" ref="statsWrap">
            <div class="stat-mega">
              <span class="stat-num" ref="stNum0">8°</span>
              <span class="stat-lbl">{{ t('cinematic.scene1.label1') }} (UVG)</span>
            </div>
            <div class="stats-divider-v"></div>
            <div class="stat-mega gold-glow">
              <span class="stat-num" ref="stNum1">2x</span>
              <span class="stat-lbl">1.os Lugares BAM 2026</span>
            </div>
            <div class="stats-divider-v"></div>
            <div class="stat-mega cyan-glow">
              <span class="stat-num" ref="stNum2">92%</span>
              <span class="stat-lbl">Eficiencia LightGBM</span>
            </div>
          </div>
          <div class="scene-tagline" ref="sc1Tagline">{{ t('cinematic.scene1.tagline') }}</div>
          <div class="tech-tags-float">
            <span v-for="tag in techTags" :key="tag" class="tech-float-tag">{{ tag }}</span>
          </div>
        </div>

        <!-- ESCENA 2: Arsenal Técnico & Machine Learning -->
        <div class="scene scene-skills-layout" ref="scene2">
          <div class="scene-left-panel" ref="sc2Left">
            <span class="scene-label">{{ t('cinematic.scene2.label') }}</span>
            <h2 class="scene-h2">{{ t('cinematic.scene2.title') }}<br><em>{{ t('cinematic.scene2.title2') }}</em></h2>
            <div class="skills-bars-epic">
              <div v-for="sk in epicSkills" :key="sk.name" class="sbe-row">
                <div class="sbe-header">
                  <span class="sbe-name">{{ sk.name }}</span>
                  <span class="sbe-pct" :ref="el => sbeRefs[sk.name] = el">{{ sk.level }}%</span>
                </div>
                <div class="sbe-track"><div class="sbe-fill" :data-level="sk.level" style="width:0"></div></div>
              </div>
            </div>
          </div>
          <div class="scene-right-panel" ref="sc2Right">
            <svg viewBox="0 0 380 380" class="radar-cinematic" ref="radarSvg">
              <defs>
                <filter id="cglow">
                  <feGaussianBlur stdDeviation="5" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <g transform="translate(190,190)">
                <circle v-for="i in 5" :key="i" :r="(160*i/5)" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
                <line v-for="(_, i) in epicSkills" :key="`ax${i}`" x1="0" y1="0" :x2="radarAxis(i).x" :y2="radarAxis(i).y" stroke="rgba(108,99,255,0.3)" stroke-width="1"/>
                <polygon :points="radarPolygon" fill="rgba(108,99,255,0.22)" stroke="#00D9FF" stroke-width="2" filter="url(#cglow)" class="radar-poly"/>
                <circle v-for="(p,i) in radarPoints" :key="`rp${i}`" :cx="p.x" :cy="p.y" r="6" fill="#00D9FF" filter="url(#cglow)"/>
                <text v-for="(sk,i) in epicSkills" :key="`rl${i}`" :x="radarLabelPos(i).x" :y="radarLabelPos(i).y" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="600" font-family="var(--font-mono)">{{ sk.name }}</text>
              </g>
            </svg>
          </div>
        </div>

        <!-- ESCENA 3: Proyectos Ganadores en Producción -->
        <div class="scene" ref="scene3">
          <div class="scene-header-centered" ref="sc3Header">
            <span class="scene-label">{{ t('cinematic.scene3.label') }}</span>
            <h2 class="scene-h2">{{ t('cinematic.scene3.title') }}<br><em>{{ t('cinematic.scene3.title2') }}</em></h2>
          </div>
          <div class="projects-epic-grid">
            <div v-for="(proj, i) in showcaseProjects" :key="i" class="proj-epic" :ref="el => projRefs[i] = el">
              <div class="proj-badge-trophy" v-if="proj.award">🏆 {{ proj.award }}</div>
              <div class="proj-epic-num">0{{ i+1 }}</div>
              <h3>{{ proj.name }}</h3>
              <p>{{ proj.desc }}</p>
              <div class="proj-epic-tags">
                <span v-for="tg in proj.tags" :key="tg">{{ tg }}</span>
              </div>
              <div class="proj-epic-glow"></div>
            </div>
          </div>
        </div>

        <!-- ESCENA 4: Experiencia Profesional -->
        <div class="scene" ref="scene4">
          <div class="scene-left-panel" ref="sc4Left">
            <span class="scene-label">{{ t('cinematic.scene4.label') }}</span>
            <h2 class="scene-h2">{{ t('cinematic.scene4.title') }}</h2>
          </div>
          <div class="exp-timeline-epic" ref="expTimeline">
            <div class="exp-item" v-for="(exp, i) in experienceItems" :key="i">
              <div class="exp-dot"></div>
              <div class="exp-text">
                <strong>{{ exp.title }}</strong>
                <em>{{ exp.company }} · <span class="exp-time">{{ exp.period }}</span></em>
                <p>{{ exp.desc }}</p>
              </div>
            </div>
            <div class="exp-line" ref="expLine"></div>
          </div>
        </div>

        <!-- ESCENA 5: Logros y Reconocimientos -->
        <div class="scene" ref="scene5">
          <div class="scene-header-centered" ref="sc5Header">
            <span class="scene-label">{{ t('cinematic.scene5.label') }}</span>
            <h2 class="scene-h2">{{ t('cinematic.scene5.title') }}<br><em>{{ t('cinematic.scene5.title2') }}</em></h2>
          </div>
          <div class="achievements-grid">
            <div class="ach-card gold-border" ref="ach0">
              <div class="ach-icon">🥇</div>
              <strong>1.er Lugar Hackatón BAM (Oct 2026)</strong>
              <em>Banco Agromercantil · Cobranza</em>
              <p>Optimización LightGBM + resolvedor de direcciones: 92% de promesas con solo 30% de llamadas.</p>
            </div>
            <div class="ach-card gold-border" ref="ach1">
              <div class="ach-icon">🥇</div>
              <strong>1.er Lugar Hackatón BAM (Abr 2026)</strong>
              <em>Banco Agromercantil · NLP Real-Time</em>
              <p>Clasificador de servicio al cliente con embeddings Jina v5-nano, Platt scaling, Docker y Grafana.</p>
            </div>
            <div class="ach-card" ref="ach2">
              <div class="ach-icon">🥈</div>
              <strong>2.º Lugar Hackatón BAM (2025)</strong>
              <em>Banco Agromercantil · Forecasting</em>
              <p>Pipeline semanal con Apache Airflow, Docker Compose, Optuna, LightGBM y Streamlit.</p>
            </div>
            <div class="ach-card" ref="ach3">
              <div class="ach-icon">🎖️</div>
              <strong>Honor al Mérito Académico</strong>
              <em>Universidad del Valle de Guatemala</em>
              <p>Máximo reconocimiento UVG (2025), Distinción Académica (2024) y Mención (2023).</p>
            </div>
          </div>
        </div>

        <!-- ESCENA 6: Historia y Filosofía de Ingeniería -->
        <div class="scene" ref="scene6">
          <div class="origin-content">
            <span class="scene-label" ref="sc6Label">{{ t('cinematic.scene6.label') }}</span>
            <blockquote class="origin-quote" ref="originQuote">{{ t('cinematic.scene6.quote') }}</blockquote>
            <div class="traits-wrap" ref="traitsWrap">
              <div v-for="trait in (tm('cinematic.scene6.traits') || [])" :key="trait" class="trait-pill">{{ trait }}</div>
            </div>
          </div>
          <div class="code-rain-bg" aria-hidden="true" ref="codeRain"></div>
        </div>

        <!-- ESCENA 7: Cierre Épico y Conexión -->
        <div class="scene" ref="scene7">
          <div class="end-wrap">
            <div class="end-thanks" ref="endThanks">{{ t('cinematic.scene7.thanksLabel') }}</div>
            <div class="end-name" ref="endName">{{ t('hero.name') }}</div>
            <div class="end-role" ref="endRole">FULL STACK & MACHINE LEARNING ENGINEER</div>
            <div class="end-ctas" ref="endCtas">
              <router-link to="/projects" class="end-btn" @click="endCinematicEarly">{{ t('cinematic.scene7.cta1') }}</router-link>
              <router-link to="/contact" class="end-btn end-btn-out" @click="endCinematicEarly">{{ t('cinematic.scene7.cta2') }}</router-link>
            </div>
          </div>
          <div class="end-bg-code" aria-hidden="true" ref="endBgCode"><pre>{{ endCode }}</pre></div>
          <div class="end-glow-orb" ref="endGlow"></div>
        </div>

      </div><!-- /scenes-container -->
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { audioManager } from '../../utils/audioManager'

const { t, tm, locale } = useI18n({ useScope: 'global' })

const props = defineProps({ isActive: Boolean })
const emit = defineEmits(['end'])

// DOM refs
const particleCanvas = ref(null)
const barTop = ref(null)
const barBottom = ref(null)
const progressFill = ref(null)
const timerEl = ref(null)

const scene0 = ref(null)
const scene1 = ref(null)
const scene2 = ref(null)
const scene3 = ref(null)
const scene4 = ref(null)
const scene5 = ref(null)
const scene6 = ref(null)
const scene7 = ref(null)

const introLabel = ref(null)
const introSubtitle = ref(null)
const introUniversity = ref(null)

const statsWrap = ref(null)
const stNum0 = ref(null)
const stNum1 = ref(null)
const stNum2 = ref(null)
const sc1Tagline = ref(null)

const sc2Left = ref(null)
const sc2Right = ref(null)
const radarSvg = ref(null)

const sc3Header = ref(null)
const projRefs = ref([])

const sc4Left = ref(null)
const expTimeline = ref(null)
const expLine = ref(null)

const sc5Header = ref(null)
const ach0 = ref(null)
const ach1 = ref(null)
const ach2 = ref(null)
const ach3 = ref(null)

const sc6Label = ref(null)
const originQuote = ref(null)
const traitsWrap = ref(null)
const codeRain = ref(null)

const endThanks = ref(null)
const endName = ref(null)
const endRole = ref(null)
const endCtas = ref(null)
const endBgCode = ref(null)
const endGlow = ref(null)

const sbeRefs = ref({})

// Duración optimizada dinámica (75s en total para una experiencia ágil y electrizante)
const TOTAL = 75

const epicSkills = [
  { name: 'Machine Learning', level: 95 },
  { name: 'Backend & APIs',  level: 92 },
  { name: 'Data Pipelines',  level: 90 },
  { name: 'Full-Stack Web',  level: 88 },
  { name: 'Docker & DevOps', level: 86 },
  { name: 'Low-Level / ARM', level: 85 }
]

const radarVisible = ref(false)
const radarPoints = computed(() => epicSkills.map((sk, i) => {
  const a = (Math.PI * 2 * i) / epicSkills.length - Math.PI / 2
  const r = radarVisible.value ? (160 * sk.level / 100) : 0
  return { x: Math.cos(a) * r, y: Math.sin(a) * r }
}))
const radarPolygon = computed(() => radarPoints.value.map(p => `${p.x},${p.y}`).join(' '))
const radarAxis = (i) => { const a = (Math.PI * 2 * i) / 6 - Math.PI / 2; return { x: Math.cos(a) * 160, y: Math.sin(a) * 160 } }
const radarLabelPos = (i) => { const a = (Math.PI * 2 * i) / 6 - Math.PI / 2; return { x: Math.cos(a) * 188, y: Math.sin(a) * 188 + 4 } }

const techTags = ['Python', 'Go', 'Rust', 'LightGBM', 'Apache Airflow', 'Docker', 'Vue.js', 'PostgreSQL', 'FastAPI', 'Grafana', 'ARM Assembler', 'Streamlit']

const showcaseProjects = computed(() => [
  {
    name: 'Optimización de Cobranza',
    award: '1.er Lugar BAM Oct 2026',
    desc: 'LightGBM + resolvedor de direcciones en Guatemala. 92% de promesas de pago con solo el 30% de llamadas del call center.',
    tags: ['Python', 'LightGBM', 'Optuna', 'Data Science']
  },
  {
    name: 'Clasificador NLP Servicio al Cliente',
    award: '1.er Lugar BAM Abr 2026',
    desc: 'Embeddings Jina v5-nano, SVC calibrado Platt scaling en tiempo real, worker en Docker y dashboard Grafana.',
    tags: ['NLP', 'Jina AI', 'Docker', 'Grafana', 'HuggingFace']
  },
  {
    name: 'Forecasting de Tarjetas de Crédito',
    award: '2.º Lugar BAM 2025',
    desc: 'Pipeline semanal orquestado con Apache Airflow, Docker Compose, modelos LightGBM y dashboard en Streamlit.',
    tags: ['Apache Airflow', 'LightGBM', 'PostgreSQL', 'Streamlit']
  },
  {
    name: 'Optyma CRM Clínica Oftalmológica',
    award: 'Producción Web',
    desc: 'Microservicios en Go (Echo), frontend en Vue.js (Vite), PostgreSQL, almacenamiento MinIO/S3 y CI/CD con GitHub Actions.',
    tags: ['Go', 'Vue.js', 'Docker', 'PostgreSQL', 'MinIO/S3']
  }
])

const experienceItems = [
  {
    title: 'Pasante, Analítica de Riesgos',
    company: 'Banco Agromercantil de Guatemala (BAM)',
    period: 'Ene 2026 – Jul 2026',
    desc: 'Desarrollo de pipelines predictivos, automatización de evaluación crediticia e inteligencia de riesgos con Python, SQL y LightGBM.'
  },
  {
    title: 'Maestro Auxiliar (Organización de Computadoras y Assembler)',
    company: 'Universidad del Valle de Guatemala',
    period: 'Ene 2025 – Nov 2025',
    desc: 'Docencia en arquitectura de procesadores ARM, jerarquías de memoria, depuración en bajo nivel y programación en C.'
  },
  {
    title: 'Desarrollador de Arquitectura Full-Stack',
    company: 'Optyma Clínica Oftalmológica y Óptica',
    period: '2024 – 2025',
    desc: 'Implementación de plataforma médica de microservicios con Go Echo, Vue.js, Docker, buckets S3 y testing automatizado.'
  }
]

const endCode = `const javierEspana = {
  universidad: 'Universidad del Valle de Guatemala',
  ciclo: 8,
  logros: [
    '1.er Lugar Hackaton BAM Octubre 2026 (Cobranza)',
    '1.er Lugar Hackaton BAM Abril 2026 (NLP)',
    '2.º Lugar Hackaton BAM 2025 (Forecasting)',
    'Honor al Merito Academico UVG (2025)'
  ],
  skills: ['Python', 'Go', 'Rust', 'LightGBM', 'Airflow', 'Vue.js', 'Docker'],
  status: 'Available for High-Impact Roles'
};`

// Partículas Warp Speed
let particleCtx = null, particleAnim = null, stars = []

const initParticles = () => {
  const canvas = particleCanvas.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  particleCtx = canvas.getContext('2d')
  
  const count = 150
  stars = Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * canvas.width,
    y: (Math.random() - 0.5) * canvas.height,
    z: Math.random() * canvas.width,
    color: Math.random() > 0.4 ? '#00D9FF' : '#6C63FF'
  }))

  const cx = canvas.width / 2
  const cy = canvas.height / 2

  const tick = () => {
    particleCtx.fillStyle = 'rgba(8, 11, 20, 0.25)'
    particleCtx.fillRect(0, 0, canvas.width, canvas.height)

    stars.forEach(star => {
      star.z -= 4
      if (star.z <= 0) {
        star.z = canvas.width
        star.x = (Math.random() - 0.5) * canvas.width
        star.y = (Math.random() - 0.5) * canvas.height
      }

      const k = 250 / star.z
      const px = star.x * k + cx
      const py = star.y * k + cy

      if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
        const size = Math.max((1 - star.z / canvas.width) * 3, 0.5)
        particleCtx.beginPath()
        particleCtx.arc(px, py, size, 0, Math.PI * 2)
        particleCtx.fillStyle = star.color
        particleCtx.shadowBlur = 8
        particleCtx.shadowColor = star.color
        particleCtx.fill()
      }
    })

    particleAnim = requestAnimationFrame(tick)
  }
  tick()
}

// Timer
let progressInterval = null, masterTL = null

const startProgressTimer = () => {
  let elapsed = 0
  progressInterval = setInterval(() => {
    elapsed++
    if (progressFill.value) progressFill.value.style.width = Math.min((elapsed / TOTAL) * 100, 100) + '%'
    if (timerEl.value) {
      const m = Math.floor(elapsed / 60)
      const s = elapsed % 60
      timerEl.value.textContent = `${m}:${s.toString().padStart(2, '0')}`
    }
    if (elapsed >= TOTAL) {
      clearInterval(progressInterval)
      endCinematic()
    }
  }, 1000)
}

// Timeline Principal Fluido y Dinámico (~75s)
const buildTimeline = () => {
  masterTL = gsap.timeline()
  const allScenes = [scene0.value, scene1.value, scene2.value, scene3.value, scene4.value, scene5.value, scene6.value, scene7.value]
  gsap.set(allScenes, { autoAlpha: 0 })
  radarVisible.value = false

  // Escena 0: Intro (0-10s)
  masterTL
    .set(scene0.value, { autoAlpha: 1 })
    .fromTo(introLabel.value, { scale: 0.6, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' })
    .fromTo(introSubtitle.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .fromTo(introUniversity.value, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .fromTo('.badge-epic', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.2, duration: 0.6, ease: 'back.out(2)' }, '-=0.2')
    .to(scene0.value, { autoAlpha: 0, scale: 1.05, duration: 0.8 }, '+=6')

  // Escena 1: Métricas de Alto Impacto (10-20s)
  masterTL
    .set(scene1.value, { autoAlpha: 1 })
    .fromTo('.scene-bg-text', { scale: 4, opacity: 0 }, { scale: 1, opacity: 0.08, duration: 1.5, ease: 'power4.out' })
    .fromTo('.stat-mega', { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: 'back.out(1.8)' }, '<+0.2')
    .fromTo(sc1Tagline.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
    .fromTo('.tech-float-tag', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, stagger: 0.06, duration: 0.5, ease: 'back.out(2)' }, '<')
    .to(scene1.value, { autoAlpha: 0, duration: 0.8 }, '+=6')

  // Escena 2: Arsenal Técnico y Radar (20-31s)
  masterTL
    .set(scene2.value, { autoAlpha: 1 })
    .fromTo(sc2Left.value, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' })
    .call(() => { radarVisible.value = true }, [], '<+0.2')
    .fromTo('.radar-poly', { scale: 0, transformOrigin: '190px 190px' }, { scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.4)' }, '<')
    .fromTo('.sbe-row', { x: -30, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, '<+0.3')
    .call(() => {
      document.querySelectorAll('.sbe-fill').forEach(bar => {
        gsap.to(bar, { width: bar.dataset.level + '%', duration: 1.5, ease: 'power2.out' })
      })
    })
    .to(scene2.value, { autoAlpha: 0, duration: 0.8 }, '+=7')

  // Escena 3: Proyectos Ganadores en Producción (31-43s)
  masterTL
    .set(scene3.value, { autoAlpha: 1 })
    .fromTo(sc3Header.value, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
    .fromTo(projRefs.value, { y: 70, opacity: 0, rotateX: 20 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out' }, '<+0.2')
    .to(scene3.value, { autoAlpha: 0, duration: 0.8 }, '+=8')

  // Escena 4: Trayectoria y Experiencia (43-53s)
  masterTL
    .set(scene4.value, { autoAlpha: 1 })
    .fromTo(sc4Left.value, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
    .fromTo(expLine.value, { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: 'power2.inOut', transformOrigin: 'top center' }, '<+0.2')
    .fromTo('.exp-item', { x: 40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.25, duration: 0.8, ease: 'back.out(1.4)' }, '<+0.2')
    .to(scene4.value, { autoAlpha: 0, duration: 0.8 }, '+=7')

  // Escena 5: Premios y Distinciones (53-63s)
  masterTL
    .set(scene5.value, { autoAlpha: 1 })
    .fromTo(sc5Header.value, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
    .fromTo('.ach-card', { scale: 0.85, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(1.5)' }, '<+0.2')
    .to(scene5.value, { autoAlpha: 0, duration: 0.8 }, '+=6')

  // Escena 6: Filosofía (63-69s)
  masterTL
    .set(scene6.value, { autoAlpha: 1 })
    .fromTo(originQuote.value, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' })
    .fromTo('.trait-pill', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(2)' }, '<+0.3')
    .to(scene6.value, { autoAlpha: 0, duration: 0.8 }, '+=4.5')

  // Escena 7: Conexión Final y CTA (69-75s)
  masterTL
    .set(scene7.value, { autoAlpha: 1 })
    .fromTo(endName.value, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power4.out' })
    .fromTo(endRole.value, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .fromTo(endCtas.value, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.8)' }, '-=0.2')
    .fromTo(endBgCode.value, { opacity: 0, y: 30 }, { opacity: 0.45, y: 0, duration: 1, ease: 'power2.out' }, '<')
}

// Ciclo de vida
watch(() => props.isActive, (active) => {
  if (active) {
    document.body.style.overflow = 'hidden'
    nextTick(() => {
      initParticles()
      gsap.fromTo(barTop.value, { y: '-100%' }, { y: 0, duration: 0.8, ease: 'power4.out' })
      gsap.fromTo(barBottom.value, { y: '100%' }, { y: 0, duration: 0.8, ease: 'power4.out' })

      // Iniciar tema musical si no está silenciado
      audioManager.playCinematicTheme()

      startProgressTimer()
      setTimeout(buildTimeline, 600)
    })
  } else {
    document.body.style.overflow = ''
    endCinematicEarly()
  }
})

const endCinematicEarly = () => {
  if (masterTL) masterTL.kill()
  audioManager.stopCinematicTheme()
  clearInterval(progressInterval)
  if (particleAnim) cancelAnimationFrame(particleAnim)
  endCinematic()
}

const endCinematic = () => {
  gsap.to(barTop.value, { y: '-100%', duration: 0.6, ease: 'power4.in' })
  gsap.to(barBottom.value, { y: '100%', duration: 0.6, ease: 'power4.in' })
  gsap.to('.cinematic-root', {
    opacity: 0,
    duration: 0.6,
    onComplete: () => {
      document.body.style.overflow = ''
      emit('end')
    }
  })
}

onUnmounted(() => {
  endCinematicEarly()
})
</script>

<style scoped>
.cinematic-root {
  position: fixed;
  inset: 0;
  background-color: #05070d;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: var(--font-sans);
  color: var(--text-primary);
}

.particle-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.cinema-ambient-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(108, 99, 255, 0.15) 0%, rgba(0, 217, 255, 0.08) 50%, transparent 70%);
  filter: blur(60px);
  z-index: 2;
  pointer-events: none;
  animation: pulse-ambient 6s ease-in-out infinite alternate;
}

@keyframes pulse-ambient {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.3); opacity: 0.85; }
}

.cinema-bar {
  position: absolute;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(5, 7, 13, 0.95);
  backdrop-filter: blur(16px);
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  border-color: rgba(255, 255, 255, 0.08);
}

.cinema-bar-top {
  top: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  justify-content: space-between;
}

.hud-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-cyan);
  letter-spacing: 0.1em;
  font-weight: 700;
  margin-right: 1.5rem;
}

.hud-coords, .hud-fps {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
}

.cinema-bar-bottom {
  bottom: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  justify-content: center;
}

.cinema-controls {
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.cinema-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-white);
}

.recording-dot {
  width: 8px;
  height: 8px;
  background: #ff3366;
  border-radius: 50%;
  box-shadow: 0 0 10px #ff3366;
  animation: rec-blink 1s infinite alternate;
}

@keyframes rec-blink {
  from { opacity: 0.3; }
  to { opacity: 1; }
}

.cinema-progress-wrap {
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cinema-progress-bar {
  flex-grow: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.cinema-progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--accent-violet), var(--accent-cyan));
  box-shadow: 0 0 10px var(--accent-cyan);
}

.cinema-timer {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-secondary);
  min-width: 40px;
}

.btn-skip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text-white);
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-skip:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}

/* Escenas */
.scenes-container {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5rem 2rem;
  pointer-events: none;
}

.scene > * {
  pointer-events: auto;
}

/* Intro */
.intro-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.intro-tagline-glow {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.25em;
  color: var(--accent-cyan);
  text-shadow: 0 0 12px rgba(0, 217, 255, 0.6);
  margin-bottom: 0.5rem;
}

.intro-label {
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #ffffff;
  text-shadow: 0 0 30px rgba(108, 99, 255, 0.4);
}

.intro-subtitle {
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: var(--text-secondary);
  max-width: 700px;
}

.intro-university {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--accent-violet);
  font-weight: 600;
}

.intro-badges {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.badge-epic {
  padding: 0.5rem 1.25rem;
  background: rgba(255, 183, 3, 0.12);
  border: 1px solid #ffb703;
  color: #ffb703;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  box-shadow: 0 0 15px rgba(255, 183, 3, 0.25);
}

/* Stats */
.scene-bg-text {
  position: absolute;
  font-size: 26vw;
  font-weight: 900;
  color: #ffffff;
  opacity: 0.04;
  z-index: -1;
  user-select: none;
  font-family: var(--font-mono);
}

.stats-hero {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 2.5rem 3.5rem;
  background: rgba(13, 17, 23, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-xl);
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.stat-mega {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-num {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: #ffffff;
  font-family: var(--font-mono);
}

.gold-glow .stat-num {
  color: #ffb703;
  text-shadow: 0 0 20px rgba(255, 183, 3, 0.5);
}

.cyan-glow .stat-num {
  color: var(--accent-cyan);
  text-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
}

.stat-lbl {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 600;
  margin-top: 0.5rem;
}

.stats-divider-v {
  width: 1px;
  height: 60px;
  background: rgba(255, 255, 255, 0.15);
}

.scene-tagline {
  font-size: 1.15rem;
  color: var(--accent-cyan);
  margin-top: 2rem;
  font-family: var(--font-mono);
}

.tech-tags-float {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  max-width: 700px;
  justify-content: center;
  margin-top: 1.5rem;
}

.tech-float-tag {
  padding: 0.35rem 0.85rem;
  background: rgba(108, 99, 255, 0.12);
  border: 1px solid rgba(108, 99, 255, 0.3);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: var(--text-primary);
}

/* Skills Layout */
.scene-skills-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  width: 100%;
  gap: 4rem;
  align-items: center;
}

.scene-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-cyan);
  letter-spacing: 0.15em;
  font-weight: 700;
  display: block;
  margin-bottom: 0.5rem;
}

.scene-h2 {
  font-size: 2.5rem;
  color: #ffffff;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.scene-h2 em {
  color: var(--accent-cyan);
  font-style: normal;
}

.skills-bars-epic {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sbe-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.sbe-track {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.sbe-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-violet), var(--accent-cyan));
  border-radius: var(--radius-full);
}

.radar-cinematic {
  width: 100%;
  max-width: 380px;
}

/* Projects Epic */
.scene-header-centered {
  text-align: center;
  margin-bottom: 2rem;
}

.projects-epic-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 1000px;
  width: 100%;
}

.proj-epic {
  background: rgba(13, 17, 23, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  position: relative;
  backdrop-filter: blur(12px);
}

.proj-badge-trophy {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 183, 3, 0.15);
  border: 1px solid #ffb703;
  color: #ffb703;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
}

.proj-epic-num {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent-cyan);
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.proj-epic h3 {
  font-size: 1.15rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.proj-epic p {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.proj-epic-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.proj-epic-tags span {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: rgba(108, 99, 255, 0.15);
  color: var(--text-primary);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
}

/* Timeline Experience */
.exp-timeline-epic {
  position: relative;
  max-width: 650px;
  width: 100%;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.exp-line {
  position: absolute;
  left: 6px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent-violet), var(--accent-cyan));
}

.exp-item {
  position: relative;
}

.exp-dot {
  position: absolute;
  left: -2rem;
  top: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #080B14;
  border: 2px solid var(--accent-cyan);
  box-shadow: 0 0 10px var(--accent-cyan);
}

.exp-text strong {
  display: block;
  font-size: 1.1rem;
  color: #ffffff;
}

.exp-text em {
  font-size: 0.85rem;
  color: var(--accent-violet);
  display: block;
  margin-bottom: 0.35rem;
  font-style: normal;
}

.exp-time {
  color: var(--accent-cyan);
}

.exp-text p {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Achievements */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 900px;
  width: 100%;
}

.ach-card {
  background: rgba(13, 17, 23, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  backdrop-filter: blur(12px);
}

.ach-card.gold-border {
  border-left: 4px solid #ffb703;
}

.ach-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.ach-card strong {
  display: block;
  font-size: 1.05rem;
  color: #ffffff;
  margin-bottom: 0.2rem;
}

.ach-card em {
  font-size: 0.8rem;
  color: var(--accent-cyan);
  display: block;
  margin-bottom: 0.5rem;
  font-style: normal;
}

.ach-card p {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

/* Quote & Origin */
.origin-content {
  text-align: center;
  max-width: 750px;
}

.origin-quote {
  font-size: 1.4rem;
  color: #ffffff;
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
}

.traits-wrap {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.trait-pill {
  padding: 0.45rem 1rem;
  background: rgba(108, 99, 255, 0.15);
  border: 1px solid var(--accent-violet);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
}

/* End Scene */
.end-wrap {
  text-align: center;
  z-index: 2;
}

.end-thanks {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  color: var(--accent-cyan);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.end-name {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.end-role {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  color: var(--accent-violet);
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
}

.end-ctas {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
}

.end-btn {
  padding: 0.85rem 2rem;
  background: linear-gradient(135deg, var(--accent-violet), var(--accent-cyan));
  border: none;
  border-radius: var(--radius-full);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition: transform 0.25s, box-shadow 0.25s;
}

.end-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 25px rgba(0, 217, 255, 0.6);
}

.end-btn-out {
  background: transparent;
  border: 1px solid var(--accent-cyan);
  color: var(--accent-cyan);
}

.end-bg-code {
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  background: rgba(8, 11, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  padding: 1rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--accent-cyan);
  pointer-events: none;
  z-index: 1;
}

@media (max-width: 768px) {
  .scene-skills-layout, .projects-epic-grid, .achievements-grid {
    grid-template-columns: 1fr;
  }
  .stats-hero {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  .stats-divider-v {
    width: 60px;
    height: 1px;
  }
  .end-bg-code {
    display: none;
  }
}
</style>
