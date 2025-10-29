<template>
  <section v-if="featuredProjects.length > 0" class="featured-projects section">
    <div class="container">
      <h2 class="section-title">{{ $t('projects.title') }}</h2>
      
      <div class="projects-grid">
        <article
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          class="project-card"
          :style="{ '--delay': `${index * 0.1}s` }"
          @click="openProject(project)"
        >
          <div class="project-card__image">
            <img :src="project.image" :alt="project.title" />
            <div class="project-card__overlay">
              <span class="project-card__view">{{ $t('projects.viewDetails') }}</span>
            </div>
          </div>
          
          <div class="project-card__content">
            <div class="project-card__header">
              <h3 class="project-card__title">{{ project.title }}</h3>
              <span class="project-card__type" :class="`type-${project.type}`">
                {{ project.type }}
              </span>
            </div>
            
            <p class="project-card__description">
              {{ project.description }}
            </p>
            
            <div class="project-card__tech">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="tech-badge"
              >
                {{ tech }}
              </span>
            </div>
            
            <div class="project-card__links">
              <a 
                v-if="project.github"
                :href="project.github" 
                target="_blank" 
                rel="noopener noreferrer"
                class="project-link"
                @click.stop
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              
              <a 
                v-if="project.demo"
                :href="project.demo" 
                target="_blank" 
                rel="noopener noreferrer"
                class="project-link"
                @click.stop
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/>
                </svg>
                Demo
              </a>
            </div>
          </div>
        </article>
      </div>
      
      <div class="featured-projects__cta">
        <router-link to="/projects" class="btn btn-primary">
          Ver Todos los Proyectos
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const featuredProjects = ref([])

// Función para obtener proyectos destacados de GitHub
const fetchGitHubProjects = async () => {
  try {
    const response = await fetch('https://api.github.com/users/Javier-Espana/repos?sort=updated&per_page=6')
    if (response.ok) {
      const repos = await response.json()
      
      // Filtrar solo repos que tengan topics, descripción y no sean forks
      featuredProjects.value = repos
        .filter(repo => !repo.fork && repo.description && repo.topics && repo.topics.length > 0)
        .slice(0, 3)
        .map(repo => ({
          id: repo.id,
          title: repo.name,
          type: repo.topics.includes('fullstack') ? 'fullstack' : 
                repo.topics.includes('backend') ? 'backend' : 
                repo.topics.includes('frontend') ? 'frontend' : 'web',
          description: repo.description,
          technologies: repo.topics.slice(0, 4),
          image: repo.owner.avatar_url || `https://opengraph.githubassets.com/1/${repo.full_name}`,
          github: repo.html_url,
          demo: repo.homepage || null
        }))
    }
  } catch (error) {
    console.error('Error fetching GitHub projects:', error)
    featuredProjects.value = []
  }
}

onMounted(() => {
  fetchGitHubProjects()
})

const openProject = (project) => {
  window.open(project.github, '_blank')
}
</script>

<style scoped>
.featured-projects {
  background: var(--dark-bg);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
}

.project-card {
  background: rgba(15, 15, 45, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 247, 255, 0.3);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s var(--transition-smooth);
  animation: fade-in-up 0.6s ease-out forwards;
  animation-delay: var(--delay);
  opacity: 0;
}

@keyframes fade-in-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-card {
  transform: translateY(30px);
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 247, 255, 0.3);
  border-color: var(--neon-blue);
}

.project-card__image {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.project-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s var(--transition-smooth);
}

.project-card:hover .project-card__image img {
  transform: scale(1.1);
}

.project-card__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 247, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s var(--transition-smooth);
}

.project-card:hover .project-card__overlay {
  opacity: 1;
}

.project-card__view {
  font-family: var(--font-title);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--dark-bg);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.project-card__content {
  padding: 2rem;
}

.project-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.project-card__title {
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: white;
  margin: 0;
}

.project-card__type {
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.type-web {
  background: rgba(0, 247, 255, 0.2);
  color: var(--neon-blue);
}

.type-backend {
  background: rgba(255, 0, 247, 0.2);
  color: var(--neon-pink);
}

.type-fullstack {
  background: rgba(0, 255, 127, 0.2);
  color: var(--neon-green);
}

.project-card__description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.project-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-badge {
  padding: 0.25rem 0.75rem;
  background: rgba(0, 247, 255, 0.1);
  border: 1px solid var(--neon-blue);
  border-radius: 12px;
  font-size: 0.85rem;
  color: var(--neon-blue);
}

.project-card__links {
  display: flex;
  gap: 1rem;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--neon-blue);
  border-radius: 5px;
  color: var(--neon-blue);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s var(--transition-smooth);
}

.project-link:hover {
  background: var(--neon-blue);
  color: var(--dark-bg);
  transform: translateY(-2px);
}

.featured-projects__cta {
  text-align: center;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .project-card__content {
    padding: 1.5rem;
  }
}
</style>
