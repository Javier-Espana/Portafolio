<template>
  <div class="skills-view page-transition">
    <section class="skills-hero section">
      <div class="container">
        <h1 class="section-title gsap-reveal">{{ $t('skills.title') }}</h1>
        <p class="section-subtitle gsap-reveal">
          {{ $t('skills.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Radar Chart -->
    <section class="radar-section section" ref="radarSectionRef">
      <div class="container">
        <div class="radar-container card gsap-radar">
          <h2 class="radar-title">{{ $t('skills.radar') }}</h2>
          <div class="radar-chart" ref="radarChartRef">
            <svg :width="radarSize" :height="radarSize" class="radar-svg" role="img" aria-label="Skills Radar Chart">
              <g :transform="`translate(${radarSize/2}, ${radarSize/2})`">
                <!-- Grid bg -->
                <circle
                  v-for="i in 5"
                  :key="`circle-${i}`"
                  :r="(radarSize/2 - 40) * (i/5)"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.06)"
                  stroke-width="1"
                />
                
                <!-- Axis -->
                <line
                  v-for="(skill, index) in radarSkills"
                  :key="`axis-${index}`"
                  x1="0"
                  y1="0"
                  :x2="getAxisPoint(index).x"
                  :y2="getAxisPoint(index).y"
                  stroke="rgba(255, 255, 255, 0.12)"
                  stroke-width="1"
                />
                
                <!-- Polygon -->
                <polygon
                  :points="isRadarVisible ? skillPolygonPoints : centerPolygonPoints"
                  fill="rgba(108, 99, 255, 0.25)"
                  stroke="var(--accent-violet)"
                  stroke-width="2"
                  class="radar-polygon"
                />
                
                <!-- Points -->
                <circle
                  v-for="(point, index) in skillPoints"
                  :key="`point-${index}`"
                  :cx="isRadarVisible ? point.x : 0"
                  :cy="isRadarVisible ? point.y : 0"
                  r="5"
                  fill="var(--accent-cyan)"
                  class="radar-point"
                />
                
                <!-- Labels -->
                <text
                  v-for="(skill, index) in radarSkills"
                  :key="`label-${index}`"
                  :x="getLabelPoint(index).x"
                  :y="getLabelPoint(index).y"
                  text-anchor="middle"
                  fill="var(--text-primary)"
                  font-size="11"
                  font-weight="600"
                  font-family="var(--font-mono)"
                  class="skill-label"
                >
                  {{ skill.name }}
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills List -->
    <section class="skills-categories section">
      <div class="container">
        <div
          v-for="(category, index) in skillCategories"
          :key="category.nameKey"
          class="category-section gsap-category"
        >
          <h2 class="category-title">{{ $t(category.nameKey) }}</h2>
          
          <div class="skills-grid">
            <div
              v-for="skill in category.skills"
              :key="skill.name"
              class="skill-card card gsap-skill-card"
            >
              <div class="skill-header">
                <span class="skill-icon">{{ skill.icon }}</span>
                <h3 class="skill-name">{{ skill.name }}</h3>
              </div>
              
              <div class="skill-level">
                <div class="skill-bar">
                  <div
                    class="skill-fill"
                    :style="{ 
                      width: visibleCategories[index] ? skill.level + '%' : '0%',
                      background: category.color
                    }"
                  ></div>
                </div>
                <span class="skill-percentage">{{ visibleCategories[index] ? skill.level : 0 }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const radarSize = ref(400)
const radarChartRef = ref(null)
const radarSectionRef = ref(null)
const isRadarVisible = ref(false)
const visibleCategories = ref({})

// Radar técnico de Javier basado en logros y proyectos de producción
const radarSkills = [
  { name: 'Machine Learning', level: 92 },
  { name: 'Backend & APIs',   level: 90 },
  { name: 'Full-Stack Web',   level: 88 },
  { name: 'Data Pipelines',   level: 86 },
  { name: 'Docker & Cloud',   level: 84 },
  { name: 'Low-Level & Arch', level: 82 }
]

const skillCategories = [
  {
    nameKey: 'skills.categories.languages',
    color: 'var(--accent-violet)',
    skills: [
      { name: 'Python', icon: 'Py', level: 95 },
      { name: 'Go', icon: 'Go', level: 88 },
      { name: 'Rust', icon: 'Rs', level: 82 },
      { name: 'C / C++', icon: 'C++', level: 85 },
      { name: 'Java / Kotlin', icon: 'Jv', level: 82 },
      { name: 'JavaScript / TypeScript', icon: 'JS', level: 88 },
      { name: 'SQL', icon: 'SQL', level: 90 },
      { name: 'ARM Assembler', icon: 'ARM', level: 85 }
    ]
  },
  {
    nameKey: 'skills.categories.frontend', // Data & ML
    color: 'var(--accent-cyan)',
    skills: [
      { name: 'LightGBM / Optuna', icon: 'ML', level: 95 },
      { name: 'Apache Airflow', icon: 'Air', level: 88 },
      { name: 'Streamlit & Grafana', icon: 'UI', level: 90 },
      { name: 'Jina Embeddings / NLP', icon: 'NLP', level: 85 },
      { name: 'Power BI & Analytics', icon: 'BI', level: 88 }
    ]
  },
  {
    nameKey: 'skills.categories.backend', // Backend & Storage
    color: 'var(--accent-green)',
    skills: [
      { name: 'Vue.js (Vite)', icon: 'Vue', level: 90 },
      { name: 'Go (Echo Microservices)', icon: 'Go', level: 88 },
      { name: 'FastAPI / Flask', icon: 'API', level: 88 },
      { name: 'PostgreSQL', icon: 'Pg', level: 90 },
      { name: 'MinIO / AWS S3', icon: 'S3', level: 84 },
      { name: 'React', icon: 'Re', level: 80 }
    ]
  },
  {
    nameKey: 'skills.categories.devops', // DevOps & Infra
    color: 'var(--accent-orange)',
    skills: [
      { name: 'Docker & Docker Compose', icon: 'Dk', level: 92 },
      { name: 'GitHub Actions (CI/CD)', icon: 'CI', level: 88 },
      { name: 'Git & Linux Workflows', icon: 'Lx', level: 92 },
      { name: 'Android Studio & Compose', icon: 'And', level: 78 }
    ]
  }
]

const getAxisPoint = (index) => {
  const angle = (Math.PI * 2 * index) / radarSkills.length - Math.PI / 2
  const radius = radarSize.value / 2 - 40
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius
  }
}

const getLabelPoint = (index) => {
  const angle = (Math.PI * 2 * index) / radarSkills.length - Math.PI / 2
  const radius = radarSize.value / 2 - 15
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius + 4
  }
}

