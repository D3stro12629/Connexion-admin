<template>
  <div class="luxury-space" @mousemove="handleParallax">
    <!-- Background Ambient Layers -->
    <div class="ambient-glow"></div>
    <div class="grain-overlay"></div>
    
    <div class="main-stage">
      <!-- The Visual Centerpiece -->
      <div class="visual-anchor" :style="parallaxStyle">
        <div class="orbital-ring ring-1"></div>
        <div class="orbital-ring ring-2"></div>
        
        <div class="hero-number">
          <span class="digit">4</span>
          <div class="void-circle">
            <div class="void-inner"></div>
          </div>
          <span class="digit">4</span>
        </div>
      </div>

      <!-- The Textual Narrative -->
      <div class="content-narrative">
        <div class="eyebrow">
          <span class="line"></span>
          <span class="label">Exception 404</span>
          <span class="line"></span>
        </div>
        
        <h1 class="elegant-title">
          The page has <br />
          <span class="serif-italic">drifted</span> away.
        </h1>
        
        <p class="description">
          This destination has been moved or archived in our private collection. 
          Return to the dashboard to continue your journey.
        </p>

        <!-- Navigation Orchestrator -->
        <div class="nav-cluster">
          <RouterLink to="/" class="btn-luxe btn-primary">
            <span class="btn-text">Return to Dashboard</span>
            <div class="btn-shine"></div>
          </RouterLink>
          
          <button @click="$router.go(-1)" class="btn-luxe btn-outline">
            <span>Previous Page</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Page Footer (Technical Meta) -->
    <footer class="tech-meta">
      <div class="meta-item">REF: LH-00404</div>
      <div class="meta-item">LOC: {{ currentUrl }}</div>
      <div class="meta-item">EST: 2024</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

const mouseX = ref(0);
const mouseY = ref(0);
const currentUrl = window.location.pathname;

const handleParallax = (e) => {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 30;
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 30;
};

const parallaxStyle = computed(() => ({
  transform: `translate3d(${mouseX.value}px, ${mouseY.value}px, 0)`
}));
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,500&family=Plus+Jakarta+Sans:wght@300;500;700&display=swap');

.luxury-space {
  --ivory: #f4f4f1;
  --midnight: #0a0a0c;
  --gold-mute: #c5a47e;
  --accent: #6366f1;
  
  height: 100vh;
  width: 100vw;
  background-color: var(--midnight);
  color: var(--ivory);
  font-family: 'Plus Jakarta Sans', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

/* Luxury Background Textures */
.ambient-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  height: 60vw;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
  z-index: 0;
}

.grain-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}

/* Center Stage */
.main-stage {
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.visual-anchor {
  position: relative;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s cubic-bezier(0.1, 0, 0.2, 1);
}

.hero-number {
  font-size: 180px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1;
  letter-spacing: -5px;
}

.void-circle {
  width: 140px;
  height: 140px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: rgba(255, 255, 255, 0.02);
}

.void-inner {
  width: 20px;
  height: 20px;
  background: var(--ivory);
  border-radius: 50%;
  box-shadow: 0 0 30px var(--ivory);
  animation: pulse 4s infinite alternate;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.5); opacity: 1; }
}

.orbital-ring {
  position: absolute;
  border: 0.5px solid rgba(255,255,255,0.1);
  border-radius: 50%;
}
.ring-1 { width: 300px; height: 300px; animation: rotate 20s linear infinite; border-style: dashed; }
.ring-2 { width: 450px; height: 450px; animation: rotate 30s linear reverse infinite; }

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Content Narrative */
.content-narrative {
  text-align: center;
  max-width: 500px;
}

.eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 24px;
}

.eyebrow .line { width: 40px; height: 1px; background: rgba(255,255,255,0.1); }
.eyebrow .label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 4px; color: var(--gold-mute); }

.elegant-title {
  font-size: 56px;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -1px;
}

.serif-italic {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 300;
}

.description {
  font-size: 16px;
  line-height: 1.6;
  color: #999;
  margin-bottom: 40px;
}

/* Buttons */
.nav-cluster {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.btn-luxe {
  padding: 18px 36px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.2, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  text-decoration: none;
}

.btn-primary {
  background: var(--ivory);
  color: var(--midnight);
  border: none;
}

.btn-primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 40px rgba(255,255,255,0.15);
}

.btn-outline {
  background: transparent;
  color: var(--ivory);
  border: 1px solid rgba(255,255,255,0.1);
}

.btn-outline:hover {
  background: var(--ivory);
  color: var(--midnight);
}

/* Meta Footer */
.tech-meta {
  position: absolute;
  bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
}

.meta-item {
  font-size: 10px;
  font-weight: 500;
  color: rgba(255,255,255,0.3);
  letter-spacing: 2px;
}

@media (max-width: 768px) {
  .hero-number { font-size: 100px; }
  .void-circle { width: 80px; height: 80px; }
  .elegant-title { font-size: 36px; }
  .nav-cluster { flex-direction: column; width: 100%; }
  .tech-meta { display: none; }
}
</style>