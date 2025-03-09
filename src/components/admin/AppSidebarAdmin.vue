<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import NavUser from '@/components/NavUser.vue'
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
  ChartNoAxesColumn,
  Settings,
  LogOut
} from 'lucide-vue-next'
import NavDashboardAdmin from './NavDashboardAdmin.vue'
import { getUserDataLocalStorage } from '@/composables/getUserData'
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
}
</script>
<template>
  <Sidebar class="bg-muted/50 lg:bg-muted/50" v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavDashboardAdmin :items="data.dashboard" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user"/>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>