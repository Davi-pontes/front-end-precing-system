import { createRouter, createWebHistory } from 'vue-router'
import Precification from '../views/PrecificationView.vue'
import AllIngredientView from '@/views/AllIngredientView.vue'
import StockView from '@/views/StockView.vue'
import LoginView from '../views/LoginView.vue'
import LoginViewAdmin from '../views/admin/LoginViewAdmin.vue'
import ListUsersViewAdmin from '@/views/admin/ListUsersViewAdmin.vue'
import CreateAccountView from '@/views/CreateAccountView.vue'
//import HomePageView from '@/views/Menu/HomePageView.vue'
//import CartView from '@/views/Menu/CartView.vue'
import Order from '@/views/OrderView.vue'
import { Auth } from '@/auth/auth'
import StockProduct from '@/views/StockProduct.vue'
//import MainLayout from '@/views/MainLayout.vue'
import AddProduct from '@/views/AddProduct.vue'
import AddCategory from '@/views/AddCategory.vue'
import Settings from '@/views/Settings.vue'
import Dashboard from '@/views/DashboardView.vue'
//import MainLayoutAdmin from '@/views/admin/MainLayoutAdmin.vue'
import MainLayout from '@/views/MainLayout.vue'
import MainLayoutAdmin from '@/views/admin/MainLayoutAdmin.vue'
import ProductView from '@/views/ProductView.vue'
import LadingPageView from '@/views/LadingPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LadingPageView,
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
      },
    },
    {
      path: '/admin/',
      name: 'mainAdmin',
      component: MainLayoutAdmin,
      meta: {
        auth: true
      },
      children:[{
        path: 'users',
        component: ListUsersViewAdmin,
        name: 'AdminUsers'
      }
    ]
    },
    {
      path: '/',
      name: 'mainLayout',
      component: MainLayout,
      meta: {
        auth: true
      },
      children: [
        {
          path: 'home',
          component: Dashboard,
          name: 'Inicio'
        },
        {
          path: 'order',
          component: Order,
          name: 'Registrar venda'
        },
        {
          path: 'ingredients',
          component: AllIngredientView,
          name: 'Ingredientes'
        },
        {
          path: 'product',
          component: ProductView,
          name: 'Produtos'
        },
        {
          path: 'product/add',
          component: AddProduct,
          name: 'Adicionar produto'
        },
        {
          path: 'category/add',
          component: AddCategory,
          name: 'Adicionar categoria'
        },
        {
          path: 'stock/product',
          component: StockProduct,
          name: 'Estoque produto'
        },
        {
          path: 'stock/ingredient',
          component: StockView,
          name: 'Estoque ingrediente'
        },
        {
          path: 'settings',
          component: Settings,
          name: 'Configurações'
        }
      ]
    },
    {
      path: '/register',
      name: 'precification',
      component: Precification,
      meta: {
        auth: true
      }
    }
    // {
    //   path: '/menu',
    //   name: 'homePageMenu',
    //   component: HomePageView,
    //   meta: {
    //     public: true
    //   }
    // },
    // {
    //   path: '/menu/carrinho',
    //   name: 'cartMenu',
    //   component: CartView,
    //   meta: {
    //     public: true
    //   }
    // },
    // {
    //   path: '/ingredients/all',
    //   name: 'allIngredients',
    //   component: AllIngredientView,
    //   meta: {
    //     auth: true
    //   }
    // },
    // {
    //   path: '/stock',
    //   name: 'stock',
    //   component: StockView,
    //   meta: {
    //     auth: true
    //   }
    // },
    // {
    //   path: '/stock/product',
    //   name: 'stockProduct',
    //   component: StockProduct,
    //   meta: {
    //     auth: true
    //   }
    // },
    // {
    //   path: '/order',
    //   name: 'order',
    //   component: Order,
    //   meta: {
    //     auth: true
    //   }
    // }
  ]
})

router.beforeEach(async (to, from, next) => {
  const isPublicRoute = to.meta?.public;

  if (isPublicRoute) {
    return next();
  }

  try {
    const isAuthenticated = await Auth.validate();

    if (isAuthenticated) {
      return next();
    } else {
      return next({ name: 'login' });
    }
  } catch (error) {
    if (to.name !== 'home') {
      return next({ name: 'home' });
    }
    next();
  }
});
export default router
