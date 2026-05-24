<template>
  <section class="about-preview section">
    <div class="container">
      <h2 class="section-title">{{ $t('about.title') }}</h2>

      <div class="about-preview__grid">
        <!-- Foto -->
        <div class="about-preview__photo-wrap">
          <div class="photo-border">
            <img
              src="/assets/images/Profile-Picture.jpg"
              :alt="$t('about.name')"
              class="profile-photo"
            />
          </div>
          <!-- Badges flotantes -->
          <div class="floating-badges">
            <span class="badge badge-violet">{{ $t('about.badges.fullstack') }}</span>
            <span class="badge badge-cyan">{{ $t('about.badges.backend') }}</span>
            <span class="badge badge-green">{{ $t('about.badges.uiux') }}</span>
          </div>
        </div>

        <!-- Texto -->
        <div class="about-preview__text">
          <p class="about-role">{{ $t('about.role') }}</p>
          <h3 class="about-name">{{ $t('about.name') }}</h3>

          <p class="about-bio">
            {{ firstBioParagraph }}
          </p>

          <div class="about-highlights">
            <div class="highlight-item">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Universidad del Valle de Guatemala</span>
            </div>
            <div class="highlight-item">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Guatemala, Guatemala</span>
            </div>
            <div class="highlight-item">
              <span class="glow-dot"></span>
              <span>{{ $t('contact.info.availability') }}</span>
            </div>
          </div>

          <router-link to="/about" class="btn btn-primary">
            {{ $t('about.button') }}
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()

// Solo mostrar el primer párrafo de la bio en la preview
const firstBioParagraph = computed(() => {
  const bio = tm('about.bio')
  if (Array.isArray(bio) && bio.length > 0) return bio[0]
  return ''
})
</script>

<style scoped>
.about-preview {
  background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

/* ---- Grid 2 columnas ---- */
.about-preview__grid {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 5rem;
  align-items: center;
}

/* ---- Foto ---- */
.about-preview__photo-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.photo-border {
  width: 280px;
  height: 280px;
  border-radius: var(--radius-xl);
  padding: 3px;
  background: linear-gradient(135deg, var(--accent-violet), var(--accent-cyan));
  box-shadow: var(--glow-violet);
  flex-shrink: 0;
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: calc(var(--radius-xl) - 3px);
  display: block;
  transition: transform var(--transition-slow);
}

.photo-border:hover .profile-photo {
  transform: scale(1.04);
}

/* ---- Badges bajo la foto ---- */
.floating-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

/* ---- Texto ---- */
.about-preview__text {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.about-role {
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent-violet);
  font-family: var(--font-mono);
}

.about-name {
  font-size: clamp(1.6rem, 3vw, var(--text-4xl));
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-white);
  line-height: 1.2;
}

.about-bio {
  color: var(--text-secondary);
  line-height: 1.85;
  font-size: var(--text-base);
}

/* ---- Highlights ---- */
.about-highlights {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.highlight-item svg {
  color: var(--accent-violet);
  flex-shrink: 0;
}

/* ---- Responsive ---- */
@media (max-width: 1024px) {
  .about-preview__grid {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .about-preview__photo-wrap {
    align-items: center;
  }

  .about-highlights {
    align-items: center;
  }

  .highlight-item {
    justify-content: center;
  }

  .about-preview__text .btn {
    align-self: center;
  }
}

@media (max-width: 768px) {
  .photo-border {
    width: 220px;
    height: 220px;
  }
}
</style>
