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
          />
        </div>
      </div>
    </section>

    <section class="projects-grid-section section">
      <div class="container">
        
        <!-- Estado de carga: Skeletons -->
        <div v-if="loading" class="grid">
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
          >
            <div class="project-card__image">
              <img :src="project.image" :alt="project.name" @error="handleImageError" loading="lazy" />
              <div class="project-card__overlay">
                <span class="btn btn-primary">{{ $t('projects.viewDetails') }}</span>
              </div>
            </div>

            <div class="project-card__content">
              <h3 class="project-card__title">{{ project.name }}</h3>
              <p class="project-card__desc">
                {{ project.description || $t('projectsView.noDescription') }}
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
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal" aria-label="Close">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="modal-image">
            <img :src="selectedProject.image" :alt="selectedProject.name" @error="handleImageError" />
          </div>

          <div class="modal-body">
            <h2 class="modal-title">{{ selectedProject.name }}</h2>
            
            <div class="modal-meta">
              <span class="meta-item" v-if="selectedProject.language">
                <span class="lang-dot"></span> {{ selectedProject.language }}
              </span>
              <span class="meta-item">
                📅 {{ formatDate(selectedProject.updated_at) }}
              </span>
            </div>

            <p class="modal-desc">{{ selectedProject.description }}</p>

            <div v-if="selectedProject.topics && selectedProject.topics.length > 0" class="modal-section">
              <h3>{{ $t('projectsView.topics') }}</h3>
              <div class="modal-tags">
                <span v-for="topic in selectedProject.topics" :key="topic" class="badge badge-cyan">
                  {{ topic }}
                </span>
              </div>
            </div>

            <div class="modal-actions">
              <a :href="selectedProject.html_url" target="_blank" rel="noopener" class="btn btn-primary">
                {{ $t('projects.github') }}
              </a>
              <a v-if="selectedProject.homepage" :href="selectedProject.homepage" target="_blank" rel="noopener" class="btn btn-secondary">
                {{ $t('projects.demo') }}
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

const categories = ['all', 'frontend', 'backend', 'fullstack', 'other']
const selectedCategory = ref('all')
const searchQuery = ref('')
const selectedProject = ref(null)
const projects = ref([])
const loading = ref(true)

const fetchGitHubProjects = async () => {
  loading.value = true
  try {
    const response = await fetch('https://api.github.com/users/Javier-Espana/repos?sort=updated&per_page=100')
    if (response.ok) {
      const repos = await response.json()
      
      projects.value = repos
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
            technologies: repo.topics ? repo.topics.slice(0, 4) : [],
            image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
            category
          }
        })
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchGitHubProjects)

const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const matchCat = selectedCategory.value === 'all' || project.category === selectedCategory.value
    const query = searchQuery.value.toLowerCase()
    const matchSearch = project.name.toLowerCase().includes(query) || 
                       (project.description && project.description.toLowerCase().includes(query))
    return matchCat && matchSearch
  })
})

const openModal = (p) => {
  selectedProject.value = p
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedProject.value = null
  document.body.style.overflow = ''
}

const handleImageError = (e) => {
  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23111827'/%3E%3Cpath d='M200 200 L400 200 M300 100 L300 300' stroke='%236C63FF' stroke-width='2' stroke-dasharray='10 10' opacity='0.3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%236C63FF' font-weight='bold' opacity='0.5'%3EPROJECT%3C/text%3E%3C/svg%3E"
}

const formatDate = (dateString) => {
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
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
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

.filter-btn:hover {
  background: var(--bg-card-hover);
  color: var(--text-primary);
}

.filter-btn.active {
  background: var(--accent-violet-20);
  color: var(--accent-violet);
  border-color: var(--accent-violet);
}

/* ---- Buscador ---- */
.projects-search {
  max-width: 480px;
  margin: 0 auto;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  transition: all var(--transition-normal);
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-violet);
  box-shadow: 0 0 0 3px var(--accent-violet-10);
  background: var(--bg-secondary);
}

/* ---- Grid de Proyectos ---- */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.project-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.project-card__image {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-bottom: 1px solid var(--border-subtle);
  overflow: hidden;
}

.project-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.project-card:hover .project-card__image img {
  transform: scale(1.05);
}

.project-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(8, 11, 20, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.project-card:hover .project-card__overlay {
  opacity: 1;
}

.project-card__content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-card__title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 0.5rem;
}

.project-card__desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
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
  border-top: 1px solid var(--border-subtle);
  padding-top: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.lang-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-cyan);
}

/* ---- Skeleton Loader ---- */
.skeleton-card {
  pointer-events: none;
}

.skeleton-img {
  width: 100%;
  aspect-ratio: 16/9;
  background: var(--bg-tertiary);
  animation: pulse-bg 1.5s infinite;
}

.skeleton-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton-title {
  height: 24px;
  width: 60%;
  background: var(--bg-tertiary);
  border-radius: 4px;
  animation: pulse-bg 1.5s infinite;
}

.skeleton-desc {
  height: 16px;
  width: 100%;
  background: var(--bg-tertiary);
  border-radius: 4px;
  animation: pulse-bg 1.5s infinite;
}
.skeleton-desc.short { width: 80%; }

.skeleton-tags {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.skeleton-tag {
  height: 24px;
  width: 60px;
  background: var(--bg-tertiary);
  border-radius: 12px;
  animation: pulse-bg 1.5s infinite;
}

@keyframes pulse-bg {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}

/* ---- No Results ---- */
.no-results {
  text-align: center;
  padding: 6rem 0;
  color: var(--text-muted);
}
.no-results svg { margin-bottom: 1rem; }

/* ---- Modal ---- */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(8, 11, 20, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: 1rem;
}

.modal-content {
  position: relative;
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--glow-card);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  z-index: 10;
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background: var(--accent-violet);
  border-color: var(--accent-violet);
}

.modal-image {
  width: 100%;
  aspect-ratio: 21/9;
  background: var(--bg-tertiary);
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-body {
  padding: 2.5rem;
}

.modal-title {
  font-size: var(--text-3xl);
  font-weight: 800;
  color: var(--text-white);
  margin-bottom: 0.5rem;
}

.modal-meta {
  display: flex;
  gap: 1.5rem;
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 1.5rem;
}

.modal-desc {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.modal-section h3 {
  font-size: var(--text-lg);
  color: var(--text-white);
  margin-bottom: 1rem;
}

.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-subtle);
}

/* Transiciones */
.fade-grid-enter-active,
.fade-grid-leave-active {
  transition: all 0.4s var(--ease-smooth);
}
.fade-grid-enter-from,
.fade-grid-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s var(--ease-smooth);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s var(--ease-smooth);
}
.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .modal-body {
    padding: 1.5rem;
  }
  .modal-actions {
    flex-direction: column;
  }
  .modal-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
