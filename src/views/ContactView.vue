<template>
  <div class="contact-view">
    <section class="contact-hero section">
      <div class="container">
        <h1 class="section-title">{{ $t('contact.title') }}</h1>
        <p class="section-subtitle">
          {{ $t('contact.subtitle') }}
        </p>
      </div>
    </section>
    
    <section class="contact-content section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-container">
            <h2>{{ $t('contact.form.title') }}</h2>
            
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-group">
                <label for="name">{{ $t('contact.form.name') }}</label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  :placeholder="$t('contact.form.namePlaceholder')"
                  :class="{ error: errors.name }"
                />
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>
              
              <div class="form-group">
                <label for="email">{{ $t('contact.form.email') }}</label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  :placeholder="$t('contact.form.emailPlaceholder')"
                  :class="{ error: errors.email }"
                />
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>
              
              <div class="form-group">
                <label for="subject">{{ $t('contact.form.subject') }}</label>
                <input
                  id="subject"
                  v-model="formData.subject"
                  type="text"
                  :placeholder="$t('contact.form.subjectPlaceholder')"
                  :class="{ error: errors.subject }"
                />
                <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
              </div>
              
              <div class="form-group">
                <label for="message">{{ $t('contact.form.message') }}</label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  rows="6"
                  :placeholder="$t('contact.form.messagePlaceholder')"
                  :class="{ error: errors.message }"
                ></textarea>
                <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
              </div>
              
              <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? $t('contact.form.sending') : $t('contact.form.submit') }}
              </button>
              
              <transition name="fade">
                <div v-if="submitSuccess" class="success-message">
                  {{ $t('contact.form.success') }}
                </div>
              </transition>
              
              <transition name="fade">
                <div v-if="submitError" class="error-message">
                  {{ $t('contact.form.error') }}
                </div>
              </transition>
            </form>
          </div>
          
          <!-- Contact Info -->
          <div class="contact-info">
            <h2>{{ $t('contact.info.title') }}</h2>
            
            <div class="info-cards">
              <div class="info-card">
                <div class="info-icon">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <h3>📧 Email</h3>
                <a href="mailto:javier.eduardo.espana@gmail.com">javier.eduardo.espana@gmail.com</a>
              </div>
              
              <div class="info-card">
                <div class="info-icon">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h3>📱 Teléfono</h3>
                <a href="tel:+50244112332">+502 4411 2332</a>
              </div>
              
              <div class="info-card">
                <div class="info-icon">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <h3>💻 GitHub</h3>
                <a href="https://github.com/Javier-Espana" target="_blank">github.com/Javier-Espana</a>
              </div>
              
              <div class="info-card">
                <div class="info-icon">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3>💼 LinkedIn</h3>
                <a href="https://www.linkedin.com/in/javier-eduardo-espa%C3%B1a-pacheco-1a8211325/" target="_blank">linkedin.com/in/javier-eduardo-españa-pacheco</a>
              </div>
            </div>
            
            <div class="availability">
              <div class="status-indicator"></div>
              <p>{{ $t('contact.info.availability') }}</p>
            </div>
            
            <div class="social-links">
              <a href="https://github.com/Javier-Espana" target="_blank" class="social-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/javier-eduardo-espa%C3%B1a-pacheco-1a8211325/" target="_blank" class="social-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref(false)

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  errors.name = ''
  errors.email = ''
  errors.subject = ''
  errors.message = ''
  
  // Validate name
  if (!formData.name.trim()) {
    errors.name = t('contact.form.errors.nameRequired')
    isValid = false
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email.trim()) {
    errors.email = t('contact.form.errors.emailRequired')
    isValid = false
  } else if (!emailRegex.test(formData.email)) {
    errors.email = t('contact.form.errors.emailInvalid')
    isValid = false
  }
  
  // Validate subject
  if (!formData.subject.trim()) {
    errors.subject = t('contact.form.errors.subjectRequired')
    isValid = false
  }
  
  // Validate message
  if (!formData.message.trim()) {
    errors.message = t('contact.form.errors.messageRequired')
    isValid = false
  } else if (formData.message.trim().length < 10) {
    errors.message = t('contact.form.errors.messageMin')
    isValid = false
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  submitSuccess.value = false
  submitError.value = false
  
  try {
    // Simulate API call
    // In production, replace with actual API endpoint
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // For demonstration, we'll just log the data
    console.log('Form submitted:', formData)
    
    // Show success message
    submitSuccess.value = true
    
    // Reset form
    formData.name = ''
    formData.email = ''
    formData.subject = ''
    formData.message = ''
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      submitSuccess.value = false
    }, 5000)
  } catch (error) {
    console.error('Error submitting form:', error)
    submitError.value = true
    
    // Hide error message after 5 seconds
    setTimeout(() => {
      submitError.value = false
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-view {
  padding-top: 5rem;
}

.section-subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 3rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
}

/* Contact Form */
.contact-form-container h2,
.contact-info h2 {
  font-family: var(--font-title);
  font-size: 2rem;
  color: var(--neon-blue);
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
  color: var(--neon-pink);
  font-weight: 600;
  font-family: var(--font-mono);
}

.form-group input,
.form-group textarea {
  padding: 1rem;
  background: rgba(15, 15, 45, 0.5);
  border: 1px solid var(--neon-blue);
  border-radius: 10px;
  color: white;
  font-family: var(--font-primary);
  font-size: 1rem;
  transition: all 0.3s var(--transition-smooth);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  box-shadow: 0 0 20px rgba(0, 247, 255, 0.3);
  border-color: var(--neon-blue);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #ff4444;
}

.form-group textarea {
  resize: vertical;
  min-height: 150px;
}

.error-message {
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.success-message {
  padding: 1rem;
  background: rgba(0, 255, 127, 0.1);
  border: 1px solid var(--neon-green);
  border-radius: 10px;
  color: var(--neon-green);
  text-align: center;
  margin-top: 1rem;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Contact Info */
.info-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-card {
  background: rgba(15, 15, 45, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid var(--neon-blue);
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s var(--transition-smooth);
}

.info-card:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 40px rgba(0, 247, 255, 0.3);
}

.info-icon {
  color: var(--neon-blue);
  margin-bottom: 0.5rem;
}

.info-card h3 {
  font-family: var(--font-title);
  color: var(--neon-pink);
  margin-bottom: 0.5rem;
}

.info-card a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s var(--transition-smooth);
}

.info-card a:hover {
  color: var(--neon-blue);
}

.info-card p {
  color: rgba(255, 255, 255, 0.8);
}

/* Availability */
.availability {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(0, 255, 127, 0.1);
  border: 1px solid var(--neon-green);
  border-radius: 15px;
  margin-bottom: 2rem;
}

.status-indicator {
  width: 12px;
  height: 12px;
  background: var(--neon-green);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.availability p {
  color: var(--neon-green);
  font-weight: 600;
  margin: 0;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.social-link {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 15, 45, 0.5);
  border: 1px solid var(--neon-blue);
  border-radius: 50%;
  color: var(--neon-blue);
  transition: all 0.3s var(--transition-smooth);
}

.social-link:hover {
  background: var(--neon-blue);
  color: var(--dark-bg);
  box-shadow: 0 0 30px var(--neon-blue);
  transform: translateY(-5px);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s var(--transition-smooth);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
