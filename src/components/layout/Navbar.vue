<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="navbar__container">
      <!-- Logo -->
      <router-link to="/" class="navbar__logo" aria-label="Javier España - Home">
        <span class="logo-bracket">&lt;</span>
        <span class="logo-name">JE</span>
        <span class="logo-bracket">/&gt;</span>
      </router-link>

      <!-- Desktop menu -->
      <ul class="navbar__menu" :class="{ active: isMenuOpen }" role="list">
        <li v-for="link in navLinks" :key="link.path">
          <router-link
            :to="link.path"
            class="navbar__link"
            @click="closeMenu"
          >
            {{ $t(`nav.${link.key}`) }}
          </router-link>
        </li>
      </ul>

      <!-- Right: language switcher + hamburger -->
      <div class="navbar__right">
        <LanguageSwitcher />
        <button
          class="navbar__toggle"
          :class="{ active: isMenuOpen }"
          @click="toggleMenu"
          aria-label="Toggle menu"
          :aria-expanded="isMenuOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LanguageSwitcher from '../common/LanguageSwitcher.vue'

const isScrolled  = ref(false)
const isMenuOpen  = ref(false)

const navLinks = [
  { key: 'home',     path: '/' },
  { key: 'about',    path: '/about' },
  { key: 'projects', path: '/projects' },
  { key: 'skills',   path: '/skills' },
  { key: 'contact',  path: '/contact' }
]

const handleScroll  = () => { isScrolled.value = window.scrollY > 50 }
const toggleMenu    = () => { isMenuOpen.value = !isMenuOpen.value }
const closeMenu     = () => { isMenuOpen.value = false }

onMounted(()   => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
/* ---- Base ---- */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(8, 11, 20, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid transparent;
  transition: all 0.3s var(--ease-smooth);
}

.navbar--scrolled {
  background: rgba(8, 11, 20, 0.95);
  border-bottom-color: var(--border-subtle);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}

.navbar__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.875rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* ---- Logo ---- */
.navbar__logo {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.1rem;
  z-index: 1001;
  flex-shrink: 0;
}

.logo-bracket {
  color: var(--accent-violet);
  font-size: 1.2rem;
}

.logo-name {
  color: var(--text-white);
  font-weight: 700;
  letter-spacing: 0.05em;
}

/* ---- Menu ---- */
.navbar__menu {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  flex: 1;
  justify-content: center;
}

.navbar__link {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.5rem 0.875rem;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  position: relative;
  letter-spacing: 0.01em;
}

.navbar__link:hover {
  color: var(--text-primary);
  background: var(--bg-card);
}

.navbar__link.router-link-active,
.navbar__link.router-link-exact-active {
  color: var(--accent-violet);
  background: var(--accent-violet-10);
}

/* ---- Right side ---- */
.navbar__right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

/* ---- Hamburger ---- */
.navbar__toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  cursor: pointer;
  padding: 6px;
  z-index: 1001;
  transition: all var(--transition-normal);
}

.navbar__toggle:hover {
  background: var(--accent-violet-10);
  border-color: var(--border-accent);
}

.navbar__toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s var(--ease-smooth);
  transform-origin: center;
}

.navbar__toggle.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.navbar__toggle.active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.navbar__toggle.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ---- Mobile menu ---- */
@media (max-width: 768px) {
  .navbar__toggle { display: flex; }

  .navbar__menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: min(320px, 85vw);
    height: 100vh;
    background: rgba(8, 11, 20, 0.98);
    backdrop-filter: blur(24px);
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem;
    gap: 0.5rem;
    border-left: 1px solid var(--border-subtle);
    transition: right 0.35s var(--ease-smooth);
    z-index: 1000;
  }

  .navbar__menu.active { right: 0; }

  .navbar__link {
    font-size: var(--text-base);
    width: 100%;
    padding: 0.75rem 1rem;
  }

  .navbar__container { padding: 0.875rem 1rem; }
}
</style>
