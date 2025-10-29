<template>
  <div class="about-view">
    <section class="about-hero section">
      <div class="container">
        <h1 class="section-title">{{ $t('about.title') }}</h1>
        
        <div class="about-content">
          <div class="about-intro">
            <div class="about-photo-large">
              <img src="/assets/images/Profile-Picture.jpg" alt="Javier España" class="profile-photo-large" />
            </div>
            
            <div class="about-text">
              <h2>{{ $t('hero.greeting') }}, {{ $t('hero.name') }}</h2>
              <h3>{{ $t('about.role') }}</h3>
              
              <p v-for="(paragraph, index) in $tm('about.bio')" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="experience section">
      <div class="container">
        <h2 class="section-title">{{ $t('experience.title') }}</h2>
        
        <div class="timeline">
          <div 
            v-for="(exp, index) in $tm('experience.items')" 
            :key="index"
            class="timeline-item"
          >
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h3>{{ exp.title }}</h3>
              <h4>{{ exp.company }}</h4>
              <p>{{ exp.description }}</p>
              <div class="timeline-tech">
                <span v-for="tech in exp.technologies" :key="tech">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="education section">
      <div class="container">
        <h2 class="section-title">{{ $t('education.title') }}</h2>
        
        <div class="education-grid">
          <div 
            v-for="(edu, index) in $tm('education.items')" 
            :key="index"
            class="education-card"
          >
            <div class="education-icon">🎓</div>
            <h3>{{ edu.degree }}</h3>
            <h4>{{ edu.institution }}</h4>
            <p class="education-date">{{ edu.date }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No necesitamos datos hardcodeados, todo viene de i18n
</script>

<style scoped>
.about-view {
  padding-top: 5rem;
}

.about-content {
  max-width: 1200px;
  margin: 0 auto;
}

.about-intro {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: start;
}

.about-photo-large {
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  border: 3px solid var(--neon-blue);
  box-shadow: 0 0 40px rgba(0, 247, 255, 0.3);
  position: sticky;
  top: 100px;
}

.about-photo-large img,
.avatar-placeholder-large {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-photo-large {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Avatar grande con iniciales */
.avatar-placeholder-large {
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

.initials-large {
  font-family: var(--font-title);
  font-size: 3rem;
  font-weight: 900;
  color: #fff;
  text-shadow: 0 0 40px rgba(0, 0, 0, 0.8),
               0 0 80px rgba(0, 247, 255, 0.6);
  z-index: 2;
  letter-spacing: 5px;
  text-align: center;
  line-height: 1.2;
}

.avatar-glow-large {
  position: absolute;
  inset: -30px;
  background: radial-gradient(circle, rgba(0, 247, 255, 0.5), transparent);
  filter: blur(40px);
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

.about-text h2 {
  font-family: var(--font-title);
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.highlight {
  color: var(--neon-blue);
  text-shadow: 0 0 20px var(--neon-blue);
}

.about-text h3 {
  font-size: 1.5rem;
  color: var(--neon-pink);
  margin-bottom: 2rem;
}

.about-text p {
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
}

/* Timeline */
.timeline {
  position: relative;
  padding: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--neon-blue), var(--neon-pink));
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin-bottom: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.timeline-item:nth-child(even) .timeline-content {
  grid-column: 1;
  text-align: right;
}

.timeline-item:nth-child(odd) .timeline-content {
  grid-column: 2;
}

.timeline-marker {
  position: absolute;
  left: 50%;
  top: 0;
  width: 20px;
  height: 20px;
  background: var(--neon-blue);
  border: 3px solid var(--dark-bg);
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 20px var(--neon-blue);
  z-index: 2;
}

.timeline-content {
  background: rgba(15, 15, 45, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid var(--neon-blue);
  border-radius: 15px;
  padding: 2rem;
  transition: all 0.3s var(--transition-smooth);
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 40px rgba(0, 247, 255, 0.3);
}

.timeline-date {
  color: var(--neon-pink);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.timeline-content h3 {
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: var(--neon-blue);
  margin-bottom: 0.5rem;
}

.timeline-content h4 {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
}

.timeline-content p {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
}

.timeline-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.timeline-item:nth-child(even) .timeline-tech {
  justify-content: flex-end;
}

.timeline-tech span {
  padding: 0.25rem 0.75rem;
  background: rgba(0, 247, 255, 0.1);
  border: 1px solid var(--neon-blue);
  border-radius: 12px;
  font-size: 0.85rem;
  color: var(--neon-blue);
}

/* Education */
.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.education-card {
  background: rgba(15, 15, 45, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid var(--neon-green);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s var(--transition-smooth);
}

.education-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 40px rgba(0, 255, 127, 0.3);
}

.education-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.education-card h3 {
  font-family: var(--font-title);
  font-size: 1.3rem;
  color: var(--neon-green);
  margin-bottom: 0.5rem;
}

.education-card h4 {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.education-date {
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 1024px) {
  .about-intro {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .about-photo-large {
    max-width: 300px;
    margin: 0 auto;
    position: static;
  }
  
  .timeline::before {
    left: 20px;
  }
  
  .timeline-item {
    grid-template-columns: 1fr;
    gap: 0;
    padding-left: 60px;
  }
  
  .timeline-item:nth-child(even) .timeline-content,
  .timeline-item:nth-child(odd) .timeline-content {
    grid-column: 1;
    text-align: left;
  }
  
  .timeline-marker {
    left: 20px;
  }
  
  .timeline-item:nth-child(even) .timeline-tech {
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .education-grid {
    grid-template-columns: 1fr;
  }
}
</style>
