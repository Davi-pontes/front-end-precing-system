<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Bell, CircleUser, PackageOpen, Home, Package, Package2, Search, ShoppingCart, ShoppingBasket, Boxes, Plus } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const nameUser = ref('Jhenifer doce')
const idUser = ref('')
const route = useRoute()

function getLocalStorage() {
    const localStorageObject = localStorage.getItem('User')
    if (localStorageObject) {
        const parsedObject = JSON.parse(localStorageObject)
        nameUser.value = parsedObject.name || ''
        idUser.value = parsedObject.id || ''
    }
}
function getNamepage(): string {
    const name = route.name
    if (name) return name.toString()
    return 'Página'

}
const namePage = computed(() => getNamepage())

getNamepage()
getLocalStorage()
</script>

<template>
    <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <!-- SideBar -->
        <div class="hidden border-r bg-muted/40 md:block">
            <div class="flex h-full max-h-screen flex-col gap-2">
                <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <a href="/" class="flex items-center gap-2 font-semibold">
                        <Package2 class="h-6 w-6" />
                        <span class="">{{ nameUser.toUpperCase() }}</span>
                    </a>
                    <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
                        <Bell class="h-4 w-4" />
                        <span class="sr-only">Alternar notificações</span>
                    </Button>
                </div>
                <!-- Todos butões -->
                <div class="flex-1">
                    <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
                        <router-link to="/precification"
                            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            :class="{ 'bg-muted': $route.path === '/precification' }">
                            <Home class="h-4 w-4" />
                            Inicio
                        </router-link>
                        <router-link :to="{
                            path: '/order',
                            query: { id: idUser }
                        }" class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            :class="{ 'bg-muted': $route.path === '/order' }">
                            <ShoppingCart class="h-4 w-4" />
                            Pedido
                            <!-- <Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                6
                            </Badge> -->
                        </router-link>
                        <router-link to="/product/add"
                            class="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
                            :class="{ 'bg-muted': $route.path === '/product/add' }">
                            <Package class="h-4 w-4" />
                            Produtos
                        </router-link>
                        <router-link :to="{
                            path: '/category/add',
                            query: { id: idUser }
                        }" class="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
                            :class="{ 'bg-muted': $route.path === '/category/add' }">
                            <Boxes class="h-4 w-4" />
                            Categoria
                        </router-link>
                        <router-link :to="{
                            path: '/ingredients',
                            query: { id: idUser }
                        }" class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            :class="{ 'bg-muted': $route.path === '/ingredients' }">
                            <ShoppingBasket class="h-4 w-4" />
                            Ingredientes
                        </router-link>
                        <router-link :to="{
                            path: '/stock/product',
                            query: { id: idUser }
                        }" class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            :class="{ 'bg-muted': $route.path === '/stock/product' }">
                            <PackageOpen class="h-4 w-4" />
                            Estoque de produtos
                        </router-link>
                        <router-link :to="{
                            path: '/stock/ingredient',
                            query: { id: idUser }
                        }" class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            :class="{ 'bg-muted': $route.path === '/stock/ingredient' }">
                            <PackageOpen class="h-4 w-4" />
                            Estoque de ingredientes
                        </router-link>
                    </nav>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                <div class="w-full flex-1">
                    <form>
                        <div class="relative">
                            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search products..."
                                class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3" />
                        </div>
                    </form>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="secondary" size="icon" class="rounded-full">
                            <CircleUser class="h-5 w-5" />
                            <span class="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><router-link :to="{
                            path: '/settings',
                            query: { id: idUser }
                        }" class="dropdown-link">Configurações</router-link></DropdownMenuItem>
                        <DropdownMenuItem>Suporte</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <!-- Principal -->
            <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                <div class="flex items-center">
                    <h1 class="text-lg font-semibold md:text-2xl">
                        {{ namePage }}
                    </h1>
                </div>
                <div v-if="$route.path === '/precification'" class="flex items-center border shadow-lg rounded-md p-4 gap-4">
                    <router-link :to="{
                        path: '/category/add',
                        query: { id: idUser }
                    }"><Button class="bg-muted">
                            <Plus /> Categoria
                        </Button></router-link>
                    <router-link :to="{
                        path: '/product/add',
                        query: { id: idUser }
                    }"><Button class="bg-muted">
                            <Plus /> Adicionar produto
                        </Button></router-link>
                    <router-link :to="{
                        path: '/register',
                        query: { idU: idUser }
                    }"><Button class="bg-muted">
                            <Plus /> Adicionar produto com ingrediente
                        </Button></router-link>
                </div>
                <div class="flex flex-1 overflow">
                    <router-view />
                </div>
            </main>
        </div>
    </div>
</template>