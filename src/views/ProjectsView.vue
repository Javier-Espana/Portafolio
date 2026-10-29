<template>
  <div class="projects-view page-transition">
    <section class="projects-hero section">
      <div class="container">
        <h1 class="section-title">{{ $t('projects.title') }}</h1>
        <p class="section-subtitle">{{ $t('projects.subtitle') }}</p>
      </div>
    </section>

    <section class="projects-grid-section section">
      <div class="container">
        
        <!-- Estado de carga: Skeletons -->
        <div v-if="loading && projects.length === 0" class="grid">
          <div v-for="i in 4" :key="i" class="project-card skeleton-card">
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
            v-for="project in projects"
            :key="project.id || project.name"
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
        <div v-if="!loading && projects.length === 0" class="no-results">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>{{ $t('projectsView.noResults') }}</p>
        </div>

        <!-- Banner GitHub: Más proyectos y repositorios -->
        <div class="github-explore-banner card">
          <div class="github-banner-content">
            <div class="github-badge">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>{{ $t('projectsView.githubBanner.badge') }}</span>
            </div>
            <h2 class="github-banner-title">
              {{ $t('projectsView.githubBanner.title') }}
            </h2>
            <p class="github-banner-desc">
              {{ $t('projectsView.githubBanner.desc') }}
            </p>
          </div>
          <div class="github-banner-action">
            <a
              href="https://github.com/Javier-Espana"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary github-cta-btn"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>{{ $t('projectsView.githubBanner.btn') }}</span>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
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
  if (val && typeof val === 'object') {
    return val[locale.value] || val.es || val.en || ''
  }
  return val ? String(val) : ''
}

const getProjectDescription = (p) => {
  if (!p) return ''
  const val = p.description
  if (val && typeof val === 'object') {
    return val[locale.value] || val.es || val.en || ''
  }
  return val ? String(val) : ''
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

/* ---- Banner Explorar GitHub ---- */
.github-explore-banner {
  margin-top: 4.5rem;
  padding: 2.5rem 3rem;
  background: linear-gradient(135deg, rgba(13, 17, 28, 0.95), rgba(20, 26, 42, 0.85));
  border: 1px solid rgba(0, 217, 255, 0.25);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(108, 99, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.github-explore-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(0, 217, 255, 0.12), transparent 70%);
  pointer-events: none;
}

.github-banner-content {
  max-width: 680px;
}

.github-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent-cyan);
  margin-bottom: 0.75rem;
  background: rgba(0, 217, 255, 0.08);
  border: 1px solid rgba(0, 217, 255, 0.2);
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-full);
}

.github-banner-title {
  font-size: clamp(1.25rem, 2.5vw, 1.65rem);
  font-weight: 800;
  color: var(--text-white);
  line-height: 1.3;
  margin-bottom: 0.6rem;
}

.github-banner-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

.github-banner-action {
  flex-shrink: 0;
}

.github-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.75rem;
  font-size: var(--text-sm);
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 0 20px rgba(108, 99, 255, 0.3);
}

.github-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 25px rgba(0, 217, 255, 0.4);
}

@media (max-width: 900px) {
  .github-explore-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem 1.5rem;
    gap: 1.5rem;
  }
  .github-banner-action {
    width: 100%;
  }
  .github-cta-btn {
    width: 100%;
    justify-content: center;
  }
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
