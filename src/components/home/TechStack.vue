<template>
  <section class="tech-stack section" ref="sectionRef">
    <div class="container">
      <h2 class="section-title gsap-reveal">{{ $t('techStack.title') }}</h2>
      <p class="section-subtitle gsap-reveal">{{ $t('techStack.subtitle') }}</p>

      <!-- Categorías -->
      <div class="tech-stack__categories gsap-reveal">
        <button
          v-for="category in categories"
          :key="category.id"
          class="tech-filter-btn magnetic"
          :class="{ active: activeCategory === category.id }"
          @click="activeCategory = category.id"
        >
          {{ $t(`techStack.filter.${category.id}`) }}
        </button>
      </div>

      <!-- Grid de tecnologías -->
      <transition-group 
        name="fade-grid" 
        tag="div" 
        class="tech-stack__grid"
      >
        <div
          v-for="tech in filteredTechs"
          :key="tech.name"
          class="tech-card card tech-card-gsap"
          @mousemove="handleTilt($event, tech.name)"
          @mouseleave="resetTilt(tech.name)"
          :ref="el => { if (el) cardRefs[tech.name] = el }"
        >
          <div class="tech-card__header">
            <span class="tech-icon">{{ tech.icon }}</span>
            <h3 class="tech-name">{{ tech.name }}</h3>
          </div>
          <div class="tech-card__body">
            <p class="tech-desc">{{ tech.description }}</p>
          </div>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const activeCategory = ref('all')
const sectionRef = ref(null)
const cardRefs = ref({})

const categories = [
  { id: 'all' },
  { id: 'frontend' },
  { id: 'backend' },
  { id: 'database' },
  { id: 'tools' }
]

const technologies = [
  { name: "JavaScript", icon: "JS", category: "frontend", description: "ES6+, TypeScript, Async/Await" },
  { name: "Vue.js", icon: "V", category: "frontend", description: "Vue 3, Composition API, Pinia" },
  { name: "React", icon: "Re", category: "frontend", description: "Hooks, Context API, Next.js" },
  { name: "HTML/CSS", icon: "UI", category: "frontend", description: "Semantic HTML, CSS Grid, Flexbox" },
  { name: "Python", icon: "Py", category: "backend", description: "Django, FastAPI, Data Science" },
  { name: "Node.js", icon: "No", category: "backend", description: "Express, NestJS, REST APIs" },
  { name: "Java", icon: "Jv", category: "backend", description: "Spring Boot, Microservices" },
  { name: "Go", icon: "Go", category: "backend", description: "Concurrent Programming, APIs" },
  { name: "Rust", icon: "Ru", category: "backend", description: "Systems Programming, Performance" },
  { name: "C++", icon: "C+", category: "backend", description: "STL, Modern C++, Performance" },
  { name: "PostgreSQL", icon: "Pg", category: "database", description: "SQL, Query Optimization" },
  { name: "MongoDB", icon: "Mg", category: "database", description: "NoSQL, Aggregation" },
  { name: "Redis", icon: "Rd", category: "database", description: "Caching, Pub/Sub" },
  { name: "Git", icon: "Gt", category: "tools", description: "Version Control, Workflows" },
  { name: "Docker", icon: "Dk", category: "tools", description: "Containerization" },
  { name: "Linux", icon: "Lx", category: "tools", description: "Shell Scripting, Admin" },
  { name: "AWS", icon: "Aw", category: "tools", description: "EC2, S3, RDS" }
]

const filteredTechs = computed(() => {
  if (activeCategory.value === 'all') return technologies
  return technologies.filter(tech => tech.category === activeCategory.value)
})

// 3D Tilt Effect
const handleTilt = (e, name) => {
  const card = cardRefs.value[name]
  if (!card) return
  
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = ((y - centerY) / centerY) * -10
  const rotateY = ((x - centerX) / centerX) * 10

  gsap.to(card, {
    rotateX: rotateX,
    rotateY: rotateY,
    scale: 1.05,
    transformPerspective: 1000,
    duration: 0.4,
    ease: "power2.out"
  })
}

const resetTilt = (name) => {
  const card = cardRefs.value[name]
  if (!card) return
  
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 0.7,
    ease: "elastic.out(1, 0.3)"
  })
}

// Scroll Animations
onMounted(() => {
  nextTick(() => {
    // Reveal headers
    gsap.fromTo(sectionRef.value.querySelectorAll('.gsap-reveal'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top 80%",
        }
      }
    )

    // Reveal cards initially
    gsap.fromTo('.tech-card-gsap',
      { y: 60, opacity: 0, rotateX: 20 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".tech-stack__grid",
          start: "top 85%",
        }
      }
    )
  })
})
</script>

<style scoped>
.tech-stack {
  background: var(--bg-primary);
  perspective: 2000px;
}

/* ---- Filtros ---- */
.tech-stack__categories {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 3.5rem;
  flex-wrap: wrap;
}

.tech-filter-btn {
  padding: 0.6rem 1.25rem;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  border-radius: var(--radius-full);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.tech-filter-btn:hover {
  background: var(--bg-card-hover);
  color: var(--text-primary);
  border-color: var(--border-default);
}

.tech-filter-btn.active {
  background: var(--accent-violet-20);
  color: var(--accent-violet);
  border-color: var(--accent-violet);
  box-shadow: 0 4px 15px rgba(108, 99, 255, 0.2);
}

/* ---- Grid ---- */
.tech-stack__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

/* ---- Card ---- */
.tech-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform-style: preserve-3d;
  will-change: transform;
}

.tech-card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  transform: translateZ(30px);
}

.tech-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-cyan-10);
  color: var(--accent-cyan);
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(0, 217, 255, 0.2);
  transition: transform 0.3s ease;
}

.tech-card:hover .tech-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: var(--glow-cyan);
}

.tech-name {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-white);
}

.tech-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
  transform: translateZ(20px);
}

/* ---- Transiciones Vue ---- */
.fade-grid-enter-active,
.fade-grid-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-grid-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}
.fade-grid-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.fade-grid-move {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 640px) {
  .tech-stack__grid {
    grid-template-columns: 1fr;
  }
}
</style>
