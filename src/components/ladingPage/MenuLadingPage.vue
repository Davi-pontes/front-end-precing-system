<script setup lang="ts">
import Button from './ButtonLadingPage.vue'
//import { Menu } from 'lucide-vue-next';
</script>

<template>
    <section class="hidden md:flex flex-row gap-[25px] items-center justify-center">
        <ul class="flex flex-row gap-[25px] justify-center font-[700] font-[Lato-Bold] text-white text-[14px]">
            <!-- <li><router-link to="/duvidas" class="hover:underline">Dúvidas</router-link></li>
            <li><router-link to="/suporte" class="hover:underline">Suporte</router-link></li> -->
            <li><router-link to="/login" class="hover:underline">Login</router-link></li>
        </ul>
        <Button class="w-[128px] text-[14px]"> Cadastre-se </Button>
    </section>
    <section class="font-[Lato-Bold] text-white text-[14px] flex flex-row gap-[25px] md:hidden">
        <router-link to="/login">Login</router-link>
    </section>
    <!-- <Menu color="white" /> -->
</template>