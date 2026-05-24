<template>
  <transition name="cinematic-fade">
    <div v-if="isActive" class="cinematic-root">
      <canvas ref="particleCanvas" class="particle-canvas"></canvas>

      <!-- Barra superior -->
      <div class="cinema-bar cinema-bar-top" ref="barTop"></div>

      <!-- Barra inferior con controles -->
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

      <!-- ESCENAS -->
      <div class="scenes-container">

        <!-- ESCENA 0: Intro épico — Nombre -->
        <div class="scene" ref="scene0">
          <div class="scene-scanlines"></div>
          <div class="intro-content">
            <div class="intro-label" ref="introLabel">{{ t('hero.name') }}</div>
            <div class="intro-subtitle" ref="introSubtitle">{{ t('cinematic.scene0.subtitle') }}</div>
            <div class="intro-university" ref="introUniversity">{{ t('cinematic.scene0.university') }}</div>
            <div class="intro-year" ref="introYear">{{ t('about.semester') }}</div>
          </div>
          <div class="corner corner-tl" ref="cornerTL"></div>
          <div class="corner corner-tr" ref="cornerTR"></div>
          <div class="corner corner-bl" ref="cornerBL"></div>
          <div class="corner corner-br" ref="cornerBR"></div>
        </div>

        <!-- ESCENA 1: Stats Counters -->
        <div class="scene" ref="scene1">
          <div class="scene-bg-text">7°</div>
          <div class="stats-hero" ref="statsWrap">
            <div class="stat-mega" ref="st0"><span class="stat-num" ref="stNum0">0</span><span class="stat-lbl">{{ t('cinematic.scene1.label1') }}</span></div>
            <div class="stats-divider-v"></div>
            <div class="stat-mega" ref="st1"><span class="stat-num" ref="stNum1">0</span><span class="stat-lbl">{{ t('cinematic.scene1.label2') }}</span></div>
            <div class="stats-divider-v"></div>
            <div class="stat-mega" ref="st2"><span class="stat-num" ref="stNum2">0</span><span class="stat-lbl">{{ t('cinematic.scene1.label3') }}</span></div>
          </div>
          <div class="scene-tagline" ref="sc1Tagline">{{ t('cinematic.scene1.tagline') }}</div>
          <div class="tech-tags-float">
            <span v-for="tag in techTags" :key="tag" class="tech-float-tag">{{ tag }}</span>
          </div>
        </div>

        <!-- ESCENA A: Philosophy (NUEVA) -->
        <div class="scene" ref="sceneA">
          <div class="scene-left-panel" ref="scALeft">
            <span class="scene-label">{{ t('cinematic.sceneA.label') }}</span>
            <h2 class="scene-h2">{{ t('cinematic.sceneA.title') }}<br><em>{{ t('cinematic.sceneA.title2') }}</em></h2>
          </div>
          <div class="philosophy-points">
            <div v-for="(pt, i) in (tm('cinematic.sceneA.points') || [])" :key="i" class="phil-point" :ref="el => scAPoints[i] = el">
              <span class="phil-icon">⚡</span>
              <span class="phil-text">{{ pt }}</span>
            </div>
          </div>
          <div class="bg-circuit" ref="scACircuit"></div>
        </div>

        <!-- ESCENA 2: Tech Arsenal / Skills -->
        <div class="scene scene-skills-layout" ref="scene2">
          <div class="scene-left-panel" ref="sc2Left">
            <span class="scene-label">{{ t('cinematic.scene2.label') }}</span>
            <h2 class="scene-h2">{{ t('cinematic.scene2.title') }}<br><em>{{ t('cinematic.scene2.title2') }}</em></h2>
            <div class="skills-bars-epic">
              <div v-for="sk in epicSkills" :key="sk.name" class="sbe-row">
                <div class="sbe-header">
                  <span class="sbe-name">{{ sk.name }}</span>
                  <span class="sbe-pct" :ref="el => sbeRefs[sk.name] = el">0%</span>
                </div>
                <div class="sbe-track"><div class="sbe-fill" :data-level="sk.level" style="width:0"></div></div>
              </div>
            </div>
          </div>
          <div class="scene-right-panel" ref="sc2Right">
            <svg viewBox="0 0 380 380" class="radar-cinematic" ref="radarSvg" style="overflow: visible;">
              <defs>
                <filter id="cglow">
                  <feGaussianBlur stdDeviation="4" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <g transform="translate(190,190)">
                <circle v-for="i in 5" :key="i" :r="(165*i/5)" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
                <line v-for="(_, i) in epicSkills" :key="`ax${i}`" x1="0" y1="0" :x2="radarAxis(i).x" :y2="radarAxis(i).y" stroke="rgba(108,99,255,0.2)" stroke-width="1"/>
                <polygon :points="radarPolygon" fill="rgba(108,99,255,0.15)" stroke="#6C63FF" stroke-width="2" filter="url(#cglow)" class="radar-poly"/>
                <circle v-for="(p,i) in radarPoints" :key="`rp${i}`" :cx="p.x" :cy="p.y" r="5" fill="#00D9FF" filter="url(#cglow)"/>
                <text v-for="(sk,i) in epicSkills" :key="`rl${i}`" :x="radarLabelPos(i).x" :y="radarLabelPos(i).y" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="var(--font-mono)">{{ sk.name }}</text>
              </g>
            </svg>
          </div>
        </div>

        <!-- ESCENA 3: Proyectos -->
        <div class="scene" ref="scene3">
          <div class="scene-header-centered" ref="sc3Header">
            <span class="scene-label">{{ t('cinematic.scene3.label') }}</span>
            <h2 class="scene-h2">{{ t('cinematic.scene3.title') }}<br><em>{{ t('cinematic.scene3.title2') }}</em></h2>
          </div>
          <div class="projects-epic-grid">
            <div v-for="(proj, i) in showcaseProjects" :key="i" class="proj-epic" :ref="el => projRefs[i] = el">
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

        <!-- ESCENA 4: Experiencia -->
        <div class="scene" ref="scene4">
          <div class="scene-left-panel" ref="sc4Left">
            <span class="scene-label">{{ t('cinematic.scene4.label') }}</span>
            <h2 class="scene-h2">{{ t('cinematic.scene4.title') }}</h2>
          </div>
          <div class="exp-timeline-epic" ref="expTimeline">
            <div class="exp-item" v-for="(exp, i) in [
              { title: t('cinematic.scene4.exp1_title'), company: t('cinematic.scene4.exp1_company'), desc: t('cinematic.scene4.exp1_desc') },
              { title: t('cinematic.scene4.exp2_title'), company: t('cinematic.scene4.exp2_company'), desc: t('cinematic.scene4.exp2_desc') },
              { title: t('cinematic.scene4.exp3_title'), company: t('cinematic.scene4.exp3_company'), desc: t('cinematic.scene4.exp3_desc') }
            ]" :key="i">
              <div class="exp-dot"></div>
              <div class="exp-text">
                <strong>{{ exp.title }}</strong>
                <em>{{ exp.company }}</em>
                <p>{{ exp.desc }}</p>
              </div>
            </div>
            <div class="exp-line" ref="expLine"></div>
          </div>
        </div>

        <!-- ESCENA B: Future Goals (NUEVA) -->
        <div class="scene" ref="sceneB">
          <div class="scene-header-centered" ref="scBHeader">
            <span class="scene-label">{{ t('cinematic.sceneB.label') }}</span>
            <h2 class="scene-h2">{{ t('cinematic.sceneB.title') }}<br><em>{{ t('cinematic.sceneB.title2') }}</em></h2>
          </div>
          <div class="future-content" ref="scBContent">
            <p class="future-text">{{ t('cinematic.sceneB.text1') }}</p>
            <p class="future-text future-text-alt">{{ t('cinematic.sceneB.text2') }}</p>
          </div>
          <div class="future-grid-bg" ref="scBGrid"></div>
        </div>

        <!-- ESCENA 5: Logros y Certificaciones -->
        <div class="scene" ref="scene5">
          <div class="scene-header-centered" ref="sc5Header">
            <span class="scene-label">{{ t('cinematic.scene5.label') }}</span>
            <h2 class="scene-h2">{{ t('cinematic.scene5.title') }}<br><em>{{ t('cinematic.scene5.title2') }}</em></h2>
          </div>
          <div class="achievements-grid">
            <div class="ach-card" ref="ach0">
              <div class="ach-icon">🏆</div>
              <strong>{{ t('cinematic.scene5.ach1_title') }}</strong>
              <em>{{ t('cinematic.scene5.ach1_year') }}</em>
              <p>{{ t('cinematic.scene5.ach1_desc') }}</p>
            </div>
            <div class="ach-card" ref="ach1">
              <div class="ach-icon">🎓</div>
              <strong>{{ t('cinematic.scene5.ach2_title') }}</strong>
              <em>{{ t('cinematic.scene5.ach2_year') }}</em>
              <p>{{ t('cinematic.scene5.ach2_desc') }}</p>
            </div>
            <div class="ach-card" ref="ach2">
              <div class="ach-icon">📜</div>
              <strong>{{ t('cinematic.scene5.cert1_title') }}</strong>
              <em>{{ t('cinematic.scene5.cert1_issuer') }}</em>
            </div>
            <div class="ach-card" ref="ach3">
              <div class="ach-icon">💬</div>
              <strong>{{ t('cinematic.scene5.cert2_title') }}</strong>
              <em>{{ t('cinematic.scene5.cert2_issuer') }}</em>
            </div>
          </div>
        </div>

        <!-- ESCENA 6: Historia de Origen -->
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

        <!-- ESCENA 7: End / CTA -->
        <div class="scene" ref="scene7">
          <div class="end-wrap">
            <div class="end-thanks" ref="endThanks">{{ t('cinematic.scene7.thanksLabel') }}</div>
            <div class="end-name" ref="endName">{{ t('hero.name') }}</div>
            <div class="end-role" ref="endRole">{{ t('cinematic.scene7.label') }}</div>
            <div class="end-ctas" ref="endCtas">
              <a href="/projects" class="end-btn">{{ t('cinematic.scene7.cta1') }}</a>
              <a href="/contact" class="end-btn end-btn-out">{{ t('cinematic.scene7.cta2') }}</a>
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

