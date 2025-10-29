<template>
  <div class="skills-view">
    <section class="skills-hero section">
      <div class="container">
        <h1 class="section-title">{{ $t('skills.title') }}</h1>
        <p class="section-subtitle">
          {{ $t('skills.subtitle') }}
        </p>
      </div>
    </section>
    
    <section class="radar-section section">
      <div class="container">
        <div class="radar-container">
          <h2 class="radar-title">{{ $t('skills.radar') }}</h2>
          <div class="radar-chart" ref="radarChart">
            <svg :width="radarSize" :height="radarSize" class="radar-svg">
              <!-- Background circles -->
              <g :transform="`translate(${radarSize/2}, ${radarSize/2})`">
                <circle
                  v-for="i in 5"
                  :key="`circle-${i}`"
                  :r="(radarSize/2 - 40) * (i/5)"
                  fill="none"
                  :stroke="`rgba(0, 247, 255, ${0.1 * i})`"
                  stroke-width="1"
                />
                
                <!-- Axis lines -->
                <line
                  v-for="(skill, index) in radarSkills"
                  :key="`axis-${index}`"
                  x1="0"
                  y1="0"
                  :x2="getAxisPoint(index).x"
                  :y2="getAxisPoint(index).y"
                  stroke="rgba(0, 247, 255, 0.2)"
                  stroke-width="1"
                />
                
                <!-- Skill polygon -->
                <polygon
                  :points="skillPolygonPoints"
                  fill="rgba(0, 247, 255, 0.2)"
                  stroke="var(--neon-blue)"
                  stroke-width="2"
                />
                
                <!-- Skill points -->
                <circle
                  v-for="(point, index) in skillPoints"
                  :key="`point-${index}`"
                  :cx="point.x"
                  :cy="point.y"
                  r="6"
                  :fill="point.color"
                  :stroke="point.color"
                  stroke-width="2"
                  class="skill-point"
                />
                
                <!-- Skill labels -->
                <text
                  v-for="(skill, index) in radarSkills"
                  :key="`label-${index}`"
                  :x="getLabelPoint(index).x"
                  :y="getLabelPoint(index).y"
                  text-anchor="middle"
                  :fill="skill.color"
                  font-size="14"
                  font-weight="600"
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
    
    <section class="skills-categories section">
      <div class="container">
        <div 
          v-for="category in skillCategories" 
          :key="category.name"
          class="category-section"
        >
          <h2 class="category-title">{{ $t(category.nameKey) }}</h2>
          
          <div class="skills-grid">
            <div 
              v-for="skill in category.skills" 
              :key="skill.name"
              class="skill-card"
            >
              <div class="skill-header">
                <div class="skill-icon" v-html="skill.icon"></div>
                <h3>{{ skill.name }}</h3>
              </div>
              
              <div class="skill-level">
                <div class="skill-bar">
                  <div 
                    class="skill-fill" 
                    :style="{ width: skill.level + '%', backgroundColor: category.color }"
                  ></div>
                </div>
                <span class="skill-percentage">{{ skill.level }}%</span>
              </div>
              
              <p class="skill-description">{{ skill.description }}</p>
              
              <div class="skill-years">
                {{ skill.years }} {{ $t('skills.years') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const radarSize = ref(600)
const radarChart = ref(null)

const radarSkills = [
  { name: 'Frontend', level: 95, color: '#00f7ff' },
  { name: 'Backend', level: 90, color: '#ff00f7' },
  { name: 'Databases', level: 85, color: '#00ff7f' },
  { name: 'DevOps', level: 80, color: '#ffd700' },
  { name: 'Cloud', level: 85, color: '#ff6b6b' },
  { name: 'Testing', level: 88, color: '#a78bfa' }
]

const skillCategories = [
  {
    name: 'languages',
    nameKey: 'skills.categories.languages',
    color: '#00f7ff',
    skills: [
      {
        name: 'JavaScript / TypeScript',
        icon: '💛',
        level: 95,
        years: 5,
        description: 'Desarrollo avanzado con ES6+, TypeScript, async/await, y patrones modernos'
      },
      {
        name: 'Python',
        icon: '🐍',
        level: 90,
        years: 4,
        description: 'Backend con FastAPI, Django, Flask. Data science con pandas y numpy'
      },
      {
        name: 'Java',
        icon: '☕',
        level: 85,
        years: 3,
        description: 'Spring Boot, microservicios, JPA/Hibernate, y aplicaciones enterprise'
      },
      {
        name: 'Go',
        icon: '🔵',
        level: 75,
        years: 2,
        description: 'APIs RESTful, microservicios, concurrencia con goroutines'
      },
      {
        name: 'Rust',
        icon: '🦀',
        level: 70,
        years: 1,
        description: 'Sistemas de bajo nivel, performance crítico, memory safety'
      },
      {
        name: 'C/C++',
        icon: '⚙️',
        level: 80,
        years: 4,
        description: 'Sistemas embebidos, optimización de performance, algoritmos'
      }
    ]
  },
  {
    name: 'frontend',
    nameKey: 'skills.categories.frontend',
    color: '#ff00f7',
    skills: [
      {
        name: 'Vue.js',
        icon: '💚',
        level: 95,
        years: 4,
        description: 'Composition API, Vuex/Pinia, Vue Router, Nuxt.js'
      },
      {
        name: 'React',
        icon: '⚛️',
        level: 90,
        years: 4,
        description: 'Hooks, Redux, Context API, Next.js, React Query'
      },
      {
        name: 'HTML5 / CSS3',
        icon: '🎨',
        level: 98,
        years: 6,
        description: 'Semantic HTML, CSS Grid, Flexbox, Animations, Custom Properties'
      },
      {
        name: 'Tailwind CSS',
        icon: '🌊',
        level: 92,
        years: 3,
        description: 'Utility-first CSS, custom config, componentes reutilizables'
      },
      {
        name: 'GSAP / Framer Motion',
        icon: '✨',
        level: 85,
        years: 2,
        description: 'Animaciones avanzadas, transiciones, micro-interactions'
      }
    ]
  },
  {
    name: 'backend',
    nameKey: 'skills.categories.backend',
    color: '#00ff7f',
    skills: [
      {
        name: 'Node.js / Express',
        icon: '🟢',
        level: 92,
        years: 5,
        description: 'APIs RESTful, middleware, autenticación, WebSockets'
      },
      {
        name: 'FastAPI',
        icon: '⚡',
        level: 88,
        years: 3,
        description: 'APIs async, validación con Pydantic, documentación automática'
      },
      {
        name: 'Spring Boot',
        icon: '🍃',
        level: 85,
        years: 3,
        description: 'Microservicios, Spring Security, JPA, REST APIs'
      },
      {
        name: 'GraphQL',
        icon: '🔷',
        level: 80,
        years: 2,
        description: 'Apollo Server, schemas, resolvers, subscriptions'
      }
    ]
  },
  {
    name: 'databases',
    nameKey: 'skills.categories.databases',
    color: '#ffd700',
    skills: [
      {
        name: 'PostgreSQL',
        icon: '🐘',
        level: 90,
        years: 5,
        description: 'Queries complejas, optimización, índices, JSON support'
      },
      {
        name: 'MongoDB',
        icon: '🍃',
        level: 88,
        years: 4,
        description: 'Aggregation pipeline, índices, replicación, sharding'
      },
      {
        name: 'Redis',
        icon: '🔴',
        level: 85,
        years: 3,
        description: 'Caché, pub/sub, rate limiting, sesiones'
      },
      {
        name: 'MySQL',
        icon: '🐬',
        level: 87,
        years: 4,
        description: 'Queries optimization, stored procedures, triggers'
      }
    ]
  },
  {
    name: 'devops',
    nameKey: 'skills.categories.devops',
    color: '#ff6b6b',
    skills: [
      {
        name: 'Docker',
        icon: '🐳',
        level: 90,
        years: 4,
        description: 'Containerización, multi-stage builds, docker-compose'
      },
      {
        name: 'Kubernetes',
        icon: '☸️',
        level: 80,
        years: 2,
        description: 'Deployments, services, ingress, ConfigMaps'
      },
      {
        name: 'AWS',
        icon: '☁️',
        level: 85,
        years: 3,
        description: 'EC2, S3, Lambda, RDS, CloudFront, API Gateway'
      },
      {
        name: 'CI/CD',
        icon: '🔄',
        level: 88,
        years: 4,
        description: 'GitHub Actions, GitLab CI, Jenkins, automated testing'
      },
      {
        name: 'Linux',
        icon: '🐧',
        level: 87,
        years: 5,
        description: 'Shell scripting, system administration, networking'
      }
    ]
  },
  {
    name: 'tools',
    nameKey: 'skills.categories.tools',
    color: '#a78bfa',
    skills: [
      {
        name: 'Git',
        icon: '📦',
        level: 95,
        years: 6,
        description: 'Git flow, rebasing, cherry-picking, conventional commits'
      },
      {
        name: 'Testing',
        icon: '🧪',
        level: 88,
        years: 4,
        description: 'Jest, Vitest, Pytest, Cypress, unit & integration tests'
      },
      {
        name: 'Webpack / Vite',
        icon: '⚡',
        level: 85,
        years: 3,
        description: 'Build optimization, code splitting, tree shaking'
      },
      {
        name: 'Figma',
        icon: '🎨',
        level: 80,
        years: 3,
        description: 'UI/UX design, prototyping, design systems'
      }
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
  const radius = radarSize.value / 2 - 20
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius + 5
  }
}

const skillPoints = computed(() => {
  return radarSkills.map((skill, index) => {
    const angle = (Math.PI * 2 * index) / radarSkills.length - Math.PI / 2
    const maxRadius = radarSize.value / 2 - 40
    const radius = (maxRadius * skill.level) / 100
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      color: skill.color
    }
  })
})

const skillPolygonPoints = computed(() => {
  return skillPoints.value
    .map(point => `${point.x},${point.y}`)
    .join(' ')
})

onMounted(() => {
  const updateRadarSize = () => {
    if (radarChart.value) {
      const containerWidth = radarChart.value.offsetWidth
      radarSize.value = Math.min(containerWidth, 600)
    }
  }
  
  updateRadarSize()
  window.addEventListener('resize', updateRadarSize)
})
</script>

<style scoped>
.skills-view {
  padding-top: 5rem;
}

.section-subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 3rem;
}

/* Radar Chart */
.radar-section {
  background: rgba(15, 15, 45, 0.3);
}

.radar-container {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.radar-title {
  font-family: var(--font-title);
  font-size: 2rem;
  color: var(--neon-blue);
  margin-bottom: 2rem;
  text-align: center;
}

.radar-chart {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.radar-svg {
  filter: drop-shadow(0 0 20px rgba(0, 247, 255, 0.3));
}

.skill-point {
  cursor: pointer;
  transition: all 0.3s var(--transition-smooth);
}

.skill-point:hover {
  r: 8;
  filter: drop-shadow(0 0 10px currentColor);
}

.skill-label {
  font-family: var(--font-mono);
  text-shadow: 0 0 10px currentColor;
}

/* Skills Categories */
.category-section {
  margin-bottom: 4rem;
}

.category-title {
  font-family: var(--font-title);
  font-size: 2rem;
  color: var(--neon-pink);
  margin-bottom: 2rem;
  text-align: center;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-card {
  background: rgba(15, 15, 45, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid var(--neon-blue);
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s var(--transition-smooth);
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 40px rgba(0, 247, 255, 0.3);
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.skill-icon {
  font-size: 2rem;
}

.skill-header h3 {
  font-family: var(--font-title);
  font-size: 1.2rem;
  color: var(--neon-blue);
}

.skill-level {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.skill-bar {
  flex: 1;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 1s var(--transition-smooth);
  box-shadow: 0 0 10px currentColor;
}

.skill-percentage {
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--neon-blue);
  min-width: 45px;
  text-align: right;
}

.skill-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.skill-years {
  color: var(--neon-green);
  font-size: 0.85rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .radar-chart {
    padding: 1rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
