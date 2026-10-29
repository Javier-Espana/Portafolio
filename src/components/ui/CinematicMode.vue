<template>
  <Transition name="cinema-modal">
    <div
      v-if="isActive"
      class="cinematic-root"
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      @keydown.esc="handleExit"
      @keydown.space.prevent="togglePause"
      @keydown.left="prevScene"
      @keydown.right="nextScene"
      @keydown.m="toggleAudio"
    >
      <!-- Canvas de estrellas hiperespacio -->
      <canvas ref="particleCanvas" class="particle-canvas" aria-hidden="true"></canvas>

      <!-- Resplandores ambientales y cuadrícula holográfica -->
      <div class="cinema-ambient-glow" aria-hidden="true"></div>
      <div class="cinema-grid-lines" aria-hidden="true"></div>

      <!-- HUD SUPERIOR -->
      <header class="cinema-hud cinema-hud-top">
        <div class="hud-left">
          <div class="hud-indicator">
            <span class="status-pulse" :class="{ paused: isPaused }"></span>
            <span class="hud-mono-bold">MISSION // FULL EXPERIENCE</span>
          </div>
          <span class="hud-divider">|</span>
          <span class="hud-mono hud-coords">UVG · BAM BICAMPEÓN 2026 · ML & FULL-STACK</span>
        </div>

        <!-- Capítulos interactivos -->
        <nav class="hud-chapters" aria-label="Capítulos de la experiencia">
          <button
            v-for="(scene, idx) in scenes"
            :key="scene.id"
            class="hud-chapter-pill"
            :class="{ active: currentSceneIndex === idx }"
            @click="jumpToScene(idx)"
            :title="scene.title"
          >
            <span class="chap-num">0{{ idx + 1 }}</span>
            <span class="chap-name">{{ scene.shortTitle }}</span>
          </button>
        </nav>

        <div class="hud-right">
          <button class="hud-sound-btn" @click="toggleAudio" :title="isMuted ? 'Activar sonido (M)' : 'Silenciar sonido (M)'">
            <span v-if="!isMuted" class="sound-icon">🔊 SONIDO ON</span>
            <span v-else class="sound-icon muted">🔇 SILENCIADO</span>
          </button>
          <button class="hud-close-btn" @click="handleExit" title="Cerrar (Esc)">
            ✕ {{ t('cinematic.skipBtn') || 'SALIR' }}
          </button>
        </div>
      </header>

      <!-- CONTENEDOR PRINCIPAL DE ESCENAS CON TRANSICIÓN SUAVE -->
      <main class="scenes-viewport">
        <Transition name="scene-stage" mode="out-in">

          <!-- ================= ESCENA 0: IDENTIDAD & INTRO ================= -->
          <section v-if="currentSceneIndex === 0" key="scene-0" class="cinema-scene scene-intro">
            <div class="scene-badge-header">
              <span class="terminal-badge">// PERFIL PROFESIONAL // CICLO 8 UVG</span>
            </div>

            <h1 class="hero-glitch-title">
              <span class="title-first">JAVIER</span>
              <span class="title-last">ESPAÑA</span>
            </h1>

            <p class="hero-hero-subtitle">
              {{ t('cinematic.scene0.subtitle') || 'Ingeniería en Ciencia de la Computación y TI · 8.º Ciclo' }}
            </p>
            <span class="hero-university">Universidad del Valle de Guatemala</span>

            <!-- Medallas y trofeos dorados -->
            <div class="hero-trophies-row">
              <div class="trophy-pill gold">
                <span class="trophy-icon">🏆</span>
                <div class="trophy-meta">
                  <strong>1.er Lugar Hackatón BAM (Oct 2026)</strong>
                  <span>Inteligencia de Cobranza & LightGBM</span>
                </div>
              </div>

              <div class="trophy-pill gold">
                <span class="trophy-icon">🏆</span>
                <div class="trophy-meta">
                  <strong>1.er Lugar Hackatón BAM (Abr 2026)</strong>
                  <span>NLP Real-Time · Jina v5-nano & Docker</span>
                </div>
              </div>

              <div class="trophy-pill silver">
                <span class="trophy-icon">🥈</span>
                <div class="trophy-meta">
                  <strong>2.º Lugar BAM (2025)</strong>
                  <span>Forecasting Airflow</span>
                </div>
              </div>

              <div class="trophy-pill merit">
                <span class="trophy-icon">🎖️</span>
                <div class="trophy-meta">
                  <strong>Honor al Mérito UVG</strong>
                  <span>2025 · Distinción Académica</span>
                </div>
              </div>
            </div>
          </section>

          <!-- ================= ESCENA 1: BAM BICAMPEÓN 2026 ================= -->
          <section v-if="currentSceneIndex === 1" key="scene-1" class="cinema-scene scene-bam">
            <div class="scene-badge-header">
              <span class="terminal-badge gold">// BANCO AGROMERCANTIL (BAM) · BICAMPEÓN NACIONAL 2026</span>
            </div>

            <h2 class="scene-headline">
              Doble Campeonato en Hackatones BAM 2026
            </h2>
            <p class="scene-subdesc">
              Resolviendo retos financieros críticos con rigor científico, machine learning de alto desempeño y arquitecturas contenerizadas.
            </p>

            <div class="bam-cards-grid">
              <!-- Octubre 2026 -->
              <div class="bam-card champion-card">
                <div class="bam-card-badge">🥇 1.er LUGAR · OCTUBRE 2026</div>
                <h3>Inteligencia de Cobranza & Resolvedor Geográfico</h3>
                <div class="bam-highlight-stat">
                  <span class="stat-big">92%</span>
                  <span class="stat-desc">de promesas de pago con solo <strong>30% de llamadas</strong> de call center</span>
                </div>
                <p class="bam-card-text">
                  Pipeline predictivo LightGBM con afinamiento bayesiano en Optuna, combinado con resolvedor de direcciones no estructuradas para optimizar rutas y priorizar llamadas críticas.
                </p>
                <div class="bam-tags">
                  <span>LightGBM</span>
                  <span>Optuna</span>
                  <span>Python</span>
                  <span>Feature Engineering</span>
                  <span>Geo-NLP</span>
                </div>
              </div>

              <!-- Abril 2026 -->
              <div class="bam-card champion-card">
                <div class="bam-card-badge">🥇 1.er LUGAR · ABRIL 2026</div>
                <h3>Clasificador NLP para Servicio al Cliente en Streaming</h3>
                <div class="bam-highlight-stat">
                  <span class="stat-big">&lt;15ms</span>
                  <span class="stat-desc">latencia de inferencia y <strong>probabilidades calibradas</strong> en tiempo real</span>
                </div>
                <p class="bam-card-text">
                  Motor de clasificación de tickets con embeddings multilingües Jina v5-nano, Support Vector Classifier (SVC) calibrado con Platt scaling, worker distribuido en Docker y observabilidad en Grafana.
                </p>
                <div class="bam-tags">
                  <span>Jina AI v5</span>
                  <span>SVC Platt Scaling</span>
                  <span>Docker</span>
                  <span>Grafana</span>
                  <span>FastAPI</span>
                </div>
              </div>
            </div>

            <!-- Subcampeonato 2025 banner -->
            <div class="bam-card-footer-banner">
              <span class="trophy-tag">🥈 2.º Lugar BAM 2025:</span>
              <span>Forecasting semanal de tarjetas de crédito orquestado con Apache Airflow, PostgreSQL y visualización ejecutiva en Streamlit.</span>
            </div>
          </section>

          <!-- ================= ESCENA 2: ARSENAL TÉCNICO & RADAR ================= -->
          <section v-if="currentSceneIndex === 2" key="scene-2" class="cinema-scene scene-radar-view">
            <div class="scene-badge-header">
              <span class="terminal-badge">// DOMINIO MULTIDISCIPLINARIO // LOW & HIGH LEVEL</span>
            </div>

            <div class="radar-split-layout">
              <!-- Lado izquierdo: Barras de expertise -->
              <div class="radar-text-col">
                <h2 class="scene-headline">Arsenal Tecnológico</h2>
                <p class="scene-subdesc">
                  Desde microarquitectura de bajo nivel en ARM y C, hasta microservicios en Go y modelos de Machine Learning en producción.
                </p>

                <div class="skill-bars-list">
                  <div v-for="sk in epicSkills" :key="sk.name" class="skill-bar-item">
                    <div class="skill-bar-label">
                      <span class="skill-title">{{ sk.name }}</span>
                      <span class="skill-score">{{ sk.level }}%</span>
                    </div>
                    <div class="skill-bar-track">
                      <div class="skill-bar-fill" :style="{ width: sk.level + '%' }"></div>
                    </div>
                  </div>
                </div>

                <div class="tech-pills-row">
                  <span v-for="tag in techTags" :key="tag" class="tech-tag-pill">{{ tag }}</span>
                </div>
              </div>

              <!-- Lado derecho: Radar SVG interactivo -->
              <div class="radar-chart-col">
                <div class="radar-wrapper">
                  <svg viewBox="0 0 400 400" class="radar-svg">
                    <defs>
                      <radialGradient id="radarFillGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#00D9FF" stop-opacity="0.35" />
                        <stop offset="100%" stop-color="#6C63FF" stop-opacity="0.1" />
                      </radialGradient>
                      <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <g transform="translate(200, 200)">
                      <!-- Círculos concéntricos de referencia -->
                      <circle v-for="i in 5" :key="`circ-${i}`" :r="(150 * i) / 5" class="radar-circle" />
                      <!-- Ejes radiales -->
                      <line
                        v-for="(_, i) in epicSkills"
                        :key="`line-${i}`"
                        x1="0"
                        y1="0"
                        :x2="getRadarAxis(i).x"
                        :y2="getRadarAxis(i).y"
                        class="radar-axis-line"
                      />
                      <!-- Polígono activo -->
                      <polygon :points="radarPolygonPoints" class="radar-poly-shape" filter="url(#radarGlow)" />
                      <!-- Puntos de datos -->
                      <circle
                        v-for="(p, i) in radarCoordinates"
                        :key="`dot-${i}`"
                        :cx="p.x"
                        :cy="p.y"
                        r="6"
                        class="radar-node-dot"
                      />
                      <!-- Etiquetas de vértices -->
                      <text
                        v-for="(sk, i) in epicSkills"
                        :key="`lbl-${i}`"
                        :x="getRadarLabelPos(i).x"
                        :y="getRadarLabelPos(i).y"
                        class="radar-axis-label"
                      >
                        {{ sk.name }}
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          <!-- ================= ESCENA 3: PROYECTOS INSIGNIA ================= -->
          <section v-if="currentSceneIndex === 3" key="scene-3" class="cinema-scene scene-projects">
            <div class="scene-badge-header">
              <span class="terminal-badge">// PORTAFOLIO DE INGENIERÍA // IMPACTO REAL</span>
            </div>

            <h2 class="scene-headline">Proyectos en Producción y Ganadores</h2>

            <div class="projects-cards-grid">
              <article v-for="(proj, i) in showcaseProjects" :key="i" class="showcase-card">
                <div class="showcase-top">
                  <span class="showcase-idx">0{{ i + 1 }}</span>
                  <span class="showcase-badge" :class="proj.badgeType">{{ proj.award }}</span>
                </div>
                <h3 class="showcase-title">{{ proj.name }}</h3>
                <p class="showcase-desc">{{ proj.desc }}</p>
                <div class="showcase-tags">
                  <span v-for="t in proj.tags" :key="t">{{ t }}</span>
                </div>
              </article>
            </div>
          </section>

          <!-- ================= ESCENA 4: TRAYECTORIA PROFESIONAL ================= -->
          <section v-if="currentSceneIndex === 4" key="scene-4" class="cinema-scene scene-exp">
            <div class="scene-badge-header">
              <span class="terminal-badge">// TRAYECTORIA // INDUSTRIA & DOCENCIA</span>
            </div>

            <h2 class="scene-headline">Experiencia Profesional y Académica</h2>

            <div class="exp-cards-timeline">
              <div v-for="(exp, i) in experienceItems" :key="i" class="exp-timeline-card">
                <div class="exp-marker-col">
                  <div class="exp-dot-glow"></div>
                  <div v-if="i < experienceItems.length - 1" class="exp-connector-line"></div>
                </div>
                <div class="exp-body-card">
                  <div class="exp-header-row">
                    <h3 class="exp-job-title">{{ exp.title }}</h3>
                    <span class="exp-period-pill">{{ exp.period }}</span>
                  </div>
                  <span class="exp-org-name">{{ exp.company }}</span>
                  <p class="exp-description-text">{{ exp.desc }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- ================= ESCENA 5: PREMIOS & FILOSOFÍA ================= -->
          <section v-if="currentSceneIndex === 5" key="scene-5" class="cinema-scene scene-honors">
            <div class="scene-badge-header">
              <span class="terminal-badge gold">// MÉRITOS & VISIÓN DE INGENIERÍA</span>
            </div>

            <h2 class="scene-headline">Reconocimientos & Distinciones</h2>

            <div class="honors-cards-grid">
              <div class="honor-card gold">
                <div class="honor-ico">🥇</div>
                <div class="honor-content">
                  <h4>1.er Lugar Hackatón BAM (Octubre 2026)</h4>
                  <span class="honor-org">Banco Agromercantil de Guatemala</span>
                  <p>92% de promesas de pago capturadas contactando solo el 30% del volumen telefónico.</p>
                </div>
              </div>

              <div class="honor-card gold">
                <div class="honor-ico">🥇</div>
                <div class="honor-content">
                  <h4>1.er Lugar Hackatón BAM (Abril 2026)</h4>
                  <span class="honor-org">Banco Agromercantil de Guatemala</span>
                  <p>Clasificador NLP multilingüe en streaming con Jina v5-nano, Docker y Grafana.</p>
                </div>
              </div>

              <div class="honor-card silver">
                <div class="honor-ico">🥈</div>
                <div class="honor-content">
                  <h4>2.º Lugar Hackatón BAM (2025)</h4>
                  <span class="honor-org">Banco Agromercantil de Guatemala</span>
                  <p>Forecasting predictivo de tarjetas con Apache Airflow, Docker y Streamlit.</p>
                </div>
              </div>

              <div class="honor-card merit">
                <div class="honor-ico">🎖️</div>
                <div class="honor-content">
                  <h4>Honor al Mérito Académico (2025)</h4>
                  <span class="honor-org">Universidad del Valle de Guatemala</span>
                  <p>Máximo reconocimiento UVG por excelencia en Ingeniería en Ciencias de la Computación.</p>
                </div>
              </div>
            </div>

            <blockquote class="cinematic-quote">
              "La ingeniería de software consiste en transformar retos matemáticos y algorítmicos complejos en sistemas confiables, elegantes y de alto impacto que potencian a las personas."
            </blockquote>
          </section>

          <!-- ================= ESCENA 6: TERMINAL FINAL & CONTACTO ================= -->
          <section v-if="currentSceneIndex === 6" key="scene-6" class="cinema-scene scene-finish">
            <div class="scene-badge-header">
              <span class="terminal-badge">// TELEMETRÍA FINAL // CONEXIÓN DIRECTA</span>
            </div>

            <h2 class="scene-headline">¿Listo para Colaborar en Proyectos de Alto Impacto?</h2>

            <div class="terminal-summary-card">
              <div class="terminal-header-bar">
                <div class="term-dots">
                  <span class="term-dot dot-red"></span>
                  <span class="term-dot dot-yellow"></span>
                  <span class="term-dot dot-green"></span>
                </div>
                <span class="term-title">javier_espana@production: ~/profile.json</span>
              </div>
              <pre class="term-code-body"><code>{{ candidateJson }}</code></pre>
            </div>

            <div class="cta-actions-group">
              <router-link to="/projects" class="cinema-cta-btn primary" @click="handleExit">
                <span>Explorar Todos los Proyectos</span>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </router-link>

              <router-link to="/contact" class="cinema-cta-btn outline" @click="handleExit">
                <span>Contactar Directamente</span>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </router-link>

              <button class="cinema-cta-btn copy" @click="copyEmail">
                <span>{{ copiedText ? '✓ Correo Copiado' : 'Copiar Correo' }}</span>
              </button>

              <button class="cinema-cta-btn replay" @click="restartTour">
                <span>↺ Reiniciar Tour</span>
              </button>
            </div>
          </section>

        </Transition>
      </main>

      <!-- HUD INFERIOR: CONTROLES Y PROGRESO -->
      <footer class="cinema-hud cinema-hud-bottom">
        <div class="hud-bottom-left">
          <!-- Botón de Pausa / Continuar -->
          <button class="hud-ctrl-btn" @click="togglePause" :title="isPaused ? 'Reanudar (Espacio)' : 'Pausar (Espacio)'">
            <span v-if="!isPaused">⏸ PAUSAR</span>
            <span v-else class="play-state">▶ CONTINUAR</span>
          </button>

          <!-- Botones de Navegación -->
          <div class="nav-step-buttons">
            <button class="hud-ctrl-btn arrow" @click="prevScene" :disabled="currentSceneIndex === 0" title="Anterior (←)">
              ◀ ANT
            </button>
            <button class="hud-ctrl-btn arrow" @click="nextScene" :disabled="currentSceneIndex === scenes.length - 1" title="Siguiente (→)">
              SIG ▶
            </button>
          </div>
        </div>

        <!-- Barra de Progreso y Timer -->
        <div class="hud-timeline-wrap">
          <div class="hud-progress-track" @click="handleProgressClick">
            <div class="hud-progress-fill" :style="{ width: overallProgressPct + '%' }"></div>
          </div>
          <div class="hud-time-readout">
            <span class="chap-badge">{{ currentSceneIndex + 1 }} / {{ scenes.length }}</span>
            <span class="time-nums">{{ formatTime(sceneElapsed) }} / {{ formatTime(SCENE_DURATION) }}</span>
          </div>
        </div>

        <div class="hud-bottom-right">
          <span class="hud-keyboard-hints">ESPACIO: Pausa | ← / →: Navegar | ESC: Salir</span>
        </div>
      </footer>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { audioManager } from '../../utils/audioManager'

const { t } = useI18n({ useScope: 'global' })

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['end'])

