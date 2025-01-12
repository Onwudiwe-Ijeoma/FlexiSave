import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import DashBoardView from '../views/DashBoardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth'
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/dashboard',
      component: DashBoardView,
      // meta: { requiresAuth: true },
      children: [
        {
          path: 'overview',
          component: () => import('@/views/dashboard/Overview.vue')
        },
        {
          path: 'savings',
          component: () => import('@/views/dashboard/Savings.vue')
        },
        {
          path: 'quest',
          component: () => import('@/views/dashboard/Quest.vue')
        },
        {
          path: 'leaderboards',
          component: () => import('@/views/dashboard/Leaderboards.vue')
        },
        {
          path: 'rewards',
          component: () => import('@/views/dashboard/Rewards.vue')
        }
      ]
    }
  ]
})

// Add navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    next('/auth')
  } else if (to.path === '/auth' && token) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router