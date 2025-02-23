<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import NavRegister from '@/components/NavRegister.vue'
import NavView from '@/components/NavView.vue'
import NavUser from '@/components/NavUser.vue'
import NavStock from './NavStock.vue'
import TeamSwitcher from '@/components/TeamSwitcher.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import {
  GalleryVerticalEnd,
  Package,
  Boxes,
  ShoppingBag,
  ShoppingCart,
  PackageOpen,
  ChartNoAxesColumn,
  HandCoins,
  Settings,
  LogOut
} from 'lucide-vue-next'
import NavDashboard from './NavDashboard.vue'
import { getUserDataLocalStorage } from '@/composables/getUserData'
import NavOrder from './NavOrder.vue'
const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})
const userData = getUserDataLocalStorage()
// This is sample data.
const data = {
  user: {
    name: userData.name || '',
    email: userData.email || '',
    avatar: '/avatars/shadcn.jpg',
    options: [{
      title: 'Configurações',
      url: '/settings',
      icon: Settings
    },
    {
      title: 'Sair',
      url: '/',
      icon: LogOut
    }
]
  },
  dashboard: [
    {
      title: 'DashBoard',
      url: '/home',
      icon: ChartNoAxesColumn,
      isActive: true,
    },
  ],
  teams: [
    {
      name: 'Helqui',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
  ],
  navRegister: [
    {
      title: 'Categoria',
      url: '/category/add',
      icon: Boxes,
      isActive: true,
    },
    {
      title: 'Produto sem ingrediente',
      url: '/product/add',
      icon: Package,
    },
    {
      title: 'Produto com ingredientes',
      url: '/register',
      icon: ShoppingBag,
    },
  ],
  navView: [
    {
      title: 'Categorias',
      url: '/category/add',
      icon: Boxes,
      isActive: true,
    },
    {
      title: 'Produtos',
      url: '/product',
      icon: ShoppingCart,
      isActive: true,
    },
  ],
  navStock: [
    {
      title: 'Estoque de produtos',
      url: '/stock/product',
      icon: PackageOpen,
      isActive: true,
    },
    {
      title: 'Estoque de ingredientes',
      url: '/stock/ingredient',
      icon: PackageOpen,
      isActive: true,
    },
  ],
  navSale: [
    {
      title: 'Registrar venda',
      url: '/order',
      icon: HandCoins,
      isActive: true,
    }
  ]
}
</script>
<template>
  <Sidebar class="bg-muted/50 lg:bg-muted/50" v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavDashboard :items="data.dashboard" />
      <NavRegister class="hidden lg:block" :items="data.navRegister"/>
      <NavView :items="data.navView" />
      <NavStock class="hidden lg:block" :items="data.navStock" />
      <NavOrder class="hidden lg:block" :items="data.navSale"/>
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user"/>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>