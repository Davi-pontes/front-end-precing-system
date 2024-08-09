import { createRouter, createWebHistory } from 'vue-router'
import Precification  from '../views/PrecificationView.vue'
import HomeView from '@/views/HomeView.vue'
import HomePrecificationView from '@/views/HomePrecificationView.vue'
import AllIngredientView from '@/views/AllIngredientView.vue'
import StockView from '@/views/StockView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/precification',
      name: 'homePrecification',
      component: HomePrecificationView
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
    },
    {
      path: '/stock',
      name: 'stock',
      component: StockView
    }
  ]
})

export default router
