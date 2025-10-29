<template>
  <section class="about-preview section">
    <div class="container">
      <h2 class="section-title">{{ $t('about.title') }}</h2>
      
      <div class="about-preview__content">
        <div class="about-preview__main">
          <div class="about-preview__card">
            <div class="profile-header">
              <div class="about-preview__photo">
                <img src="/assets/images/Profile-Picture.jpg" alt="Javier España" class="profile-photo" />
                <div class="photo-overlay"></div>
              </div>
              
              <div class="profile-header-info">
                <h3 class="profile-name">{{ $t('about.name') }}</h3>
                <p class="profile-title">{{ $t('about.role') }}</p>
                
                <div class="profile-badges">
                  <span class="badge">🌐 {{ $t('about.badges.fullstack') }}</span>
                  <span class="badge">🖥️ {{ $t('about.badges.backend') }}</span>
                  <span class="badge">🎨 {{ $t('about.badges.uiux') }}</span>
                  <span class="badge">🎵 {{ $t('about.badges.music') }}</span>
                </div>
              </div>
            </div>
            
            <div class="about-description">
              <p v-for="(paragraph, index) in $tm('about.bio')" :key="index">
                {{ paragraph }}
              </p>
            </div>
            
            <div class="contact-section">
              <h4>{{ $t('about.contact.title') }}</h4>
              <div class="contact-grid">
                <div class="contact-item">
                  <span class="contact-icon">📧</span>
                  <div class="contact-details">
                    <span class="contact-label">{{ $t('about.contact.email') }}</span>
                    <a href="mailto:javier.eduardo.espana@gmail.com">javier.eduardo.espana@gmail.com</a>
                  </div>
                </div>
                
                <div class="contact-item">
                  <span class="contact-icon">📱</span>
                  <div class="contact-details">
                    <span class="contact-label">{{ $t('about.contact.phone') }}</span>
                    <a href="tel:+50244112332">+502 4411 2332</a>
                  </div>
                </div>
                
                <div class="contact-item">
                  <span class="contact-icon">💻</span>
                  <div class="contact-details">
                    <span class="contact-label">{{ $t('about.contact.github') }}</span>
                    <a href="https://github.com/Javier-Espana" target="_blank">github.com/Javier-Espana</a>
                  </div>
                </div>
                
                <div class="contact-item">
                  <span class="contact-icon">💼</span>
                  <div class="contact-details">
                    <span class="contact-label">{{ $t('about.contact.linkedin') }}</span>
                    <a href="https://www.linkedin.com/in/javier-eduardo-espa%C3%B1a-pacheco-1a8211325/" target="_blank">linkedin.com/in/javier-eduardo-españa-pacheco</a>
                  </div>
                </div>
              </div>
            </div>
            
            <router-link to="/about" class="btn btn-primary btn-large">
              {{ $t('about.button') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const handleImageError = (e) => {
  e.target.style.display = 'none'
  console.error('Error loading profile image')
}
</script>

<style scoped>
.about-preview {
  background: radial-gradient(circle at center, var(--dark-bg-secondary) 0%, var(--dark-bg) 70%);
  position: relative;
  padding: 6rem 0;
}

.about-preview__content {
  display: flex;
  justify-content: center;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
}

.about-preview__main {
  width: 100%;
}

.about-preview__card {
  background: rgba(15, 15, 45, 0.6);
  backdrop-filter: blur(15px);
  border: 2px solid var(--neon-blue);
  border-radius: 25px;
  padding: 3rem;
  box-shadow: 0 0 60px rgba(0, 247, 255, 0.3);
  transition: all 0.5s var(--transition-smooth);
}

.about-preview__card:hover {
  box-shadow: 0 0 80px rgba(0, 247, 255, 0.5);
  transform: translateY(-5px);
}

/* Profile Header */
.profile-header {
  display: flex;
  gap: 3rem;
  margin-bottom: 3rem;
  align-items: center;
}

.about-preview__photo {
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--neon-pink);
  position: relative;
  box-shadow: 0 0 30px rgba(255, 0, 247, 0.5);
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s var(--transition-smooth);
}

.about-preview__photo img,
.avatar-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s var(--transition-smooth);
}

/* Avatar Placeholder con iniciales */
.avatar-placeholder {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--neon-blue), var(--neon-pink), var(--neon-green));
  background-size: 200% 200%;
  animation: gradientRotate 6s ease infinite;
}

@keyframes gradientRotate {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.initials {
  font-family: var(--font-title);
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.8),
               0 0 60px rgba(0, 247, 255, 0.6);
  z-index: 2;
  letter-spacing: 3px;
}

.avatar-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(0, 247, 255, 0.4), transparent);
  filter: blur(30px);
  animation: pulse 3s ease-in-out infinite;
  z-index: 1;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.about-preview__card:hover .about-preview__photo img,
.about-preview__card:hover .avatar-placeholder {
  transform: scale(1.15);
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 30%, rgba(0, 247, 255, 0.3) 50%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s var(--transition-smooth);
}

.about-preview__card:hover .photo-overlay {
  opacity: 1;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}

.profile-header-info {
  flex: 1;
}

.profile-name {
  font-family: var(--font-title);
  font-size: 2.5rem;
  color: var(--neon-blue);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px var(--neon-blue);
}

.profile-title {
  font-size: 1.2rem;
  color: var(--neon-pink);
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.profile-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.badge {
  padding: 0.6rem 1.2rem;
  background: rgba(0, 247, 255, 0.1);
  border: 1px solid var(--neon-blue);
  border-radius: 20px;
  font-size: 0.95rem;
  color: var(--neon-blue);
  white-space: nowrap;
  transition: all 0.3s var(--transition-smooth);
}

.badge:hover {
  background: rgba(0, 247, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 247, 255, 0.3);
}

/* About Description */
.about-description {
  margin-bottom: 2.5rem;
}

.about-description p {
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
  text-align: justify;
}

.about-description strong {
  color: var(--neon-green);
  font-weight: 600;
}

/* Contact Section */
.contact-section {
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: rgba(0, 247, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(0, 247, 255, 0.2);
}

.contact-section h4 {
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: var(--neon-pink);
  margin-bottom: 1.5rem;
}

.contact-grid {
  display: grid;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background: rgba(15, 15, 45, 0.5);
  border-radius: 12px;
  border-left: 3px solid var(--neon-blue);
  transition: all 0.3s var(--transition-smooth);
}

.contact-item:hover {
  background: rgba(0, 247, 255, 0.1);
  transform: translateX(5px);
  box-shadow: 0 5px 20px rgba(0, 247, 255, 0.2);
}

.contact-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.contact-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.contact-details a {
  color: var(--neon-blue);
  text-decoration: none;
  font-size: 1.05rem;
  transition: color 0.3s var(--transition-smooth);
}

.contact-details a:hover {
  color: var(--neon-pink);
}

.btn-large {
  width: 100%;
  padding: 1.2rem 2rem;
  font-size: 1.1rem;
  margin-top: 1rem;
}

/* Responsive */
@media (max-width: 1200px) {
  .about-preview__content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .about-preview {
    padding: 4rem 0;
  }
  
  .about-preview__card {
    padding: 2rem;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .about-preview__photo {
    width: 180px;
    height: 180px;
  }
  
  .profile-name {
    font-size: 2rem;
  }
  
  .profile-title {
    font-size: 1rem;
  }
  
  .profile-badges {
    justify-content: center;
  }
  
  .about-description p {
    text-align: left;
    font-size: 1rem;
  }
  
  .contact-grid {
    gap: 1rem;
  }
  
  .contact-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
}
</style>
