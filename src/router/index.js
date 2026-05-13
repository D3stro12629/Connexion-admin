import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/LoginView.vue'),
      meta: { requiresAuth: false, title: 'Login' }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true, title: 'Dashboard' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile/ProfileView.vue'),
      meta: { requiresAuth: true, title: 'Profile' }
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategoryView.vue'),
      meta: { requiresAuth: true, title: 'Categories' }
    },
    {
      path: '/degrees',
      name: 'degrees',
      component: () => import('../views/DegreeView.vue'),
      meta: { requiresAuth: true, title: 'Degrees' }
    },
    {
      path: '/schools',
      name: 'schools',
      component: () => import('../views/SchoolView.vue'),
      meta: { requiresAuth: true, title: 'Schools' }
    },
    {
      path: '/skills',
      name: 'skills',
      component: () => import('../views/SkillView.vue'),
      meta: { requiresAuth: true, title: 'Skills' }
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: () => import('../views/SubjectView.vue'),
      meta: { requiresAuth: true, title: 'Subjects' }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UserView.vue'),
      meta: { requiresAuth: true, title: 'Users' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true, title: 'About' }
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/HelpView.vue'),
      meta: { requiresAuth: true, title: 'Help' }
    },
    {
      path: "/:catchAll(.*)",
      name: "page.404",
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: "404 Not Found" },
    },
  ],
})


router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Admin Dashboard';
  const authStore = useAuthStore();
  const token = authStore.token || localStorage.getItem('token');
  const isAuthenticated = !!token;

  if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' });
  } 
  else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'dashboard' });
  } 
  else {
    next();
  }
});

export default router