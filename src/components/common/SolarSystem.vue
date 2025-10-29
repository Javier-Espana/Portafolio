<template>
  <div class="solar-system">
    <div class="sun">
      <div class="sun-core"></div>
    </div>
    
    <div 
      v-for="(skill, index) in skills" 
      :key="skill.name"
      class="orbit"
      :style="orbitStyle(skill)"
    >
      <div 
        class="planet"
        :style="planetStyle(skill, index)"
        @mouseenter="showTooltip(skill, $event)"
        @mouseleave="hideTooltip"
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
          <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= activeTooltip.level }">
            ★
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const planets = [
  { name: 'Python', color: '#3776ab', size: 55, orbit: 100, speed: 10, rating: 5 },
  { name: 'JavaScript', color: '#f7df1e', size: 54, orbit: 140, speed: 8, rating: 5 },
  { name: 'Java', color: '#007396', size: 52, orbit: 180, speed: 12, rating: 5 },
  { name: 'Kotlin', color: '#7f52ff', size: 48, orbit: 220, speed: 9, rating: 4 },
  { name: 'C++', color: '#00599c', size: 50, orbit: 260, speed: 11, rating: 5 },
  { name: 'C', color: '#a8b9cc', size: 46, orbit: 300, speed: 7, rating: 4 },
  { name: 'R', color: '#276dc3', size: 44, orbit: 340, speed: 13, rating: 4 },
  { name: 'PostgreSQL', color: '#336791', size: 48, orbit: 380, speed: 10, rating: 5 },
  { name: 'Go', color: '#00add8', size: 46, orbit: 420, speed: 9, rating: 4 },
  { name: 'Rust', color: '#ce422b', size: 45, orbit: 460, speed: 11, rating: 4 },
  { name: 'ARM Assembly', color: '#0091bd', size: 42, orbit: 500, speed: 12, rating: 3 }
]

const activeTooltip = ref(null)
const tooltipStyle = ref({})

const orbitStyle = (skill) => ({
  width: `${skill.orbitRadius * 2}px`,
  height: `${skill.orbitRadius * 2}px`,
  animationDuration: `${15 + skill.orbitRadius / 10}s`
})

const planetStyle = (skill, index) => ({
  width: `${20 + skill.level * 4}px`,
  height: `${20 + skill.level * 4}px`,
  background: `radial-gradient(circle at 30% 30%, ${skill.color}, ${skill.color}dd)`,
  boxShadow: `0 0 20px ${skill.color}, inset 0 0 10px ${skill.color}88`,
  animationDelay: `${index * 0.5}s`
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
    top: `${rect.top - 10}px`
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
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ffff00, #ffcc00 40%, #ff9900 70%, #ff6600);
  box-shadow: 
    0 0 60px #ff9900,
    0 0 100px #ff6600,
    inset 0 0 40px #ffaa00;
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
    box-shadow: 
      0 0 60px #ff9900,
      0 0 100px #ff6600,
      inset 0 0 40px #ffaa00;
  }
  50% {
    transform: scale(1.05);
    box-shadow: 
      0 0 80px #ff9900,
      0 0 120px #ff6600,
      inset 0 0 50px #ffaa00;
  }
}

@keyframes sun-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.orbit {
  position: absolute;
  border: 1px solid rgba(0, 247, 255, 0.2);
  border-radius: 50%;
  animation: orbit-rotate linear infinite;
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
  transition: all 0.3s var(--transition-smooth);
  z-index: 5;
  animation: planet-float 3s ease-in-out infinite;
}

.planet:hover {
  transform: translate(-50%, -50%) scale(1.3);
  z-index: 20;
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
    transform: translate(-50%, -50%) translateY(-5px);
  }
}

@keyframes planet-glow {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}

.tooltip {
  position: fixed;
  background: rgba(10, 10, 26, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid var(--neon-green);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  transform: translate(-50%, -100%);
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
}

.tooltip strong {
  display: block;
  color: var(--neon-green);
  font-family: var(--font-title);
  margin-bottom: 0.25rem;
}

.tooltip-stars {
  display: flex;
  gap: 0.2rem;
}

.tooltip-stars .star {
  color: rgba(255, 255, 255, 0.3);
  font-size: 1rem;
}

.tooltip-stars .star.active {
  color: var(--neon-orange);
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .solar-system {
    width: 300px;
    height: 300px;
  }
  
  .sun {
    width: 70px;
    height: 70px;
  }
}

@media (max-width: 480px) {
  .solar-system {
    width: 250px;
    height: 250px;
  }
  
  .sun {
    width: 50px;
    height: 50px;
  }
}
</style>
