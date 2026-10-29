<template>
  <div class="about-view page-transition">
    <!-- Hero Section -->
    <section class="about-hero section" ref="heroRef">
      <div class="container">
        <h1 class="section-title gsap-reveal">{{ $t('about.title') }}</h1>
        <p class="section-subtitle gsap-reveal">{{ $t('about.role') }}</p>

        <div class="about-content">
          <div class="about-intro">
            <!-- Photo -->
            <div class="about-photo-large gsap-reveal">
              <div class="photo-border">
                <img src="/images/Profile-Picture.jpg" :alt="$t('about.name')" class="profile-photo-large" />
              </div>
            </div>

            <!-- Bio -->
            <div class="about-text">
              <h2 class="text-gradient-violet gsap-reveal">{{ $t('hero.greeting') }}, {{ $t('hero.name') }}</h2>
              <div class="bio-paragraphs">
                <p v-for="(paragraph, index) in $tm('about.bio')" :key="index" class="gsap-reveal">
                  {{ paragraph }}
                </p>
              </div>

              <!-- Quick details -->
              <div class="quick-details gsap-reveal">
                <div class="detail-pill">
                  <span class="detail-label">🎓 {{ $t('about.university') }}</span>
                </div>
                <div class="detail-pill">
                  <span class="detail-label">📍 {{ $t('about.contact.location') }}</span>
                </div>
                <div class="detail-pill highlight">
                  <span class="detail-label">🏆 Bicampeón Hackatón BAM 2026 (2x 1.er Lugar)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Timeline -->
    <section class="experience section" ref="expRef">
      <div class="container">
        <h2 class="section-title gsap-reveal">{{ $t('experience.title') }}</h2>
        <div class="timeline">
          <div class="timeline-line" ref="timelineLineRef"></div>
          <div
            v-for="(exp, index) in $tm('experience.items')"
            :key="index"
            class="timeline-item gsap-timeline-item"
          >
            <div class="timeline-marker"></div>
            <div class="timeline-content card">
              <div class="timeline-header">
                <h3 class="timeline-title">{{ exp.title }}</h3>
                <span v-if="exp.period" class="timeline-period">{{ exp.period }}</span>
              </div>
              <h4 class="timeline-company">{{ exp.company }}</h4>
              <p class="timeline-desc">{{ exp.description }}</p>
              <div class="timeline-tech">
                <span v-for="tech in exp.technologies" :key="tech" class="badge badge-violet">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Achievements & Awards -->
    <section class="achievements section" ref="achieveRef">
      <div class="container">
        <h2 class="section-title gsap-reveal">{{ $t('achievements.title') }}</h2>
        <div class="achievements-grid">
          <div
            v-for="(ach, index) in $tm('achievements.items')"
            :key="index"
            class="achievement-card card gsap-ach-card"
          >
            <div class="achievement-icon">🏆</div>
            <div class="achievement-body">
              <div class="achievement-header">
                <h3>{{ ach.title }}</h3>
                <span class="achievement-year">{{ ach.year }}</span>
              </div>
              <h4>{{ ach.institution }}</h4>
              <p>{{ ach.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education & Certifications -->
    <section class="education section" ref="eduRef">
      <div class="container">
        <div class="two-col-grid">
          <!-- Education -->
          <div>
            <h2 class="section-title gsap-reveal">{{ $t('education.title') }}</h2>
            <div class="education-grid">
              <div
                v-for="(edu, index) in $tm('education.items')"
                :key="index"
                class="education-card card gsap-edu-card"
              >
                <div class="education-icon">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3>{{ edu.degree }}</h3>
                <h4>{{ edu.institution }}</h4>
                <p class="education-date">{{ edu.date }}</p>
              </div>
            </div>
          </div>

          <!-- Certifications -->
          <div>
            <h2 class="section-title gsap-reveal">{{ $t('certifications.title') }}</h2>
            <div class="education-grid">
              <div
                v-for="(cert, index) in $tm('certifications.items')"
                :key="index"
                class="education-card card gsap-cert-card"
              >
                <div class="education-icon">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3>{{ cert.title }}</h3>
                <h4>{{ cert.institution }}</h4>
                <p class="education-date">{{ cert.year }}</p>
                <p v-if="cert.description" class="cert-desc">{{ cert.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref(null)
const expRef = ref(null)
const eduRef = ref(null)
const achieveRef = ref(null)
const timelineLineRef = ref(null)

onMounted(() => {
  nextTick(() => {
    // 1. Hero Animations
    if (heroRef.value) {
      gsap.fromTo(heroRef.value.querySelectorAll('.gsap-reveal'),
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: heroRef.value, start: "top 80%" }
        }
      )
    }

    // 2. Timeline Animations
    if (expRef.value) {
      gsap.fromTo(expRef.value.querySelectorAll('.gsap-reveal'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: expRef.value, start: "top 80%" }
        }
      )

      if (timelineLineRef.value) {
        gsap.fromTo(timelineLineRef.value,
          { scaleY: 0 },
          { scaleY: 1, transformOrigin: "top center", duration: 1.2, ease: "power3.inOut",
            scrollTrigger: { trigger: ".timeline", start: "top 70%" }
          }
        )
      }

      gsap.fromTo('.gsap-timeline-item',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: ".timeline", start: "top 75%" }
        }
      )
    }

    // 3. Achievements Animations
    if (achieveRef.value) {
      gsap.fromTo('.gsap-ach-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: achieveRef.value, start: "top 80%" }
        }
      )
    }

    // 4. Education & Certs Animations
    if (eduRef.value) {
      gsap.fromTo(eduRef.value.querySelectorAll('.gsap-edu-card, .gsap-cert-card'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: eduRef.value, start: "top 80%" }
        }
      )
    }
  })
})
</script>