// Definición de las 7 escenas
const scenes = [
  { id: 'intro', shortTitle: 'IDENTIDAD', title: 'Identidad y Presentación' },
  { id: 'bam', shortTitle: 'BICAMPEÓN', title: 'Bicampeón Hackatón BAM 2026' },
  { id: 'radar', shortTitle: 'ARSENAL', title: 'Arsenal Técnico & Radar' },
  { id: 'projects', shortTitle: 'PROYECTOS', title: 'Proyectos Insignia' },
  { id: 'experience', shortTitle: 'TRAYECTORIA', title: 'Experiencia y Docencia' },
  { id: 'honors', shortTitle: 'DISTINCIONES', title: 'Premios y Reconocimientos' },
  { id: 'finish', shortTitle: 'CONTACTO', title: 'Contacto y Telemetría' }
]

const currentSceneIndex = ref(0)
const isPaused = ref(false)
const sceneElapsed = ref(0)
const SCENE_DURATION = 9 // 9 segundos por escena

const isMuted = ref(audioManager.isGloballyMuted)
const copiedText = ref(false)

// Canvas partículas warp
const particleCanvas = ref(null)
let animId = null
let stars = []
let warpBoost = false

// Datos de Radar
const epicSkills = [
  { name: 'Machine Learning', level: 96 },
  { name: 'Backend & APIs (Go/Py)', level: 94 },
  { name: 'Data Pipelines (Airflow)', level: 92 },
  { name: 'Full-Stack (Vue.js 3)', level: 90 },
  { name: 'Docker & Cloud S3', level: 88 },
  { name: 'Low-Level (ARM / C)', level: 85 }
]

