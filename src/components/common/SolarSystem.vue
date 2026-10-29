<template>
  <div class="solar-system" role="region" :aria-label="$t('about.solar') || 'Skills Solar System'">
    <div class="sun">
      <div class="sun-core"></div>
    </div>
    
    <div 
      v-for="(skill, index) in planets" 
      :key="skill.name"
      class="orbit"
      :style="orbitStyle(skill)"
    >
      <div 
        class="planet"
        :style="planetStyle(skill, index)"
        @mouseenter="showTooltip(skill, $event)"
        @mouseleave="hideTooltip"
        tabindex="0"
        :aria-label="`${skill.name} - ${skill.rating}/5`"
        @focus="showTooltip(skill, $event)"
        @blur="hideTooltip"
      >
        <div class="planet-glow"></div>
      </div>
    </div>
    
    <transition name="tooltip-fade">
      <div 
        v-if="activeTooltip"
        class="tooltip"
        :style="tooltipStyle"
      >
        <strong>{{ activeTooltip.name }}</strong>
        <div class="tooltip-stars">
          <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= activeTooltip.rating }">
            ★
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const planets = [
  { name: 'Python', color: '#3776ab', size: 55, orbit: 80, speed: 10, rating: 5 },
  { name: 'Go', color: '#00add8', size: 48, orbit: 110, speed: 9, rating: 5 },
  { name: 'Rust', color: '#ce422b', size: 46, orbit: 140, speed: 11, rating: 4 },
  { name: 'JavaScript', color: '#f7df1e', size: 52, orbit: 170, speed: 8, rating: 5 },
  { name: 'C++', color: '#00599c', size: 50, orbit: 200, speed: 11, rating: 5 },
  { name: 'C', color: '#a8b9cc', size: 46, orbit: 230, speed: 7, rating: 4 },
  { name: 'PostgreSQL / SQL', color: '#336791', size: 48, orbit: 260, speed: 10, rating: 5 },
  { name: 'Java', color: '#007396', size: 48, orbit: 290, speed: 12, rating: 4 },
  { name: 'Kotlin', color: '#7f52ff', size: 46, orbit: 320, speed: 9, rating: 4 },
  { name: 'ARM Assembler', color: '#0091bd', size: 42, orbit: 350, speed: 13, rating: 4 },
  { name: 'R', color: '#276dc3', size: 42, orbit: 380, speed: 12, rating: 4 }
]

const activeTooltip = ref(null)
const tooltipStyle = ref({})

const orbitStyle = (skill) => ({
  width: `${skill.orbit * 2}px`,
  height: `${skill.orbit * 2}px`,
  animationDuration: `${15 + skill.orbit / 10}s`
})

const planetStyle = (skill, index) => ({
  width: `${18 + skill.rating * 3}px`,
  height: `${18 + skill.rating * 3}px`,
  background: `radial-gradient(circle at 30% 30%, ${skill.color}, ${skill.color}dd)`,
  boxShadow: `0 0 15px ${skill.color}, inset 0 0 8px ${skill.color}88`,
  animationDelay: `${index * 0.4}s`
})

const showTooltip = (skill, event) => {
  activeTooltip.value = skill
  updateTooltipPosition(event)
}

const hideTooltip = () => {
  activeTooltip.value = null
}

const updateTooltipPosition = (event) => {
  const rect = event.target.getBoundingClientRect()
  tooltipStyle.value = {
    left: `${rect.left + rect.width / 2}px`,
    top: `${rect.top - 12}px`
  }
}
</script>

<style scoped>
.solar-system {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sun {
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ffff00, #ffcc00 40%, #ff9900 70%, #ff6600);
  box-shadow: 
    0 0 40px #ff9900,
    0 0 80px rgba(255, 102, 0, 0.4),
    inset 0 0 30px #ffaa00;
  z-index: 10;
  animation: sun-pulse 4s ease-in-out infinite;
}

.sun-core {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ffffaa, transparent 60%);
  animation: sun-rotate 20s linear infinite;
}

@keyframes sun-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 40px #ff9900, 0 0 80px rgba(255, 102, 0, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 60px #ff9900, 0 0 100px rgba(255, 102, 0, 0.6);
  }
}

@keyframes sun-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.orbit {
  position: absolute;
  border: 1px solid rgba(0, 217, 255, 0.18);
  border-radius: 50%;
  animation: orbit-rotate linear infinite;
  pointer-events: none;
}

@keyframes orbit-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.planet {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  z-index: 5;
  animation: planet-float 3s ease-in-out infinite;
}

.planet:hover,
.planet:focus-visible {
  transform: translate(-50%, -50%) scale(1.35);
  z-index: 20;
  outline: 2px solid var(--accent-cyan);
  outline-offset: 4px;
}

.planet-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), transparent 50%);
  animation: planet-glow 2s ease-in-out infinite alternate;
}

@keyframes planet-float {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-4px);
  }
}

@keyframes planet-glow {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}

.tooltip {
  position: fixed;
  background: rgba(8, 11, 20, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid var(--accent-cyan);
  border-radius: 8px;
  padding: 0.5rem 0.85rem;
  transform: translate(-50%, -100%);
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.tooltip strong {
  display: block;
  color: var(--accent-cyan);
  font-family: var(--font-title, sans-serif);
  font-size: 0.85rem;
  margin-bottom: 0.2rem;
}

.tooltip-stars {
  display: flex;
  gap: 0.15rem;
}

.tooltip-stars .star {
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.85rem;
}

.tooltip-stars .star.active {
  color: #ffb703;
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .orbit, .sun, .sun-core, .planet, .planet-glow {
    animation: none !important;
  }
}

@media (max-width: 768px) {
  .solar-system {
    width: 320px;
    height: 320px;
  }
  
  .sun {
    width: 55px;
    height: 55px;
  }
}

@media (max-width: 480px) {
  .solar-system {
    width: 260px;
    height: 260px;
  }
  
  .sun {
    width: 45px;
    height: 45px;
  }
}
</style>
