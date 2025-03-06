<script setup lang="ts">
import Menu from './MenuLadingPage.vue'
import LogoHelqui from '@/assets/img/LogoSemOnomeTecnologi.png'
</script>

<template>
  <div class="w-full bg-muted flex flex-col items-center">
    <section
      class="w-[min(100%,1705px)] h-[7.5vh] pl-[5%] pr-[5%] flex items-center justify-between md:h-[80px] border-b-[1px] border-b-[rgba(30, 30, 30, 1)]">
      <img class="hidden md:block h-[100%]" :src="LogoHelqui" />
      <h1 class="font-[700] font-[Montserrat] text-(--secondcolor) text-[20px] md:invisible">
        HELQUI
      </h1>
      <section class="flex justify-between items-center flex-row gap-[25px]">
        <Menu />
      </section>
    </section>
  </div>
</template>