const techTags = [
  'Python', 'Go', 'Rust', 'C++', 'LightGBM', 'Apache Airflow',
  'Vue.js 3', 'Docker', 'PostgreSQL', 'FastAPI', 'Grafana', 'ARMv8 Assembler'
]

const getRadarAxis = (i) => {
  const angle = (Math.PI * 2 * i) / epicSkills.length - Math.PI / 2
  return { x: Math.cos(angle) * 150, y: Math.sin(angle) * 150 }
}

const getRadarLabelPos = (i) => {
  const angle = (Math.PI * 2 * i) / epicSkills.length - Math.PI / 2
  return { x: Math.cos(angle) * 175, y: Math.sin(angle) * 175 + 4 }
}

const radarCoordinates = computed(() => {
  return epicSkills.map((sk, i) => {
    const angle = (Math.PI * 2 * i) / epicSkills.length - Math.PI / 2
    const radius = (150 * sk.level) / 100
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
  })
})

const radarPolygonPoints = computed(() => {
  return radarCoordinates.value.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
})

// Proyectos
const showcaseProjects = [
  {
    name: 'Optyma CRM & Portal Clínico',
    award: 'En Producción Médica',
    badgeType: 'production',
    desc: 'Arquitectura completa de microservicios con Go (Echo), frontend en Vue.js 3 con Vite, PostgreSQL, buckets de almacenamiento S3/MinIO y despliegue CI/CD contenerizado en Docker.',
    tags: ['Go (Echo)', 'Vue.js 3', 'Docker', 'PostgreSQL', 'MinIO / S3']
  },
  {
    name: 'Optimización de Cobranza',
    award: '1.er Lugar Hackatón BAM (Oct 2026)',
    badgeType: 'champion',
    desc: 'LightGBM con afinamiento bayesiano en Optuna y georreferenciador para direcciones guatemaltecas. Alcanzó 92% de promesas de pago con solo 30% de llamadas.',
    tags: ['Python', 'LightGBM', 'Optuna', 'Data Analytics', 'Risk Intelligence']
  },
  {
    name: 'Clasificador NLP para Call Center',
    award: '1.er Lugar Hackatón BAM (Abr 2026)',
    badgeType: 'champion',
    desc: 'Embeddings compactos Jina v5-nano con clasificador SVC calibrado por Platt scaling en streaming. Inferencia sub-15ms en Docker con monitoreo continuo en Grafana.',
    tags: ['Jina AI v5', 'Docker', 'Grafana', 'FastAPI', 'Platt Scaling']
  },
  {
    name: 'Forecasting de Demanda de Tarjetas',
    award: '2.º Lugar Hackatón BAM (2025)',
    badgeType: 'silver',
    desc: 'Pipeline semanal automatizado con Apache Airflow, Docker Compose, modelos de gradiente potenciado LightGBM y dashboard interactivo en Streamlit.',
    tags: ['Apache Airflow', 'LightGBM', 'PostgreSQL', 'Streamlit']
  }
]

