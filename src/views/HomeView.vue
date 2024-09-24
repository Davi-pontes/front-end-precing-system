<script lang="ts">
import NavBarLadingPage from '@/components/NavBarLadingPage.vue';
import Home from '@/components/Home.vue';

export default {
    name: 'HomeView',
    components: {
        NavBarLadingPage,
        Home
    }
}
</script>

<template>
    <main>
        <NavBarLadingPage class="nav-bar" />
        <Home />
    </main>
</template>

<style scoped></style>