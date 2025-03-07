<script setup lang="ts">
import Menu from './MenuLadingPage.vue'
import LogoHelqui from '@/assets/img/LogoHelquiToLadingPage.svg'
</script>

<template>
  <section class="w-full bg-muted flex items-center">
    <section
      class="w-[min(100%,1705px)] h-[4em] px-10 flex items-center justify-between md:h-[4em]">
      <img 
        class="hidden md:block w-auto aspect-auto" 
        :src="LogoHelqui" 
        alt="Logo Helqui"
      />
      <h1 class="text-white text-[20px] md:invisible">
        HELQUI
      </h1>
      <section class="flex justify-between items-center flex-row gap-[25px]">
        <Menu />
      </section>
    </section>
  </section>
</template>