// Trayectoria
const experienceItems = [
  {
    title: 'Pasante, Analítica de Riesgos',
    company: 'Banco Agromercantil de Guatemala (BAM)',
    period: 'Ene 2026 – Jul 2026',
    desc: 'Automatización de pipelines de evaluación crediticia, ingeniería de atributos y modelos predictivos de riesgo en banca múltiple utilizando Python, SQL y LightGBM.'
  },
  {
    title: 'Maestro Auxiliar (Organización de Computadoras y Assembler)',
    company: 'Universidad del Valle de Guatemala',
    period: 'Ene 2025 – Nov 2025',
    desc: 'Formación universitaria en arquitectura de procesadores ARMv8, optimización de registros, jerarquías de caché, programación en C y depuración en bajo nivel.'
  },
  {
    title: 'Desarrollador de Arquitectura Full-Stack',
    company: 'Optyma Clínica Oftalmológica y Óptica',
    period: '2024 – 2025',
    desc: 'Diseño integral de microservicios en Go, diseño de esquemas en PostgreSQL, interfaz en Vue.js 3 y pipelines automatizados con Docker y GitHub Actions.'
  }
]

// JSON de telemetría final
const candidateJson = computed(() => {
  return JSON.stringify({
    ingeniero: "Javier Eduardo España Pacheco",
    universidad: "Universidad del Valle de Guatemala (UVG)",
    ciclo: "8.º Ciclo (2026)",
    especialidad: "Machine Learning, Backend en Go/Python & Full-Stack",
    logros_clave: [
      "1.er Lugar Hackatón BAM Octubre 2026 (Cobranza LightGBM)",
      "1.er Lugar Hackatón BAM Abril 2026 (NLP Jina v5 Real-Time)",
      "2.º Lugar Hackatón BAM 2025 (Forecasting Airflow)",
      "Honor al Mérito Académico UVG (2025)"
    ],
    status: "Disponible para Roles de Alto Impacto"
  }, null, 2)
})

