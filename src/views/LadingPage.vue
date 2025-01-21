<script lang="ts">
import NavBarLadingPage from '@/components/NavBarLadingPage.vue'
import LandingPage from '@/components/LandingPage.vue'

export default {
  name: 'LandingPageView',
  components: {
    NavBarLadingPage,
    LandingPage
  }
}
</script>

<template>
  <main>
    <NavBarLadingPage class="nav-bar" />
    <LandingPage />
  </main>
</template>

<style scoped></style>
