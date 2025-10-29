<template>
  <div class="projects-view">
    <section class="projects-hero section">
      <div class="container">
        <h1 class="section-title">{{ $t('projects.title') }}</h1>
        <p class="section-subtitle">
          {{ $t('projects.subtitle') }}
        </p>
        
        <div class="projects-filters">
          <button 
            v-for="category in categories" 
            :key="category"
            :class="['filter-btn', { active: selectedCategory === category }]"
            @click="selectedCategory = category"
          >
            {{ $t(`projectsView.categories.${category}`) }}
          </button>
        </div>
        
        <div class="projects-search">
          <input 
            v-model="searchQuery"
            type="text" 
            :placeholder="$t('projectsView.searchPlaceholder')"
            class="search-input"
          />
        </div>
      </div>
    </section>
    
    <section class="projects-grid section">
      <div class="container">
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>{{ $t('projectsView.loading') }}</p>
        </div>
        
        <transition-group v-else name="project-list" tag="div" class="grid">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="project-card"
            @click="openModal(project)"
          >
            <div class="project-image">
              <img :src="project.image" :alt="project.name" @error="handleImageError" />
              <div class="project-overlay">
                <button class="btn-view">{{ $t('projects.viewDetails') }}</button>
              </div>
            </div>
            
            <div class="project-info">
              <h3>{{ project.name }}</h3>
              <p>{{ project.description || $t('projectsView.noDescription') }}</p>
              
              <div class="project-tech">
                <span v-for="tech in project.technologies" :key="tech">
                  {{ tech }}
                </span>
              </div>
              
              <div class="project-stats">
                <span v-if="project.stargazers_count" class="stat">
                  ⭐ {{ project.stargazers_count }}
                </span>
                <span v-if="project.forks_count" class="stat">
                  🔱 {{ project.forks_count }}
                </span>
                <span v-if="project.language" class="stat">
                  💻 {{ project.language }}
                </span>
              </div>
              
              <div class="project-links">
                <a 
                  :href="project.html_url" 
                  target="_blank"
                  @click.stop
                  class="project-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a 
                  v-if="project.homepage" 
                  :href="project.homepage" 
                  target="_blank"
                  @click.stop
                  class="project-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Demo
                </a>
              </div>
            </div>
          </div>
        </transition-group>
        
        <div v-if="!loading && filteredProjects.length === 0" class="no-results">
          <p>{{ $t('projectsView.noResults') }}</p>
        </div>
      </div>
    </section>
    
    <!-- Modal -->
    <transition name="modal">
      <div v-if="selectedProject" class="modal-backdrop" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">×</button>
          
          <div class="modal-image">
            <img :src="selectedProject.image" :alt="selectedProject.name" @error="handleImageError" />
          </div>
          
          <div class="modal-info">
            <h2>{{ selectedProject.name }}</h2>
            <p class="modal-description">{{ selectedProject.description }}</p>
            
            <div v-if="selectedProject.topics && selectedProject.topics.length > 0">
              <h3>{{ $t('projectsView.topics') }}</h3>
              <div class="modal-tech">
                <span v-for="topic in selectedProject.topics" :key="topic">
                  {{ topic }}
                </span>
              </div>
            </div>
            
            <h3>{{ $t('projects.technologies') }}</h3>
            <div class="modal-tech">
              <span v-for="tech in selectedProject.technologies" :key="tech">
                {{ tech }}
              </span>
            </div>
            
            <div class="modal-stats">
              <div class="stat-item">
                <strong>⭐ {{ $t('projectsView.stars') }}:</strong> {{ selectedProject.stargazers_count }}
              </div>
              <div class="stat-item">
                <strong>🔱 {{ $t('projectsView.forks') }}:</strong> {{ selectedProject.forks_count }}
              </div>
              <div v-if="selectedProject.language" class="stat-item">
                <strong>💻 {{ $t('projectsView.language') }}:</strong> {{ selectedProject.language }}
              </div>
              <div class="stat-item">
                <strong>📅 {{ $t('projectsView.updated') }}:</strong> {{ formatDate(selectedProject.updated_at) }}
              </div>
            </div>
            
            <div class="modal-links">
              <a 
                :href="selectedProject.html_url" 
                target="_blank"
                class="btn btn-primary"
              >
                {{ $t('projects.github') }}
              </a>
              <a 
                v-if="selectedProject.homepage" 
                :href="selectedProject.homepage" 
                target="_blank"
                class="btn btn-secondary"
              >
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

// Fetch projects from GitHub
const fetchGitHubProjects = async () => {
  loading.value = true
  try {
    const response = await fetch('https://api.github.com/users/Javier-Espana/repos?sort=updated&per_page=100')
    if (response.ok) {
      const repos = await response.json()
      
      // Filter and map repos
      projects.value = repos
        .filter(repo => !repo.fork && !repo.private)
        .map(repo => {
          // Determine category from topics
          let category = 'other'
          if (repo.topics) {
            if (repo.topics.includes('fullstack') || repo.topics.includes('full-stack')) {
              category = 'fullstack'
            } else if (repo.topics.includes('backend') || repo.topics.includes('api')) {
              category = 'backend'
            } else if (repo.topics.includes('frontend') || repo.topics.includes('ui')) {
              category = 'frontend'
            }
          }
          
          return {
            id: repo.id,
            name: repo.name,
            description: repo.description || '',
            html_url: repo.html_url,
            homepage: repo.homepage,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            language: repo.language,
            topics: repo.topics || [],
            technologies: repo.topics ? repo.topics.slice(0, 6) : [],
            updated_at: repo.updated_at,
            created_at: repo.created_at,
            image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
            category: category
          }
        })
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
    }
  } catch (error) {
    console.error('Error fetching GitHub projects:', error)
    projects.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchGitHubProjects()
})

