import { createRouter, createWebHistory } from 'vue-router'

const pageTitles = {
  home: { es: 'Inicio | Javier España — Full Stack & ML Engineer', en: 'Home | Javier España — Full Stack & ML Engineer' },
  about: { es: 'Sobre Mí | Javier España', en: 'About Me | Javier España' },
  projects: { es: 'Proyectos | Javier España', en: 'Projects | Javier España' },
  skills: { es: 'Habilidades | Javier España', en: 'Skills | Javier España' },
  contact: { es: 'Contacto | Javier España', en: 'Contact | Javier España' }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { routeKey: 'home' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { routeKey: 'about' }
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
      meta: { routeKey: 'projects' }
    },
    {
      path: '/skills',
      name: 'skills',
      component: () => import('../views/SkillsView.vue'),
      meta: { routeKey: 'skills' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: { routeKey: 'contact' }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

router.beforeEach((to, from, next) => {
  const lang = (typeof localStorage !== 'undefined' && localStorage.getItem('preferredLanguage')) || 'es'
  const key = to.meta.routeKey || 'home'
  const titleObj = pageTitles[key] || pageTitles.home
  document.title = titleObj[lang] || titleObj.es
  next()
})

export default router
