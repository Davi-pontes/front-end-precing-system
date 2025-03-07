<script setup lang="ts">
import { Instagram, Youtube } from 'lucide-vue-next';
</script>

<template>
    <section class="w-full bg-muted flex flex-col items-center">
        <section
            class="w-[min(100%,1705px)] h-[7.5vh] px-5 flex items-center justify-between md:h-[7.5vh] border-b-[1px] border-b-[rgba(30, 30, 30, 1)]">
            <h1 class="text-white text-lg">
                HELQUI
            </h1>
            <section class="flex flex-row items-center justify-center gap-5">
                <a href="https://www.instagram.com/helquitech/?igsh=MWZ5Z3h3MWkxcjk2bg%3D%3D#">
                    <component :is="Instagram" color="white" />
                </a>
                <a href="https://www.youtube.com/@HelquiTech">
                    <component :is="Youtube" color="white" />
                </a>
            </section>
        </section>
    </section>
</template>
