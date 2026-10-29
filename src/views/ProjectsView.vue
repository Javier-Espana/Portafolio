<template>
  <div class="projects-view page-transition">
    <section class="projects-hero section">
      <div class="container">
        <h1 class="section-title">{{ $t('projects.title') }}</h1>
        <p class="section-subtitle">{{ $t('projects.subtitle') }}</p>

        <!-- Filtros -->
        <div class="projects-filters">
          <button
            v-for="category in categories"
            :key="category"
            class="filter-btn"
            :class="{ active: selectedCategory === category }"
            @click="selectedCategory = category"
          >
            {{ $t(`projectsView.categories.${category}`) }}
          </button>
        </div>

        <!-- Búsqueda -->
        <div class="projects-search">
          <svg class="search-icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('projectsView.searchPlaceholder')"
            class="search-input"
            aria-label="Buscar proyectos"
          />
        </div>
      </div>
    </section>

    <section class="projects-grid-section section">
      <div class="container">
        
        <!-- Estado de carga: Skeletons -->
        <div v-if="loading && projects.length === 0" class="grid">
          <div v-for="i in 6" :key="i" class="project-card skeleton-card">
            <div class="skeleton-img"></div>
            <div class="skeleton-content">
              <div class="skeleton-title"></div>
              <div class="skeleton-desc"></div>
              <div class="skeleton-desc short"></div>
              <div class="skeleton-tags">
                <div class="skeleton-tag"></div>
                <div class="skeleton-tag"></div>
                <div class="skeleton-tag"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Grid de proyectos -->
        <transition-group v-else name="fade-grid" tag="div" class="grid">
          <article
            v-for="project in filteredProjects"
            :key="project.id"
            class="project-card card"
            @click="openModal(project)"
            tabindex="0"
            @keydown.enter="openModal(project)"
            :aria-label="getProjectName(project)"
          >
            <div class="project-card__image">
              <img :src="project.image" :alt="getProjectName(project)" @error="handleImageError" loading="lazy" />
              <div class="project-card__overlay">
                <span class="btn btn-primary">{{ $t('projects.viewDetails') }}</span>
              </div>
              <div v-if="project.award" class="project-award-badge">
                🏆 {{ project.award }}
              </div>
            </div>

            <div class="project-card__content">
              <h3 class="project-card__title">{{ getProjectName(project) }}</h3>
              <p class="project-card__desc">
                {{ getProjectDescription(project) || $t('projectsView.noDescription') }}
              </p>

              <div class="project-card__tech">
                <span v-for="tech in project.technologies" :key="tech" class="badge badge-violet">
                  {{ tech }}
                </span>
              </div>

              <div class="project-card__stats">
                <span v-if="project.stargazers_count" class="stat">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z"/></svg>
                  {{ project.stargazers_count }}
                </span>
                <span v-if="project.language" class="stat">
                  <span class="lang-dot"></span>
                  {{ project.language }}
                </span>
              </div>
            </div>
          </article>
        </transition-group>

        <!-- Sin resultados -->
        <div v-if="!loading && filteredProjects.length === 0" class="no-results">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>{{ $t('projectsView.noResults') }}</p>
        </div>
      </div>
    </section>

    <!-- Modal de Detalles -->
    <transition name="modal">
      <div v-if="selectedProject" class="modal-backdrop" @click="closeModal">
        <div class="modal-content" @click.stop role="dialog" aria-modal="true">
          <button class="modal-close" @click="closeModal" aria-label="Cerrar modal">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="modal-image">
            <img :src="selectedProject.image" :alt="getProjectName(selectedProject)" @error="handleImageError" />
          </div>

          <div class="modal-body">
            <div v-if="selectedProject.award" class="modal-award">
              🏆 {{ selectedProject.award }}
            </div>
            <h2 class="modal-title">{{ getProjectName(selectedProject) }}</h2>
            
            <div class="modal-meta">
              <span class="meta-item" v-if="selectedProject.language">
                <span class="lang-dot"></span> {{ selectedProject.language }}
              </span>
              <span class="meta-item" v-if="selectedProject.updated_at">
                📅 {{ formatDate(selectedProject.updated_at) }}
              </span>
            </div>

            <p class="modal-desc">{{ getProjectDescription(selectedProject) }}</p>

            <div v-if="selectedProject.technologies && selectedProject.technologies.length > 0" class="modal-section">
              <h3>{{ $t('projects.technologies') }}</h3>
              <div class="modal-tags">
                <span v-for="tech in selectedProject.technologies" :key="tech" class="badge badge-cyan">
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="modal-actions">
              <button @click="closeModal" class="btn btn-secondary" type="button" style="cursor: pointer;">
                ✕ Cerrar
              </button>
              <a v-if="selectedProject.html_url || selectedProject.github" :href="selectedProject.html_url || selectedProject.github" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                {{ $t('projects.github') || 'GitHub' }}
              </a>
              <a v-if="selectedProject.homepage || selectedProject.demo" :href="selectedProject.homepage || selectedProject.demo" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                {{ $t('projects.demo') || 'Demo' }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { featuredProjectsData } from '../data/projects.js'

const { locale  } = useI18n({ useScope: 'global' })

const categories = ['all', 'frontend', 'backend', 'fullstack', 'other']
const selectedCategory = ref('all')
const searchQuery = ref('')
const selectedProject = ref(null)
const loading = ref(false)

// Convertir proyectos base
const baseProjects = featuredProjectsData.map(p => ({
  ...p,
  name: p.title,
  html_url: p.github,
  language: p.technologies[0] || 'Python'
}))

const projects = ref([...baseProjects])

const getProjectName = (p) => {
  if (!p) return ''
  const val = p.name || p.title
  if (typeof val === 'object') {
    return val[locale.value] || val.es || val.en || ''
  }
  return val || ''
}

const getProjectDescription = (p) => {
  if (!p) return ''
  const val = p.description
  if (typeof val === 'object') {
    return val[locale.value] || val.es || val.en || ''
  }
  return val || ''
}

const fetchGitHubProjects = async () => {
  const CACHE_KEY = 'je_github_projects'
  const CACHE_TIME = 'je_github_projects_time'
  const TTL = 15 * 60 * 1000 // 15 minutos

  try {
    const cachedTime = localStorage.getItem(CACHE_TIME)
    const cachedData = localStorage.getItem(CACHE_KEY)
    
    if (cachedTime && cachedData && (Date.now() - parseInt(cachedTime) < TTL)) {
      const parsed = JSON.parse(cachedData)
      if (Array.isArray(parsed) && parsed.length > 0) {
        mergeRepos(parsed)
        return
      }
    }

    loading.value = true
    const response = await fetch('https://api.github.com/users/Javier-Espana/repos?sort=updated&per_page=100')
    if (response.ok) {
      const repos = await response.json()
      localStorage.setItem(CACHE_KEY, JSON.stringify(repos))
      localStorage.setItem(CACHE_TIME, Date.now().toString())
      mergeRepos(repos)
    }
  } catch (error) {
    console.warn('Usando proyectos locales predeterminados:', error)
  } finally {
    loading.value = false
  }
}

const mergeRepos = (repos) => {
  const ghProjects = repos
    .filter(repo => !repo.fork && !repo.private)
    .map(repo => {
      let category = 'other'
      if (repo.topics) {
        if (repo.topics.includes('fullstack') || repo.topics.includes('full-stack')) category = 'fullstack'
        else if (repo.topics.includes('backend') || repo.topics.includes('api')) category = 'backend'
        else if (repo.topics.includes('frontend') || repo.topics.includes('ui')) category = 'frontend'
      }
      
      return {
        ...repo,
        technologies: repo.topics && repo.topics.length > 0 ? repo.topics.slice(0, 4) : [repo.language].filter(Boolean),
        image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
        category
      }
    })

  // Evitar duplicados por título
  const existingNames = new Set(baseProjects.map(p => getProjectName(p).toLowerCase()))
  const additional = ghProjects.filter(p => !existingNames.has((p.name || '').toLowerCase()))

  projects.value = [...baseProjects, ...additional]
}

onMounted(() => {
  fetchGitHubProjects()
})

const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const matchCat = selectedCategory.value === 'all' || project.category === selectedCategory.value
    const query = searchQuery.value.toLowerCase()
    const name = getProjectName(project).toLowerCase()
    const desc = getProjectDescription(project).toLowerCase()
    const matchSearch = name.includes(query) || desc.includes(query)
    return matchCat && matchSearch
  })
})

