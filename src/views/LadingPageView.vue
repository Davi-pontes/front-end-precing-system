<script setup lang="ts">
import NavLadingPage from '@/components/ladingPage/NavLadingPage.vue';
import CardHighlight from '@/components/ladingPage/CardHighlight.vue';
import Section1 from '@/components/ladingPage/Section1.vue';
import Section2 from '@/components/ladingPage/Section2.vue';
import Section3 from '@/components/ladingPage/Section3.vue';
import Footer from '@/components/ladingPage/Footer.vue'
</script>

<template>
        <header>
            <NavLadingPage />
        </header>
        <main class="bg-muted">
            <Section1 />
            <section class="relative flex flex-col items-center top-[-9em] md:top-[-16em]">
                <CardHighlight />
                <Section2/>
                <Section3/>
            </section>
        </main>
        <footer>
            <Footer/>
        </footer>
</template>