<style scoped>
.about-view {
  padding-top: 5rem;
}

.about-intro {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 4rem;
  align-items: center;
  margin-top: 2rem;
}

.about-photo-large {
  display: flex;
  justify-content: center;
}

.photo-border {
  width: 260px;
  height: 260px;
  border-radius: var(--radius-xl);
  padding: 8px;
  background: linear-gradient(135deg, var(--accent-violet), var(--accent-cyan));
  box-shadow: 0 10px 30px rgba(108, 99, 255, 0.3);
}

.profile-photo-large {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: calc(var(--radius-xl) - 6px);
}

.about-text h2 {
  font-size: var(--text-3xl);
  margin-bottom: 1.5rem;
}

.bio-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bio-paragraphs p {
  color: var(--text-secondary);
  font-size: var(--text-base);
  line-height: 1.7;
}

.quick-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.detail-pill {
  padding: 0.4rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  color: var(--text-primary);
}

.detail-pill.highlight {
  border-color: #ffb703;
  color: #ffb703;
  background: rgba(255, 183, 3, 0.08);
}

/* Timeline */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 3rem auto 0;
  padding-left: 2.5rem;
}

.timeline-line {
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent-violet), var(--accent-cyan));
}

.timeline-item {
  position: relative;
  margin-bottom: 2.5rem;
}

.timeline-marker {
  position: absolute;
  left: -2.5rem;
  top: 1.5rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--bg-primary);
  border: 3px solid var(--accent-cyan);
  box-shadow: 0 0 10px var(--accent-cyan);
}

.timeline-content {
  padding: 1.75rem;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.timeline-title {
  font-size: var(--text-lg);
  color: var(--text-white);
}

.timeline-period {
  font-size: var(--text-xs);
  color: var(--accent-cyan);
  font-weight: 500;
}

.timeline-company {
  font-size: var(--text-sm);
  color: var(--accent-violet);
  margin-bottom: 0.75rem;
}

.timeline-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.timeline-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* Achievements */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.achievement-card {
  padding: 1.75rem;
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  border-left: 3px solid #ffb703;
}

.achievement-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.achievement-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.achievement-header h3 {
  font-size: var(--text-base);
  color: var(--text-white);
  font-weight: 600;
}

.achievement-year {
  font-size: var(--text-xs);
  color: #ffb703;
  font-weight: 600;
}

.achievement-body h4 {
  font-size: var(--text-xs);
  color: var(--accent-cyan);
  margin-bottom: 0.5rem;
}

.achievement-body p {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Education & Certifications */
.two-col-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;
}

.education-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.education-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.education-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--accent-violet-10);
  color: var(--accent-violet);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.education-card h3 {
  font-size: var(--text-base);
  color: var(--text-white);
}

.education-card h4 {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.education-date {
  font-size: var(--text-xs);
  color: var(--accent-cyan);
}

.cert-desc {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

@media (max-width: 900px) {
  .about-intro {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  .about-photo-large {
    margin: 0 auto;
  }
  .quick-details {
    justify-content: center;
  }
  .two-col-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 640px) {
  .about-view {
    padding-top: 3.5rem;
  }
  .about-text h2 {
    font-size: clamp(1.5rem, 6vw, 2rem);
  }
  .photo-border {
    width: 200px;
    height: 200px;
  }
  .achievements-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .achievement-card {
    padding: 1.25rem 1rem;
    gap: 0.85rem;
  }
  .timeline {
    padding-left: 1.5rem;
  }
  .timeline-marker {
    left: -1.5rem;
    width: 14px;
    height: 14px;
    top: 1.2rem;
  }
  .timeline-content {
    padding: 1.25rem 1rem;
  }
  .timeline-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  .education-card {
    padding: 1.25rem 1rem;
  }
}
</style>
