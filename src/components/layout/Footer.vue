<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <!-- Info Section -->
        <div class="footer__info">
          <router-link to="/" class="footer__logo" aria-label="Javier España - Home">
            <span class="logo-bracket">&lt;</span>
            <span class="logo-name">JE</span>
            <span class="logo-bracket">/&gt;</span>
          </router-link>
          <p class="footer__description">
            {{ $t('footer.about') }}
          </p>
        </div>

        <!-- Links Section -->
        <div class="footer__links-section">
          <h4 class="footer__subtitle">{{ $t('footer.quickLinks') }}</h4>
          <ul class="footer__links" role="list">
            <li v-for="link in quickLinks" :key="link.path">
              <router-link :to="link.path">{{ $t(link.nameKey) }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Social Section -->
        <div class="footer__social-section">
          <h4 class="footer__subtitle">{{ $t('footer.social') }}</h4>
          <div class="footer__socials">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
              class="social-link"
            >
              <span v-html="social.icon"></span>
            </a>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p>&copy; {{ currentYear }} Javier España. {{ $t('footer.rights') }}</p>
        <p class="made-with">
          {{ $t('footer.madeWith') }} <span class="heart">❤</span> {{ $t('footer.and') }} Vue 3
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const quickLinks = [
  { nameKey: 'nav.home', path: '/' },
  { nameKey: 'nav.projects', path: '/projects' },
  { nameKey: 'nav.skills', path: '/skills' },
  { nameKey: 'nav.contact', path: '/contact' }
]

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Javier-Espana',
    icon: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/javier-eduardo-espa%C3%B1a-pacheco-1a8211325/',
    icon: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>'
  }
]
</script>

<style scoped>
.footer {
  background: var(--bg-primary);
  border-top: 1px solid var(--border-subtle);
  padding: 5rem 0 2rem;
  margin-top: auto;
}

.footer__content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

/* ---- Info ---- */
.footer__info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer__logo {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.1rem;
}

.logo-bracket {
  color: var(--accent-violet);
}

.logo-name {
  color: var(--text-white);
  font-weight: 700;
}

.footer__description {
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 400px;
  font-size: var(--text-sm);
}

/* ---- Subtitles ---- */
.footer__subtitle {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-white);
  margin-bottom: 1.25rem;
}

/* ---- Links ---- */
.footer__links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer__links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color var(--transition-fast);
}

.footer__links a:hover {
  color: var(--accent-violet);
}

/* ---- Socials ---- */
.footer__socials {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  transition: all var(--transition-normal);
}

.social-link:hover {
  background: var(--accent-violet-10);
  color: var(--accent-violet);
  border-color: var(--accent-violet);
  transform: translateY(-2px);
}

/* ---- Bottom ---- */
.footer__bottom {
  border-top: 1px solid var(--border-subtle);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-muted);
  font-size: var(--text-xs);
}

.heart {
  color: var(--accent-violet);
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .footer {
    padding: 4rem 0 2rem;
  }
  
  .footer__content {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  
  .footer__bottom {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