const { t, tm } = useI18n()

const props = defineProps({ isActive: Boolean })
const emit = defineEmits(['end'])

// DOM refs
const particleCanvas = ref(null)
const barTop = ref(null); const barBottom = ref(null)
const progressFill = ref(null); const timerEl = ref(null)

const scene0 = ref(null); const scene1 = ref(null); const sceneA = ref(null);
const scene2 = ref(null); const scene3 = ref(null); const scene4 = ref(null);
const sceneB = ref(null); const scene5 = ref(null); const scene6 = ref(null);
const scene7 = ref(null)

const introLabel = ref(null); const introSubtitle = ref(null); const introUniversity = ref(null); const introYear = ref(null)
const cornerTL = ref(null); const cornerTR = ref(null); const cornerBL = ref(null); const cornerBR = ref(null)

const statsWrap = ref(null); const stNum0 = ref(null); const stNum1 = ref(null); const stNum2 = ref(null)
const st0 = ref(null); const st1 = ref(null); const st2 = ref(null); const sc1Tagline = ref(null)

const scALeft = ref(null); const scAPoints = ref([]); const scACircuit = ref(null)

const sc2Left = ref(null); const sc2Right = ref(null); const radarSvg = ref(null)

const sc3Header = ref(null); const projRefs = ref([])

const sc4Left = ref(null); const expTimeline = ref(null); const expLine = ref(null)

const scBHeader = ref(null); const scBContent = ref(null); const scBGrid = ref(null)

const sc5Header = ref(null); const ach0 = ref(null); const ach1 = ref(null); const ach2 = ref(null); const ach3 = ref(null)

const sc6Label = ref(null); const originQuote = ref(null); const traitsWrap = ref(null); const codeRain = ref(null)

