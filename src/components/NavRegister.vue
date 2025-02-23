<script setup lang="ts">
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { type LucideIcon } from 'lucide-vue-next'
import { useRoute } from 'vue-router';
defineProps<{
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
  }[]
}>()

const route = useRoute()

</script>
<template>
  <SidebarGroup>
    <SidebarGroupLabel>Cadastrar</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.title">
        <SidebarMenuButton :class="{'bg-muted': route.path === item.url}"  as-child>
          <router-link :to="item.url">
            <component :is="item.icon" v-if="item.icon" />
            <span>{{ item.title }}</span>
          </router-link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>