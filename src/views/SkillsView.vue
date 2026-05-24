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
            <svg :width="radarSize" :height="radarSize" class="radar-svg">
              <g :transform="`translate(${radarSize/2}, ${radarSize/2})`">
                <!-- Grid bg -->
                <circle
                  v-for="i in 5"
                  :key="`circle-${i}`"
                  :r="(radarSize/2 - 40) * (i/5)"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
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
                  stroke="rgba(255, 255, 255, 0.1)"
                  stroke-width="1"
                />
                
                <!-- Polygon -->
                <polygon
                  :points="isRadarVisible ? skillPolygonPoints : centerPolygonPoints"
                  fill="rgba(108, 99, 255, 0.2)"
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
                  r="4"
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
                  fill="var(--text-secondary)"
                  font-size="12"
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
import { ref, computed, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const radarSize = ref(400)
const radarChartRef = ref(null)
const radarSectionRef = ref(null)
const isRadarVisible = ref(false)
const visibleCategories = ref({})

// Ajustados a un perfil de estudiante 7mo semestre
const radarSkills = [
  { name: 'Frontend', level: 85 },
  { name: 'Backend',  level: 80 },
  { name: 'Database', level: 75 },
  { name: 'DevOps',   level: 60 },
  { name: 'Cloud',    level: 65 },
  { name: 'Testing',  level: 70 }
]

const skillCategories = [
  {
    nameKey: 'skills.categories.languages',
    color: 'var(--accent-violet)',
    skills: [
      { name: 'JavaScript / TypeScript', icon: 'JS', level: 85 },
      { name: 'Python', icon: 'Py', level: 80 },
      { name: 'Java', icon: 'Jv', level: 75 },
      { name: 'Go', icon: 'Go', level: 60 },
      { name: 'C/C++', icon: 'C+', level: 70 }
    ]
  },
  {
    nameKey: 'skills.categories.frontend',
    color: 'var(--accent-cyan)',
    skills: [
      { name: 'Vue.js', icon: 'V', level: 85 },
      { name: 'React', icon: 'Re', level: 80 },
      { name: 'HTML/CSS', icon: 'UI', level: 90 },
      { name: 'Tailwind CSS', icon: 'Tw', level: 85 }
    ]
  },
  {
    nameKey: 'skills.categories.backend',
    color: 'var(--accent-green)',
    skills: [
      { name: 'Node.js / Express', icon: 'No', level: 80 },
      { name: 'FastAPI', icon: 'Fa', level: 75 },
      { name: 'Spring Boot', icon: 'Sp', level: 70 }
    ]
  },
  {
    nameKey: 'skills.categories.databases',
    color: 'var(--accent-pink)',
    skills: [
      { name: 'PostgreSQL', icon: 'Pg', level: 75 },
      { name: 'MongoDB', icon: 'Mg', level: 70 },
      { name: 'Redis', icon: 'Rd', level: 65 }
    ]
  },
  {
    nameKey: 'skills.categories.devops',
    color: 'var(--accent-orange)',
    skills: [
      { name: 'Docker', icon: 'Dk', level: 75 },
      { name: 'AWS', icon: 'Aw', level: 65 },
      { name: 'CI/CD Actions', icon: 'Ci', level: 70 },
      { name: 'Linux', icon: 'Lx', level: 80 }
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
      radarSize.value = Math.min(w, 500)
    }
  }
  updateSize()
  window.addEventListener('resize', updateSize)

  nextTick(() => {
    // Reveal Hero
    gsap.fromTo('.gsap-reveal',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    )

    // Reveal Radar Chart Container
    gsap.fromTo('.gsap-radar',
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power4.out",
        scrollTrigger: {
          trigger: radarSectionRef.value,
          start: "top 75%",
          onEnter: () => {
            isRadarVisible.value = true
          }
        }
      }
    )

    // Reveal Categories and Skill Cards
    const categoriesEls = document.querySelectorAll('.gsap-category')
    categoriesEls.forEach((el, index) => {
      
      // Title
      gsap.fromTo(el.querySelector('.category-title'),
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            onEnter: () => {
              visibleCategories.value[index] = true
            }
          }
        }
      )

      // Cards stagger
      gsap.fromTo(el.querySelectorAll('.gsap-skill-card'),
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: el,
            start: "top 75%"
          }
        }
      )
    })
  })
})
</script>

<style scoped>
.skills-view {
  padding-top: 5rem;
}

/* ---- Radar ---- */
.radar-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.radar-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 2rem;
}

.radar-chart {
  width: 100%;
  display: flex;
  justify-content: center;
}

.radar-polygon {
  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.radar-point {
  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ---- Categories ---- */
.category-section {
  margin-bottom: 5rem;
}

.category-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-subtle);
  display: inline-block;
  padding-right: 2rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.skill-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out);
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--glow-card);
  border-color: rgba(255,255,255,0.2);
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.skill-icon {
  width: 40px;
  height: 40px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--text-secondary);
  transition: color 0.3s ease, border-color 0.3s ease;
}

.skill-card:hover .skill-icon {
  color: var(--text-white);
  border-color: var(--text-white);
}

.skill-name {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-white);
}

.skill-level {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.skill-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 1.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.skill-percentage {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-muted);
  width: 32px;
  text-align: right;
  transition: color 0.3s ease;
}

.skill-card:hover .skill-percentage {
  color: var(--text-secondary);
}

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