const endThanks = ref(null); const endName = ref(null); const endRole = ref(null); const endCtas = ref(null)
const endBgCode = ref(null); const endGlow = ref(null)

const sbeRefs = ref({})

const TOTAL = 192

// Skills
const epicSkills = [
  { name: 'Frontend', level: 85 },
  { name: 'Backend',  level: 80 },
  { name: 'Database', level: 75 },
  { name: 'DevOps',   level: 60 },
  { name: 'Cloud',    level: 65 },
  { name: 'Testing',  level: 70 }
]
const radarVisible = ref(false)
const radarPoints = computed(() => epicSkills.map((sk, i) => {
  const a = (Math.PI * 2 * i) / epicSkills.length - Math.PI / 2
  const r = radarVisible.value ? (165 * sk.level / 100) : 0
  return { x: Math.cos(a) * r, y: Math.sin(a) * r }
}))
const radarPolygon = computed(() => radarPoints.value.map(p => `${p.x},${p.y}`).join(' '))
const radarAxis = (i) => { const a = (Math.PI*2*i)/6-Math.PI/2; return { x: Math.cos(a)*165, y: Math.sin(a)*165 } }
const radarLabelPos = (i) => { const a = (Math.PI*2*i)/6-Math.PI/2; return { x: Math.cos(a)*192, y: Math.sin(a)*192+4 } }

const techTags = ['Vue.js','React','Python','Node.js','PostgreSQL','Docker','FastAPI','AWS','Redis','Go','C++','Rust']

const showcaseProjects = computed(() => [
  { name: 'FinanceAI', desc: t('cinematic.scene4.exp2_desc'), tags: ['Python','FastAPI','Vue.js','PostgreSQL'] },
  { name: 'Simulación Paralela', desc: t('cinematic.scene4.exp3_desc'), tags: ['C++','OpenMP','CUDA'] },
  { name: 'Portfolio V2', desc: 'This portfolio — an interactive cinematic experience built with GSAP, WebAudio & WebGL.', tags: ['Vue.js','GSAP','WebAudio'] }
])

const endCode = `const javier = {\n  semestre: 7,\n  universidad: 'UVG',\n  stack: ['Vue','Python','Go','Rust'],\n  pasion: Infinity,\n  disponible: true\n}`

// Particles
let particleCtx = null, particleAnim = null, particles = []

const initParticles = () => {
  const canvas = particleCanvas.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  particleCtx = canvas.getContext('2d')
  particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.7, vy: (Math.random() - 0.5) * 0.7,
    r: Math.random() * 2 + 0.5, alpha: Math.random() * 0.5 + 0.2,
    color: Math.random() > 0.5 ? '108,99,255' : '0,217,255'
  }))
  const tick = () => {
    particleCtx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => {
      p.x = (p.x + p.vx + canvas.width) % canvas.width
      p.y = (p.y + p.vy + canvas.height) % canvas.height
      particleCtx.beginPath()
      particleCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      particleCtx.fillStyle = `rgba(${p.color},${p.alpha})`
      particleCtx.fill()
    })
    particles.forEach((p1, i) => particles.slice(i+1).forEach(p2 => {
      const d = Math.hypot(p1.x - p2.x, p1.y - p2.y)
      if (d < 120) {
        particleCtx.beginPath(); particleCtx.moveTo(p1.x, p1.y); particleCtx.lineTo(p2.x, p2.y)
        particleCtx.strokeStyle = `rgba(108,99,255,${0.12*(1-d/120)})`
        particleCtx.lineWidth = 0.5; particleCtx.stroke()
      }
    }))
    particleAnim = requestAnimationFrame(tick)
  }
  tick()
}

const animateCounter = (el, target, dur) => {
  const obj = { v: 0 }
  gsap.to(obj, { v: target, duration: dur, ease: 'power1.out', onUpdate: () => { if (el) el.textContent = Math.round(obj.v) } })
}

// Timer
let progressInterval = null, masterTL = null, mainAudio = null, loopAudio = null

const startProgressTimer = () => {
  let elapsed = 0
  progressInterval = setInterval(() => {
    elapsed++
    if (progressFill.value) progressFill.value.style.width = Math.min(elapsed/TOTAL*100,100)+'%'
    if (timerEl.value) { const m=Math.floor(elapsed/60),s=elapsed%60; timerEl.value.textContent=`${m}:${s.toString().padStart(2,'0')}` }
    if (elapsed >= TOTAL) { clearInterval(progressInterval); endCinematic() }
  }, 1000)
}

