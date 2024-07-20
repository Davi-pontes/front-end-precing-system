import { createRouter, createWebHistory } from 'vue-router'
import Precification  from '../views/PrecificationView.vue'
import HomeView from '@/views/HomeView.vue'
import AllIngredientView from '@/views/AllIngredientView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'precification',
      component: Precification
    },
    {
      path: '/ingredients/all',
      name: 'allIngredients',
      component: AllIngredientView
    }
  ]
})

export default router
