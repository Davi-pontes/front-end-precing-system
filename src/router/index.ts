import { createRouter, createWebHistory } from 'vue-router'
import Precification from '../views/PrecificationView.vue'
import HomeView from '../views/HomeView.vue'
import HomePrecificationView from '@/views/HomePrecificationView.vue'
import AllIngredientView from '@/views/AllIngredientView.vue'
import StockView from '@/views/StockView.vue'
import LoginView from '../views/LoginView.vue'
import LoginViewAdmin from '../views/admin/LoginViewAdmin.vue'
import ListUsersViewAdmin from '@/views/admin/ListUsersViewAdmin.vue'
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
      path: '/login',
      name: 'login',
      component: LoginView,
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
        public: true
      }
    },
    {
      path: '/precification',
      name: 'homePrecification',
      component: HomePrecificationView,
      meta: {
        auth: true,

      },
    },
    {
      path: '/register',
      name: 'precification',
      component: Precification,
      meta: {
        auth: true,

      },
    },
    {
      path: '/ingredients/all',
      name: 'allIngredients',
      component: AllIngredientView,
      meta: {
        auth: true,

      },
    },
    {
      path: '/stock',
      name: 'stock',
      component: StockView,
      meta: {
        auth: true,

      },
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    console.log(from);

    if (to.meta?.public) {
      next()
    } else {
      const validate = await Auth.validate()
      // if (from.name === 'home' && validate) {
      //   next({ name: 'homePrecification' })
      // }

      if (validate) {
        next()
      } else {
        next({ name: 'login' })
      }
    }
  } catch (error) {
    next({ name: 'login' })
  }
})
export default router
