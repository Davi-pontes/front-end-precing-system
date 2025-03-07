<script setup lang="ts">
import Button2 from './Button2.vue'
import Texture from '@/assets/img/texture.png'
import DemonstrationImages1 from './DemonstrationImages1.vue';
import DemonstrationImages2 from './DemonstrationImages2.vue';
</script>

<template>
    <section class="relative flex h-[45em] md:h-[50em] bg-white overflow-hidden ">
        <img :src="Texture"
            class="hidden md:block md:w-[700px] md:absolute md:left-[calc(100%-700px)] md:opacity-60">
        <section class="flex flex-col w-full p-7
        md:flex-row md:h-[90%] md:items-center md:p-10 md:border">
            <section class="flex flex-col md:w-3/5 md:h-full md:items-center md:gap-4 md:pt-15">
                <span class="text-muted font-[Lato-Black] text-[34px]/[1.2] text-left
              md:text-[50px]">
                    O sistema definitivo para precificação ágil e inteligente.</span>
                <h2 class="text-muted font-Lato-Regular text-[22px]/[1.2] text-left pt-2
              md:text-[24px]">
                    Precificar seus produtos vai além de cobrir custos – é estratégia para maximizar lucros e crescer.
                </h2>
                <Button2 class="self-end top-5 md:self-center" :to="'/create/account'">Começar
                    grátis
                </Button2>
            </section>
            <div class="flex justify-center md:w-3/4 flex-col md:h-full">
                <DemonstrationImages2 class="top-[12em] left-20 md:top-[-5em] md:left-[20em]" />
                <DemonstrationImages1 class="top-[-3em] md:top-[-4em]" />
            </div>
        </section>
    </section>
</template>