// Progreso general calculado
const overallProgressPct = computed(() => {
  const sceneShare = 100 / scenes.length
  const currentSceneProgress = (sceneElapsed.value / SCENE_DURATION) * sceneShare
  return Math.min(100, currentSceneIndex.value * sceneShare + currentSceneProgress)
})

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

// Timer de escena
let tickerInterval = null

const startTicker = () => {
  stopTicker()
  tickerInterval = setInterval(() => {
    if (isPaused.value) return
    sceneElapsed.value += 0.5
    if (sceneElapsed.value >= SCENE_DURATION) {
      if (currentSceneIndex.value < scenes.length - 1) {
        nextScene()
      } else {
        // En la última escena, simplemente dejamos el tour en pausa para que el usuario pueda explorar
        isPaused.value = true
      }
    }
  }, 500)
}

const stopTicker = () => {
  if (tickerInterval) {
    clearInterval(tickerInterval)
    tickerInterval = null
  }
}

// Navegación entre escenas con hiperespacio
const triggerWarpBoost = () => {
  warpBoost = true
  setTimeout(() => { warpBoost = false }, 500)
}

const nextScene = () => {
  if (currentSceneIndex.value < scenes.length - 1) {
    currentSceneIndex.value++
    sceneElapsed.value = 0
    triggerWarpBoost()
    audioManager.playHover()
  }
}

const prevScene = () => {
  if (currentSceneIndex.value > 0) {
    currentSceneIndex.value--
    sceneElapsed.value = 0
    triggerWarpBoost()
    audioManager.playHover()
  }
}

const jumpToScene = (idx) => {
  if (idx !== currentSceneIndex.value) {
    currentSceneIndex.value = idx
    sceneElapsed.value = 0
    triggerWarpBoost()
    audioManager.playClick()
  }
}

const togglePause = () => {
  isPaused.value = !isPaused.value
  audioManager.playClick()
}

const toggleAudio = () => {
  isMuted.value = audioManager.toggleGlobalMute()
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('javier.eduardo.espana@gmail.com')
    copiedText.value = true
    audioManager.playClick()
    setTimeout(() => { copiedText.value = false }, 3000)
  } catch (err) {}
}

const restartTour = () => {
  currentSceneIndex.value = 0
  sceneElapsed.value = 0
  isPaused.value = false
  triggerWarpBoost()
  audioManager.playClick()
}

const handleProgressClick = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const ratio = Math.max(0, Math.min(1, clickX / rect.width))
  const targetScene = Math.min(scenes.length - 1, Math.floor(ratio * scenes.length))
  jumpToScene(targetScene)
}

const handleExit = () => {
  cleanup()
  emit('end')
}

// Partículas Warp Speed
const initParticles = () => {
  const canvas = particleCanvas.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const ctx = canvas.getContext('2d')
  const count = 180
  stars = Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * canvas.width * 2,
    y: (Math.random() - 0.5) * canvas.height * 2,
    z: Math.random() * canvas.width,
    color: Math.random() > 0.35 ? '#00D9FF' : '#6C63FF'
  }))

  const tick = () => {
    if (!canvas || !ctx) return
    ctx.fillStyle = 'rgba(5, 7, 13, 0.28)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const speed = warpBoost ? 28 : (isPaused.value ? 1 : 3.5)

    stars.forEach(star => {
      star.z -= speed
      if (star.z <= 0) {
        star.z = canvas.width
        star.x = (Math.random() - 0.5) * canvas.width * 2
        star.y = (Math.random() - 0.5) * canvas.height * 2
      }

      const k = 280 / star.z
      const px = star.x * k + cx
      const py = star.y * k + cy

      if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
        const size = Math.max((1 - star.z / canvas.width) * (warpBoost ? 5 : 3), 0.6)
        ctx.beginPath()
        if (warpBoost) {
          // Líneas estiradas estilo hiperespacio
          const prevK = 280 / (star.z + speed * 1.5)
          const prevPx = star.x * prevK + cx
          const prevPy = star.y * prevK + cy
          ctx.moveTo(prevPx, prevPy)
          ctx.lineTo(px, py)
          ctx.strokeStyle = star.color
          ctx.lineWidth = size
          ctx.stroke()
        } else {
          ctx.arc(px, py, size, 0, Math.PI * 2)
          ctx.fillStyle = star.color
          ctx.fill()
        }
      }
    })

    animId = requestAnimationFrame(tick)
  }

  tick()
}

