import { createRouter, createWebHistory } from 'vue-router'
import Precification from '../views/PrecificationView.vue'
import HomeView from '../views/HomeView.vue'
import HomePrecificationView from '@/views/HomePrecificationView.vue'
import AllIngredientView from '@/views/AllIngredientView.vue'
import StockView from '@/views/StockView.vue'
import LoginView from '../views/LoginView.vue'
import LoginViewAdmin from '../views/admin/LoginViewAdmin.vue'
import ListUsersViewAdmin from '@/views/admin/ListUsersViewAdmin.vue'
import CreateAccountView from '@/views/CreateAccountView.vue'
import HomePageView from '@/views/Menu/HomePageView.vue'
import { Auth } from '@/auth/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        public: true
      }
    },
    {
      path: '/menu',
      name: 'homePageMenu',
      component: HomePageView,
      meta: {
        public: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        public: true
      }
    },
    {
      path: '/create/account',
      name: 'createAccount',
      component: CreateAccountView,
      meta: {
        public: true
      }
    },
    {
      path: '/admin/login',
      name: 'loginAdmin',
      component: LoginViewAdmin,
      meta: {
        public: true
      }
    },
    {
      path: '/admin/users',
      name: 'listUsersAdmin',
      component: ListUsersViewAdmin,
      meta: {
        auth: true
      }
    },
    {
      path: '/precification',
      name: 'homePrecification',
      component: HomePrecificationView,
      meta: {
        auth: true
      }
    },
    {
      path: '/register',
      name: 'precification',
      component: Precification,
      meta: {
        auth: true
      }
    },
    {
      path: '/ingredients/all',
      name: 'allIngredients',
      component: AllIngredientView,
      meta: {
        auth: true
      }
    },
    {
      path: '/stock',
      name: 'stock',
      component: StockView,
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    const validate = await Auth.validate()

    if (to.meta?.public && to.name !== 'login') {
      return next()
    } else if (to.name === 'login') {
      return next()
    }

    if (validate) {
      return next()
    } else {
      return next({ name: 'login' })
    }
  } catch (error) {
    if (to.name !== 'home') {
      return next({ name: 'home' })
    }
    next()
  }
})
export default router
