<template>
  <DashboardLayout>
    <div class="premium-support-page">
      <div class="content-shell">
        
        <!-- Top Meta Bar -->
        <div class="meta-header">          
          <div class="status-chip">
            <div class="pulse-dot"></div>
            <span class="status-text">កំពុងផ្សាយផ្ទាល់</span>
            <span class="divider"></span>
            <a href="#" class="status-link">មើលការងារកំពុងត្រូវប៉ាន់</a>
          </div>
        </div>

        <!-- Hero Section -->
        <header class="hero-section">
          <div class="hero-text">
            <h1 class="main-title">តើយើងអាចជួយអ្វីខ្លះដល់ការងារអ្នក?</h1>
            <p class="hero-subtitle">ស្វែងរកការណែនាំពីរបៀបដាក់ពាក្យធ្វើការ របៀបរៀបចំប្រវត្តិរូប (Profile) និងការរាប់អានមិត្តភក្តិក្នុងសហគមន៍។</p>
          </div>
          
          <div class="search-command-group">
            <div class="search-bar" :class="{ 'is-active': isSearchFocused }">
              <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input 
                ref="searchInput"
                v-model="searchQuery" 
                type="text" 
                placeholder="សាកស្វែងរក 'របៀបសរសេរ CV', 'ត្រៀមសម្ភាសន៍' ឬ 'ណែនាំការងារ'..." 
                @focus="isSearchFocused = true"
                @blur="isSearchFocused = false"
              />
              <div class="search-hint">
                <kbd>⌘</kbd><kbd>K</kbd>
              </div>
            </div>
            <div class="quick-tags">
              <span>កំពុងល្បី:</span>
              <button @click="searchQuery = 'ពិនិត្យ CV'">ពិនិត្យ CV</button>
              <button @click="searchQuery = 'ការងារធ្វើនៅផ្ទះ'">ការងារធ្វើនៅផ្ទះ</button>
              <button @click="searchQuery = 'កម្រងស្នាដៃ (Portfolio)'">កម្រងស្នាដៃ (Portfolio)</button>
            </div>
          </div>
        </header>

        <!-- Bento Grid Topics: Career Focused -->
        <section class="topic-grid">
          <div v-for="topic in mainTopics" :key="topic.title" class="topic-card">
            <div class="topic-icon-box" :style="{ background: topic.bg, color: topic.color }">
              <div v-html="topic.icon"></div>
            </div>
            <div class="topic-info">
              <h3>{{ topic.title }}</h3>
              <p>{{ topic.desc }}</p>
              <div class="topic-footer">
                <span class="article-count">មាន {{ topic.count }} មេរៀនណែនាំ</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        </section>

        <div class="layout-body">
          <!-- Left Column: Career FAQs -->
          <main class="main-content">
            <div class="section-header">
              <h2 class="content-label">សំណួរដែលគេសួរញឹកញាប់</h2>
              <a href="#" class="view-all">មើលសំណួរទាំងអស់</a>
            </div>

            <div class="faq-list">
              <div 
                v-for="(faq, i) in filteredFaqs" 
                :key="i" 
                class="faq-row" 
                :class="{ 'expanded': openFaq === i }"
              >
                <button class="faq-toggle" @click="toggleFaq(i)">
                  <span class="faq-q">{{ faq.q }}</span>
                  <div class="faq-icon-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </button>
                <div class="faq-answer">
                  <div class="answer-inner">
                    {{ faq.a }}
                    <div class="answer-actions">
                      <span>តើព័ត៌មាននេះជួយអ្នកបានទេ?</span>
                      <button class="vote-btn">ជួយបានច្រើន</button>
                      <button class="vote-btn">មិនសូវជួយទេ</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <!-- Right Column -->
          <aside class="sidebar-stack">
            <div class="sidebar-card articles">
              <h4 class="sidebar-label">អត្ថបទល្អៗគួរអាន</h4>
              <div class="featured-list">
                <a href="#" v-for="art in featuredArticles" :key="art" class="featured-item">
                  <div class="art-dot"></div>
                  <span>{{ art }}</span>
                </a>
              </div>
            </div>

            <div class="sidebar-card contact">
              <div class="contact-header">
                <h4>ជជែកជាមួយអ្នកជំនាញ</h4>
                <p>ឆ្លើយតបលឿន: តិចជាង 4 ម៉ោង</p>
              </div>
              <div class="contact-methods">
                <a class="method-btn primary text-decoration-none" href="https://t.me/destroholy" target="_blank" rel="noopener noreferrer" aria-label="Open Telegram chat with @destroholy">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                  ផ្ញើ CV ឱ្យជួយពិនិត្យ
                </a>
                <button class="method-btn secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  ជជែកសាកសួរយោបល់
                </button>
              </div>
            </div>

            <div class="community-banner">
              <div class="comm-icon">🤝</div>
              <div class="comm-text">
                <h5>បណ្តាញចែករំលែកការងារ</h5>
                <p>ចូលរួមជាមួយសមាជិកជាង 5,000 នាក់ ដើម្បីដឹងពីឱកាសការងារមុនគេ</p>
              </div>
            </div>
          </aside>
        </div>

      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