const handleResize = () => {
  if (particleCanvas.value) {
    particleCanvas.value.width = window.innerWidth
    particleCanvas.value.height = window.innerHeight
  }
}

const cleanup = () => {
  stopTicker()
  if (animId) cancelAnimationFrame(animId)
  audioManager.stopCinematicTheme()
  document.body.style.overflow = ''
  window.removeEventListener('resize', handleResize)
}

let unsubAudio = null

watch(() => props.isActive, (active) => {
  if (active) {
    document.body.style.overflow = 'hidden'
    currentSceneIndex.value = 0
    sceneElapsed.value = 0
    isPaused.value = false

    setTimeout(() => {
      initParticles()
      window.addEventListener('resize', handleResize)
      startTicker()
      audioManager.playCinematicTheme()
    }, 50)
  } else {
    cleanup()
  }
})

onMounted(() => {
  unsubAudio = audioManager.subscribe((muted) => {
    isMuted.value = muted
  })
})

onUnmounted(() => {
  if (unsubAudio) unsubAudio()
  cleanup()
})
</script>

<style scoped>
.cinematic-root {
  position: fixed;
  inset: 0;
  background-color: #05070d;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  font-family: var(--font-sans);
  color: var(--text-primary);
  user-select: none;
}

.particle-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.cinema-ambient-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  height: 900px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(108, 99, 255, 0.12) 0%, rgba(0, 217, 255, 0.08) 40%, transparent 70%);
  filter: blur(80px);
  z-index: 2;
  pointer-events: none;
}

.cinema-grid-lines {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  z-index: 2;
  pointer-events: none;
}

/* ================= HUD BARS ================= */
.cinema-hud {
  position: relative;
  z-index: 100;
  height: 64px;
  background: rgba(5, 7, 13, 0.88);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  border-color: rgba(255, 255, 255, 0.08);
}

.cinema-hud-top {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  justify-content: space-between;
}

.cinema-hud-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  justify-content: space-between;
  gap: 1.5rem;
}

.hud-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hud-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00D9FF;
  box-shadow: 0 0 10px #00D9FF;
  animation: pulse-hud 1.5s infinite alternate;
}

.status-pulse.paused {
  background: #ffb703;
  box-shadow: 0 0 10px #ffb703;
  animation: none;
}

@keyframes pulse-hud {
  from { opacity: 0.4; }
  to { opacity: 1; }
}

.hud-mono-bold {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent-cyan);
  letter-spacing: 0.1em;
}

.hud-divider {
  color: rgba(255, 255, 255, 0.2);
}

.hud-coords {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-secondary);
}

/* Capítulos Interactivos */
.hud-chapters {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.hud-chapter-pill {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-full);
  padding: 0.35rem 0.8rem;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;
}

.hud-chapter-pill .chap-num {
  color: var(--accent-cyan);
  font-weight: 700;
}

.hud-chapter-pill:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border-color: rgba(0, 217, 255, 0.4);
}

.hud-chapter-pill.active {
  background: rgba(0, 217, 255, 0.15);
  border-color: #00D9FF;
  color: #ffffff;
  box-shadow: 0 0 15px rgba(0, 217, 255, 0.3);
}

.hud-right {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.hud-sound-btn, .hud-close-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-full);
  padding: 0.4rem 0.9rem;
  color: #ffffff;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.hud-sound-btn:hover, .hud-close-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}

.sound-icon.muted {
  color: #ff5555;
}

/* ================= VIEWPORT PRINCIPAL ================= */
.scenes-viewport {
  position: relative;
  flex: 1;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 2.5rem;
  overflow-y: auto;
}

.cinema-scene {
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: auto;
}

.scene-badge-header {
  margin-bottom: 1rem;
}

.terminal-badge {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: var(--accent-cyan);
  background: rgba(0, 217, 255, 0.08);
  border: 1px solid rgba(0, 217, 255, 0.25);
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  font-weight: 700;
}

.terminal-badge.gold {
  color: #ffb703;
  background: rgba(255, 183, 3, 0.08);
  border-color: rgba(255, 183, 3, 0.3);
}

.scene-headline {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 0.75rem;
  text-shadow: 0 0 30px rgba(108, 99, 255, 0.35);
}

.scene-subdesc {
  font-size: clamp(0.9rem, 1.2vw, 1.05rem);
  color: var(--text-secondary);
  max-width: 750px;
  line-height: 1.55;
  margin-bottom: 2rem;
}

