<template>
  <div class="contact-view page-transition">
    <section class="contact-section section">
      <div class="container">
        <h1 class="section-title">{{ $t('contact.title') }}</h1>
        <p class="section-subtitle">{{ $t('contact.subtitle') }}</p>

        <div class="contact-grid">
          <!-- Info -->
          <div class="contact-info">
            <div class="info-card card">
              <div class="info-icon">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="info-content">
                <h3>{{ $t('contact.info.email') }}</h3>
                <p>javierespanapacheco@gmail.com</p>
                <a href="mailto:javierespanapacheco@gmail.com" class="info-link">{{ $t('contact.info.writeMe') }}</a>
              </div>
            </div>

            <div class="info-card card">
              <div class="info-icon">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="info-content">
                <h3>{{ $t('contact.info.location') }}</h3>
                <p>Guatemala, Guatemala</p>
                <span class="info-status"><span class="glow-dot"></span> {{ $t('contact.info.availability') }}</span>
              </div>
            </div>
          </div>

          <!-- Formulario -->
          <div class="contact-form-wrapper card">
            <h2 class="form-title">{{ $t('contact.form.title') }}</h2>
            
            <!-- Integración Formspree -->
            <form 
              action="https://formspree.io/f/xvgoewpj" 
              method="POST" 
              class="contact-form"
              @submit.prevent="handleSubmit"
            >
              <div class="form-group">
                <label for="name">{{ $t('contact.form.name') }}</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  v-model="form.name" 
                  required 
                  class="form-input"
                  :placeholder="$t('contact.form.name')"
                >
              </div>

              <div class="form-group">
                <label for="email">{{ $t('contact.form.email') }}</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  v-model="form.email" 
                  required 
                  class="form-input"
                  :placeholder="$t('contact.form.email')"
                >
              </div>

              <div class="form-group">
                <label for="subject">{{ $t('contact.form.subject') }}</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  v-model="form.subject" 
                  required 
                  class="form-input"
                  :placeholder="$t('contact.form.subject')"
                >
              </div>

              <div class="form-group">
                <label for="message">{{ $t('contact.form.message') }}</label>
                <textarea 
                  id="message" 
                  name="message" 
                  v-model="form.message" 
                  required 
                  rows="5" 
                  class="form-input form-textarea"
                  :placeholder="$t('contact.form.message')"
                ></textarea>
              </div>

              <button type="submit" class="btn btn-primary btn-submit" :disabled="isSubmitting">
                <span v-if="!isSubmitting">{{ $t('contact.form.send') }}</span>
                <span v-else class="loading-spinner"></span>
              </button>

              <transition name="fade">
                <div v-if="submitStatus" :class="['status-message', submitStatus.type]">
                  {{ submitStatus.message }}
                </div>
              </transition>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref(null)

const handleSubmit = async (e) => {
  isSubmitting.value = true
  submitStatus.value = null
  
  const formElement = e.target

  try {
    const response = await fetch(formElement.action, {
      method: formElement.method,
      body: new FormData(formElement),
      headers: {
        'Accept': 'application/json'
      }
    })
    
    if (response.ok) {
      submitStatus.value = {
        type: 'success',
        message: '¡Mensaje enviado con éxito! Me pondré en contacto pronto.'
      }
      form.value = { name: '', email: '', subject: '', message: '' }
    } else {
      throw new Error('Error de red')
    }
  } catch (error) {
    submitStatus.value = {
      type: 'error',
      message: 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo.'
    }
  } finally {
    isSubmitting.value = false
    setTimeout(() => {
      submitStatus.value = null
    }, 5000)
  }
}
</script>

<style scoped>
.contact-view {
  padding-top: 5rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  max-width: 1000px;
  margin: 0 auto;
}

/* ---- Info Cards ---- */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.info-icon {
  width: 48px;
  height: 48px;
  background: var(--accent-violet-10);
  color: var(--accent-violet);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-content h3 {
  font-size: var(--text-lg);
  color: var(--text-white);
  margin-bottom: 0.5rem;
}

.info-content p {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  margin-bottom: 0.75rem;
}

.info-link {
  color: var(--accent-cyan);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.info-link:hover {
  text-decoration: underline;
}

.info-status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-sm);
  color: var(--accent-green);
  background: rgba(16, 185, 129, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
}

/* ---- Formulario ---- */
.contact-form-wrapper {
  padding: 3rem;
}

.form-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
}

.form-input {
  width: 100%;
  padding: 0.875rem 1.25rem;
  background: rgba(0,0,0,0.2);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  transition: all var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-violet);
  background: rgba(0,0,0,0.4);
  box-shadow: 0 0 0 3px var(--accent-violet-10);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-submit {
  margin-top: 1rem;
  width: 100%;
  justify-content: center;
  padding: 1rem;
}

/* Loading state */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

/* Status message */
.status-message {
  padding: 1rem;
  border-radius: var(--radius-md);
  text-align: center;
  font-size: var(--text-sm);
  font-weight: 500;
}

.status-message.success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--accent-green);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.status-message.error {
  background: rgba(239, 68, 68, 0.1);
  color: #EF4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ---- Responsive ---- */
@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 600px) {
  .contact-form-wrapper {
    padding: 2rem 1.5rem;
  }
}
</style>