const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const matchesCategory = selectedCategory.value === 'all' || project.category === selectedCategory.value
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

const openModal = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedProject.value = null
  document.body.style.overflow = 'auto'
}

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/600x400/0a0a1a/00f7ff?text=Project'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
.projects-view {
  padding-top: 5rem;
}

.section-subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 3rem;
}

/* Filters */
.projects-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(15, 15, 45, 0.5);
  border: 1px solid var(--neon-blue);
  border-radius: 25px;
  color: var(--neon-blue);
  font-family: var(--font-mono);
  cursor: pointer;
  transition: all 0.3s var(--transition-smooth);
}

.filter-btn:hover {
  background: rgba(0, 247, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 247, 255, 0.3);
}

.filter-btn.active {
  background: var(--neon-blue);
  color: var(--dark-bg);
  box-shadow: 0 0 30px var(--neon-blue);
}

/* Search */
.projects-search {
  max-width: 500px;
  margin: 0 auto 3rem;
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  background: rgba(15, 15, 45, 0.5);
  border: 1px solid var(--neon-blue);
  border-radius: 25px;
  color: white;
  font-family: var(--font-mono);
  font-size: 1rem;
  transition: all 0.3s var(--transition-smooth);
}

.search-input:focus {
  outline: none;
  box-shadow: 0 0 20px rgba(0, 247, 255, 0.3);
}

/* Projects Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(15, 15, 45, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid var(--neon-blue);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s var(--transition-smooth);
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 40px rgba(0, 247, 255, 0.3);
}

.project-image {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s var(--transition-smooth);
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s var(--transition-smooth);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.btn-view {
  padding: 0.75rem 1.5rem;
  background: var(--neon-blue);
  color: var(--dark-bg);
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s var(--transition-smooth);
}

.btn-view:hover {
  box-shadow: 0 0 30px var(--neon-blue);
}

.project-info {
  padding: 1.5rem;
}

.project-info h3 {
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: var(--neon-blue);
  margin-bottom: 0.5rem;
}

.project-info p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.project-tech span {
  padding: 0.25rem 0.75rem;
  background: rgba(0, 247, 255, 0.1);
  border: 1px solid var(--neon-blue);
  border-radius: 12px;
  font-size: 0.8rem;
  color: var(--neon-blue);
}

.project-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.project-stats .stat {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 0, 247, 0.1);
  border: 1px solid var(--neon-pink);
  border-radius: 20px;
  color: var(--neon-pink);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s var(--transition-smooth);
}

.project-link:hover {
  background: rgba(255, 0, 247, 0.2);
  box-shadow: 0 0 20px rgba(255, 0, 247, 0.3);
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 4rem 0;
  color: rgba(255, 255, 255, 0.7);
}

.spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 1rem;
  border: 3px solid rgba(0, 247, 255, 0.1);
  border-top-color: var(--neon-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* No Results */
.no-results {
  text-align: center;
  padding: 4rem 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;
}

.modal-content {
  position: relative;
  background: rgba(15, 15, 45, 0.95);
  backdrop-filter: blur(20px);
  border: 2px solid var(--neon-blue);
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 60px rgba(0, 247, 255, 0.5);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  background: rgba(255, 0, 247, 0.2);
  border: 1px solid var(--neon-pink);
  border-radius: 50%;
  color: var(--neon-pink);
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s var(--transition-smooth);
  z-index: 10;
}

.modal-close:hover {
  background: var(--neon-pink);
  color: var(--dark-bg);
  box-shadow: 0 0 30px var(--neon-pink);
}

.modal-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-info {
  padding: 2rem;
}

.modal-info h2 {
  font-family: var(--font-title);
  font-size: 2rem;
  color: var(--neon-blue);
  margin-bottom: 1rem;
}

.modal-description {
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}

.modal-info h3 {
  font-family: var(--font-title);
  font-size: 1.3rem;
  color: var(--neon-pink);
  margin: 2rem 0 1rem;
}

.modal-features {
  list-style: none;
  padding: 0;
}

.modal-features li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: rgba(255, 255, 255, 0.8);
}

.modal-features li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--neon-green);
  font-size: 1.2rem;
}

.modal-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.modal-tech span {
  padding: 0.5rem 1rem;
  background: rgba(0, 247, 255, 0.1);
  border: 1px solid var(--neon-blue);
  border-radius: 15px;
  color: var(--neon-blue);
}

.modal-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(15, 15, 45, 0.3);
  border-radius: 15px;
  border: 1px solid rgba(0, 247, 255, 0.2);
}

.modal-stats .stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.modal-stats .stat-item strong {
  color: var(--neon-blue);
  font-size: 0.9rem;
}

.modal-links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

/* Animations */
.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.3s var(--transition-smooth);
}

.project-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.project-list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s var(--transition-smooth);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s var(--transition-smooth);
}

.modal-enter-from .modal-content {
  transform: scale(0.9);
}

.modal-leave-to .modal-content {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .projects-filters {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .modal-backdrop {
    padding: 1rem;
  }
  
  .modal-image {
    height: 250px;
  }
  
  .modal-info {
    padding: 1.5rem;
  }
  
  .modal-links {
    flex-direction: column;
  }
}
</style>
