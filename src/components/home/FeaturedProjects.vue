<template>
  <section class="featured-projects section" ref="sectionRef">
    <div class="container">
      <h2 class="section-title gsap-reveal">{{ $t('projects.title') }}</h2>
      <p class="section-subtitle gsap-reveal">{{ $t('projects.subtitle') }}</p>

      <div class="projects-grid">
        <article
          v-for="project in displayProjects"
          :key="project.id"
          class="project-card card project-card-gsap"
          @click="openProject(project)"
          @mousemove="handleImageParallax($event, project.id)"
          @mouseleave="resetImageParallax(project.id)"
          :ref="el => { if (el) cardRefs[project.id] = el }"
        >
          <div class="project-card__image-wrapper">
            <img 
              :src="project.image" 
              :alt="getProjectTitle(project)" 
              @error="handleImageError" 
              class="project-image"
              :ref="el => { if (el) imgRefs[project.id] = el }"
            />
            <div class="project-card__overlay">
              <span class="btn btn-primary magnetic" data-strength="20">{{ $t('projects.viewDetails') }}</span>
            </div>
            <div v-if="project.award" class="project-award-badge">
              🏆 {{ project.award }}
            </div>
          </div>

          <div class="project-card__content">
            <div class="project-card__header">
              <h3 class="project-card__title">{{ getProjectTitle(project) }}</h3>
            </div>

            <p class="project-card__description">
              {{ getProjectDescription(project) }}
            </p>

            <div class="project-card__tech">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="badge badge-violet"
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
                class="project-link magnetic"
                data-strength="15"
                @click.stop
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                {{ $t('projects.github') || 'GitHub' }}
              </a>

              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="project-link magnetic"
                data-strength="15"
                @click.stop
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {{ $t('projects.demo') || 'Demo' }}
              </a>
            </div>
          </div>
        </article>
      </div>

      <div class="featured-projects__cta gsap-reveal">
        <router-link to="/projects" class="btn btn-secondary btn-lg magnetic" data-strength="40">
          {{ $t('projects.viewAll') }}
        </router-link>
      </div>
    </div>

    <!-- Liquid Distortion SVG Filter -->
    <svg style="width: 0; height: 0; position: absolute;" aria-hidden="true">
      <defs>
        <filter id="liquid-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="1" result="noise" class="liquid-turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" class="liquid-displacement" />
        </filter>
      </defs>
    </svg>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { featuredProjectsData } from '../../data/projects.js'

gsap.registerPlugin(ScrollTrigger)

const { locale } = useI18n()

const displayProjects = ref(featuredProjectsData.slice(0, 3))
const sectionRef = ref(null)
const cardRefs = ref({})
const imgRefs = ref({})

const getProjectTitle = (p) => {
  if (typeof p.title === 'object') {
    return p.title[locale.value] || p.title.es || p.title.en
  }
  return p.title
}

const getProjectDescription = (p) => {
  if (typeof p.description === 'object') {
    return p.description[locale.value] || p.description.es || p.description.en
  }
  return p.description
}

const handleImageError = (e) => {
  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23111827'/%3E%3Cpath d='M200 200 L400 200 M300 100 L300 300' stroke='%236C63FF' stroke-width='2' stroke-dasharray='10 10' opacity='0.3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%236C63FF' font-weight='bold' opacity='0.5'%3EPROJECT%3C/text%3E%3C/svg%3E"
}

const openProject = (project) => {
  if (project.github) {
    window.open(project.github, '_blank')
  }
}

// GSAP Animations
const initAnimations = () => {
  if (!sectionRef.value) return

  // Reveal headers and CTA
  gsap.fromTo(sectionRef.value.querySelectorAll('.gsap-reveal'),
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 80%",
      }
    }
  )

  // Reveal Cards
  gsap.fromTo('.project-card-gsap',
    { y: 60, opacity: 0, scale: 0.96 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.9,
      stagger: 0.15,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 85%",
      }
    }
  )
}

// Parallax Hover Effect
const handleImageParallax = (e, id) => {
  const card = cardRefs.value[id]
  const img = imgRefs.value[id]
  if (!card || !img) return

  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5

  gsap.to(img, {
    x: x * 20,
    y: y * 20,
    scale: 1.1,
    duration: 0.4,
    ease: "power2.out"
  })
}

const resetImageParallax = (id) => {
  const img = imgRefs.value[id]
  if (!img) return

  gsap.to(img, {
    x: 0,
    y: 0,
    scale: 1,
    duration: 0.6,
    ease: "power3.out"
  })
}

onMounted(() => {
  nextTick(() => {
    initAnimations()
  })
})
</script>

<style scoped>
.featured-projects {
  position: relative;
  padding: var(--space-4xl) 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.project-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s var(--ease-smooth), box-shadow 0.3s var(--ease-smooth);
  cursor: pointer;
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px var(--accent-violet-20);
  border-color: var(--accent-violet);
}

.project-card__image-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background-color: var(--bg-secondary);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s var(--ease-smooth);
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
  backdrop-filter: blur(2px);
}

.project-card:hover .project-card__overlay {
  opacity: 1;
}

.project-award-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(8, 11, 20, 0.85);
  border: 1px solid #ffb703;
  color: #ffb703;
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(8px);
  z-index: 2;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.project-card__content {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.project-card__title {
  font-size: var(--text-xl);
  color: var(--text-white);
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.project-card__description {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  line-height: 1.6;
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.project-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.project-card__links {
  display: flex;
  gap: 1rem;
  align-items: center;
  border-top: 1px solid var(--border-default);
  padding-top: 1rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-primary);
  font-size: var(--text-sm);
  font-weight: 500;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.project-link:hover {
  color: var(--accent-cyan);
}

.featured-projects__cta {
  text-align: center;
  margin-top: 3.5rem;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
