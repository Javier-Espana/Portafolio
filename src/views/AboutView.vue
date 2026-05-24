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
                <img src="/assets/images/Profile-Picture.jpg" :alt="$t('about.name')" class="profile-photo-large" />
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
              <h3 class="timeline-title">{{ exp.title }}</h3>
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
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
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
const timelineLineRef = ref(null)

onMounted(() => {
  nextTick(() => {
    // 1. Hero Animations
    if (heroRef.value) {
      gsap.fromTo(heroRef.value.querySelectorAll('.gsap-reveal'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: heroRef.value, start: "top 80%" }
        }
      )
      
      // Floating animation for the photo
      gsap.to('.photo-border', {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    }

    // 2. Timeline Animations
    if (expRef.value) {
      gsap.fromTo(expRef.value.querySelectorAll('.gsap-reveal'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: expRef.value, start: "top 80%" }
        }
      )

      // Animate line drawing
      gsap.fromTo(timelineLineRef.value,
        { scaleY: 0 },
        { scaleY: 1, transformOrigin: "top center", duration: 1.5, ease: "power3.inOut",
          scrollTrigger: { trigger: ".timeline", start: "top 70%" }
        }
      )

      // Animate timeline items
      gsap.fromTo('.gsap-timeline-item',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.3, ease: "back.out(1.2)",
          scrollTrigger: { trigger: ".timeline", start: "top 60%" }
        }
      )
    }

    // 3. Education / Certifications Animations
    if (eduRef.value) {
      gsap.fromTo(eduRef.value.querySelectorAll('.gsap-reveal'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.2,
          scrollTrigger: { trigger: eduRef.value, start: "top 80%" }
        }
      )

      gsap.fromTo('.gsap-edu-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: ".gsap-edu-card", start: "top 85%" }
        }
      )

      gsap.fromTo('.gsap-cert-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: ".gsap-cert-card", start: "top 85%" }
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
  grid-template-columns: 350px 1fr;
  gap: 4rem;
  align-items: start;
}

/* ---- Photo ---- */
.about-photo-large {
  position: sticky;
  top: 100px;
}

.photo-border {
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-xl);
  padding: 3px;
  background: linear-gradient(135deg, var(--accent-violet), var(--accent-cyan));
  box-shadow: var(--glow-violet);
  overflow: hidden;
}

.profile-photo-large {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: calc(var(--radius-xl) - 3px);
  display: block;
}

/* ---- Bio ---- */
.about-text h2 {
  font-size: var(--text-3xl);
  font-weight: 800;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
}

.bio-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.bio-paragraphs p {
  line-height: 1.8;
  color: var(--text-secondary);
  font-size: var(--text-base);
  text-align: justify;
}

/* ---- Timeline ---- */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline-line {
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--accent-violet), var(--accent-cyan));
  opacity: 0.5;
}

.timeline-item {
  position: relative;
  padding-left: 70px;
  margin-bottom: 3rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: 17px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bg-primary);
  border: 3px solid var(--accent-cyan);
  box-shadow: 0 0 10px var(--accent-cyan);
  z-index: 2;
  transition: transform 0.3s ease, background 0.3s ease;
}

.timeline-item:hover .timeline-marker {
  transform: scale(1.3);
  background: var(--accent-cyan);
}

.timeline-content {
  padding: 2rem;
  transition: transform 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out);
}

.timeline-item:hover .timeline-content {
  transform: translateX(10px);
  border-color: var(--accent-violet);
}

.timeline-title {
  font-size: var(--text-xl);
  color: var(--text-white);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.timeline-company {
  font-size: var(--text-sm);
  color: var(--accent-violet);
  font-weight: 600;
  margin-bottom: 1rem;
}

.timeline-desc {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: var(--text-sm);
}

.timeline-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* ---- Education & Certifications ---- */
.two-col-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.education-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.education-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.3s var(--ease-out), border-color 0.3s var(--ease-out);
}

.education-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-cyan);
}

.education-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-violet-10);
  color: var(--accent-violet);
  border-radius: var(--radius-md);
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease;
}

.education-card:hover .education-icon {
  transform: scale(1.1) rotate(-10deg);
}

.education-card h3 {
  font-size: var(--text-lg);
  color: var(--text-white);
  font-weight: 600;
}

.education-card h4 {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.education-date {
  font-size: var(--text-xs);
  color: var(--text-muted);
  font-family: var(--font-mono);
  margin-top: 0.5rem;
}

/* ---- Responsive ---- */
@media (max-width: 1024px) {
  .about-intro {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .about-photo-large {
    position: static;
    max-width: 300px;
    margin: 0 auto;
  }

  .two-col-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