const skillPoints = computed(() => {
  return radarSkills.map((skill, index) => {
    const angle = (Math.PI * 2 * index) / radarSkills.length - Math.PI / 2
    const maxRadius = radarSize.value / 2 - 40
    const radius = (maxRadius * skill.level) / 100
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    }
  })
})

const skillPolygonPoints = computed(() => {
  return skillPoints.value.map(point => `${point.x},${point.y}`).join(' ')
})

const centerPolygonPoints = computed(() => {
  return skillPoints.value.map(() => `0,0`).join(' ')
})

onMounted(() => {
  const updateSize = () => {
    if (radarChartRef.value) {
      const w = radarChartRef.value.offsetWidth
      radarSize.value = Math.min(Math.max(w - 10, 220), 400)
    }
  }

  updateSize()
  window.addEventListener('resize', updateSize)

  onUnmounted(() => {
    window.removeEventListener('resize', updateSize)
  })

  nextTick(() => {
    // Reveal headers
    gsap.fromTo('.gsap-reveal',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    )

    // Radar reveal
    if (radarSectionRef.value) {
      ScrollTrigger.create({
        trigger: radarSectionRef.value,
        start: "top 75%",
        onEnter: () => {
          isRadarVisible.value = true
        }
      })
    }

    // Skills progress animation
    skillCategories.forEach((_, idx) => {
      visibleCategories.value[idx] = true
    })

    gsap.fromTo('.gsap-skill-card',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-categories",
          start: "top 80%"
        }
      }
    )
  })
})
</script>

<style scoped>
.skills-view {
  padding-top: 5rem;
}

.radar-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.radar-title {
  font-size: var(--text-xl);
  color: var(--text-white);
  margin-bottom: 1.5rem;
  text-align: center;
}

.radar-chart {
  width: 100%;
  display: flex;
  justify-content: center;
}

.radar-polygon {
  transition: all 1s var(--ease-smooth);
}

.radar-point {
  transition: all 1s var(--ease-smooth);
}

.category-section {
  margin-top: 4rem;
}

.category-title {
  font-size: var(--text-xl);
  color: var(--text-white);
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.category-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 40px;
  height: 3px;
  background: var(--accent-cyan);
  border-radius: var(--radius-full);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}

.skill-card {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.skill-icon {
  width: 32px;
  height: 32px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--accent-cyan);
}

.skill-name {
  font-size: var(--text-sm);
  color: var(--text-white);
  font-weight: 500;
}

.skill-level {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.skill-bar {
  flex-grow: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 1s var(--ease-smooth);
}

.skill-percentage {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  color: var(--text-secondary);
  width: 35px;
  text-align: right;
}

@media (max-width: 640px) {
  .skills-view {
    padding-top: 3.5rem;
  }
  .radar-container {
    padding: 1.5rem 0.75rem;
  }
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
  .category-section {
    margin-top: 2.5rem;
  }
}
</style>