const handleKeydown = (e) => {
  if (e.key === 'Escape') closeModal()
}

const openModal = (p) => {
  window.addEventListener('keydown', handleKeydown)
  selectedProject.value = p
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  window.removeEventListener('keydown', handleKeydown)
  selectedProject.value = null
  document.body.style.overflow = ''
}

const handleImageError = (e) => {
  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23111827'/%3E%3Cpath d='M200 200 L400 200 M300 100 L300 300' stroke='%236C63FF' stroke-width='2' stroke-dasharray='10 10' opacity='0.3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%236C63FF' font-weight='bold' opacity='0.5'%3EPROJECT%3C/text%3E%3C/svg%3E"
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(undefined, { 
    year: 'numeric', month: 'short', day: 'numeric' 
  })
}
</script>

<style scoped>
.projects-view {
  padding-top: 5rem;
}

/* ---- Filtros ---- */
.projects-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.filter-btn {
  padding: 0.5rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--accent-violet-20);
  border-color: var(--accent-violet);
  color: var(--text-white);
}

/* ---- Búsqueda ---- */
.projects-search {
  max-width: 500px;
  margin: 2rem auto 0;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  color: var(--text-primary);
  font-size: var(--text-base);
  outline: none;
  transition: border-color var(--transition-fast);
}

