import { createI18n } from 'vue-i18n'
import translations from './translations'

const savedLocale = (typeof localStorage !== 'undefined' && localStorage.getItem('user_locale')) || 'es'

let i18n
try {
  i18n = createI18n({
    legacy: false,
    locale: savedLocale,
    fallbackLocale: 'en',
    messages: translations,
    globalInjection: true
  })

  // Sincronizar atributo lang en html
  if (typeof document !== 'undefined') {
    document.documentElement.lang = savedLocale
  }
} catch (err) {
  console.error('i18n init error:', err)
  i18n = createI18n({
    legacy: false,
    locale: 'es',
    fallbackLocale: 'en',
    messages: { en: {}, es: {} },
    globalInjection: true
  })
}

export default i18n
