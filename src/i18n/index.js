import { createI18n } from 'vue-i18n'
import translations from './translations'

// Create i18n safely: if messages parsing fails (e.g. production-linked-format errors),
// fall back to a minimal i18n instance so the app doesn't completely crash.
let i18n
try {
  i18n = createI18n({
    legacy: false,
    locale: 'en', // Idioma por defecto: inglés
    fallbackLocale: 'en',
    messages: translations,
    globalInjection: true
  })
} catch (err) {
  // If vue-i18n throws (for example: Invalid linked format in production parser),
  // log the error for diagnostics and create a minimal i18n instance so the app can render.
  // This prevents a hard crash while we deploy a proper fix.
  // The error will appear in the browser console as: "i18n init error"
  // and we also attach it to window for remote inspection if needed.
  // eslint-disable-next-line no-console
  console.error('i18n init error:', err)
  try {
    // Fallback with empty messages to avoid further parse attempts.
    i18n = createI18n({
      legacy: false,
      locale: 'en',
      fallbackLocale: 'en',
      messages: { en: {}, es: {} },
      globalInjection: true
    })
  } catch (err2) {
    // As a last resort, rethrow so the developer can see the failure during development.
    // eslint-disable-next-line no-console
    console.error('fallback i18n init also failed:', err2)
    throw err2
  }
  // Expose the original error on window for remote debugging if necessary.
  if (typeof window !== 'undefined') window.__i18n_init_error__ = err
}

export default i18n