.search-input:focus {
  border-color: var(--accent-violet);
}

/* ---- Grid ---- */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.project-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s var(--ease-smooth), box-shadow 0.3s var(--ease-smooth);
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), 0 0 15px var(--accent-violet-20);
  border-color: var(--accent-violet);
}

.project-card__image {
  position: relative;
  height: 200px;
  background: var(--bg-secondary);
}

.project-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-award-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(8, 11, 20, 0.85);
  border: 1px solid #ffb703;
  color: #ffb703;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  font-weight: 600;
  backdrop-filter: blur(6px);
}

.project-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(8, 11, 20, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-card__overlay {
  opacity: 1;
}

.project-card__content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.project-card__title {
  font-size: var(--text-lg);
  color: var(--text-white);
  margin-bottom: 0.5rem;
}

.project-card__desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.project-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.project-card__stats {
  display: flex;
  gap: 1rem;
  font-size: var(--text-xs);
  color: var(--text-muted);
}

.stat {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.lang-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-cyan);
}

/* ---- Modal ---- */
.modal-backdrop {
  cursor: pointer;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1rem;
}

.modal-content {
  cursor: default;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  max-width: 650px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: var(--text-white);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: background var(--transition-fast);
}

.modal-close:hover {
  background: var(--accent-violet);
}

.modal-image {
  height: 250px;
  width: 100%;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-body {
  padding: 2rem;
}

.modal-award {
  color: #ffb703;
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.modal-title {
  font-size: var(--text-2xl);
  color: var(--text-white);
  margin-bottom: 0.75rem;
}

.modal-meta {
  display: flex;
  gap: 1.5rem;
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.modal-desc {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.modal-section h3 {
  font-size: var(--text-sm);
  color: var(--text-white);
  margin-bottom: 0.75rem;
}

.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

/* ---- No Results ---- */
.no-results {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-muted);
}

.no-results svg {
  margin: 0 auto 1rem;
}

@media (max-width: 768px) {
  .projects-view {
    padding-top: 3.5rem;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .projects-filters {
    gap: 0.5rem;
    margin-top: 1.5rem;
  }

  .filter-btn {
    padding: 0.4rem 0.85rem;
    font-size: var(--text-xs);
  }

  .modal-content {
    max-height: 92vh;
    border-radius: var(--radius-lg);
  }

  .modal-body {
    padding: 1.25rem;
  }

  .modal-image {
    height: 180px;
  }

  .modal-title {
    font-size: var(--text-xl);
  }

  .modal-meta {
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .modal-desc {
    font-size: var(--text-sm);
  }

  .modal-actions {
    flex-direction: column;
    gap: 0.6rem;
  }

  .modal-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
