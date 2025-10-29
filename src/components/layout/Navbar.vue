<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="navbar__container">
      <router-link to="/" class="navbar__logo">
        <span class="glitch" data-text="Javier España">Javier España</span>
      </router-link>
      
      <div class="navbar__right">
        <LanguageSwitcher />
        
        <button 
          class="navbar__toggle" 
          @click="toggleMenu"
          :class="{ 'active': isMenuOpen }"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <ul class="navbar__menu" :class="{ 'active': isMenuOpen }">
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
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LanguageSwitcher from '../common/LanguageSwitcher.vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const navLinks = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'projects', path: '/projects' },
  { key: 'skills', path: '/skills' },
  { key: 'contact', path: '/contact' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(10, 10, 26, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  transition: all 0.3s var(--transition-smooth);
}

.navbar--scrolled {
  background: rgba(10, 10, 26, 0.95);
  border-bottom-color: var(--neon-blue);
  box-shadow: 0 5px 20px rgba(0, 247, 255, 0.2);
}

.navbar__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar__right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navbar__logo {
  font-family: var(--font-title);
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--neon-blue);
  text-decoration: none;
  position: relative;
  z-index: 1001;
}

.navbar__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  z-index: 1001;
}

.navbar__toggle span {
  width: 25px;
  height: 3px;
  background: var(--neon-blue);
  border-radius: 2px;
  transition: all 0.3s var(--transition-smooth);
}

.navbar__toggle.active span:nth-child(1) {
  transform: rotate(45deg) translateY(8px);
}

.navbar__toggle.active span:nth-child(2) {
  opacity: 0;
}

.navbar__toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translateY(-8px);
}

.navbar__menu {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.navbar__link {
  font-family: var(--font-title);
  font-size: 1rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.5rem 1rem;
  position: relative;
  transition: color 0.3s var(--transition-smooth);
}

.navbar__link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--neon-blue);
  transition: width 0.3s var(--transition-smooth);
}

.navbar__link:hover {
  color: var(--neon-blue);
}

.navbar__link:hover::before {
  width: 100%;
}

.navbar__link.router-link-active {
  color: var(--neon-blue);
}

.navbar__link.router-link-active::before {
  width: 100%;
}

@media (max-width: 768px) {
  .navbar__right {
    gap: 1rem;
  }
  
  .navbar__toggle {
    display: flex;
  }
  
  .navbar__menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    background: rgba(10, 10, 26, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    transition: right 0.3s var(--transition-smooth);
    border-left: 1px solid var(--neon-blue);
  }
  
  .navbar__menu.active {
    right: 0;
  }
  
  .navbar__link {
    font-size: 1.2rem;
  }
}
</style>