const searchQuery = ref('');
const isSearchFocused = ref(false);
const openFaq = ref(0);
const searchInput = ref(null);

const toggleFaq = (i) => openFaq.value = openFaq.value === i ? null : i;

const handleKey = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.value?.focus();
  }
};
onMounted(() => window.addEventListener('keydown', handleKey));
onUnmounted(() => window.removeEventListener('keydown', handleKey));

const mainTopics = [
  { title: 'រៀបចំប្រវត្តិរូបឱ្យទាក់ទាញ', desc: 'របៀបធ្វើឱ្យប្រវត្តិរូបរបស់អ្នកលេចធ្លោខ្លាំង រហូតដល់អ្នករើសបុគ្គលិកទាក់ទងមកមុន។', count: 18, color: '#818cf8', bg: 'rgba(129, 140, 248, 0.1)', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
  { title: 'ជំនួយការស្វែងរកការងារ', desc: 'របៀបប្រើតម្រងស្វែងរក ដើម្បីរកមើលការងារល្អៗ ផ្ដល់ប្រយោជន៍ច្រើន និងមានសុវត្ថិភាពខ្ពស់។', count: 32, color: '#c084fc', bg: 'rgba(192, 132, 252, 0.1)', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>' },
  { title: 'អត្ថប្រយោជន៍ពីសហគមន៍', desc: 'ទទួលបានការណែនាំការងារផ្ទាល់ខាងក្នុង ដឹងពីប្រាក់ខែក្នុងទីផ្សារ និងការបញ្ចុះតម្លៃពិសេសៗ។', count: 14, color: '#4ade80', bg: 'rgba(74, 222, 128, 0.1)', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
  { title: 'សុវត្ថិភាពក្នុងការរកការងារ', desc: 'របៀបរាយការណ៍ពេលឃើញការងារបោកប្រាស់ និងរក្សាការសម្ងាត់នៃទិន្នន័យរបស់អ្នក។', count: 11, color: '#fb7185', bg: 'rgba(251, 113, 133, 0.1)', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' }
];

const faqs = [
  { q: 'តើធ្វើដូចម្តេចទើបបានកាតគ្រីពណ៌ខៀវ "Verified Talent" (អ្នកជំនាញពិតប្រាកដ)?', a: 'ដើម្បីបានកាតគ្រីនេះ អ្នកត្រូវបំពេញព័ត៌មានផ្ទាល់ខ្លួនឱ្យបាន ១០០% ភ្ជាប់គណនី LinkedIn ឬ GitHub របស់អ្នក និងមានសមាជិកក្នុងសហគមន៍ ៣ នាក់ជួយធានាលើជំនាញរបស់អ្នក។ ប្រវត្តិរូបដែលមានកាតគ្រីនេះ នឹងទទួលបានការចាប់អារម្មណ៍ពីក្រុមហ៊ុននានាច្រើនជាងមុនដល់ទៅ ៣ ដង។' },
  { q: 'តើមេ ឬក្រុមហ៊ុនបច្ចុប្បន្នរបស់ខ្ញុំ អាចដឹងពីសកម្មភាពរបស់ខ្ញុំនៅទីនេះទេ?', a: 'មិនដឹងទេ! ប្រព័ន្ធនឹងលាក់ស្ថានភាព "កំពុងរកការងារថ្មី" របស់អ្នកមិនឱ្យបុគ្គលិកដែលធ្វើការក្នុងក្រុមហ៊ុនជាមួយគ្នាមើលឃើញឡើយ (អ្នកអាចកំណត់ឈ្មោះក្រុមហ៊ុនបច្ចុប្បន្នរបស់អ្នកនៅក្នុងផ្នែក Settings)។' },
  { q: 'តើខ្ញុំអាចសុំឱ្យគេជួយណែនាំការងារ (Referral) ក្នុងសហគមន៍ដោយរបៀបណា?', a: 'ងាយៗ គ្រាន់តែចូលទៅកាន់ទំព័រក្រុមហ៊ុនដែលអ្នកចង់ធ្វើការ រួចចុចពាក្យ "សុំការណែនាំ" (Request Referral)។ ប្រព័ន្ធនឹងផ្ញើសារទៅកាន់សមាជិកដែលកំពុងធ្វើការនៅទីនោះ ហើយស្ម័គ្រចិត្តជួយណែនាំបុគ្គលិកថ្មី។' }
];

const featuredArticles = [
  'គន្លឹះសម្ភាសន៍ការងារផ្នែកបច្ចេកវិទ្យាឱ្យជាប់',
  'របៀបសរសេរ CV ឱ្យត្រូវចិត្តប្រព័ន្ធស្កេនស្វ័យប្រវត្តិ (ATS)',
  'របៀបចរចាប្រាក់ខែ និងអត្ថប្រយោជន៍ពេលធ្វើការនៅផ្ទះ',
  'របៀបធ្វើកម្រងស្នាដៃ (Portfolio) សម្រាប់អ្នកគ្មានបទពិសោធន៍សោះ'
];

const filteredFaqs = computed(() => {
  if (!searchQuery.value) return faqs;
  const q = searchQuery.value.toLowerCase();
  return faqs.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
});
</script>

<style scoped>
/* រក្សាទុក Style ដដែល ដើម្បីកុំឱ្យខូចទម្រង់ Layout */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.premium-support-page {
  --bg: #09090b;
  --surface: #121215;
  --border: rgba(255, 255, 255, 0.08);
  --accent: #6366f1;
  --text-main: #fafafa;
  --text-muted: #a1a1aa;
  
  background-color: var(--bg);
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', sans-serif;
  min-height: 100vh;
  padding: 40px;
}

.content-shell {
  max-width: 1200px;
  margin: 0 auto;
}

.meta-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
}

.breadcrumbs .current { color: var(--text-main); font-weight: 500; }

.status-chip {
  background: rgba(34, 197, 94, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.1);
  padding: 6px 14px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.pulse-dot { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 10px #22c55e; animation: blink 2s infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
.status-text { color: #4ade80; font-weight: 600; }
.status-chip .divider { width: 1px; height: 12px; background: rgba(34, 197, 94, 0.2); }
.status-link { color: #22c55e; text-decoration: none; opacity: 0.8; }

.hero-section {
  text-align: center;
  margin-bottom: 64px;
}

.main-title { font-size: 48px; font-weight: 700; letter-spacing: -0.04em; margin-bottom: 16px; }
.hero-subtitle { color: var(--text-muted); font-size: 18px; max-width: 600px; margin: 0 auto 40px; }

.search-command-group { max-width: 700px; margin: 0 auto; }

.search-bar {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 16px 20px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.search-bar.is-active { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }
.search-icon { color: var(--text-muted); }
.search-bar input { background: transparent; border: none; color: white; outline: none; width: 100%; font-size: 16px; }

.search-hint { display: flex; gap: 4px; }
.search-hint kbd {
  background: rgba(255,255,255,0.05);
  color: var(--text-muted);
  padding: 4px 8px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 12px;
  border: 1px solid var(--border);
}

.quick-tags { display: flex; gap: 12px; margin-top: 16px; justify-content: center; font-size: 13px; color: var(--text-muted); }
.quick-tags button {
  background: none; border: none; color: var(--accent); cursor: pointer; padding: 0; font-weight: 500;
}

.topic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-bottom: 80px;
}

.topic-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.topic-card:hover { transform: translateY(-5px); border-color: rgba(255,255,255,0.15); }

.topic-icon-box {
  width: 48px; height: 48px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 24px;
}

.topic-info h3 { font-size: 18px; margin-bottom: 8px; font-weight: 600; }
.topic-info p { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 24px; }

.topic-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 600;
}

.topic-card:hover .topic-footer { color: var(--accent); }

.layout-body {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 80px;
}

.content-label {
  font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;
  color: var(--text-muted); font-weight: 700; margin-bottom: 24px;
}

.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.view-all { font-size: 13px; color: var(--accent); text-decoration: none; font-weight: 600; }

.faq-list { display: flex; flex-direction: column; }
.faq-row { border-bottom: 1px solid var(--border); }

.faq-toggle {
  width: 100%; background: none; border: none; padding: 24px 0;
  display: flex; justify-content: space-between; align-items: center;
  cursor: pointer; color: var(--text-main); text-align: left;
}

.faq-q { font-size: 17px; font-weight: 500; }
.faq-icon-wrapper { color: var(--text-muted); transition: 0.3s; }
.expanded .faq-icon-wrapper { transform: rotate(180deg); color: var(--accent); }

.faq-answer {
  max-height: 0; overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--text-muted); font-size: 15px; line-height: 1.7;
}

.expanded .faq-answer { max-height: 300px; }
.answer-inner { padding-bottom: 32px; }

.answer-actions {
  display: flex; align-items: center; gap: 12px; margin-top: 24px;
  font-size: 13px; color: var(--text-muted);
}

.vote-btn {
  background: rgba(255,255,255,0.05); border: 1px solid var(--border);
  color: white; padding: 4px 12px; border-radius: 6px; cursor: pointer;
}

.sidebar-stack { display: flex; flex-direction: column; gap: 32px; }

.sidebar-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 24px;
}

.sidebar-label { font-size: 14px; font-weight: 700; margin-bottom: 16px; }

.featured-list { display: flex; flex-direction: column; gap: 12px; }
.featured-item {
  display: flex; align-items: center; gap: 10px;
  text-decoration: none; color: var(--text-muted); font-size: 14px;
  transition: 0.2s;
}

.art-dot { width: 4px; height: 4px; background: var(--accent); border-radius: 50%; }
.featured-item:hover { color: var(--text-main); transform: translateX(4px); }

.contact-header h4 { font-size: 18px; margin: 0 0 4px 0; }
.contact-header p { font-size: 13px; color: #4ade80; margin-bottom: 20px; }

.contact-methods { display: flex; flex-direction: column; gap: 10px; }
.method-btn {
  padding: 12px; border-radius: 12px; font-weight: 600; font-size: 14px;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: 0.2s;
}

.method-btn.primary { background: var(--accent); color: white; border: none; }
.method-btn.secondary { background: transparent; color: white; border: 1px solid var(--border); }
.method-btn:hover { opacity: 0.9; transform: scale(0.98); }

.community-banner {
  background: linear-gradient(135deg, #1e1b4b, #312e81);
  padding: 20px; border-radius: 24px; display: flex; gap: 16px; align-items: center;
  border: 1px solid rgba(255,255,255,0.1);
}

.comm-icon { font-size: 24px; }
.comm-text h5 { margin: 0 0 2px 0; font-size: 15px; }
.comm-text p { margin: 0; font-size: 12px; opacity: 0.7; }

@media (max-width: 1024px) {
  .layout-body { grid-template-columns: 1fr; gap: 48px; }
  .premium-support-page { padding: 20px; }
  .main-title { font-size: 32px; }
}
</style>