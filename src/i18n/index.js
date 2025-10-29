import { createI18n } from 'vue-i18n'
import translations from './translations'

const i18n = createI18n({
  legacy: false,
  locale: 'en', // Idioma por defecto: inglés
  fallbackLocale: 'en',
  messages: translations,
  globalInjection: true
})

export default i18n
