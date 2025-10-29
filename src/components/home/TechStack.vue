<template>
  <section class="tech-stack section">
    <div class="container">
      <h2 class="section-title">{{ $t('techStack.title') }}</h2>
      
      <div class="tech-stack__categories">
        <button
          v-for="category in categories"
          :key="category.id"
          class="tech-stack__filter-btn"
          :class="{ active: activeCategory === category.id }"
          @click="activeCategory = category.id"
        >
          {{ $t(`techStack.filter.${category.id}`) }}
        </button>
      </div>
      
      <transition-group name="tech-list" tag="div" class="tech-stack__grid">
        <div
          v-for="tech in filteredTechs"
          :key="tech.name"
          class="tech-card"
          :style="{ '--tech-color': tech.color }"
        >
          <div class="tech-card__icon">
            {{ tech.icon }}
          </div>
          <h3 class="tech-card__name">{{ tech.name }}</h3>
          <div class="tech-card__level">
            <div 
              class="tech-card__level-bar" 
              :style="{ width: `${tech.level * 20}%` }"
            ></div>
          </div>
          <p class="tech-card__description">{{ tech.description }}</p>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('all')

const categories = [
  { id: 'all' },
  { id: 'frontend' },
  { id: 'backend' },
  { id: 'database' },
  { id: 'tools' }
]

const technologies = [
  // Frontend
  { name: "JavaScript", icon: "🟨", level: 5, color: "#F7DF1E", category: "frontend", description: "ES6+, TypeScript, Async/Await" },
  { name: "Vue.js", icon: "💚", level: 5, color: "#42b883", category: "frontend", description: "Vue 3, Composition API, Pinia" },
  { name: "React", icon: "⚛️", level: 4, color: "#61DAFB", category: "frontend", description: "Hooks, Context API, Next.js" },
  { name: "HTML/CSS", icon: "🎨", level: 5, color: "#E34F26", category: "frontend", description: "Semantic HTML, CSS Grid, Flexbox" },
  
  // Backend
  { name: "Python", icon: "🐍", level: 5, color: "#3776AB", category: "backend", description: "Django, FastAPI, Data Science" },
  { name: "Node.js", icon: "🟩", level: 4, color: "#68A063", category: "backend", description: "Express, NestJS, REST APIs" },
  { name: "Java", icon: "☕", level: 4, color: "#007396", category: "backend", description: "Spring Boot, Microservices" },
  { name: "Go", icon: "🔵", level: 3, color: "#00ADD8", category: "backend", description: "Concurrent Programming, APIs" },
  { name: "Rust", icon: "🦀", level: 3, color: "#CE422B", category: "backend", description: "Systems Programming, Performance" },
  { name: "C++", icon: "⚙️", level: 4, color: "#00599C", category: "backend", description: "STL, Modern C++, Performance" },
  { name: "Kotlin", icon: "🔷", level: 3, color: "#7F52FF", category: "backend", description: "Android, Server-side" },
  
  // Databases
  { name: "PostgreSQL", icon: "🐘", level: 4, color: "#336791", category: "database", description: "SQL, Query Optimization, JSON" },
  { name: "SQL", icon: "📊", level: 5, color: "#CC2927", category: "database", description: "Complex Queries, Optimization" },
  { name: "MongoDB", icon: "🍃", level: 3, color: "#47A248", category: "database", description: "NoSQL, Aggregation, Indexes" },
  { name: "Redis", icon: "🔴", level: 3, color: "#DC382D", category: "database", description: "Caching, Pub/Sub, Sessions" },
  
  // Tools & Others
  { name: "Git", icon: "📦", level: 5, color: "#F05032", category: "tools", description: "Version Control, Workflows" },
  { name: "Docker", icon: "🐳", level: 4, color: "#2496ED", category: "tools", description: "Containerization, Compose" },
  { name: "Linux", icon: "🐧", level: 4, color: "#FCC624", category: "tools", description: "Shell Scripting, Server Admin" },
  { name: "AWS", icon: "☁️", level: 3, color: "#FF9900", category: "tools", description: "EC2, S3, Lambda, RDS" },
  { name: "ARM Assembly", icon: "⚡", level: 3, color: "#0091BD", category: "tools", description: "Low-level Programming" },
  { name: "R", icon: "📈", level: 3, color: "#276DC3", category: "tools", description: "Statistical Analysis, ggplot2" }
]

const filteredTechs = computed(() => {
  if (activeCategory.value === 'all') {
    return technologies
  }
  return technologies.filter(tech => tech.category === activeCategory.value)
})
</script>

<style scoped>
.tech-stack {
  background: linear-gradient(180deg, var(--dark-bg) 0%, var(--dark-bg-secondary) 100%);
}

.tech-stack__categories {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.tech-stack__filter-btn {
  padding: 0.75rem 1.5rem;
  font-family: var(--font-title);
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: transparent;
  border: 2px solid var(--neon-blue);
  border-radius: 25px;
  color: white;
  cursor: pointer;
  transition: all 0.3s var(--transition-smooth);
}

.tech-stack__filter-btn:hover {
  background: rgba(0, 247, 255, 0.1);
  transform: translateY(-2px);
}

.tech-stack__filter-btn.active {
  background: var(--neon-blue);
  color: var(--dark-bg);
  box-shadow: 0 5px 20px rgba(0, 247, 255, 0.4);
}

.tech-stack__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.tech-card {
  background: rgba(15, 15, 45, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid var(--tech-color);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s var(--transition-smooth);
  cursor: pointer;
}

.tech-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 40px var(--tech-color);
  border-width: 2px;
}

.tech-card__icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

.tech-card:hover .tech-card__icon {
  animation: pulse 0.5s ease-in-out;
}

.tech-card__name {
  font-family: var(--font-title);
  font-size: 1.3rem;
  color: var(--tech-color);
  margin-bottom: 1rem;
}

.tech-card__level {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.tech-card__level-bar {
  height: 100%;
  background: var(--tech-color);
  border-radius: 4px;
  transition: width 1s ease-out;
  box-shadow: 0 0 10px var(--tech-color);
}

.tech-card__description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

/* Animaciones de transición */
.tech-list-enter-active,
.tech-list-leave-active {
  transition: all 0.5s ease;
}

.tech-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.tech-list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.tech-list-move {
  transition: transform 0.5s ease;
}

@media (max-width: 768px) {
  .tech-stack__grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .tech-card {
    padding: 1.5rem;
  }
  
  .tech-card__icon {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .tech-stack__grid {
    grid-template-columns: 1fr;
  }
}
</style>
