<script lang="ts">
export const description
  = 'A sidebar that collapses to icons.'
export const iframeHeight = '800px'
export const containerClass = 'w-full h-full'
</script>
<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { Button } from '@/components/ui/button'

import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Plus } from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/UserStore';
import Alert from '@/components/Alert.vue'

const userStore = useUserStore()
const route = useRoute()

const dataUser = ref<{
  name: string
  email: string
  id: string
  firstAccess: boolean
}>({
  name: '',
  email: '',
  id: '',
  firstAccess: true
})

function loadUserData() {
  try {
    const userData = userStore.getUserData
    dataUser.value = userData
  } catch (error) {
    console.error('Erro ao carregar dados do localStorage:')
  }
}
const namePage = computed(() => route.name?.toString() || 'Página')

onMounted(loadUserData)
</script>
<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 class=" text-lg font-semibold md:text-2xl">
          {{ namePage }}
        </h1>
        <Alert v-if="dataUser.firstAccess"/>
        <div v-if="route.path === '/home'" class="flex items-center border shadow-lg rounded-md p-4 gap-4">
          <router-link :to="{
            path: '/category/add',
            query: { id: dataUser.id }
          }"><Button class="bg-muted">
              <Plus /> Categoria
            </Button></router-link>
          <router-link :to="{
            path: '/product/add',
            query: { id: dataUser.id }
          }"><Button class="bg-muted">
              <Plus /> Adicionar produto
            </Button></router-link>
          <router-link :to="{
            path: '/register',
            query: { idU: dataUser.id }
          }"><Button class="bg-muted">
              <Plus /> Adicionar produto com ingrediente
            </Button></router-link>
        </div>
        <div class="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <router-view />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>