/* ================= ESCENA 0: INTRO ================= */
.hero-glitch-title {
  font-size: clamp(3.2rem, 8vw, 6.5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0.5rem 0;
  display: flex;
  gap: 1.2rem;
  justify-content: center;
}

.hero-glitch-title .title-first {
  color: #ffffff;
}

.hero-glitch-title .title-last {
  background: linear-gradient(135deg, #00D9FF 0%, #6C63FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 25px rgba(0, 217, 255, 0.5));
}

.hero-hero-subtitle {
  font-size: clamp(1.1rem, 2.2vw, 1.6rem);
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.hero-university {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--accent-violet);
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
}

.hero-trophies-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 950px;
}

.trophy-pill {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(13, 17, 23, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-lg);
  padding: 0.75rem 1.25rem;
  backdrop-filter: blur(12px);
  text-align: left;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.trophy-pill:hover {
  transform: translateY(-2px);
}

.trophy-pill.gold {
  border-color: rgba(255, 183, 3, 0.4);
  box-shadow: 0 0 20px rgba(255, 183, 3, 0.15);
}

.trophy-pill.gold strong {
  color: #ffb703;
}

.trophy-pill.silver {
  border-color: rgba(0, 217, 255, 0.4);
}

.trophy-pill.silver strong {
  color: #00D9FF;
}

.trophy-pill.merit strong {
  color: var(--accent-violet);
}

.trophy-icon {
  font-size: 1.8rem;
}

.trophy-meta {
  display: flex;
  flex-direction: column;
}

.trophy-meta strong {
  font-size: 0.85rem;
}

.trophy-meta span {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

/* ================= ESCENA 1: BAM ================= */
.bam-cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
  margin-bottom: 1.5rem;
  text-align: left;
}

.bam-card {
  background: rgba(13, 17, 23, 0.85);
  border: 1px solid rgba(255, 183, 3, 0.35);
  border-radius: var(--radius-xl);
  padding: 1.75rem;
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 183, 3, 0.05);
  position: relative;
}

.bam-card-badge {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 800;
  color: #ffb703;
  letter-spacing: 0.1em;
  margin-bottom: 0.6rem;
}

.bam-card h3 {
  font-size: 1.25rem;
  color: #ffffff;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.bam-highlight-stat {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  background: rgba(255, 183, 3, 0.08);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
}

.stat-big {
  font-family: var(--font-mono);
  font-size: 2rem;
  font-weight: 900;
  color: #ffb703;
  text-shadow: 0 0 15px rgba(255, 183, 3, 0.4);
}

.stat-desc {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.3;
}

.stat-desc strong {
  color: #ffffff;
}

.bam-card-text {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1.25rem;
  flex: 1;
}

.bam-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.bam-tags span {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}

.bam-card-footer-banner {
  background: rgba(0, 217, 255, 0.08);
  border: 1px solid rgba(0, 217, 255, 0.25);
  border-radius: var(--radius-lg);
  padding: 0.85rem 1.5rem;
  font-size: 0.85rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.bam-card-footer-banner .trophy-tag {
  color: #00D9FF;
  font-weight: 800;
  font-family: var(--font-mono);
}

/* ================= ESCENA 2: RADAR & SKILLS ================= */
.radar-split-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: center;
  width: 100%;
  text-align: left;
}

.skill-bars-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 1.5rem;
}

.skill-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.skill-title {
  color: #ffffff;
}

.skill-score {
  font-family: var(--font-mono);
  color: var(--accent-cyan);
}

.skill-bar-track {
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-violet), var(--accent-cyan));
  border-radius: var(--radius-full);
  box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
  transition: width 1s ease-out;
}

.tech-pills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag-pill {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 0.3rem 0.75rem;
  background: rgba(108, 99, 255, 0.12);
  border: 1px solid rgba(108, 99, 255, 0.3);
  border-radius: var(--radius-full);
  color: var(--text-primary);
}

.radar-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.radar-svg {
  width: 100%;
  max-width: 380px;
  overflow: visible;
}

.radar-circle {
  fill: none;
  stroke: rgba(255, 255, 255, 0.06);
  stroke-width: 1;
}

.radar-axis-line {
  stroke: rgba(108, 99, 255, 0.25);
  stroke-width: 1;
}

.radar-poly-shape {
  fill: url(#radarFillGrad);
  stroke: #00D9FF;
  stroke-width: 2.5;
  transition: all 0.5s ease;
}

.radar-node-dot {
  fill: #00D9FF;
  filter: drop-shadow(0 0 6px #00D9FF);
}

.radar-axis-label {
  fill: #ffffff;
  font-size: 10px;
  font-family: var(--font-mono);
  font-weight: 700;
  text-anchor: middle;
}

/* ================= ESCENA 3: PROYECTOS ================= */
.projects-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
  text-align: left;
}

.showcase-card {
  background: rgba(13, 17, 23, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  backdrop-filter: blur(14px);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, border-color 0.2s;
}

.showcase-card:hover {
  border-color: rgba(0, 217, 255, 0.5);
  transform: translateY(-3px);
}

.showcase-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.showcase-idx {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--accent-cyan);
}

.showcase-badge {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-full);
}

.showcase-badge.champion {
  background: rgba(255, 183, 3, 0.15);
  border: 1px solid #ffb703;
  color: #ffb703;
}

.showcase-badge.production {
  background: rgba(0, 217, 255, 0.15);
  border: 1px solid #00D9FF;
  color: #00D9FF;
}

.showcase-badge.silver {
  background: rgba(108, 99, 255, 0.15);
  border: 1px solid #6C63FF;
  color: #ffffff;
}

.showcase-title {
  font-size: 1.15rem;
  color: #ffffff;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.showcase-desc {
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1rem;
  flex: 1;
}

.showcase-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.showcase-tags span {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  padding: 0.2rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
}

/* ================= ESCENA 4: TRAYECTORIA ================= */
.exp-cards-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 850px;
  width: 100%;
  text-align: left;
}

.exp-timeline-card {
  display: flex;
  gap: 1.5rem;
  position: relative;
}

.exp-marker-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.exp-dot-glow {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #00D9FF;
  box-shadow: 0 0 12px #00D9FF;
  border: 2px solid #05070d;
  flex-shrink: 0;
  margin-top: 4px;
}

