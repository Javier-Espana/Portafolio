<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__content">
        <div class="footer__section">
          <h3 class="footer__title">Javier España</h3>
          <p class="footer__description">
            Estudiante de Ingeniería en Ciencias de la Computación apasionado por 
            el desarrollo de software, la inteligencia artificial y la creación de 
            soluciones tecnológicas innovadoras.
          </p>
        </div>
        
        <div class="footer__section">
          <h4 class="footer__subtitle">Enlaces Rápidos</h4>
          <ul class="footer__links">
            <li v-for="link in quickLinks" :key="link.path">
              <router-link :to="link.path">{{ link.name }}</router-link>
            </li>
          </ul>
        </div>
        
        <div class="footer__section">
          <h4 class="footer__subtitle">Redes Sociales</h4>
          <div class="footer__social">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url" 
              target="_blank" 
              rel="noopener noreferrer"
              :aria-label="social.name"
              class="footer__social-link"
            >
              <span v-html="social.icon"></span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer__bottom">
        <p>&copy; {{ currentYear }} Javier España. Todos los derechos reservados.</p>
        <p class="footer__made-with">
          Hecho con <span class="heart">❤️</span> y Vue 3
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const quickLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Proyectos', path: '/projects' },
  { name: 'Habilidades', path: '/skills' },
  { name: 'Contacto', path: '/contact' }
]

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Javier-Espana',
    icon: '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/javier-eduardo-espa%C3%B1a-pacheco-1a8211325/',
    icon: '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>'
  },
  {
    name: 'Email',
    url: 'mailto:javier.eduardo.espana@gmail.com',
    icon: '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>'
  }
]
</script>

<style scoped>
.footer {
  background: linear-gradient(180deg, var(--dark-bg) 0%, var(--dark-bg-secondary) 100%);
  border-top: 1px solid var(--neon-blue);
  padding: 4rem 2rem 2rem;
  margin-top: auto;
}

.footer__container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer__content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer__section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer__title {
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: var(--neon-blue);
  margin-bottom: 0.5rem;
}

.footer__subtitle {
  font-family: var(--font-title);
  font-size: 1.2rem;
  color: white;
  margin-bottom: 0.5rem;
}

.footer__description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.footer__links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer__links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s var(--transition-smooth);
}

.footer__links a:hover {
  color: var(--neon-blue);
}

.footer__social {
  display: flex;
  gap: 1rem;
}

.footer__social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--neon-blue);
  border-radius: 50%;
  color: var(--neon-blue);
  transition: all 0.3s var(--transition-smooth);
}

.footer__social-link:hover {
  background: var(--neon-blue);
  color: var(--dark-bg);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 247, 255, 0.4);
}

.footer__bottom {
  border-top: 1px solid rgba(0, 247, 255, 0.2);
  padding-top: 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer__made-with {
  font-size: 0.9rem;
}

.heart {
  color: var(--neon-pink);
  animation: pulse 1.5s ease-in-out infinite;
}

@media (max-width: 768px) {
  .footer {
    padding: 3rem 1rem 1.5rem;
  }
  
  .footer__content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer__bottom {
    font-size: 0.9rem;
  }
}
</style>
