<script lang="ts">
export default {
  name: 'Loading',
  data() {
    return {}
  }
}
</script>

<template>
  <main>
    <div class="loader"></div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: absolute;
  width: 100vw;
  height: 100dvh;
}

.loader {
  --c: no-repeat linear-gradient(#435276 0 0);
  background: var(--c), var(--c), var(--c), var(--c), var(--c), var(--c), var(--c), var(--c),
    var(--c);
  background-size: 16px 16px;
  animation:
    l32-1 1s infinite,
    l32-2 1s infinite;
}

@keyframes l32-1 {
  0%,
  100% {
    width: 45px;
    height: 45px;
  }

  35%,
  65% {
    width: 65px;
    height: 65px;
  }
}

@keyframes l32-2 {
  0%,
  40% {
    background-position:
      0 0,
      0 50%,
      0 100%,
      50% 100%,
      100% 100%,
      100% 50%,
      100% 0,
      50% 0,
      50% 50%;
  }

  60%,
  100% {
    background-position:
      0 50%,
      0 100%,
      50% 100%,
      100% 100%,
      100% 50%,
      100% 0,
      50% 0,
      0 0,
      50% 50%;
  }
}
</style>