.exp-connector-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(to bottom, #00D9FF, rgba(108, 99, 255, 0.2));
  margin: 6px 0;
}

.exp-body-card {
  background: rgba(13, 17, 23, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.75rem;
  backdrop-filter: blur(12px);
  flex: 1;
}

.exp-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
}

.exp-job-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #ffffff;
}

.exp-period-pill {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-cyan);
  background: rgba(0, 217, 255, 0.1);
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-full);
}

.exp-org-name {
  font-size: 0.88rem;
  color: var(--accent-violet);
  font-weight: 700;
  display: block;
  margin-bottom: 0.6rem;
}

.exp-description-text {
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* ================= ESCENA 5: PREMIOS & FILOSOFÍA ================= */
.honors-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  width: 100%;
  margin-bottom: 2rem;
  text-align: left;
}

.honor-card {
  background: rgba(13, 17, 23, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  display: flex;
  gap: 1rem;
  backdrop-filter: blur(14px);
}

.honor-card.gold {
  border-left: 4px solid #ffb703;
}

.honor-card.silver {
  border-left: 4px solid #00D9FF;
}

.honor-card.merit {
  border-left: 4px solid var(--accent-violet);
}

.honor-ico {
  font-size: 1.75rem;
  flex-shrink: 0;
}

.honor-content h4 {
  font-size: 0.95rem;
  color: #ffffff;
  font-weight: 800;
  margin-bottom: 0.2rem;
}

.honor-org {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-cyan);
  display: block;
  margin-bottom: 0.4rem;
}

.honor-content p {
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.cinematic-quote {
  font-size: clamp(1.05rem, 1.8vw, 1.35rem);
  font-style: italic;
  color: #ffffff;
  max-width: 800px;
  line-height: 1.6;
  text-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
  position: relative;
  padding: 0 2rem;
}

/* ================= ESCENA 6: TERMINAL FINAL & CTAS ================= */
.terminal-summary-card {
  background: rgba(8, 11, 20, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 680px;
  margin-bottom: 2rem;
  text-align: left;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.terminal-header-bar {
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.term-dots {
  display: flex;
  gap: 0.4rem;
}

.term-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-red { background: #ff5f56; }
.dot-yellow { background: #ffbd2e; }
.dot-green { background: #27c93f; }

.term-title {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-secondary);
}

.term-code-body {
  padding: 1.25rem 1.5rem;
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--accent-cyan);
  line-height: 1.5;
  overflow-x: auto;
}

.cta-actions-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.cinema-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.6rem;
  border-radius: var(--radius-full);
  font-size: 0.88rem;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
}

.cinema-cta-btn.primary {
  background: linear-gradient(135deg, var(--accent-violet), var(--accent-cyan));
  color: #ffffff;
  border: none;
  box-shadow: 0 0 25px rgba(0, 217, 255, 0.5);
}

.cinema-cta-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 35px rgba(0, 217, 255, 0.7);
}

.cinema-cta-btn.outline {
  background: transparent;
  border: 1px solid var(--accent-cyan);
  color: var(--accent-cyan);
}

.cinema-cta-btn.outline:hover {
  background: rgba(0, 217, 255, 0.1);
  transform: translateY(-2px);
}

.cinema-cta-btn.copy {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.cinema-cta-btn.copy:hover {
  background: rgba(255, 255, 255, 0.15);
}

.cinema-cta-btn.replay {
  background: transparent;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  color: var(--text-secondary);
}

.cinema-cta-btn.replay:hover {
  border-color: #ffffff;
  color: #ffffff;
}

/* ================= HUD INFERIOR ================= */
.hud-bottom-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-step-buttons {
  display: flex;
  gap: 0.4rem;
}

.hud-ctrl-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-full);
  padding: 0.4rem 0.9rem;
  color: #ffffff;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.hud-ctrl-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}

.hud-ctrl-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.play-state {
  color: #ffb703;
}

.hud-timeline-wrap {
  flex: 1;
  max-width: 500px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hud-progress-track {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

.hud-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-violet), var(--accent-cyan));
  box-shadow: 0 0 10px var(--accent-cyan);
  transition: width 0.3s ease;
}

.hud-time-readout {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.chap-badge {
  color: var(--accent-cyan);
  font-weight: 700;
}

.time-nums {
  color: var(--text-secondary);
  min-width: 70px;
}

.hud-keyboard-hints {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
}

/* ================= TRANSICIONES ================= */
.cinema-modal-enter-active, .cinema-modal-leave-active {
  transition: opacity 0.5s ease;
}
.cinema-modal-enter-from, .cinema-modal-leave-to {
  opacity: 0;
}

.scene-stage-enter-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.scene-stage-leave-active {
  transition: all 0.35s cubic-bezier(0.7, 0, 0.84, 0);
}
.scene-stage-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}
.scene-stage-leave-to {
  opacity: 0;
  transform: scale(1.05) translateY(-20px);
}

/* Responsive */
@media (max-width: 1024px) {
  .hud-chapters {
    display: none;
  }
  .bam-cards-grid, .radar-split-layout, .projects-cards-grid, .honors-cards-grid {
    grid-template-columns: 1fr;
  }
  .hud-keyboard-hints {
    display: none;
  }
}

@media (max-width: 768px) {
  .cinema-hud {
    padding: 0 1rem;
    height: 56px;
  }
  .scenes-viewport {
    padding: 1rem;
  }
  .hero-glitch-title {
    flex-direction: column;
    gap: 0;
  }
  .hero-trophies-row {
    flex-direction: column;
  }
  .cta-actions-group {
    flex-direction: column;
    width: 100%;
  }
  .cinema-cta-btn {
    justify-content: center;
    width: 100%;
  }
}
</style>