// ---- Main Timeline (192s total) ----
const buildTimeline = () => {
  masterTL = gsap.timeline()
  const allScenes = [scene0.value,scene1.value,sceneA.value,scene2.value,scene3.value,scene4.value,sceneB.value,scene5.value,scene6.value,scene7.value]
  gsap.set(allScenes, { autoAlpha: 0 })
  radarVisible.value = false

  // Pacing (10 scenes, total 192s). Approx 19s per scene
  // 0-18: Scene 0 (Intro)
  masterTL
    .set(scene0.value, { autoAlpha: 1 })
    .from([cornerTL.value, cornerTR.value, cornerBL.value, cornerBR.value], { scale: 0, opacity: 0, duration: 1, stagger: 0.2, ease: 'power4.out' })
    .from(introLabel.value, { scale: 0.5, opacity: 0, duration: 2.5, ease: 'power4.out' }, '-=0.3')
    .to(introLabel.value, { x: -8, duration: 0.05, yoyo: true, repeat: 7, ease: 'steps(1)' }, '<+2.5')
    .to(introLabel.value, { filter: 'hue-rotate(90deg) brightness(2)', duration: 0.05, yoyo: true, repeat: 5, ease: 'steps(1)' }, '-=0.3')
    .to(introLabel.value, { filter: 'none', duration: 0.1 })
    .from(introSubtitle.value, { opacity: 0, y: 30, duration: 1.5, ease: 'power3.out' }, '-=0.2')
    .from(introUniversity.value, { opacity: 0, y: 20, duration: 1, ease: 'power3.out' }, '-=0.8')
    .from(introYear.value, { opacity: 0, scale: 1.5, duration: 1, ease: 'back.out(2)' }, '-=0.5')
    .to([introLabel.value, introSubtitle.value, introUniversity.value, introYear.value], { y: 15, yoyo: true, repeat: -1, duration: 4, ease: 'sine.inOut' }, '<')
    .to(scene0.value, { autoAlpha: 0, duration: 1 }, '+=8')

  // 18-36: Scene 1 (Stats)
  masterTL
    .set(scene1.value, { autoAlpha: 1 })
    .from('.scene-bg-text', { scale: 6, opacity: 0, duration: 4, ease: 'power4.out' })
    .to('.scene-bg-text', { x: 50, yoyo: true, repeat: -1, duration: 10, ease: 'sine.inOut' }, '<')
    .from('.tech-float-tag', { opacity: 0, scale: 0.4, stagger: 0.12, duration: 0.6, ease: 'back.out(2)' }, '<+0.5')
    .from([st0.value, st1.value, st2.value], { y: 80, opacity: 0, stagger: 0.3, duration: 1, ease: 'back.out(1.7)' }, '<+0.5')
    .call(() => {
      animateCounter(stNum0.value, 7, 2)
      animateCounter(stNum1.value, 11, 2.5)
      animateCounter(stNum2.value, 15, 3)
    })
    .from(sc1Tagline.value, { opacity: 0, y: 20, duration: 1.5, ease: 'power3.out' }, '<+1.5')
    .to('.tech-float-tag', { y: -15, rotation: 5, yoyo: true, repeat: -1, ease: 'sine.inOut', duration: 3, stagger: 0.3 }, '<')
    .to(statsWrap.value, { y: 10, yoyo: true, repeat: -1, ease: 'sine.inOut', duration: 4 }, '<')
    .to(scene1.value, { autoAlpha: 0, duration: 1 }, '+=9')

  // 36-54: Scene A (Philosophy)
  masterTL
    .set(sceneA.value, { autoAlpha: 1 })
    .from(scALeft.value, { x: -80, opacity: 0, duration: 1.5, ease: 'power4.out' })
    .from(scACircuit.value, { opacity: 0, scale: 1.5, rotation: 15, duration: 4, ease: 'power2.out' }, '<')
    .from(scAPoints.value, { x: 50, opacity: 0, stagger: 0.4, duration: 1, ease: 'back.out(1.5)' }, '<+1')
    .to(scAPoints.value, { scale: 1.05, boxShadow: '0 0 25px rgba(0,217,255,0.4)', yoyo: true, repeat: -1, duration: 2, stagger: 0.4 }, '<+1.5')
    .to(scACircuit.value, { rotation: -5, scale: 1.6, yoyo: true, repeat: -1, duration: 15, ease: 'sine.inOut' }, '<')
    .to(sceneA.value, { autoAlpha: 0, duration: 1 }, '+=10')

  // 54-74: Scene 2 (Skills)
  masterTL
    .set(scene2.value, { autoAlpha: 1 })
    .from(sc2Left.value, { x: -80, opacity: 0, duration: 1.5, ease: 'power4.out' })
    .call(() => { radarVisible.value = true }, [], '<+0.5')
    .from('.radar-poly', { scale: 0, transformOrigin: '190px 190px', duration: 2.5, ease: 'elastic.out(1, 0.4)' }, '<')
    .from('.sbe-row', { x: -50, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out' }, '<+0.8')
    .call(() => {
      document.querySelectorAll('.sbe-fill').forEach(bar => {
        const pct = bar.dataset.level + '%'
        gsap.to(bar, { width: pct, duration: 2.5, ease: 'power2.out', delay: Math.random() * 0.4 })
      })
      Object.keys(sbeRefs.value).forEach(name => {
        const sk = epicSkills.find(s => s.name === name)
        if (sk && sbeRefs.value[name]) {
          const obj = { v: 0 }
          gsap.to(obj, { v: sk.level, duration: 2.5, ease: 'power2.out',
            onUpdate: () => { if (sbeRefs.value[name]) sbeRefs.value[name].textContent = Math.round(obj.v) + '%' }
          })
        }
      })
    })
    .to(sc2Right.value, { y: -10, yoyo: true, repeat: -1, duration: 4, ease: 'sine.inOut' }, '<')
    .to(scene2.value, { autoAlpha: 0, duration: 1 }, '+=13')

  // 74-94: Scene 3 (Projects)
  masterTL
    .set(scene3.value, { autoAlpha: 1 })
    .from(sc3Header.value, { y: 60, opacity: 0, duration: 1.5, ease: 'power4.out' })
    .from(projRefs.value, { y: 120, opacity: 0, rotateX: 30, stagger: 0.4, duration: 1.3, ease: 'back.out(1.5)', transformPerspective: 1000 }, '<+0.5')
    .to(projRefs.value, { y: -12, rotationZ: 1, yoyo: true, repeat: -1, ease: 'sine.inOut', duration: 3, stagger: 0.6 }, '<+1.5')
    .to(scene3.value, { autoAlpha: 0, duration: 1 }, '+=13')

  // 94-114: Scene 4 (Experience)
  masterTL
    .set(scene4.value, { autoAlpha: 1 })
    .from(sc4Left.value, { x: -80, opacity: 0, duration: 1.5, ease: 'power4.out' })
    .fromTo(expLine.value, { scaleY: 0 }, { scaleY: 1, duration: 2, ease: 'power2.inOut', transformOrigin: 'top center' }, '<+0.5')
    .from('.exp-item', { x: 50, opacity: 0, stagger: 0.5, duration: 1, ease: 'back.out(1.3)' }, '<+0.5')
    .from('.exp-dot', { scale: 0, stagger: 0.5, duration: 0.5, ease: 'back.out(3)' }, '<')
    .to('.exp-item', { x: -5, yoyo: true, repeat: -1, duration: 3, stagger: 0.4, ease: 'sine.inOut' }, '<+1')
    .to(scene4.value, { autoAlpha: 0, duration: 1 }, '+=12')

  // 114-134: Scene B (Future)
  masterTL
    .set(sceneB.value, { autoAlpha: 1 })
    .from(scBHeader.value, { y: -50, opacity: 0, duration: 1.5, ease: 'power4.out' })
    .from(scBGrid.value, { opacity: 0, scale: 2, duration: 5, ease: 'power2.out' }, '<')
    .from('.future-text', { y: 30, opacity: 0, filter: 'blur(10px)', stagger: 0.8, duration: 1.5, ease: 'power3.out' }, '<+1')
    .to(scBGrid.value, { backgroundPosition: '0 100px', repeat: -1, duration: 5, ease: 'linear' }, '<')
    .to('.future-text', { scale: 1.02, textShadow: '0 0 20px rgba(108,99,255,0.8)', yoyo: true, repeat: -1, duration: 2, stagger: 0.8 }, '<+1')
    .to(sceneB.value, { autoAlpha: 0, duration: 1 }, '+=11')

  // 134-154: Scene 5 (Achievements)
  masterTL
    .set(scene5.value, { autoAlpha: 1 })
    .from(sc5Header.value, { y: 60, opacity: 0, duration: 1.5, ease: 'power4.out' })
    .from([ach0.value, ach1.value, ach2.value, ach3.value], { scale: 0.6, opacity: 0, stagger: 0.3, duration: 1, ease: 'back.out(2)' }, '<+0.8')
    .to([ach0.value, ach1.value, ach2.value, ach3.value], { y: -8, rotation: 2, yoyo: true, repeat: -1, ease: 'sine.inOut', duration: 2.5, stagger: 0.4 }, '<+0.5')
    .to(scene5.value, { autoAlpha: 0, duration: 1 }, '+=12')

  // 154-172: Scene 6 (Origin)
  masterTL
    .set(scene6.value, { autoAlpha: 1 })
    .from(sc6Label.value, { opacity: 0, letterSpacing: '1em', duration: 1.5, ease: 'power2.out' })
    .from(originQuote.value, { opacity: 0, y: 40, duration: 2, ease: 'power3.out' }, '-=0.5')
    .from('.trait-pill', { opacity: 0, scale: 0.5, stagger: 0.2, duration: 0.7, ease: 'back.out(2)' }, '<+1')
    .to('.trait-pill', { boxShadow: '0 0 20px rgba(108,99,255,0.6)', yoyo: true, repeat: -1, ease: 'sine.inOut', duration: 2, stagger: 0.4 }, '<+0.5')
    .to(originQuote.value, { scale: 1.02, yoyo: true, repeat: -1, duration: 4, ease: 'sine.inOut' }, '<')
    .to(scene6.value, { autoAlpha: 0, duration: 1 }, '+=10')

  // 172-192: Scene 7 (End/CTA)
  masterTL
    .set(scene7.value, { autoAlpha: 1 })
    .from(endThanks.value, { opacity: 0, letterSpacing: '2em', duration: 2, ease: 'power2.out' })
    .from(endName.value, { opacity: 0, scale: 0.6, duration: 2.5, ease: 'power4.out' }, '-=1')
    .to(endName.value, { x: -8, duration: 0.06, yoyo: true, repeat: 6, ease: 'steps(1)' }, '<+2')
    .to(endName.value, { filter: 'hue-rotate(180deg) brightness(2)', duration: 0.06, yoyo: true, repeat: 4, ease: 'steps(1)' }, '-=1')
    .to(endName.value, { filter: 'none', duration: 0.1 })
    .from(endRole.value, { opacity: 0, y: 20, duration: 1.5, ease: 'power3.out' }, '<+0.5')
    .from(endCtas.value?.children ?? [], { opacity: 0, scale: 0.8, stagger: 0.3, duration: 1, ease: 'back.out(2)' }, '<+0.5')
    .from(endGlow.value, { opacity: 0, scale: 0, duration: 3 }, '<')
    .to(endGlow.value, { scale: 1.2, opacity: 0.8, yoyo: true, repeat: -1, duration: 2 }, '<+1')
    .to(endName.value, { textShadow: '0 0 80px rgba(108,99,255,1), 0 0 30px rgba(0,217,255,0.8)', yoyo: true, repeat: -1, ease: 'sine.inOut', duration: 2 }, '<')
}

const startCinematic = () => {
  window.scrollTo(0, 0)
  document.body.style.overflow = 'hidden'

  nextTick(() => {
    if (loopAudio) { loopAudio.pause(); loopAudio.currentTime = 0 }
    if (mainAudio) { mainAudio.pause(); mainAudio.currentTime = 0 }

    initParticles()
    gsap.fromTo(barTop.value, { y: '-100%' }, { y: 0, duration: 1.5, ease: 'power4.inOut' })
    gsap.fromTo(barBottom.value, { y: '100%' }, { y: 0, duration: 1.5, ease: 'power4.inOut' })

    // Start audio
    mainAudio = new Audio(encodeURI('/sounds/Main Theme (NO TOCAR).mp3'))
    mainAudio.volume = 1
    mainAudio.play().catch(e => console.warn('Audio blocked:', e))

    startProgressTimer()
    setTimeout(buildTimeline, 1600)
  })
}

const endCinematicEarly = () => {
  if (masterTL) masterTL.kill()
  if (mainAudio) { mainAudio.pause(); mainAudio.currentTime = 0 }
  clearInterval(progressInterval)
  cancelAnimationFrame(particleAnim)
  endCinematic()
}

const endCinematic = () => {
  clearInterval(progressInterval)
  cancelAnimationFrame(particleAnim)
  if (masterTL) masterTL.kill()
  if (mainAudio) { mainAudio.pause(); mainAudio.currentTime = 0 }
  document.body.style.overflow = ''

  gsap.to([barTop.value, barBottom.value], { duration: 1, opacity: 0 })

  if (loopAudio) { loopAudio.pause(); loopAudio.currentTime = 0 }
  loopAudio = new Audio('/sounds/musica.mp3')
  loopAudio.loop = true
  loopAudio.volume = 0
  loopAudio.play().catch(() => {})
  const obj = { v: 0 }
  gsap.to(obj, { v: 0.45, duration: 4, onUpdate: () => { if (loopAudio) loopAudio.volume = obj.v } })

  setTimeout(() => emit('end'), 1200)
}

watch(() => props.isActive, (val) => {
  if (val) startCinematic()
  else { if (masterTL) masterTL.kill(); cancelAnimationFrame(particleAnim); document.body.style.overflow = '' }
})

onUnmounted(() => {
  if (masterTL) masterTL.kill()
  clearInterval(progressInterval)
  cancelAnimationFrame(particleAnim)
  if (mainAudio) mainAudio.pause()
  if (loopAudio) loopAudio.pause()
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ---- Root ---- */
.cinematic-root {
  position: fixed; inset: 0; z-index: 9900;
  background: #030508; overflow: hidden;
}

.particle-canvas { position: absolute; inset: 0; z-index: 0; pointer-events: none; }

/* ---- Typography Fixes (word-wrap) ---- */
.intro-label, .scene-h2, .end-name, .proj-epic p, .origin-quote, .future-text {
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  white-space: normal;
}

/* ---- Bars ---- */
.cinema-bar { position: absolute; left: 0; right: 0; height: 70px; background: #000; z-index: 100; }
.cinema-bar-top { top: 0; }
.cinema-bar-bottom { bottom: 0; display: flex; align-items: center; padding: 0 2rem; }
.cinema-controls { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; }

.cinema-status {
  font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.22em;
  color: rgba(255,255,255,0.65); display: flex; align-items: center; gap: 0.7rem; white-space: nowrap;
}
.recording-dot { width: 9px; height: 9px; background: #FF5F56; border-radius: 50%; animation: pulse-r 1.5s infinite; }
@keyframes pulse-r { 0%{box-shadow:0 0 0 0 rgba(255,95,86,.8)} 70%{box-shadow:0 0 0 8px rgba(255,95,86,0)} 100%{box-shadow:0 0 0 0 rgba(255,95,86,0)} }

.cinema-progress-wrap { flex: 1; display: flex; align-items: center; gap: 1rem; }
.cinema-progress-bar { flex: 1; height: 2px; background: rgba(255,255,255,.1); border-radius: 2px; overflow: hidden; }
.cinema-progress-fill { height: 100%; background: linear-gradient(90deg,#6C63FF,#00D9FF); transition: width 1s linear; box-shadow: 0 0 8px rgba(108,99,255,.8); }
.cinema-timer { font-family: var(--font-mono); font-size: 0.75rem; color: rgba(255,255,255,.45); white-space: nowrap; }
.btn-skip {
  background: transparent; border: 1px solid rgba(255,255,255,.2); color: rgba(255,255,255,.7);
  padding: 0.4rem 1.1rem; border-radius: 20px; font-family: var(--font-mono); font-size: 0.68rem;
  text-transform: uppercase; letter-spacing: 0.12em; display: flex; align-items: center; gap: 0.5rem;
  cursor: pointer; transition: all 0.25s; white-space: nowrap;
}
.btn-skip:hover { border-color: #fff; color: #fff; background: rgba(255,255,255,.08); }

/* ---- Scenes ---- */
.scenes-container { position: absolute; inset: 70px; z-index: 10; }
.scene {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  visibility: hidden; opacity: 0; padding: 2rem; width: 100%; height: 100%; overflow: hidden;
}
.scene-scanlines {
  position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(108,99,255,.02) 2px,rgba(108,99,255,.02) 4px);
  animation: scanlines 3s linear infinite;
}
@keyframes scanlines { from{background-position:0 0} to{background-position:0 100px} }

/* ---- SCENE 0: Corners ---- */
.corner {
  position: absolute; width: 40px; height: 40px;
  border-color: rgba(108,99,255,.7); border-style: solid;
}
.corner-tl { top: 20px; left: 20px; border-width: 2px 0 0 2px; }
.corner-tr { top: 20px; right: 20px; border-width: 2px 2px 0 0; }
.corner-bl { bottom: 20px; left: 20px; border-width: 0 0 2px 2px; }
.corner-br { bottom: 20px; right: 20px; border-width: 0 2px 2px 0; }

.intro-content { text-align: center; z-index: 2; width: 100%; max-width: 90vw; }
.intro-label {
  font-size: clamp(2.5rem, 8vw, 6.5rem); font-weight: 900; letter-spacing: 0.12em;
  background: linear-gradient(135deg,#fff 40%,rgba(108,99,255,.9));
  background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 30px rgba(108,99,255,.6));
  will-change: transform, filter; line-height: 1.2;
}
.intro-subtitle { font-family: var(--font-mono); font-size: clamp(.7rem,2vw,1.3rem); color: var(--accent-cyan); letter-spacing: .3em; margin-top: 1.5rem; text-transform: uppercase; }
.intro-university { font-size: clamp(.7rem,1.5vw,1rem); color: rgba(255,255,255,.35); margin-top: .5rem; letter-spacing: .2em; text-transform: uppercase; }
.intro-year { display: inline-block; margin-top: 1.5rem; font-family: var(--font-mono); font-size: clamp(.8rem,2vw,1.1rem); color: var(--accent-violet); background: rgba(108,99,255,.12); border: 1px solid rgba(108,99,255,.3); padding: .4rem 1.2rem; border-radius: 40px; }

/* ---- SCENE 1: Stats ---- */
.scene-bg-text {
  position: absolute; font-size: 40vw; font-weight: 900; color: rgba(108,99,255,.03);
  user-select: none; pointer-events: none; line-height: 1; white-space: nowrap;
}
.stats-hero { display: flex; align-items: center; gap: 3rem; z-index: 2; flex-wrap: wrap; justify-content: center; }
.stats-divider-v { width: 1px; height: 80px; background: rgba(255,255,255,.1); }
.stat-mega { text-align: center; }
.stat-num {
  display: block; font-size: clamp(3.5rem,9vw,7rem); font-weight: 900; line-height: 1;
  background: linear-gradient(135deg,#6C63FF,#00D9FF); background-clip: text;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 15px rgba(108,99,255,.5));
}
.stat-lbl { display: block; font-family: var(--font-mono); font-size: .72rem; letter-spacing: .3em; color: rgba(255,255,255,.4); text-transform: uppercase; margin-top: .5rem; }
.scene-tagline { position: absolute; bottom: 10%; font-size: clamp(1rem,2.5vw,1.8rem); font-weight: 700; color: rgba(255,255,255,.75); z-index: 2; text-align: center; width: 100%; padding: 0 1rem; }
.tech-tags-float { position: absolute; inset: 0; z-index: 1; pointer-events: none; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 1.5rem; padding: 4rem 2rem; opacity: .25; overflow: hidden; }
.tech-float-tag { font-family: var(--font-mono); font-size: .8rem; color: #6C63FF; border: 1px solid rgba(108,99,255,.3); padding: .3rem .8rem; border-radius: 20px; }

/* ---- SCENE A: Philosophy ---- */
.philosophy-points { flex: 1; display: flex; flex-direction: column; gap: 1.5rem; justify-content: center; z-index: 2; padding-left: 2rem; }
.phil-point { display: flex; align-items: center; gap: 1rem; background: rgba(108,99,255,0.05); padding: 1rem 1.5rem; border-radius: 12px; border-left: 4px solid #00D9FF; }
.phil-icon { font-size: 1.5rem; }
.phil-text { font-size: 1.2rem; font-weight: 600; color: #fff; letter-spacing: 0.05em; }
.bg-circuit { position: absolute; inset: -20%; background-image: radial-gradient(rgba(108,99,255,0.2) 1px, transparent 1px), radial-gradient(rgba(0,217,255,0.1) 1px, transparent 1px); background-size: 40px 40px, 20px 20px; background-position: 0 0, 10px 10px; z-index: 0; opacity: 0.4; }

/* ---- SCENE 2: Skills ---- */
.scene-skills-layout { gap: 2rem; flex-direction: row; }
.scene-left-panel { flex: 1; display: flex; flex-direction: column; gap: 1.5rem; min-width: 240px; z-index: 2; }
.scene-right-panel { flex: 1; display: flex; align-items: center; justify-content: center; min-width: 240px; z-index: 2; }
.scene-label { font-family: var(--font-mono); font-size: .75rem; letter-spacing: .25em; color: var(--accent-cyan); text-transform: uppercase; }
.scene-h2 { font-size: clamp(1.8rem, 5vw, 3.5rem); font-weight: 900; color: #fff; line-height: 1.1; max-width: 100%; }
.scene-h2 em { font-style: normal; background: linear-gradient(135deg,#6C63FF,#00D9FF); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.scene-header-centered { text-align: center; display: flex; flex-direction: column; gap: .75rem; z-index: 2; width: 100%; position: absolute; top: 10%; padding: 0 1rem; }

.skills-bars-epic { display: flex; flex-direction: column; gap: .9rem; }
.sbe-row { display: flex; flex-direction: column; gap: .35rem; }
.sbe-header { display: flex; justify-content: space-between; }
.sbe-name { font-family: var(--font-mono); font-size: .72rem; letter-spacing: .15em; color: rgba(255,255,255,.6); text-transform: uppercase; }
.sbe-pct { font-family: var(--font-mono); font-size: .7rem; color: rgba(108,99,255,.9); }
.sbe-track { height: 3px; background: rgba(255,255,255,.07); border-radius: 2px; overflow: hidden; }
.sbe-fill { height: 100%; background: linear-gradient(90deg,#6C63FF,#00D9FF); border-radius: 2px; box-shadow: 0 0 8px rgba(108,99,255,.7); }

.radar-cinematic { width: min(380px,40vw); height: min(380px,40vw); }
.radar-poly { transition: all 2s cubic-bezier(.4,0,.2,1); }

/* ---- SCENE 3: Projects ---- */
.projects-epic-grid { display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center; width: 100%; margin-top: 8rem; z-index: 2; }
.proj-epic {
  position: relative; background: rgba(255,255,255,.03); border: 1px solid rgba(108,99,255,.3);
  border-radius: 14px; padding: 1.5rem; max-width: 300px; width: 100%; overflow: hidden;
  box-shadow: 0 0 30px rgba(108,99,255,.1);
}
.proj-epic::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background: linear-gradient(90deg,transparent,rgba(108,99,255,.9),transparent); }
.proj-epic-num { font-family: var(--font-mono); font-size: .65rem; color: var(--accent-cyan); letter-spacing: .3em; margin-bottom: .5rem; }
.proj-epic h3 { font-size: 1.4rem; font-weight: 800; color: #fff; margin-bottom: .5rem; }
.proj-epic p { font-size: .82rem; color: rgba(255,255,255,.45); line-height: 1.6; margin-bottom: 1rem; }
.proj-epic-tags { display: flex; flex-wrap: wrap; gap: .4rem; }
.proj-epic-tags span { font-family: var(--font-mono); font-size: .65rem; padding: .25rem .6rem; border-radius: 20px; background: rgba(108,99,255,.12); color: #6C63FF; border: 1px solid rgba(108,99,255,.25); }
.proj-epic-glow { position: absolute; inset: 0; border-radius: 14px; pointer-events: none; background: radial-gradient(ellipse 80% 80% at 50% 50%,rgba(108,99,255,.04),transparent 70%); }

/* ---- SCENE 4: Experience ---- */
.exp-timeline-epic {
  position: relative; display: flex; flex-direction: column; gap: 1.5rem;
  padding-left: 3rem; margin-top: 6rem; width: 100%; max-width: 600px; z-index: 2;
}
.exp-line {
  position: absolute; left: 14px; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(180deg,#6C63FF,#00D9FF); opacity: .5;
  transform-origin: top; transform: scaleY(0);
}
.exp-item { position: relative; }
.exp-dot {
  position: absolute; left: -2.65rem; top: 4px; width: 14px; height: 14px;
  background: #030508; border: 2px solid var(--accent-cyan); border-radius: 50%;
  box-shadow: 0 0 10px var(--accent-cyan);
}
.exp-text strong { display: block; font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: .2rem; }
.exp-text em { display: block; font-style: normal; font-size: .8rem; color: var(--accent-violet); margin-bottom: .5rem; font-family: var(--font-mono); }
.exp-text p { font-size: .82rem; color: rgba(255,255,255,.45); line-height: 1.5; }

/* ---- SCENE B: Future ---- */
.future-content { text-align: center; margin-top: 8rem; z-index: 2; display: flex; flex-direction: column; gap: 1rem; padding: 0 1rem; }
.future-text { font-size: clamp(1.5rem, 4vw, 2.5rem); font-weight: 800; color: #fff; line-height: 1.3; }
.future-text-alt { color: var(--accent-cyan); font-style: italic; }
.future-grid-bg { position: absolute; inset: 0; background: linear-gradient(transparent 95%, rgba(108,99,255,0.2) 100%), linear-gradient(90deg, transparent 95%, rgba(108,99,255,0.2) 100%); background-size: 50px 50px; z-index: 0; opacity: 0.3; transform: perspective(500px) rotateX(60deg) scale(2); transform-origin: bottom; }

/* ---- SCENE 5: Achievements ---- */
.achievements-grid { display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center; width: 100%; margin-top: 8rem; z-index: 2; }
.ach-card {
  background: rgba(255,255,255,.03); border: 1px solid rgba(108,99,255,.25);
  border-radius: 14px; padding: 1.5rem; max-width: 240px; text-align: center;
  display: flex; flex-direction: column; gap: .5rem; align-items: center; width: 100%;
}
.ach-icon { font-size: 2rem; }
.ach-card strong { display: block; font-size: 1rem; font-weight: 700; color: #fff; }
.ach-card em { font-style: normal; font-family: var(--font-mono); font-size: .7rem; color: var(--accent-cyan); letter-spacing: .1em; }
.ach-card p { font-size: .8rem; color: rgba(255,255,255,.4); line-height: 1.5; }

/* ---- SCENE 6: Origin ---- */
.origin-content { text-align: center; max-width: 700px; z-index: 2; display: flex; flex-direction: column; gap: 2rem; align-items: center; padding: 0 1rem; width: 100%; }
.origin-quote {
  font-size: clamp(1.1rem, 2.5vw, 1.7rem); font-style: italic; color: rgba(255,255,255,.85);
  line-height: 1.6; font-weight: 300; border-left: none;
  background: linear-gradient(135deg,rgba(108,99,255,.08),rgba(0,217,255,.04));
  border: 1px solid rgba(108,99,255,.2); border-radius: 12px; padding: 2rem 2.5rem;
}
.traits-wrap { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
.trait-pill {
  font-family: var(--font-mono); font-size: .8rem; padding: .5rem 1.2rem;
  border-radius: 30px; background: rgba(108,99,255,.12); border: 1px solid rgba(108,99,255,.3);
  color: rgba(255,255,255,.8); letter-spacing: .08em; text-align: center;
}
.code-rain-bg {
  position: absolute; right: 5%; top: 50%; transform: translateY(-50%);
  opacity: .05; font-family: var(--font-mono); font-size: .9rem; color: #6C63FF;
  white-space: pre; line-height: 1.8; pointer-events: none;
}

/* ---- SCENE 7: End ---- */
.end-wrap { text-align: center; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; width: 100%; padding: 0 1rem; }
.end-bg-code { position: absolute; right: 3%; top: 50%; transform: translateY(-50%); opacity: .05; font-family: var(--font-mono); font-size: .9rem; color: #6C63FF; white-space: pre; line-height: 1.8; }
.end-glow-orb { position: absolute; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle,rgba(108,99,255,.15),transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; }
.end-thanks { font-family: var(--font-mono); font-size: .8rem; letter-spacing: .5em; color: rgba(255,255,255,.3); text-transform: uppercase; }
.end-name {
  font-size: clamp(2.5rem, 7vw, 5.5rem); font-weight: 900; letter-spacing: .1em;
  background: linear-gradient(135deg,#fff 30%,rgba(108,99,255,.9));
  background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  will-change: filter; line-height: 1.2;
}
.end-role { font-family: var(--font-mono); font-size: .85rem; letter-spacing: .22em; color: var(--accent-cyan); text-align: center; }
.end-ctas { display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center; }
.end-btn {
  padding: .9rem 2rem; border-radius: 40px; font-size: .9rem; font-weight: 700;
  text-decoration: none; transition: transform .3s;
  background: linear-gradient(135deg,#6C63FF,#00D9FF); color: #fff;
  box-shadow: 0 0 30px rgba(108,99,255,.4); white-space: nowrap;
}
.end-btn:hover { transform: scale(1.06); }
.end-btn-out { background: transparent; border: 1px solid rgba(255,255,255,.3); color: rgba(255,255,255,.8); box-shadow: none; }

/* ---- Transitions ---- */
.cinematic-fade-enter-active, .cinematic-fade-leave-active { transition: opacity .5s; }
.cinematic-fade-enter-from, .cinematic-fade-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .cinema-bar { height: 55px; }
  .scenes-container { inset: 55px; }
  .scene-skills-layout { flex-direction: column; overflow-y: auto; align-items: flex-start; justify-content: flex-start; }
  .scene-left-panel { min-width: 100%; margin-top: 2rem; }
  .philosophy-points { padding-left: 0; }
  .radar-cinematic { width: min(260px,80vw); height: min(260px,80vw); margin-top: 2rem; }
  .projects-epic-grid, .achievements-grid { flex-direction: column; align-items: center; margin-top: 4rem; overflow-y: auto; padding-bottom: 2rem; }
  .stats-hero { gap: 1.5rem; }
  .stats-divider-v { display: none; }
  .exp-timeline-epic { margin-top: 5rem; }
  .end-ctas { flex-direction: column; align-items: center; }
  .scene { padding: 1rem; }
}
</style>
