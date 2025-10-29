<template>
  <div class="home">
    <HeroSection />
    <AboutPreview />
    <TechStack />
    <FeaturedProjects />
    <CallToAction />
  </div>
</template>

<script setup>
import HeroSection from '@/components/home/HeroSection.vue'
import AboutPreview from '@/components/home/AboutPreview.vue'
import TechStack from '@/components/home/TechStack.vue'
import FeaturedProjects from '@/components/home/FeaturedProjects.vue'
import CallToAction from '@/components/home/CallToAction.vue'
</script>
